'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFlightStore } from '@/store/useFlightStore';

export default function SearchForm() {
  const router = useRouter();
  const { setSearchQuery, resetSearch } = useFlightStore();
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: '1',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const query = {
      origin: formData.origin || undefined,
      destination: formData.destination || undefined,
      date: formData.date || undefined,
      passengers: parseInt(formData.passengers) || 1,
    };
    
    setSearchQuery(query);
    
    const params = new URLSearchParams();
    if (query.origin) params.set('origin', query.origin);
    if (query.destination) params.set('destination', query.destination);
    if (query.date) params.set('date', query.date);
    if (query.passengers) params.set('passengers', query.passengers.toString());
    
    router.push(`/flights?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-2">
            <label htmlFor="origin" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              Origin
            </label>
            <div className="relative">
              <input
                id="origin"
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                placeholder="Delhi"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-purple-300 bg-gray-50 text-gray-900 placeholder:text-gray-400"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              Destination
            </label>
            <div className="relative">
              <input
                id="destination"
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="Mumbai"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-purple-300 bg-gray-50 text-gray-900 placeholder:text-gray-400"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Departure Date
            </label>
            <div className="relative">
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-purple-300 bg-gray-50 text-gray-900 placeholder:text-gray-400"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="passengers" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Passengers
            </label>
            <div className="relative">
              <select
                id="passengers"
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-purple-300 bg-gray-50 text-gray-900 appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-[1.02]"
          >
            <Search className="w-5 h-5" />
            Search Flights
          </button>
        </div>
      </div>
    </form>
  );
}
