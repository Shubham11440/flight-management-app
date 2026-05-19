import { useFlightStore } from '@/store/useFlightStore';
import PassengerForm from '@/components/booking/PassengerForm';
import { ArrowLeft, Plane, User } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createBooking } from '@/lib/actions/bookings';

export default function PassengerDetailsPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const selectedFlight = useFlightStore.getState().selectedFlight;
  const selectedSeat = useFlightStore.getState().selectedSeat;

  if (!selectedFlight || !selectedSeat) {
    redirect('/search');
  }

  const flight = selectedFlight.flight;
  const seat = selectedSeat;
  const basePrice = flight.base_price;
  const totalPrice = basePrice * seat.price_multiplier;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href={`/seats/${flight.id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Seat Selection
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Passenger Details</h1>
          <p className="text-gray-600">Please provide passenger information to complete your booking</p>
        </div>

        {searchParams.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{searchParams.error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Passenger Information</h2>
              </div>

              <PassengerForm onSubmit={createBooking} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Flight</p>
                    <p className="font-medium text-gray-900">{flight.route_code}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="font-medium text-gray-900">{flight.origin} → {flight.destination}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Seat</p>
                  <p className="font-medium text-gray-900">{seat.seat_number} ({seat.cabin_class} Class)</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium">${basePrice.toFixed(2)}</span>
                  </div>
                  {seat.price_multiplier > 1 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Seat Premium (x{seat.price_multiplier})</span>
                      <span className="text-gray-700">+${((basePrice * seat.price_multiplier) - basePrice).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-green-600">${totalPrice.toFixed(2)}</span>
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
