import { format } from 'date-fns';
import { CheckCircle, Plane, Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import type { Booking, Flight, Seat } from '@/types';

interface ConfirmationCardProps {
  booking: Booking;
  flight: Flight;
  seat: Seat;
}

export default function ConfirmationCard({ booking, flight, seat }: ConfirmationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-green-100 rounded-full p-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Booking Confirmed!
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Your booking has been successfully processed
      </p>

      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">PNR (Booking Reference)</p>
          <p className="text-3xl font-bold text-blue-600">{booking.pnr}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <Plane className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Flight</p>
            <p className="font-medium text-gray-900">{flight.route_code}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="font-medium text-gray-900">
              {flight.origin} → {flight.destination}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium text-gray-900">
              {format(new Date(flight.departure_time), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium text-gray-900">
              {format(new Date(flight.departure_time), 'HH:mm')} - {format(new Date(flight.arrival_time), 'HH:mm')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-700">
            {seat.seat_number[0]}
          </div>
          <div>
            <p className="text-sm text-gray-500">Seat</p>
            <p className="font-medium text-gray-900">
              {seat.seat_number} ({seat.cabin_class} Class)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="font-bold text-xl text-green-600">${booking.total_price.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Important Notes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Please arrive at the airport at least 2 hours before departure</li>
          <li>Bring a valid ID and your booking reference (PNR)</li>
          <li>Cancellations are not allowed within 2 hours of departure</li>
        </ul>
      </div>
    </div>
  );
}
