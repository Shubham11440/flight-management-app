'use client';

import { createBooking } from '@/lib/actions/bookings';
import { useRouter } from 'next/navigation';

interface PassengerFormProps {
  flightId: string;
  seatId: string;
}

export default function PassengerForm({ flightId, seatId }: PassengerFormProps) {
  const router = useRouter();

  const inputClassName =
    'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-purple-300 bg-gray-50';
  const labelClassName = 'block text-sm font-semibold text-gray-700 mb-2';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createBooking(formData, flightId, seatId);
    
    if (result?.error) {
      router.push(`/booking/passengers?error=${encodeURIComponent(result.error)}`);
    } else if (result?.bookingId) {
      router.push(`/my-bookings/${result.bookingId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="flightId" value={flightId} />
      <input type="hidden" name="seatId" value={seatId} />
      <div>
        <label htmlFor="fullName" className={labelClassName}>
          Full Name *
        </label>
        <input
          name="fullName"
          type="text"
          className={inputClassName}
          placeholder="John Doe"
          required
          minLength={2}
        />
      </div>

      <div>
        <label htmlFor="passportNo" className={labelClassName}>
          Passport Number *
        </label>
        <input
          name="passportNo"
          type="text"
          className={inputClassName}
          placeholder="A12345678"
          required
          minLength={5}
        />
      </div>

      <div>
        <label htmlFor="nationality" className={labelClassName}>
          Nationality *
        </label>
        <input
          name="nationality"
          type="text"
          className={inputClassName}
          placeholder="Indian"
          required
          minLength={2}
        />
      </div>

      <div>
        <label htmlFor="dob" className={labelClassName}>
          Date of Birth *
        </label>
        <input
          name="dob"
          type="date"
          className={inputClassName}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
      >
        Confirm Booking
      </button>
    </form>
  );
}
