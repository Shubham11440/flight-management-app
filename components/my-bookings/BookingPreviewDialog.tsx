'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import type { Booking } from '@/types';
import { formatPrice } from '@/lib/utils/price';
import {
  Plane,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Download,
  ArrowRight,
  X,
  IndianRupee,
} from 'lucide-react';
import Link from 'next/link';

interface BookingPreviewDialogProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingPreviewDialog({
  booking,
  isOpen,
  onClose,
}: BookingPreviewDialogProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (booking.status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'rescheduled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleDownloadReceipt = () => {
    setIsDownloading(true);

    const passenger = booking.passengers?.[0];
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Booking Receipt - ${booking.pnr_code}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #7c3aed; padding-bottom: 20px; margin-bottom: 30px; }
    .pnr { font-size: 32px; font-weight: bold; color: #7c3aed; }
    .section { margin: 20px 0; padding: 15px; background: #f9fafb; border-radius: 8px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    .row:last-child { border-bottom: none; }
    .label { color: #6b7280; font-weight: 500; }
    .value { font-weight: 600; color: #111827; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>SkyBook Flight Receipt</h1>
    <div class="pnr">${booking.pnr_code}</div>
    <p>Booking Reference</p>
  </div>
  <div class="section">
    <div class="row"><span class="label">Flight</span><span class="value">${booking.flight?.flight_no}</span></div>
    <div class="row"><span class="label">Route</span><span class="value">${booking.flight?.origin} → ${booking.flight?.destination}</span></div>
    <div class="row"><span class="label">Date</span><span class="value">${format(new Date(booking.flight?.departs_at || ''), 'EEEE, MMM d, yyyy')}</span></div>
    <div class="row"><span class="label">Time</span><span class="value">${format(new Date(booking.flight?.departs_at || ''), 'HH:mm')} - ${format(new Date(booking.flight?.arrives_at || ''), 'HH:mm')}</span></div>
    <div class="row"><span class="label">Seat</span><span class="value">${booking.seat?.seat_number} (${booking.seat?.class} Class)</span></div>
  </div>
  <div class="section">
    <div class="row"><span class="label">Passenger</span><span class="value">${passenger?.full_name || 'N/A'}</span></div>
    <div class="row"><span class="label">Passport</span><span class="value">${passenger?.passport_no || 'N/A'}</span></div>
    <div class="row"><span class="label">Nationality</span><span class="value">${passenger?.nationality || 'N/A'}</span></div>
  </div>
  <div class="section">
    <div class="row"><span class="label">Total Paid</span><span class="value" style="color:#16a34a;font-size:20px;">${formatPrice(booking.total_price)}</span></div>
    <div class="row"><span class="label">Status</span><span class="value">${booking.status.toUpperCase()}</span></div>
    <div class="row"><span class="label">Booked On</span><span class="value">${format(new Date(booking.booked_at), 'MMM d, yyyy HH:mm')}</span></div>
  </div>
  <div class="footer">
    <p>Thank you for choosing SkyBook!</p>
    <p>Please arrive at the airport at least 2 hours before departure.</p>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking.pnr_code}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Booking Preview</h2>
              <p className="text-xs text-gray-500">PNR: {booking.pnr_code}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-center">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border ${getStatusColor()}`}
            >
              {getStatusIcon()}
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          {/* Flight Info */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center flex-1">
                <p className="text-2xl font-bold text-gray-900">{booking.flight?.origin}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(booking.flight?.departs_at || ''), 'HH:mm')}
                </p>
              </div>
              <div className="px-4">
                <Plane className="w-6 h-6 text-purple-500 rotate-90" />
              </div>
              <div className="text-center flex-1">
                <p className="text-2xl font-bold text-gray-900">{booking.flight?.destination}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(booking.flight?.arrives_at || ''), 'HH:mm')}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(booking.flight?.departs_at || ''), 'EEEE, MMM d, yyyy')}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Flight</p>
              <p className="font-semibold text-gray-900">{booking.flight?.flight_no}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Seat</p>
              <p className="font-semibold text-gray-900">
                {booking.seat?.seat_number} <span className="text-gray-500 font-normal">({booking.seat?.class})</span>
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Passenger</p>
              <p className="font-semibold text-gray-900 truncate">
                {booking.passengers?.[0]?.full_name || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Booked On</p>
              <p className="font-semibold text-gray-900">
                {format(new Date(booking.booked_at), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="bg-green-50 rounded-2xl p-5 border border-green-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">{formatPrice(booking.total_price)}</p>
            </div>
            <IndianRupee className="w-10 h-10 text-green-300" />
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadReceipt}
              disabled={isDownloading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-70"
            >
              <Download className="w-5 h-5" />
              {isDownloading ? 'Downloading...' : 'Download Receipt'}
            </button>

            <Link
              href={`/my-bookings/${booking.id}`}
              onClick={onClose}
              className="w-full py-3 px-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-purple-50 transition-all"
            >
              View Full Details
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
