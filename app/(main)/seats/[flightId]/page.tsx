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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/flights"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Flights
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Seat</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Plane className="w-5 h-5" />
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
