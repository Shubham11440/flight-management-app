import { format } from 'date-fns';
import { Plane, Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Booking } from '@/types';

interface BookingRowProps {
  booking: Booking;
  onViewDetails: (bookingId: string) => void;
}

export default function BookingRow({ booking, onViewDetails }: BookingRowProps) {
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
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'rescheduled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer" onClick={() => onViewDetails(booking.id)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor()}`}>
              {getStatusIcon()}
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
            <span className="text-sm font-medium text-blue-600">{booking.pnr}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-900">{booking.flight?.route_code}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {booking.flight?.origin} → {booking.flight?.destination}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(booking.flight?.departure_time || ''), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {format(new Date(booking.flight?.departure_time || ''), 'HH:mm')}
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Seat</p>
          <p className="font-medium text-gray-900">{booking.seat?.seat_number}</p>
          <p className="text-xs text-gray-500 capitalize">{booking.seat?.cabin_class}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-bold text-lg text-green-600">${booking.total_price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
