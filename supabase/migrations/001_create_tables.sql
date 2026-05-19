CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE flights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flight_no VARCHAR(20) NOT NULL,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  departs_at TIMESTAMP WITH TIME ZONE NOT NULL,
  arrives_at TIMESTAMP WITH TIME ZONE NOT NULL,
  aircraft_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'delayed', 'cancelled', 'completed')),
  base_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT departure_before_arrival CHECK (arrives_at > departs_at),
  CONSTRAINT positive_price CHECK (base_price >= 0)
);

CREATE INDEX idx_flights_flight_no ON flights(flight_no);
CREATE INDEX idx_flights_origin_destination ON flights(origin, destination);
CREATE INDEX idx_flights_departs_at ON flights(departs_at);

CREATE TABLE seats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flight_id UUID NOT NULL REFERENCES flights(id) ON DELETE CASCADE,
  seat_number VARCHAR(10) NOT NULL,
  class VARCHAR(20) NOT NULL CHECK (class IN ('first', 'business', 'economy')),
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  extra_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_seat_per_flight UNIQUE (flight_id, seat_number),
  CONSTRAINT positive_extra_fee CHECK (extra_fee >= 0)
);

CREATE INDEX idx_seats_flight_id ON seats(flight_id);
CREATE INDEX idx_seats_class ON seats(class);
CREATE INDEX idx_seats_available ON seats(is_available);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flight_id UUID NOT NULL REFERENCES flights(id),
  seat_id UUID NOT NULL REFERENCES seats(id),
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'rescheduled')),
  booked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  total_price DECIMAL(10, 2) NOT NULL,
  pnr_code VARCHAR(6) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT positive_total_price CHECK (total_price >= 0)
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_pnr_code ON bookings(pnr_code);
CREATE INDEX idx_bookings_status ON bookings(status);

CREATE TABLE passengers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  passport_no VARCHAR(50) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_passengers_booking_id ON passengers(booking_id);

CREATE TABLE reschedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  old_flight_id UUID NOT NULL REFERENCES flights(id),
  new_flight_id UUID NOT NULL REFERENCES flights(id),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  fee_charged DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT positive_fee_charged CHECK (fee_charged >= 0)
);

CREATE INDEX idx_reschedules_booking_id ON reschedules(booking_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_flights_updated_at
BEFORE UPDATE ON flights
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seats_updated_at
BEFORE UPDATE ON seats
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_passengers_updated_at
BEFORE UPDATE ON passengers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();