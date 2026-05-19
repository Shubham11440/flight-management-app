import { getBookingById } from '@/lib/queries/bookings';
import { rescheduleBooking } from '@/lib/actions/reschedule';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import RescheduleClient from './RescheduleClient';

export default async function ReschedulePage({
  params,
}: {
  params: { bookingId: string };
}) {
  const booking = await getBookingById(params.bookingId);

  if (!booking) {
    redirect('/my-bookings');
  }

  if (booking.status !== 'confirmed') {
    redirect(`/my-bookings/${params.bookingId}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href={`/my-bookings/${params.bookingId}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Booking Details
        </Link>

        <RescheduleClient booking={booking} onReschedule={rescheduleBooking} />
      </div>
    </div>
  );
}
