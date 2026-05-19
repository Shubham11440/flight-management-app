CREATE OR REPLACE FUNCTION reserve_seat(
  p_flight_id UUID,
  p_seat_id UUID,
  p_user_id UUID,
  p_total_price DECIMAL(10, 2),
  p_pnr_code VARCHAR(6)
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_booking_id UUID;
BEGIN
  PERFORM 1
  FROM seats
  WHERE id = p_seat_id
    AND flight_id = p_flight_id
    AND is_available = TRUE
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Seat not available';
  END IF;

  UPDATE seats
  SET is_available = FALSE
  WHERE id = p_seat_id;

  INSERT INTO bookings (
    user_id,
    flight_id,
    seat_id,
    status,
    booked_at,
    total_price,
    pnr_code
  )
  VALUES (
    p_user_id,
    p_flight_id,
    p_seat_id,
    'confirmed',
    NOW(),
    p_total_price,
    p_pnr_code
  )
  RETURNING id INTO v_booking_id;

  RETURN v_booking_id;
END;
$$;