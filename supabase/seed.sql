INSERT INTO flights (flight_no, origin, destination, departs_at, arrives_at, aircraft_type, status, base_price) VALUES
('AI201', 'Delhi (DEL)', 'Pune (PNQ)', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 2 hours 15 minutes', 'Airbus A320', 'scheduled', 5200.00),
('AI202', 'Delhi (DEL)', 'Pune (PNQ)', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days 2 hours 15 minutes', 'Airbus A320', 'scheduled', 5200.00),

('AI301', 'Delhi (DEL)', 'Mumbai (BOM)', NOW() + INTERVAL '1 day 3 hours', NOW() + INTERVAL '1 day 5 hours 10 minutes', 'Airbus A320', 'scheduled', 4800.00),
('AI302', 'Delhi (DEL)', 'Mumbai (BOM)', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 2 hours 10 minutes', 'Airbus A320', 'scheduled', 4800.00),

('AI401', 'Mumbai (BOM)', 'Bengaluru (BLR)', NOW() + INTERVAL '1 day 5 hours', NOW() + INTERVAL '1 day 6 hours 50 minutes', 'Airbus A320', 'scheduled', 4300.00),
('AI402', 'Mumbai (BOM)', 'Bengaluru (BLR)', NOW() + INTERVAL '4 days', NOW() + INTERVAL '4 days 1 hour 50 minutes', 'Airbus A320', 'scheduled', 4300.00),

('AI501', 'Bengaluru (BLR)', 'Pune (PNQ)', NOW() + INTERVAL '1 day 7 hours', NOW() + INTERVAL '1 day 8 hours 40 minutes', 'Airbus A320', 'scheduled', 3900.00),
('AI502', 'Bengaluru (BLR)', 'Pune (PNQ)', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days 1 hour 40 minutes', 'Airbus A320', 'scheduled', 3900.00);

DROP FUNCTION IF EXISTS generate_seats_for_flight(UUID);

CREATE OR REPLACE FUNCTION generate_seats_for_flight(p_flight_id UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_row INTEGER;
  v_col INTEGER;
  v_seat_number VARCHAR(10);
  v_class VARCHAR(20);
  v_extra_fee DECIMAL(10, 2);
BEGIN
  FOR v_row IN 1..2 LOOP
    FOR v_col IN 1..3 LOOP
      v_seat_number := v_row::text || CHR(64 + v_col);
      v_class := 'first';
      v_extra_fee := 2500.00;

      INSERT INTO seats (flight_id, seat_number, class, is_available, extra_fee)
      VALUES (p_flight_id, v_seat_number, v_class, TRUE, v_extra_fee);
    END LOOP;
  END LOOP;

  FOR v_row IN 3..6 LOOP
    FOR v_col IN 1..3 LOOP
      v_seat_number := v_row::text || CHR(64 + v_col);
      v_class := 'business';
      v_extra_fee := 1200.00;

      INSERT INTO seats (flight_id, seat_number, class, is_available, extra_fee)
      VALUES (p_flight_id, v_seat_number, v_class, TRUE, v_extra_fee);
    END LOOP;
  END LOOP;

  FOR v_row IN 7..16 LOOP
    FOR v_col IN 1..6 LOOP
      v_seat_number := v_row::text || CHR(64 + v_col);
      v_class := 'economy';
      v_extra_fee := 0.00;

      INSERT INTO seats (flight_id, seat_number, class, is_available, extra_fee)
      VALUES (p_flight_id, v_seat_number, v_class, TRUE, v_extra_fee);
    END LOOP;
  END LOOP;
END;
$$;

DO $$
DECLARE
  v_flight_id UUID;
BEGIN
  FOR v_flight_id IN SELECT id FROM flights LOOP
    IF NOT EXISTS (
      SELECT 1 FROM seats WHERE flight_id = v_flight_id
    ) THEN
      PERFORM generate_seats_for_flight(v_flight_id);
    END IF;
  END LOOP;
END $$;

