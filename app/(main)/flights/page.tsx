import { searchFlights } from '@/lib/queries/flights';
import FlightList from '@/components/flights/FlightList';
import { ArrowLeft, Plane } from 'lucide-react';
import Link from 'next/link';

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: Promise<{ origin?: string; destination?: string; date?: string; passengers?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = {
    origin: params.origin,
    destination: params.destination,
    date: params.date,
    passengers: params.passengers ? parseInt(params.passengers) : 1,
  };
  
  const flights = await searchFlights(searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Available Flights</h1>
                <p className="text-gray-600 mt-1">Choose your preferred cabin and continue to seat selection</p>
              </div>
            </div>
            <div className="inline-flex items-center justify-center rounded-full bg-white border border-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm">
              {flights.length} {flights.length === 1 ? 'flight' : 'flights'} found
            </div>
          </div>
          {searchQuery && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-600">
                {searchQuery.origin && <span className="font-medium">From {searchQuery.origin}</span>}
                {searchQuery.origin && searchQuery.destination && <span className="mx-2">→</span>}
                {searchQuery.destination && <span className="font-medium">{searchQuery.destination}</span>}
                {searchQuery.date && <span className="mx-2">on</span>}
                {searchQuery.date && <span className="font-medium">{new Date(searchQuery.date).toLocaleDateString()}</span>}
                {searchQuery.passengers && <span className="mx-2">·</span>}
                {searchQuery.passengers && <span className="font-medium">{searchQuery.passengers} passenger{searchQuery.passengers > 1 ? 's' : ''}</span>}
              </p>
            </div>
          )}
        </div>

        <FlightList flights={flights} />
      </div>
    </div>
  );
}
