import { createClient } from '@/lib/supabase/server';
import type { Flight } from '@/types';

export async function searchFlights(params: {
  origin?: string;
  destination?: string;
  departure_date?: string;
  passengers?: number;
}) {
  const supabase = await createClient();

  let query = supabase
    .from('flights')
    .select('*')
    .gte('departs_at', new Date().toISOString());

  if (params.origin) {
    query = query.ilike('origin', `%${params.origin}%`);
  }

  if (params.destination) {
    query = query.ilike('destination', `%${params.destination}%`);
  }

  if (params.departure_date) {
    const startDate = new Date(params.departure_date);
    const endDate = new Date(params.departure_date);
    endDate.setHours(23, 59, 59, 999);
    
    query = query.gte('departs_at', startDate.toISOString()).lte('departs_at', endDate.toISOString());
  }

  const { data, error } = await query.order('departs_at', { ascending: true });

  if (error) {
    console.error('Error searching flights:', error);
    return [];
  }

  return data || [];
}

export async function getFlightById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('flights')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching flight:', error);
    return null;
  }

  return data;
}
