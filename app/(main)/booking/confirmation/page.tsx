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
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: booking } = await supabase
    .from('bookings')
    .select('*, flight:flights(*), seat:seats(*)')
    .eq('pnr_code', searchParams.pnr)
    .eq('user_id', user.id)
    .single();

  if (!booking) {
    redirect('/search');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="flex justify-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/my-bookings"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
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
