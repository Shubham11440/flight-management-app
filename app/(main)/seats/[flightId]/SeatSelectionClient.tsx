'use client';

import { useState, useEffect } from 'react';
import { useFlightStore } from '@/store/useFlightStore';
import { useSearchParams } from 'next/navigation';
import SeatMap from '@/components/seats/SeatMap';
import Link from 'next/link';
import type { Flight, Seat } from '@/types';
import { formatPrice } from '@/lib/utils/price';

interface SeatSelectionClientProps {
  flight: Flight;
  seats: Seat[];
}

export default function SeatSelectionClient({ flight, seats }: SeatSelectionClientProps) {
  const searchParams = useSearchParams();
  const { setSelectedFlight, setSelectedSeat } = useFlightStore();
  const [selectedSeat, setSelectedSeatState] = useState<Seat | null>(null);
  
  const cabinParam = searchParams.get('cabin') as 'first' | 'business' | 'economy' | null;
  const selectedCabinClass = cabinParam || 'economy';

  useEffect(() => {
    if (cabinParam) {
      setSelectedFlight({ flight, cabinClass: cabinParam });
    }
  }, [cabinParam, flight, setSelectedFlight]);

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeatState(seat);
    setSelectedSeat(seat);
  };

  const basePrice = flight.base_price;
  const seatPrice = selectedSeat ? basePrice + selectedSeat.extra_fee : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          <SeatMap
            flightId={flight.id}
            basePrice={basePrice}
            selectedCabinClass={selectedCabinClass}
            onSeatSelect={handleSeatSelect}
          />
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Flight Details</h2>
          
          <div className="space-y-3 mb-6">
            <div>
              <p className="text-sm text-gray-500">Flight</p>
              <p className="font-medium text-gray-900">{flight.flight_no}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Class</p>
              <p className="font-medium text-gray-900 capitalize">
                {selectedCabinClass}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Base Price</p>
              <p className="font-medium text-gray-900">{formatPrice(basePrice)}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Selected Seat</p>
            {selectedSeat ? (
              <div className="text-gray-900 bg-purple-50 rounded-xl p-4 border border-purple-100">
                <p className="font-medium">{selectedSeat.seat_number}</p>
                <p className="text-sm text-gray-600 capitalize">{selectedSeat.class} Class</p>
                <p className="text-2xl font-bold text-purple-600">{formatPrice(seatPrice)}</p>
              </div>
            ) : (
              <p className="text-gray-600">No seat selected</p>
            )}
          </div>

          {selectedSeat ? (
            <Link
              href={`/booking/passengers?flightId=${flight.id}&seatId=${selectedSeat.id}&cabin=${selectedCabinClass}`}
              className="block w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl"
            >
              Continue to Passenger Details
            </Link>
          ) : (
            <button
              disabled
              className="block w-full py-4 px-4 bg-gray-200 text-gray-500 rounded-xl cursor-not-allowed text-center font-semibold"
            >
              Select a seat to continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
