export interface Flight {
  id: string;
  route_code: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  duration_minutes: number;
  base_price: number;
  created_at: string;
  updated_at: string;
}

export interface Seat {
  id: string;
  flight_id: string;
  seat_number: string;
  cabin_class: 'first' | 'business' | 'economy';
  is_occupied: boolean;
  price_multiplier: number;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  pnr: string;
  flight_id: string;
  seat_id: string;
  user_id: string;
  status: 'confirmed' | 'cancelled' | 'rescheduled';
  total_price: number;
  booked_at: string;
  updated_at: string;
  flight?: Flight;
  seat?: Seat;
  passenger?: Passenger;
}

export interface Passenger {
  id: string;
  booking_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  passport_number?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
}

export interface Reschedule {
  id: string;
  booking_id: string;
  old_flight_id: string;
  old_seat_id: string;
  new_flight_id: string;
  new_seat_id: string;
  fee_difference: number;
  rescheduled_at: string;
  rescheduled_by: string;
}

export interface SearchQuery {
  origin?: string;
  destination?: string;
  departure_date?: string;
  passengers?: number;
}

export interface SelectedFlight {
  flight: Flight;
  cabinClass: 'first' | 'business' | 'economy';
}
