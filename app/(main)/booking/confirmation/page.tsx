import { createClient } from '@/lib/supabase/server';
import ConfirmationCard from '@/components/booking/ConfirmationCard';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: { pnr?: string };
}) {
  if (!searchParams.pnr) {
    redirect('/search');
  }

  const supabase = await createClient();

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select(`
      *,
      flight:flights(*),
      seat:seats(*),
      passenger:passengers(*)
    `)
    .eq('pnr', searchParams.pnr)
    .single();

  if (bookingError || !booking) {
    redirect('/search');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="flex justify-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/my-bookings"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            My Bookings
          </Link>
        </div>

        <ConfirmationCard
          booking={booking}
          flight={booking.flight}
          seat={booking.seat}
        />
      </div>
    </div>
  );
}
