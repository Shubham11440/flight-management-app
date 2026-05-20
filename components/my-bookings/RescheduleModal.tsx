'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { RefreshCw, X, DollarSign, Clock } from 'lucide-react';
import type { Flight, Seat } from '@/types';
import { formatPrice } from '@/lib/utils/price';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  currentFlightId: string;
  currentSeatId: string;
  currentPrice: number;
  onConfirm: (formData: FormData) => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  bookingId,
  currentFlightId,
  currentSeatId,
  currentPrice,
  onConfirm,
}: RescheduleModalProps) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAlternativeFlights();
    }
  }, [isOpen]);

  const fetchAlternativeFlights = async () => {
    const supabase = createClient();
    
    const { data } = await supabase
      .from('flights')
      .select('*')
      .neq('id', currentFlightId)
      .gte('departs_at', new Date().toISOString())
      .order('departs_at', { ascending: true })
      .limit(10);

    if (data) {
      setFlights(data);
    }
  };

  const fetchSeats = async (flightId: string) => {
    setIsLoading(true);
    const supabase = createClient();
    
    const { data } = await supabase
      .from('seats')
      .select('*')
      .eq('flight_id', flightId)
      .eq('is_available', true)
      .order('seat_number');

    if (data) {
      setSeats(data);
    }
    setIsLoading(false);
  };

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setSelectedSeat(null);
    fetchSeats(flight.id);
  };

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeat(seat);
  };

  const handleConfirm = () => {
    if (!selectedFlight || !selectedSeat) return;

    const formData = new FormData();
    formData.append('bookingId', bookingId);
    formData.append('newFlightId', selectedFlight.id);
    formData.append('newSeatId', selectedSeat.id);
    
    onConfirm(formData);
  };

  const newPrice = selectedFlight && selectedSeat
    ? selectedFlight.base_price + selectedSeat.extra_fee
    : 0;
  const priceDifference = newPrice - currentPrice;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Reschedule Booking</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Select Alternative Flight</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {flights.map((flight) => (
                  <button
                    key={flight.id}
                    onClick={() => handleFlightSelect(flight)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition ${
                      selectedFlight?.id === flight.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{flight.flight_no}</p>
                        <p className="text-sm text-gray-600">
                          {flight.origin} → {flight.destination}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatPrice(flight.base_price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Select Seat</h4>
              {selectedFlight ? (
                isLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading seats...</div>
                ) : seats.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No available seats</div>
                ) : (
                  <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                    {seats.map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatSelect(seat)}
                        className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition ${
                          selectedSeat?.id === seat.id
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {seat.seat_number}
                      </button>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Select a flight first
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedFlight && selectedSeat && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Price Difference</p>
                <div className={`flex items-center gap-2 text-lg font-bold ${priceDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {priceDifference > 0 ? '+' : ''}{formatPrice(priceDifference)}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">New Total</p>
                <p className="text-lg font-bold text-gray-900">{formatPrice(newPrice)}</p>
              </div>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Confirm Reschedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
