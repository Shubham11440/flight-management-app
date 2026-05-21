import { createClient } from '@/lib/supabase/server';
import type { Booking } from '@/types';

export async function getUserBookings() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      flight:flights(*),
      seat:seats(*),
      passengers(*)
    `)
    .eq('user_id', user.id)
    .order('booked_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }

  return data || [];
}

export async function getBookingById(bookingId: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      flight:flights(*),
      seat:seats(*),
      passengers(*)
    `)
    .eq('id', bookingId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    return null;
  }

  return data;
}
