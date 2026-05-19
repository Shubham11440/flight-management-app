-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Flights table
CREATE TABLE flights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_code VARCHAR(10) NOT NULL,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT departure_before_arrival CHECK (arrival_time > departure_time),
  CONSTRAINT positive_duration CHECK (duration_minutes > 0),
  CONSTRAINT positive_price CHECK (base_price >= 0)
);

-- Indexes for flight search performance
CREATE INDEX idx_flights_route ON flights(route_code);
CREATE INDEX idx_flights_origin_destination ON flights(origin, destination);
CREATE INDEX idx_flights_departure_date ON flights(DATE(departure_time));
CREATE INDEX idx_flights_departure_time ON flights(departure_time);

-- Seats table
CREATE TABLE seats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flight_id UUID NOT NULL REFERENCES flights(id) ON DELETE CASCADE,
  seat_number VARCHAR(10) NOT NULL,
  cabin_class VARCHAR(20) NOT NULL CHECK (cabin_class IN ('first', 'business', 'economy')),
  is_occupied BOOLEAN DEFAULT FALSE,
  price_multiplier DECIMAL(3, 2) DEFAULT 1.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT unique_seat_per_flight UNIQUE(flight_id, seat_number),
  CONSTRAINT positive_multiplier CHECK (price_multiplier >= 0)
);

CREATE INDEX idx_seats_flight_id ON seats(flight_id);
CREATE INDEX idx_seats_cabin_class ON seats(cabin_class);
CREATE INDEX idx_seats_occupied ON seats(is_occupied);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pnr VARCHAR(6) UNIQUE NOT NULL,
  flight_id UUID NOT NULL REFERENCES flights(id),
  seat_id UUID NOT NULL REFERENCES seats(id),
  user_id UUID NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'rescheduled')),
  total_price DECIMAL(10, 2) NOT NULL,
  booked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT positive_total_price CHECK (total_price >= 0)
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_pnr ON bookings(pnr);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Passengers table
CREATE TABLE passengers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  passport_number VARCHAR(50),
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_passengers_booking_id ON passengers(booking_id);

-- Reschedules table (audit trail for rescheduling)
CREATE TABLE reschedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  old_flight_id UUID NOT NULL REFERENCES flights(id),
  old_seat_id UUID NOT NULL REFERENCES seats(id),
  new_flight_id UUID NOT NULL REFERENCES flights(id),
  new_seat_id UUID NOT NULL REFERENCES seats(id),
  fee_difference DECIMAL(10, 2) NOT NULL,
  rescheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  rescheduled_by UUID NOT NULL
);

CREATE INDEX idx_reschedules_booking_id ON reschedules(booking_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_flights_updated_at BEFORE UPDATE ON flights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seats_updated_at BEFORE UPDATE ON seats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_passengers_updated_at BEFORE UPDATE ON passengers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
