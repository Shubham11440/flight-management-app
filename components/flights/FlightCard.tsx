import { format } from 'date-fns';
import { Clock, MapPin, DollarSign } from 'lucide-react';
import type { Flight } from '@/types';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight, cabinClass: 'first' | 'business' | 'economy') => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const cabinOptions = [
    { class: 'first' as const, label: 'First Class', multiplier: 3 },
    { class: 'business' as const, label: 'Business', multiplier: 2 },
    { class: 'economy' as const, label: 'Economy', multiplier: 1 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{flight.route_code}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {format(new Date(flight.departure_time), 'HH:mm')}
              </p>
              <p className="text-sm text-gray-600">{flight.origin}</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{flight.duration_minutes}m</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2" />
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {format(new Date(flight.arrival_time), 'HH:mm')}
              </p>
              <p className="text-sm text-gray-600">{flight.destination}</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            {format(new Date(flight.departure_time), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {cabinOptions.map((option) => (
            <button
              key={option.class}
              onClick={() => onSelect(flight, option.class)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{option.label}</span>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-600">
                    ${(flight.base_price * option.multiplier).toFixed(2)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
