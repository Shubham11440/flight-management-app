import { getBookingById } from '@/lib/queries/bookings';
import { cancelBooking } from '@/lib/actions/cancel';
import { format } from 'date-fns';
import { ArrowLeft, Plane, MapPin, Calendar, Clock, User, DollarSign, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import BookingDetailsClient from './BookingDetailsClient';

export default async function BookingDetailsPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const booking = await getBookingById(params.bookingId);

  if (!booking) {
    redirect('/my-bookings');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/my-bookings"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Bookings
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Details</h1>
          <p className="text-gray-600">PNR: {booking.pnr_code}</p>
        </div>

        <BookingDetailsClient booking={booking} onCancel={cancelBooking} />
      </div>
    </div>
  );
}
