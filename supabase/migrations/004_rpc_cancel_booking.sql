CREATE OR REPLACE FUNCTION cancel_booking(
  p_booking_id UUID,
  p_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_seat_id UUID;
BEGIN
  SELECT seat_id
  INTO v_seat_id
  FROM bookings
  WHERE id = p_booking_id
    AND user_id = p_user_id
    AND status IN ('confirmed', 'rescheduled')
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found or cannot be cancelled';
  END IF;

  UPDATE bookings
  SET status = 'cancelled'
  WHERE id = p_booking_id;

  UPDATE seats
  SET is_available = TRUE
  WHERE id = v_seat_id;

  RETURN TRUE;
END;
$$;