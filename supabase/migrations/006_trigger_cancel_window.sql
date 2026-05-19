CREATE OR REPLACE FUNCTION prevent_cancellation_within_2_hours()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_departs_at TIMESTAMP WITH TIME ZONE;
BEGIN
  IF NEW.status = 'cancelled' AND OLD.status <> 'cancelled' THEN
    SELECT departs_at
    INTO v_departs_at
    FROM flights
    WHERE id = OLD.flight_id;

    IF v_departs_at - NOW() < INTERVAL '2 hours' THEN
      RAISE EXCEPTION 'Cannot cancel booking within 2 hours of departure';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_cancellation_window
BEFORE UPDATE OF status ON bookings
FOR EACH ROW
EXECUTE FUNCTION prevent_cancellation_within_2_hours();