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

  const inputClassName =
    'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all hover:border-purple-300 bg-gray-50';
  const labelClassName = 'block text-sm font-semibold text-gray-700 mb-2';

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className={labelClassName}>
          Full Name *
        </label>
        <input
          {...register('fullName')}
          type="text"
          className={inputClassName}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="passportNo" className={labelClassName}>
          Passport Number *
        </label>
        <input
          {...register('passportNo')}
          type="text"
          className={inputClassName}
          placeholder="A12345678"
        />
        {errors.passportNo && (
          <p className="mt-1 text-sm text-red-600">{errors.passportNo.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="nationality" className={labelClassName}>
          Nationality *
        </label>
        <input
          {...register('nationality')}
          type="text"
          className={inputClassName}
          placeholder="United States"
        />
        {errors.nationality && (
          <p className="mt-1 text-sm text-red-600">{errors.nationality.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="dob" className={labelClassName}>
          Date of Birth *
        </label>
        <input
          {...register('dob')}
          type="date"
          className={inputClassName}
        />
        {errors.dob && (
          <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Confirm Booking'}
      </button>
    </form>
  );
}
