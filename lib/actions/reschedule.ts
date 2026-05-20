'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function rescheduleBooking(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const bookingId = formData.get('bookingId') as string;
  const newFlightId = formData.get('newFlightId') as string;
  const newSeatId = formData.get('newSeatId') as string;

  try {
    const { data, error } = await supabase.rpc('reschedule_booking', {
      p_booking_id: bookingId,
      p_user_id: user.id,
      p_new_flight_id: newFlightId,
      p_new_seat_id: newSeatId,
    });

    if (error) {
      console.error('Reschedule error:', error);
      return { error: error.message };
    }

    revalidatePath('/', 'layout');
    revalidatePath('/my-bookings');
    redirect(`/my-bookings/${bookingId}`);
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred' };
  }
}
