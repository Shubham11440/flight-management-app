import { format } from 'date-fns';
import { Clock, MapPin, DollarSign, Plane, ArrowRight } from 'lucide-react';
import type { Flight } from '@/types';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight, cabinClass: 'first' | 'business' | 'economy') => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const cabinOptions = [
    { class: 'first' as const, label: 'First Class', extraFee: 900, color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { class: 'business' as const, label: 'Business', extraFee: 450, color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { class: 'economy' as const, label: 'Economy', extraFee: 0, color: 'bg-green-100 text-green-700 border-green-200' },
  ];

  const duration = Math.round(
    (new Date(flight.arrives_at).getTime() - new Date(flight.departs_at).getTime()) / 60000
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Flight Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-purple-600">{flight.flight_no}</span>
              <span className="text-xs text-gray-400 ml-2">
                {format(new Date(flight.departs_at), 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {format(new Date(flight.departs_at), 'HH:mm')}
                </p>
                <p className="text-sm font-medium text-gray-600">{flight.origin}</p>
              </div>
            
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{duration}m</span>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              </div>
            
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {format(new Date(flight.arrives_at), 'HH:mm')}
                </p>
                <p className="text-sm font-medium text-gray-600">{flight.destination}</p>
              </div>
            </div>
          </div>

          {/* Cabin Selection */}
          <div className="flex flex-col gap-2 min-w-[200px]">
            {cabinOptions.map((option) => (
              <button
                key={option.class}
                onClick={() => onSelect(flight, option.class)}
                className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${option.color} hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{option.label}</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-bold">
                      ${(flight.base_price + option.extraFee).toFixed(2)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
