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

  try {
    // Call the RPC function to reserve the seat atomically
    const { data: bookingId, error: bookingError } = await supabase.rpc('reserve_seat', {
      p_flight_id: selectedFlight.flight.id,
      p_seat_id: selectedSeat.id,
      p_user_id: user.id,
    });

    if (bookingError) {
      console.error('Booking error:', bookingError);
      redirect(`/seats/${selectedFlight.flight.id}?error=${encodeURIComponent(bookingError.message)}`);
    }

    // Insert passenger details
    const { error: passengerError } = await supabase.from('passengers').insert({
      booking_id: bookingId,
      full_name: formData.get('fullName') as string,
      passport_no: formData.get('passportNo') as string,
      nationality: formData.get('nationality') as string,
      dob: formData.get('dob') as string,
    });

    if (passengerError) {
      console.error('Passenger error:', passengerError);
      // In production, you might want to rollback the booking here
      redirect(`/booking/passengers?error=${encodeURIComponent('Failed to save passenger details')}`);
    }

    // Fetch the booking to get the PNR
    const { data: booking } = await supabase
      .from('bookings')
      .select('pnr_code')
      .eq('id', bookingId)
      .single();

    // Reset the flight store
    useFlightStore.getState().resetSelection();

    revalidatePath('/', 'layout');
    redirect(`/booking/confirmation?pnr=${booking?.pnr_code}`);
  } catch (error) {
    console.error('Unexpected error:', error);
    redirect(`/booking/passengers?error=${encodeURIComponent('An unexpected error occurred')}`);
  }
}
