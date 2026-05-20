import { format } from 'date-fns';
import { Clock, Plane, ArrowRight, IndianRupee, CalendarDays, Armchair } from 'lucide-react';
import type { Flight } from '@/types';
import { formatPrice } from '@/lib/utils/price';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight, cabinClass: 'first' | 'business' | 'economy') => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const cabinOptions = [
    { class: 'first' as const, label: 'First Class', extraFee: 2500, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { class: 'business' as const, label: 'Business', extraFee: 1200, color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { class: 'economy' as const, label: 'Economy', extraFee: 0, color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  ];

  const duration = Math.round(
    (new Date(flight.arrives_at).getTime() - new Date(flight.departs_at).getTime()) / 60000
  );

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600" />
      <div className="p-6 md:p-8">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-purple-700">{flight.flight_no}</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                <CalendarDays className="w-3.5 h-3.5" />
                {format(new Date(flight.departs_at), 'EEEE, MMMM d, yyyy')}
              </span>
              {flight.aircraft_type && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                  <Armchair className="w-3.5 h-3.5" />
                  {flight.aircraft_type}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {format(new Date(flight.departs_at), 'HH:mm')}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-700">{flight.origin}</p>
              </div>
            
              <div className="min-w-[160px]">
                <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold">{duration} min</span>
                </div>
                <div className="relative flex items-center">
                  <div className="h-px flex-1 border-t-2 border-dashed border-gray-300" />
                  <div className="mx-2 rounded-full bg-purple-50 border border-purple-100 p-1">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="h-px flex-1 border-t-2 border-dashed border-gray-300" />
                </div>
              </div>
            
              <div className="text-right">
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {format(new Date(flight.arrives_at), 'HH:mm')}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-700">{flight.destination}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 xl:min-w-[240px]">
            {cabinOptions.map((option) => (
              <button
                key={option.class}
                onClick={() => onSelect(flight, option.class)}
                className={`px-4 py-3 rounded-2xl border transition-all duration-300 hover:shadow-md text-left ${option.color}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold">{option.label}</span>
                  <span className="flex items-center text-base font-extrabold">
                    <IndianRupee className="w-4 h-4" />
                    {formatPrice(flight.base_price + option.extraFee).replace('₹', '')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
