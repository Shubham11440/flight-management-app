-- RPC function to cancel a booking atomically
CREATE OR REPLACE FUNCTION cancel_booking(p_booking_id UUID, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  v_seat_id UUID;
  v_flight_id UUID;
BEGIN
  -- Get seat and flight info for this booking
  SELECT seat_id, flight_id INTO v_seat_id, v_flight_id
  FROM bookings
  WHERE id = p_booking_id AND user_id = p_user_id AND status = 'confirmed'
  FOR UPDATE;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found or already cancelled';
  END IF;
  
  -- Release the seat
  UPDATE seats
  SET is_occupied = false
  WHERE id = v_seat_id;
  
  -- Update booking status
  UPDATE bookings
  SET status = 'cancelled'
  WHERE id = p_booking_id;
  
  RETURN true;
END;
$$;
