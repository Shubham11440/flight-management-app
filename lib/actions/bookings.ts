'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { generatePNR } from '@/lib/utils/pnr';
import { useFlightStore } from '@/store/useFlightStore';

export async function createBooking(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const selectedFlight = useFlightStore.getState().selectedFlight;
  const selectedSeat = useFlightStore.getState().selectedSeat;

  if (!selectedFlight || !selectedSeat) {
    redirect('/search');
  }

  const pnr = generatePNR();

  try {
    // Call the RPC function to reserve the seat atomically
    const { data: bookingId, error: bookingError } = await supabase.rpc('reserve_seat', {
      p_flight_id: selectedFlight.flight.id,
      p_seat_id: selectedSeat.id,
      p_user_id: user.id,
      p_pnr: pnr,
    });

    if (bookingError) {
      console.error('Booking error:', bookingError);
      redirect(`/seats/${selectedFlight.flight.id}?error=${encodeURIComponent(bookingError.message)}`);
    }

    // Insert passenger details
    const { error: passengerError } = await supabase.from('passengers').insert({
      booking_id: bookingId,
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || null,
      passport_number: formData.get('passportNumber') as string || null,
      date_of_birth: formData.get('dateOfBirth') as string || null,
    });

    if (passengerError) {
      console.error('Passenger error:', passengerError);
      // In production, you might want to rollback the booking here
      redirect(`/booking/passengers?error=${encodeURIComponent('Failed to save passenger details')}`);
    }

    // Reset the flight store
    useFlightStore.getState().resetSelection();

    revalidatePath('/', 'layout');
    redirect(`/booking/confirmation?pnr=${pnr}`);
  } catch (error) {
    console.error('Unexpected error:', error);
    redirect(`/booking/passengers?error=${encodeURIComponent('An unexpected error occurred')}`);
  }
}
