'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Plane, MapPin, Calendar, Clock, User, DollarSign, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import CancelDialog from '@/components/my-bookings/CancelDialog';
import type { Booking } from '@/types';

interface BookingDetailsClientProps {
  booking: Booking;
  onCancel: (bookingId: string) => Promise<{ success?: boolean; error?: string }>;
}

export default function BookingDetailsClient({ booking, onCancel }: BookingDetailsClientProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelResult, setCancelResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleCancel = async () => {
    const result = await onCancel(booking.id);
    setCancelResult(result);
    setIsCancelDialogOpen(false);
    
    if (result.success) {
      window.location.reload();
    }
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = () => {
    switch (booking.status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      case 'rescheduled':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Flight Information</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor()}`}>
              {getStatusIcon()}
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Plane className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Flight</p>
                <p className="font-medium text-gray-900">{booking.flight?.route_code}</p>
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
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(booking.flight?.departure_time || ''), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(booking.flight?.departure_time || ''), 'HH:mm')} - {' '}
                  {format(new Date(booking.flight?.arrival_time || ''), 'HH:mm')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-700">
                {booking.seat?.seat_number[0]}
              </div>
              <div>
                <p className="text-sm text-gray-500">Seat</p>
                <p className="font-medium text-gray-900">
                  {booking.seat?.seat_number} ({booking.seat?.cabin_class} Class)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Passenger Information</h2>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-900">
                {booking.passenger?.first_name} {booking.passenger?.last_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{booking.passenger?.email}</p>
            </div>
            {booking.passenger?.phone && (
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{booking.passenger.phone}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price</span>
              <span className="font-medium">${booking.flight?.base_price.toFixed(2)}</span>
            </div>
            {booking.seat?.price_multiplier && booking.seat.price_multiplier > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Seat Premium (x{booking.seat.price_multiplier})</span>
                <span className="text-gray-700">
                  +${((booking.flight!.base_price * booking.seat.price_multiplier) - booking.flight!.base_price).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="font-bold text-gray-900">Total Paid</span>
              <span className="font-bold text-xl text-green-600">${booking.total_price.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            {booking.status === 'confirmed' && (
              <button
                onClick={() => setIsCancelDialogOpen(true)}
                className="w-full py-3 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
              >
                Cancel Booking
              </button>
            )}
            
            {booking.status === 'confirmed' && (
              <button
                className="w-full py-3 px-4 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reschedule Flight
              </button>
            )}
          </div>

          {cancelResult?.error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{cancelResult.error}</p>
            </div>
          )}
        </div>
      </div>

      <CancelDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={handleCancel}
        departureTime={booking.flight?.departure_time || ''}
      />
    </div>
  );
}
