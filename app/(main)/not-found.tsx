import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function MainNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Plane className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <Link
          href="/search"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Search Flights
        </Link>
      </div>
    </div>
  );
}
