import { createClient } from '@/lib/supabase/server';
import type { Seat } from '@/types';

export async function getSeatsByFlightId(flightId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('seats')
    .select('*')
    .eq('flight_id', flightId)
    .order('seat_number');

  if (error) {
    console.error('Error fetching seats:', error);
    return [];
  }

  return data || [];
}

export async function getSeatById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('seats')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching seat:', error);
    return null;
  }

  return data;
}
