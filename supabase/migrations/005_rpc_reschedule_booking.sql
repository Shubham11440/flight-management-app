-- RPC function to reschedule a booking atomically
CREATE OR REPLACE FUNCTION reschedule_booking(
  p_booking_id UUID,
  p_user_id UUID,
  p_new_flight_id UUID,
  p_new_seat_id UUID,
  p_rescheduled_by UUID
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_old_flight_id UUID;
  v_old_seat_id UUID;
  v_old_price DECIMAL(10, 2);
  v_new_price DECIMAL(10, 2);
  v_fee_difference DECIMAL(10, 2);
  v_reschedule_id UUID;
  v_seat_status BOOLEAN;
BEGIN
  -- Get current booking info and lock rows
  SELECT flight_id, seat_id, total_price INTO v_old_flight_id, v_old_seat_id, v_old_price
  FROM bookings
  WHERE id = p_booking_id AND user_id = p_user_id AND status = 'confirmed'
  FOR UPDATE;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found or cannot be rescheduled';
  END IF;
  
  -- Lock the new seat to prevent double booking
  SELECT is_occupied INTO v_seat_status
  FROM seats
  WHERE id = p_new_seat_id AND flight_id = p_new_flight_id
  FOR UPDATE;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'New seat not found for the new flight';
  END IF;
  
  IF v_seat_status = true THEN
    RAISE EXCEPTION 'New seat is already occupied';
  END IF;
  
  -- Calculate new price
  SELECT f.base_price * s.price_multiplier INTO v_new_price
  FROM flights f
  JOIN seats s ON s.flight_id = f.id
  WHERE f.id = p_new_flight_id AND s.id = p_new_seat_id;
  
  v_fee_difference := v_new_price - v_old_price;
  
  -- Release old seat
  UPDATE seats
  SET is_occupied = false
  WHERE id = v_old_seat_id;
  
  -- Occupy new seat
  UPDATE seats
  SET is_occupied = true
  WHERE id = p_new_seat_id;
  
  -- Update booking with new flight and seat
  UPDATE bookings
  SET 
    flight_id = p_new_flight_id,
    seat_id = p_new_seat_id,
    total_price = v_new_price,
    status = 'rescheduled'
  WHERE id = p_booking_id;
  
  -- Create reschedule audit record
  INSERT INTO reschedules (
    booking_id,
    old_flight_id,
    old_seat_id,
    new_flight_id,
    new_seat_id,
    fee_difference,
    rescheduled_by
  ) VALUES (
    p_booking_id,
    v_old_flight_id,
    v_old_seat_id,
    p_new_flight_id,
    p_new_seat_id,
    v_fee_difference,
    p_rescheduled_by
  )
  RETURNING id INTO v_reschedule_id;
  
  RETURN v_reschedule_id;
END;
$$;
