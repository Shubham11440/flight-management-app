import { format } from 'date-fns';
import { Clock, MapPin, DollarSign } from 'lucide-react';
import type { Flight } from '@/types';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight, cabinClass: 'first' | 'business' | 'economy') => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const cabinOptions = [
    { class: 'first' as const, label: 'First Class', extraFee: 900 },
    { class: 'business' as const, label: 'Business', extraFee: 450 },
    { class: 'economy' as const, label: 'Economy', extraFee: 0 },
  ];

  const duration = Math.round(
    (new Date(flight.arrives_at).getTime() - new Date(flight.departs_at).getTime()) / 60000
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{flight.flight_no}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {format(new Date(flight.departs_at), 'HH:mm')}
              </p>
              <p className="text-sm text-gray-600">{flight.origin}</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{duration}m</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2" />
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {format(new Date(flight.arrives_at), 'HH:mm')}
              </p>
              <p className="text-sm text-gray-600">{flight.destination}</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            {format(new Date(flight.departs_at), 'EEEE, MMMM d, yyyy')}
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
                    ${(flight.base_price + option.extraFee).toFixed(2)}
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
