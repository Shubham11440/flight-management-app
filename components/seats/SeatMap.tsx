'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import CabinZone from './CabinZone';
import SeatLegend from './SeatLegend';
import type { Seat } from '@/types';

interface SeatMapProps {
  flightId: string;
  basePrice: number;
  selectedCabinClass: 'first' | 'business' | 'economy';
  onSeatSelect: (seat: Seat) => void;
}

export default function SeatMap({
  flightId,
  basePrice,
  selectedCabinClass,
  onSeatSelect,
}: SeatMapProps) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  useEffect(() => {
    const fetchSeats = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('seats')
        .select('*')
        .eq('flight_id', flightId)
        .order('seat_number');

      if (data) {
        setSeats(data);
      }
    };

    fetchSeats();

    // Subscribe to realtime updates
    const supabase = createClient();
    const channel = supabase
      .channel('seats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'seats',
          filter: `flight_id=eq.${flightId}`,
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setSeats((prev) =>
              prev.map((seat) =>
                seat.id === payload.new.id ? { ...seat, ...payload.new } : seat
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [flightId]);

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeat(seat);
    onSeatSelect(seat);
  };

  // Group seats by cabin class
  const firstClassSeats = seats.filter((s) => s.class === 'first');
  const businessSeats = seats.filter((s) => s.class === 'business');
  const economySeats = seats.filter((s) => s.class === 'economy');

  return (
    <div className="space-y-6">
      <SeatLegend />

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 mb-4 border border-purple-100">
        <p className="text-sm text-gray-600 text-center">
          Front of plane
        </p>
      </div>

      <CabinZone
        title="First Class"
        seats={firstClassSeats}
        selectedSeat={selectedSeat}
        onSelect={handleSeatSelect}
        basePrice={basePrice + 900}
        selectedCabinClass={selectedCabinClass}
        color="bg-purple-100"
      />

      <CabinZone
        title="Business Class"
        seats={businessSeats}
        selectedSeat={selectedSeat}
        onSelect={handleSeatSelect}
        basePrice={basePrice + 450}
        selectedCabinClass={selectedCabinClass}
        color="bg-blue-100"
      />

      <CabinZone
        title="Economy Class"
        seats={economySeats}
        selectedSeat={selectedSeat}
        onSelect={handleSeatSelect}
        basePrice={basePrice}
        selectedCabinClass={selectedCabinClass}
        color="bg-green-100"
      />

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
        <p className="text-sm text-gray-600 text-center">
          Back of plane
        </p>
      </div>
    </div>
  );
}
