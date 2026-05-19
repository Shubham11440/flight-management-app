-- Enable Row Level Security
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reschedules ENABLE ROW LEVEL SECURITY;

-- Flights policies: public read access
CREATE POLICY "Flights are viewable by everyone"
  ON flights FOR SELECT
  USING (true);

-- Seats policies: public read access
CREATE POLICY "Seats are viewable by everyone"
  ON seats FOR SELECT
  USING (true);

-- Bookings policies: users can only see their own bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Passengers policies: users can only see passengers for their own bookings
CREATE POLICY "Users can view passengers for their bookings"
  ON passengers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = passengers.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert passengers for their bookings"
  ON passengers FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = passengers.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update passengers for their bookings"
  ON passengers FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = passengers.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

-- Reschedules policies: users can only see reschedules for their own bookings
CREATE POLICY "Users can view reschedules for their bookings"
  ON reschedules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = reschedules.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert reschedules for their bookings"
  ON reschedules FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE bookings.id = reschedules.booking_id 
      AND bookings.user_id = auth.uid()
    )
  );
