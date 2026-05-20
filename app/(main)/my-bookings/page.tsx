import { getUserBookings } from '@/lib/queries/bookings';
import BookingRow from '@/components/my-bookings/BookingRow';
import { redirect } from 'next/navigation';
import { Plane, Search } from 'lucide-react';
import Link from 'next/link';

export default async function MyBookingsPage() {
  const bookings = await getUserBookings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your flight bookings</p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            <Search className="w-4 h-4" />
            Book New Flight
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <Plane className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">You haven't made any flight bookings yet.</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              <Search className="w-4 h-4" />
              Search Flights
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                onViewDetails={(bookingId) => redirect(`/my-bookings/${bookingId}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
