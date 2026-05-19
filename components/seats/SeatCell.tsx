'use client';

import { Check, X, DollarSign } from 'lucide-react';
import type { Seat } from '@/types';

interface SeatCellProps {
  seat: Seat;
  isSelected: boolean;
  isOccupied: boolean;
  onSelect: (seat: Seat) => void;
  basePrice: number;
  selectedCabinClass: 'first' | 'business' | 'economy';
}

export default function SeatCell({
  seat,
  isSelected,
  isOccupied,
  onSelect,
  basePrice,
  selectedCabinClass,
}: SeatCellProps) {
  const seatPrice = basePrice * seat.price_multiplier;
  const extraFee = seatPrice - basePrice;

  const getSeatColor = () => {
    if (isOccupied) return 'bg-gray-300 cursor-not-allowed';
    if (isSelected) return 'bg-blue-500 text-white hover:bg-blue-600';
    
    switch (seat.cabin_class) {
      case 'first':
        return 'bg-purple-100 hover:bg-purple-200 border-purple-300';
      case 'business':
        return 'bg-blue-100 hover:bg-blue-200 border-blue-300';
      case 'economy':
        return 'bg-green-100 hover:bg-green-200 border-green-300';
      default:
        return 'bg-gray-100 hover:bg-gray-200 border-gray-300';
    }
  };

  return (
    <button
      onClick={() => !isOccupied && onSelect(seat)}
      disabled={isOccupied}
      className={`
        relative w-10 h-10 rounded-lg border-2 flex items-center justify-center
        transition-all duration-200 text-sm font-medium
        ${getSeatColor()}
      `}
      title={
        isOccupied
          ? `Seat ${seat.seat_number} is occupied`
          : isSelected
          ? `Seat ${seat.seat_number} selected`
          : `${seat.cabin_class} class - $${seatPrice.toFixed(2)}${extraFee > 0 ? ` (+$${extraFee.toFixed(2)})` : ''}`
      }
    >
      {isOccupied ? (
        <X className="w-4 h-4 text-gray-500" />
      ) : isSelected ? (
        <Check className="w-4 h-4" />
      ) : (
        seat.seat_number
      )}
    </button>
  );
}
