'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Plane, Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, ChevronRight, User } from 'lucide-react';
import type { Booking } from '@/types';
import { formatPrice } from '@/lib/utils/price';
import BookingPreviewDialog from './BookingPreviewDialog';

interface BookingRowProps {
  booking: Booking;
  bookingId: string;
}

export default function BookingRow({ booking, bookingId }: BookingRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (booking.status) {
      case 'confirmed':
        return <CheckCircle className="w-3.5 h-3.5" />;
      case 'cancelled':
        return <XCircle className="w-3.5 h-3.5" />;
      case 'rescheduled':
        return <AlertCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:border-purple-200 transition-all duration-300 cursor-pointer group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            {/* Header Row: Status + PNR */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${getStatusColor()}`}>
                {getStatusIcon()}
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                {booking.pnr_code}
              </span>
            </div>

            {/* Flight Route */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900 text-lg">{booking.flight?.origin}</span>
                <Plane className="w-4 h-4 text-purple-400 rotate-90" />
                <span className="font-bold text-gray-900 text-lg">{booking.flight?.destination}</span>
              </div>
            </div>

            {/* Flight No + Date/Time */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Plane className="w-3.5 h-3.5 text-gray-400" />
                {booking.flight?.flight_no}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {format(new Date(booking.flight?.departs_at || ''), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {format(new Date(booking.flight?.departs_at || ''), 'HH:mm')}
              </span>
              {booking.passengers?.[0]?.full_name && (
                <span className="flex items-center gap-1 text-gray-400">
                  <User className="w-3.5 h-3.5" />
                  {booking.passengers[0].full_name}
                </span>
              )}
            </div>
          </div>

          {/* Right: Seat + Price + Arrow */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-center bg-gray-50 rounded-xl px-4 py-2 min-w-[72px]">
              <p className="text-xs text-gray-400 mb-0.5">Seat</p>
              <p className="font-bold text-gray-900">{booking.seat?.seat_number}</p>
              <p className="text-[10px] text-gray-400 capitalize">{booking.seat?.class}</p>
            </div>

            <div className="text-center bg-green-50 rounded-xl px-4 py-2 min-w-[80px]">
              <p className="text-xs text-gray-400 mb-0.5">Total</p>
              <p className="font-bold text-green-600">{formatPrice(booking.total_price)}</p>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors hidden sm:block" />
          </div>
        </div>
      </div>

      <BookingPreviewDialog
        booking={booking}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
