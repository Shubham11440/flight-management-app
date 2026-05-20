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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-green-100 rounded-full p-4 ring-8 ring-green-50">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Booking Confirmed!
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Your booking has been successfully processed
      </p>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-purple-100">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">PNR (Booking Reference)</p>
          <p className="text-3xl font-bold text-purple-600 tracking-wide">{booking.pnr_code}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <Plane className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Flight</p>
            <p className="font-medium text-gray-900">{flight.flight_no}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <MapPin className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="font-medium text-gray-900">
              {flight.origin} → {flight.destination}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium text-gray-900">
              {format(new Date(flight.departs_at), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <Clock className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium text-gray-900">
              {format(new Date(flight.departs_at), 'HH:mm')} - {format(new Date(flight.arrives_at), 'HH:mm')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center text-xs font-bold text-purple-700">
            {seat.seat_number[0]}
          </div>
          <div>
            <p className="text-sm text-gray-500">Seat</p>
            <p className="font-medium text-gray-900">
              {seat.seat_number} ({seat.class} Class)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="font-bold text-xl text-green-600">${booking.total_price.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-600 border border-gray-100">
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
