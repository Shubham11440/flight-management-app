'use client';

import { useState, useEffect } from 'react';
import { useFlightStore } from '@/store/useFlightStore';
import SeatMap from '@/components/seats/SeatMap';
import Link from 'next/link';
import type { Flight, Seat } from '@/types';

interface SeatSelectionClientProps {
  flight: Flight;
  seats: Seat[];
}

export default function SeatSelectionClient({ flight, seats }: SeatSelectionClientProps) {
  const { selectedFlight, setSelectedSeat } = useFlightStore();
  const [selectedSeat, setSelectedSeatState] = useState<Seat | null>(null);

  useEffect(() => {
    if (!selectedFlight) {
      window.location.href = '/flights';
    }
  }, [selectedFlight]);

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeatState(seat);
    setSelectedSeat(seat);
  };

  const selectedCabinClass = selectedFlight?.cabinClass || 'economy';
  const basePrice = flight.base_price;
  const seatPrice = selectedSeat ? basePrice * selectedSeat.price_multiplier : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <SeatMap
            flightId={flight.id}
            basePrice={basePrice}
            selectedCabinClass={selectedCabinClass}
            onSeatSelect={handleSeatSelect}
          />
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Flight Details</h2>
          
          <div className="space-y-3 mb-6">
            <div>
              <p className="text-sm text-gray-500">Flight</p>
              <p className="font-medium text-gray-900">{flight.route_code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Class</p>
              <p className="font-medium text-gray-900 capitalize">
                {selectedCabinClass}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Base Price</p>
              <p className="font-medium text-gray-900">${basePrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Selected Seat</p>
            {selectedSeat ? (
              <div className="text-gray-900">
                <p className="font-medium">{selectedSeat.seat_number}</p>
                <p className="text-sm text-gray-600 capitalize">{selectedSeat.cabin_class} Class</p>
                <p className="text-lg font-bold text-green-600">${seatPrice.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-gray-600">No seat selected</p>
            )}
          </div>

          {selectedSeat ? (
            <Link
              href="/booking/passengers"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-medium"
            >
              Continue to Passenger Details
            </Link>
          ) : (
            <button
              disabled
              className="block w-full py-3 px-4 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-center font-medium"
            >
              Select a seat to continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
