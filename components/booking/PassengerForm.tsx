'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const passengerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  passportNo: z.string().min(5, 'Passport number must be at least 5 characters'),
  nationality: z.string().min(2, 'Nationality must be at least 2 characters'),
  dob: z.string().min(1, 'Date of birth is required'),
});

type PassengerFormData = z.infer<typeof passengerSchema>;

interface PassengerFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export default function PassengerForm({ onSubmit, isLoading }: PassengerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerFormData>({
    resolver: zodResolver(passengerSchema),
  });

  const onFormSubmit = (data: PassengerFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          {...register('fullName')}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="passportNo" className="block text-sm font-medium text-gray-700 mb-2">
          Passport Number *
        </label>
        <input
          {...register('passportNo')}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="A12345678"
        />
        {errors.passportNo && (
          <p className="mt-1 text-sm text-red-600">{errors.passportNo.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
          Nationality *
        </label>
        <input
          {...register('nationality')}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="United States"
        />
        {errors.nationality && (
          <p className="mt-1 text-sm text-red-600">{errors.nationality.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth *
        </label>
        <input
          {...register('dob')}
          type="date"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
        {errors.dob && (
          <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Confirm Booking'}
      </button>
    </form>
  );
}
