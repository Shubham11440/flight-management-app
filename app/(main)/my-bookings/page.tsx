import { getUserBookings } from '@/lib/queries/bookings';
import BookingRow from '@/components/my-bookings/BookingRow';
import { redirect } from 'next/navigation';
import { Plane, Search } from 'lucide-react';
import Link from 'next/link';

export default async function MyBookingsPage() {
  const bookings = await getUserBookings();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your flight bookings</p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Search className="w-4 h-4" />
            Book New Flight
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Plane className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">You haven't made any flight bookings yet.</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
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
