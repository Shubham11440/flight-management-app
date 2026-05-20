'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { generatePNR } from '@/lib/utils/pnr';
import { getFlightById } from '@/lib/queries/flights';
import { getSeatById } from '@/lib/queries/seats';

export async function createBooking(formData: FormData, flightId?: string, seatId?: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'User not authenticated' };
  }

  const actualFlightId = (formData.get('flightId') as string) || flightId;
  const actualSeatId = (formData.get('seatId') as string) || seatId;
  const fullName = formData.get('fullName') as string;
  const passportNo = formData.get('passportNo') as string;
  const nationality = formData.get('nationality') as string;
  const dob = formData.get('dob') as string;

  if (!actualFlightId || !actualSeatId) {
    return { error: 'Missing flightId or seatId' };
  }

  try {
    const flight = await getFlightById(actualFlightId);
    const seat = await getSeatById(actualSeatId);

    if (!flight || !seat) {
      return { error: 'Flight or seat not found' };
    }

    // Calculate total price
    const totalPrice = flight.base_price + seat.extra_fee;
    const pnrCode = generatePNR();

    // Call the RPC function to reserve the seat atomically
    const { data: bookingId, error: bookingError } = await supabase.rpc('reserve_seat', {
      p_flight_id: flight.id,
      p_seat_id: seat.id,
      p_user_id: user.id,
      p_total_price: totalPrice,
      p_pnr_code: pnrCode,
    });

    if (bookingError) {
      console.error('Booking error:', bookingError);
      return { error: bookingError.message };
    }

    if (!bookingId) {
      return { error: 'Failed to create booking' };
    }

    // Insert passenger details
    const { error: passengerError } = await supabase
      .from('passengers')
      .insert({
        booking_id: bookingId,
        full_name: fullName,
        passport_no: passportNo,
        nationality,
        dob,
      });

    if (passengerError) {
      console.error('Passenger error:', passengerError);
      return { error: passengerError.message };
    }

    revalidatePath('/my-bookings');
    
    return { success: true, bookingId };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred' };
  }
}
