'use client';

import SeatCell from './SeatCell';
import type { Seat } from '@/types';

interface CabinZoneProps {
  title: string;
  seats: Seat[];
  selectedSeat: Seat | null;
  onSelect: (seat: Seat) => void;
  basePrice: number;
  selectedCabinClass: 'first' | 'business' | 'economy';
  color: string;
}

export default function CabinZone({
  title,
  seats,
  selectedSeat,
  onSelect,
  basePrice,
  selectedCabinClass,
  color,
}: CabinZoneProps) {
  if (seats.length === 0) return null;

  // Group seats by row number
  const seatsByRow = seats.reduce((acc, seat) => {
    const row = seat.seat_number[0];
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-4 h-4 rounded ${color}`} />
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">
          ({seats.length} seats · ${basePrice.toFixed(2)})
        </span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-x-auto">
        <div className="min-w-max">
          {sortedRows.map((row) => (
            <div key={row} className="flex items-center gap-2 mb-2 last:mb-0">
              <span className="w-6 text-sm font-medium text-gray-600">{row}</span>
              <div className="flex gap-2">
                {seatsByRow[row]
                  .sort((a, b) => a.seat_number.localeCompare(b.seat_number))
                  .map((seat) => (
                    <SeatCell
                      key={seat.id}
                      seat={seat}
                      isSelected={selectedSeat?.id === seat.id}
                      isOccupied={seat.is_occupied}
                      onSelect={onSelect}
                      basePrice={basePrice}
                      selectedCabinClass={selectedCabinClass}
                    />
                  ))}
              </div>
              <span className="w-6 text-sm font-medium text-gray-600">{row}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
