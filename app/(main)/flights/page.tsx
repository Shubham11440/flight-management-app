import { searchFlights } from '@/lib/queries/flights';
import { useFlightStore } from '@/store/useFlightStore';
import FlightList from '@/components/flights/FlightList';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function FlightsPage() {
  const searchQuery = useFlightStore.getState().searchQuery;
  
  const flights = await searchFlights(searchQuery || {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Flights</h1>
          {searchQuery && (
            <p className="text-gray-600">
              {searchQuery.origin && `From ${searchQuery.origin}`}
              {searchQuery.origin && searchQuery.destination && ' to '}
              {searchQuery.destination && searchQuery.destination}
              {searchQuery.departure_date && ` on ${new Date(searchQuery.departure_date).toLocaleDateString()}`}
              {searchQuery.passengers && ` · ${searchQuery.passengers} passenger${searchQuery.passengers > 1 ? 's' : ''}`}
            </p>
          )}
        </div>

        <FlightList flights={flights} />
      </div>
    </div>
  );
}
