ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reschedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "flights_public_read"
ON flights
FOR SELECT
USING (true);

CREATE POLICY "seats_public_read"
ON seats
FOR SELECT
USING (true);

CREATE POLICY "bookings_select_own"
ON bookings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "bookings_insert_own"
ON bookings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "passengers_select_own"
ON passengers
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM bookings
    WHERE bookings.id = passengers.booking_id
      AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "passengers_insert_own"
ON passengers
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM bookings
    WHERE bookings.id = passengers.booking_id
      AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "reschedules_select_own"
ON reschedules
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM bookings
    WHERE bookings.id = reschedules.booking_id
      AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "reschedules_insert_own"
ON reschedules
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM bookings
    WHERE bookings.id = reschedules.booking_id
      AND bookings.user_id = auth.uid()
  )
);