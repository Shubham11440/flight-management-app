-- RPC function to reserve a seat atomically with SELECT FOR UPDATE
CREATE OR REPLACE FUNCTION reserve_seat(
  p_flight_id UUID,
  p_seat_id UUID,
  p_user_id UUID,
  p_pnr VARCHAR(6)
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_booking_id UUID;
  v_seat_status BOOLEAN;
BEGIN
  -- Lock the seat row to prevent double booking
  SELECT is_occupied INTO v_seat_status
  FROM seats
  WHERE id = p_seat_id AND flight_id = p_flight_id
  FOR UPDATE;
  
  -- Check if seat exists and is not occupied
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Seat not found for this flight';
  END IF;
  
  IF v_seat_status = true THEN
    RAISE EXCEPTION 'Seat is already occupied';
  END IF;
  
  -- Mark seat as occupied
  UPDATE seats
  SET is_occupied = true
  WHERE id = p_seat_id;
  
  -- Create booking
  INSERT INTO bookings (pnr, flight_id, seat_id, user_id, total_price)
  SELECT 
    p_pnr,
    p_flight_id,
    p_seat_id,
    p_user_id,
    f.base_price * s.price_multiplier
  FROM flights f
  JOIN seats s ON s.flight_id = f.id
  WHERE f.id = p_flight_id AND s.id = p_seat_id
  RETURNING id INTO v_booking_id;
  
  RETURN v_booking_id;
END;
$$;
