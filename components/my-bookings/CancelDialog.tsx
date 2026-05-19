'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface CancelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  departureTime: string;
}

export default function CancelDialog({ isOpen, onClose, onConfirm, departureTime }: CancelDialogProps) {
  const [isCancelling, setIsCancelling] = useState(false);

  if (!isOpen) return null;

  const departureDate = new Date(departureTime);
  const now = new Date();
  const hoursUntilDeparture = (departureDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const canCancel = hoursUntilDeparture > 2;

  const handleConfirm = async () => {
    setIsCancelling(true);
    await onConfirm();
    setIsCancelling(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 rounded-full p-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Cancel Booking</h3>
        </div>

        {!canCancel ? (
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              This booking cannot be cancelled because the flight departs in less than 2 hours.
            </p>
            <p className="text-sm text-gray-500">
              Departure time: {departureDate.toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <p className="text-sm text-gray-500">
              Your seat will be released and the booking will be marked as cancelled.
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isCancelling}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
          >
            {canCancel ? 'Keep Booking' : 'Close'}
          </button>
          {canCancel && (
            <button
              onClick={handleConfirm}
              disabled={isCancelling}
              className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
            >
              {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
