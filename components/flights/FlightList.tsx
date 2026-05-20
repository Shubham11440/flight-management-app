'use client';

import { useRouter } from 'next/navigation';
import { useFlightStore } from '@/store/useFlightStore';
import FlightCard from './FlightCard';
import { Plane } from 'lucide-react';

export default function FlightList({ flights }: { flights: any[] }) {
  const router = useRouter();
  const { setSelectedFlight, resetSelection } = useFlightStore();

  const handleSelectFlight = (flight: any, cabinClass: 'first' | 'business' | 'economy') => {
    if (!flight?.id) {
      console.error('Flight ID is missing:', flight);
      return;
    }
    setSelectedFlight({ flight, cabinClass });
    router.push(`/seats/${flight.id}?cabin=${cabinClass}`);
  };

  if (flights.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <Plane className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Flights Found</h3>
        <p className="text-gray-600 mb-6">We couldn&apos;t find any flights matching your criteria.</p>
        <button
          onClick={() => router.push('/search')}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
        >
          Modify Search
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          onSelect={handleSelectFlight}
        />
      ))}
    </div>
  );
}
