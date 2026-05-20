-- Add UPDATE policies for bookings and seats tables
-- These are needed because RPC functions use SECURITY DEFINER to bypass RLS,
-- but direct table access still needs proper policies

CREATE POLICY "bookings_update_own"
ON bookings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "seats_update_via_booking"
ON seats
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM bookings
    WHERE bookings.seat_id = seats.id
      AND bookings.user_id = auth.uid()
  )
);
