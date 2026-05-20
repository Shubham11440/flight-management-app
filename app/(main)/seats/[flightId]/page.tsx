import { getFlightById } from '@/lib/queries/flights';
import { getSeatsByFlightId } from '@/lib/queries/seats';
import SeatSelectionClient from './SeatSelectionClient';
import { ArrowLeft, Plane } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SeatSelectionPage({
  params,
}: {
  params: { flightId: string };
}) {
  const flight = await getFlightById(params.flightId);

  if (!flight) {
    redirect('/search');
  }

  const seats = await getSeatsByFlightId(params.flightId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/flights"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Flights
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Select Your Seat</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Plane className="w-5 h-5 text-purple-600" />
            <span>
              {flight.origin} → {flight.destination}
            </span>
          </div>
        </div>

        <SeatSelectionClient flight={flight} seats={seats} />
      </div>
    </div>
  );
}
