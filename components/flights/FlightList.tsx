'use client';

import { useRouter } from 'next/navigation';
import { useFlightStore } from '@/store/useFlightStore';
import FlightCard from './FlightCard';

export default function FlightList({ flights }: { flights: any[] }) {
  const router = useRouter();
  const { setSelectedFlight, resetSelection } = useFlightStore();

  const handleSelectFlight = (flight: any, cabinClass: 'first' | 'business' | 'economy') => {
    setSelectedFlight({ flight, cabinClass });
    router.push(`/seats/${flight.id}`);
  };

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No flights found matching your criteria.</p>
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
