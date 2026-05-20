import PassengerForm from '@/components/booking/PassengerForm';
import { ArrowLeft, Plane, User } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getFlightById } from '@/lib/queries/flights';
import { getSeatById } from '@/lib/queries/seats';
import { formatPrice } from '@/lib/utils/price';

export default async function PassengerDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ flightId?: string; seatId?: string; cabin?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { flightId, seatId, error } = params;

  if (!flightId || !seatId) {
    redirect('/search');
  }

  const [flight, seat] = await Promise.all([
    getFlightById(flightId),
    getSeatById(seatId),
  ]);

  if (!flight || !seat) {
    redirect('/search');
  }

  const basePrice = flight.base_price;
  const totalPrice = basePrice + seat.extra_fee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/seats/${flight.id}`}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Seat Selection
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Passenger Details</h1>
          <p className="text-gray-600">Please provide passenger information to complete your booking</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Passenger Information</h2>
              </div>

              <PassengerForm flightId={flightId} seatId={seatId} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Flight</p>
                    <p className="font-medium text-gray-900">{flight.flight_no}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="font-medium text-gray-900">{flight.origin} → {flight.destination}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Seat</p>
                  <p className="font-medium text-gray-900">{seat.seat_number} ({seat.class} Class)</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium">{formatPrice(basePrice)}</span>
                  </div>
                  {seat.extra_fee > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Seat Premium</span>
                      <span className="text-gray-700">+{formatPrice(seat.extra_fee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-2xl text-purple-600">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
