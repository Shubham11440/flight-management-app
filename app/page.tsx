import Image from "next/image";
import Link from 'next/link';
import { Plane, Search, User } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <Plane className="w-24 h-24 mx-auto text-blue-600 mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Flight Management PWA</h1>
          <p className="text-xl text-gray-600">Book and manage your flights with ease</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            href="/search"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group"
          >
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Search Flights</h2>
              <p className="text-gray-600">Find and book your next flight</p>
            </div>
          </Link>

          <Link
            href="/my-bookings"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group"
          >
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-200 transition">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">My Bookings</h2>
              <p className="text-gray-600">View and manage your bookings</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>Please sign in to access all features</p>
        </div>
      </div>
    </main>
  );
}
