-- Seed data for flights, seats, and test user

-- Note: This seed file assumes auth.users already exists with a test user
-- You'll need to create a test user in Supabase Auth first and replace TEST_USER_UUID below

-- Insert test flights (8 flights across 4 routes)
-- Route 1: NYC to London
INSERT INTO flights (route_code, origin, destination, departure_time, arrival_time, duration_minutes, base_price) VALUES
('NYC-LON-001', 'New York (JFK)', 'London (LHR)', 
 NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 7 hours', 420, 450.00),
('NYC-LON-002', 'New York (JFK)', 'London (LHR)', 
 NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days 7 hours', 420, 450.00);

-- Route 2: London to Paris
INSERT INTO flights (route_code, origin, destination, departure_time, arrival_time, duration_minutes, base_price) VALUES
('LON-PAR-001', 'London (LHR)', 'Paris (CDG)', 
 NOW() + INTERVAL '1 day 2 hours', NOW() + INTERVAL '1 day 3 hours 30 minutes', 90, 180.00),
('LON-PAR-002', 'London (LHR)', 'Paris (CDG)', 
 NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 1 hour 30 minutes', 90, 180.00);

-- Route 3: Tokyo to Sydney
INSERT INTO flights (route_code, origin, destination, departure_time, arrival_time, duration_minutes, base_price) VALUES
('TYO-SYD-001', 'Tokyo (NRT)', 'Sydney (SYD)', 
 NOW() + INTERVAL '1 day 4 hours', NOW() + INTERVAL '1 day 14 hours', 600, 850.00),
('TYO-SYD-002', 'Tokyo (NRT)', 'Sydney (SYD)', 
 NOW() + INTERVAL '4 days', NOW() + INTERVAL '4 days 10 hours', 600, 850.00);

-- Route 4: Dubai to Singapore
INSERT INTO flights (route_code, origin, destination, departure_time, arrival_time, duration_minutes, base_price) VALUES
('DXB-SIN-001', 'Dubai (DXB)', 'Singapore (SIN)', 
 NOW() + INTERVAL '1 day 6 hours', NOW() + INTERVAL '1 day 9 hours', 180, 320.00),
('DXB-SIN-002', 'Dubai (DXB)', 'Singapore (SIN)', 
 NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days 3 hours', 180, 320.00);

-- Helper function to generate seats for a flight
CREATE OR REPLACE FUNCTION generate_seats_for_flight(p_flight_id UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_row INTEGER;
  v_col INTEGER;
  v_seat_number VARCHAR(10);
  v_cabin_class VARCHAR(20);
  v_price_multiplier DECIMAL(3, 2);
BEGIN
  -- First class: Rows 1-2, Columns A-C (6 seats)
  FOR v_row IN 1..2 LOOP
    FOR v_col IN 1..3 LOOP
      v_seat_number := v_row || CHR(64 + v_col);
      v_cabin_class := 'first';
      v_price_multiplier := 3.0;
      
      INSERT INTO seats (flight_id, seat_number, cabin_class, price_multiplier)
      VALUES (p_flight_id, v_seat_number, v_cabin_class, v_price_multiplier);
    END LOOP;
  END LOOP;
  
  -- Business class: Rows 3-6, Columns A-D (16 seats)
  FOR v_row IN 3..6 LOOP
    FOR v_col IN 1..4 LOOP
      v_seat_number := v_row || CHR(64 + v_col);
      v_cabin_class := 'business';
      v_price_multiplier := 2.0;
      
      INSERT INTO seats (flight_id, seat_number, cabin_class, price_multiplier)
      VALUES (p_flight_id, v_seat_number, v_cabin_class, v_price_multiplier);
    END LOOP;
  END LOOP;
  
  -- Economy class: Rows 7-20, Columns A-F (84 seats)
  FOR v_row IN 7..20 LOOP
    FOR v_col IN 1..6 LOOP
      v_seat_number := v_row || CHR(64 + v_col);
      v_cabin_class := 'economy';
      v_price_multiplier := 1.0;
      
      INSERT INTO seats (flight_id, seat_number, cabin_class, price_multiplier)
      VALUES (p_flight_id, v_seat_number, v_cabin_class, v_price_multiplier);
    END LOOP;
  END LOOP;
END;
$$;

-- Generate seats for all flights
DO $$
DECLARE
  v_flight_id UUID;
BEGIN
  FOR v_flight_id IN SELECT id FROM flights LOOP
    PERFORM generate_seats_for_flight(v_flight_id);
  END LOOP;
END $$;

-- Note: To create a test user, you'll need to do this in the Supabase dashboard
-- or via the auth API. Replace TEST_USER_UUID below with the actual UUID from auth.users
-- 
-- Example test booking (uncomment after creating test user):
-- INSERT INTO bookings (pnr, flight_id, seat_id, user_id, total_price)
-- SELECT 
--   'ABC123',
--   (SELECT id FROM flights LIMIT 1),
--   (SELECT id FROM seats WHERE flight_id = (SELECT id FROM flights LIMIT 1) LIMIT 1),
--   'TEST_USER_UUID',
--   450.00;
