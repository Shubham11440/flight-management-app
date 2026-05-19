-- Trigger function to prevent cancellation within 2 hours of departure
CREATE OR REPLACE FUNCTION prevent_cancellation_within_2_hours()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_departure_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get departure time for the flight
  SELECT departure_time INTO v_departure_time
  FROM flights
  WHERE id = (SELECT flight_id FROM bookings WHERE id = NEW.id);
  
  -- Check if departure is within 2 hours
  IF v_departure_time - NOW() < INTERVAL '2 hours' THEN
    RAISE EXCEPTION 'Cannot cancel booking within 2 hours of departure';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to enforce cancellation window on bookings table
CREATE TRIGGER enforce_cancellation_window
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  WHEN (OLD.status = 'confirmed' AND NEW.status = 'cancelled')
  EXECUTE FUNCTION prevent_cancellation_within_2_hours();
