import SearchForm from '@/components/search/SearchForm';
import { Plane } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Plane className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Find Your Flight</h1>
          <p className="text-gray-600 mt-2">Search and book flights to your destination</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
