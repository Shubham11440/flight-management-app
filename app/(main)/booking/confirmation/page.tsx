import { createClient } from '@/lib/supabase/server';
import ConfirmationCard from '@/components/booking/ConfirmationCard';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Home, ArrowLeft, CheckCircle } from 'lucide-react';

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  
  if (!params.id) {
    redirect('/search');
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: booking } = await supabase
    .from('bookings')
    .select('*, flight:flights(*), seat:seats(*), passengers(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!booking) {
    redirect('/search');
  }

  // Extract first passenger from array
  const passenger = Array.isArray(booking.passengers) && booking.passengers.length > 0
    ? booking.passengers[0]
    : null;

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

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Your flight has been successfully booked</p>
          </div>

          <ConfirmationCard
            booking={booking}
            flight={booking.flight}
            seat={booking.seat}
            passenger={passenger}
          />
        </div>

        <div className="text-center">
          <Link
            href={`/my-bookings/${booking.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            View Booking Details
          </Link>
        </div>
      </div>
    </div>
  );
}
