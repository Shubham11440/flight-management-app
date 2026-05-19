'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function cancelBooking(bookingId: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  try {
    const { error } = await supabase.rpc('cancel_booking', {
      p_booking_id: bookingId,
      p_user_id: user.id,
    });

    if (error) {
      console.error('Cancellation error:', error);
      return { error: error.message };
    }

    revalidatePath('/', 'layout');
    revalidatePath('/my-bookings');
    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred' };
  }
}
