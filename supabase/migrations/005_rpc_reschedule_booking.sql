CREATE OR REPLACE FUNCTION reschedule_booking(
  p_booking_id UUID,
  p_user_id UUID,
  p_new_flight_id UUID,
  p_new_seat_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old_flight_id UUID;
  v_old_seat_id UUID;
  v_old_total_price DECIMAL(10, 2);
  v_old_origin VARCHAR(100);
  v_old_destination VARCHAR(100);
  v_new_origin VARCHAR(100);
  v_new_destination VARCHAR(100);
  v_new_base_price DECIMAL(10, 2);
  v_new_extra_fee DECIMAL(10, 2);
  v_new_total_price DECIMAL(10, 2);
  v_fee_charged DECIMAL(10, 2);
BEGIN
  SELECT
    b.flight_id,
    b.seat_id,
    b.total_price,
    f.origin,
    f.destination
  INTO
    v_old_flight_id,
    v_old_seat_id,
    v_old_total_price,
    v_old_origin,
    v_old_destination
  FROM bookings b
  JOIN flights f ON f.id = b.flight_id
  WHERE b.id = p_booking_id
    AND b.user_id = p_user_id
    AND b.status IN ('confirmed', 'rescheduled')
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found or not eligible for reschedule';
  END IF;

  SELECT
    origin,
    destination
  INTO
    v_new_origin,
    v_new_destination
  FROM flights
  WHERE id = p_new_flight_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'New flight not found';
  END IF;

  IF v_old_origin <> v_new_origin OR v_old_destination <> v_new_destination THEN
    RAISE EXCEPTION 'New flight must be on the same route';
  END IF;

  SELECT
    f.base_price,
    s.extra_fee
  INTO
    v_new_base_price,
    v_new_extra_fee
  FROM seats s
  JOIN flights f ON f.id = s.flight_id
  WHERE s.id = p_new_seat_id
    AND s.flight_id = p_new_flight_id
    AND s.is_available = TRUE
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'New seat not available';
  END IF;

  v_new_total_price := v_new_base_price + v_new_extra_fee;
  v_fee_charged := GREATEST(v_new_total_price - v_old_total_price, 0);

  UPDATE seats
  SET is_available = TRUE
  WHERE id = v_old_seat_id;

  UPDATE seats
  SET is_available = FALSE
  WHERE id = p_new_seat_id;

  UPDATE bookings
  SET
    flight_id = p_new_flight_id,
    seat_id = p_new_seat_id,
    status = 'rescheduled',
    total_price = v_new_total_price
  WHERE id = p_booking_id;

  INSERT INTO reschedules (
    booking_id,
    old_flight_id,
    new_flight_id,
    requested_at,
    fee_charged
  )
  VALUES (
    p_booking_id,
    v_old_flight_id,
    p_new_flight_id,
    NOW(),
    v_fee_charged
  );

  RETURN json_build_object(
    'success', true,
    'fee_charged', v_fee_charged
  );
END;
$$;