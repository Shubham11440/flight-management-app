export interface Flight {
  id: string;
  flight_no: string;
  origin: string;
  destination: string;
  departs_at: string;
  arrives_at: string;
  aircraft_type?: string;
  status: 'scheduled' | 'delayed' | 'cancelled' | 'completed';
  base_price: number;
  created_at: string;
  updated_at: string;
}

export interface Seat {
  id: string;
  flight_id: string;
  seat_number: string;
  class: 'first' | 'business' | 'economy';
  is_available: boolean;
  extra_fee: number;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  flight_id: string;
  seat_id: string;
  status: 'confirmed' | 'cancelled' | 'rescheduled';
  booked_at: string;
  total_price: number;
  pnr_code: string;
  created_at: string;
  updated_at: string;
  flight?: Flight;
  seat?: Seat;
  passenger?: Passenger;
}

export interface Passenger {
  id: string;
  booking_id: string;
  full_name: string;
  passport_no: string;
  nationality: string;
  dob: string;
  created_at: string;
  updated_at: string;
}

export interface Reschedule {
  id: string;
  booking_id: string;
  old_flight_id: string;
  new_flight_id: string;
  requested_at: string;
  fee_charged: number;
  created_at: string;
}

export interface SearchQuery {
  origin?: string;
  destination?: string;
  date?: string;
  passengers: number;
}

export interface SelectedFlight {
  flight: Flight;
  seat?: Seat;
  cabinClass: 'first' | 'business' | 'economy';
}

export interface PassengerFormData {
  fullName: string;
  passportNo: string;
  nationality: string;
  dob: string;
}
