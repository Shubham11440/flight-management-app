'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import type { Booking } from '@/types';
import RescheduleModal from '@/components/my-bookings/RescheduleModal';
import { formatPrice } from '@/lib/utils/price';
import { RefreshCw, Plane, MapPin, Calendar, Clock, User } from 'lucide-react';

interface RescheduleClientProps {
  booking: Booking;
  onReschedule: (formData: FormData) => Promise<{ error?: string }>;
}

export default function RescheduleClient({ booking, onReschedule }: RescheduleClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rescheduleResult, setRescheduleResult] = useState<{ error?: string } | null>(null);

  const handleReschedule = async (formData: FormData) => {
    const result = await onReschedule(formData);
    setRescheduleResult(result);
    
    if (!result.error) {
      setIsModalOpen(false);
      window.location.href = `/my-bookings/${booking.id}`;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reschedule Flight</h1>
        <p className="text-gray-600">Choose a new flight for your booking</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Booking</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Plane className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Flight</p>
              <p className="font-medium text-gray-900">{booking.flight?.flight_no}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Route</p>
              <p className="font-medium text-gray-900">
                {booking.flight?.origin} → {booking.flight?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium text-gray-900">
                {format(new Date(booking.flight?.departs_at || ''), 'EEEE, MMMM d, yyyy HH:mm')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Seat</p>
              <p className="font-medium text-gray-900">
                {booking.seat?.seat_number} ({booking.seat?.class} Class)
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-2xl font-bold text-green-600">{formatPrice(booking.total_price)}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Reschedule Policy</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• You can reschedule to any flight on the same route</li>
          <li>• Price difference will be calculated based on new flight and seat</li>
          <li>• Your current seat will be released when you confirm the reschedule</li>
          <li>• A reschedule record will be created for audit purposes</li>
        </ul>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-5 h-5" />
        Select New Flight
      </button>

      {rescheduleResult?.error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{rescheduleResult.error}</p>
        </div>
      )}

      <RescheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingId={booking.id}
        currentFlightId={booking.flight_id}
        currentSeatId={booking.seat_id}
        currentPrice={booking.total_price}
        onConfirm={handleReschedule}
      />
    </div>
  );
}
