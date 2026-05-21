'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import type { Booking } from '@/types';
import CancelDialog from '@/components/my-bookings/CancelDialog';
import { Plane, MapPin, Calendar, Clock, User, RefreshCw, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';
import { formatPrice } from '@/lib/utils/price';
import { cancelBooking } from '@/lib/actions/cancel';

interface BookingDetailsClientProps {
  booking: Booking;
}

export default function BookingDetailsClient({ booking }: BookingDetailsClientProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelResult, setCancelResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleCancel = async () => {
    const result = await cancelBooking(booking.id);
    setCancelResult(result);
    setIsCancelDialogOpen(false);
    
    if (result.success) {
      window.location.reload();
    }
  };

  const handleDownloadReceipt = () => {
    const receiptContent = generateReceiptContent(booking);
    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking.pnr_code}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReceiptContent = (booking: Booking) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Booking Receipt - ${booking.pnr_code}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .receipt {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #667eea;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #667eea;
      margin: 0;
    }
    .pnr {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-top: 10px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section h2 {
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .label {
      color: #666;
      font-weight: 500;
    }
    .value {
      color: #333;
      font-weight: 600;
    }
    .total {
      font-size: 24px;
      color: #10b981;
      font-weight: bold;
    }
    .status {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 12px;
    }
    .status.confirmed {
      background: #d1fae5;
      color: #065f46;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <h1>Flight Booking Receipt</h1>
      <div class="pnr">PNR: ${booking.pnr_code}</div>
      <div class="status ${booking.status}">${booking.status.toUpperCase()}</div>
    </div>

    <div class="section">
      <h2>Flight Information</h2>
      <div class="row">
        <span class="label">Flight Number:</span>
        <span class="value">${booking.flight?.flight_no}</span>
      </div>
      <div class="row">
        <span class="label">Route:</span>
        <span class="value">${booking.flight?.origin} → ${booking.flight?.destination}</span>
      </div>
      <div class="row">
        <span class="label">Date:</span>
        <span class="value">${format(new Date(booking.flight?.departs_at || ''), 'EEEE, MMMM d, yyyy')}</span>
      </div>
      <div class="row">
        <span class="label">Time:</span>
        <span class="value">${format(new Date(booking.flight?.departs_at || ''), 'HH:mm')} - ${format(new Date(booking.flight?.arrives_at || ''), 'HH:mm')}</span>
      </div>
      <div class="row">
        <span class="label">Seat:</span>
        <span class="value">${booking.seat?.seat_number} (${booking.seat?.class} Class)</span>
      </div>
    </div>

    <div class="section">
      <h2>Passenger Information</h2>
      <div class="row">
        <span class="label">Name:</span>
        <span class="value">${booking.passengers?.[0]?.full_name || 'N/A'}</span>
      </div>
      <div class="row">
        <span class="label">Passport Number:</span>
        <span class="value">${booking.passengers?.[0]?.passport_no || 'N/A'}</span>
      </div>
      <div class="row">
        <span class="label">Nationality:</span>
        <span class="value">${booking.passengers?.[0]?.nationality || 'N/A'}</span>
      </div>
      <div class="row">
        <span class="label">Date of Birth:</span>
        <span class="value">${booking.passengers?.[0]?.dob || 'N/A'}</span>
      </div>
    </div>

    <div class="section">
      <h2>Payment Summary</h2>
      <div class="row">
        <span class="label">Base Price:</span>
        <span class="value">${formatPrice(booking.flight?.base_price || 0)}</span>
      </div>
      ${booking.seat?.extra_fee && booking.seat.extra_fee > 0 ? `
      <div class="row">
        <span class="label">Seat Extra Fee:</span>
        <span class="value">+${formatPrice(booking.seat.extra_fee)}</span>
      </div>
      ` : ''}
      <div class="row" style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee;">
        <span class="label">Total Paid:</span>
        <span class="value total">${formatPrice(booking.total_price)}</span>
      </div>
    </div>

    <div class="footer">
      <p>Thank you for booking with Flight Management System</p>
      <p>Booking Date: ${format(new Date(booking.created_at || ''), 'MMMM d, yyyy HH:mm')}</p>
      <p>This receipt serves as confirmation of your booking</p>
    </div>
  </div>
</body>
</html>
    `;
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = () => {
    switch (booking.status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      case 'rescheduled':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Flight Information</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor()}`}>
              {getStatusIcon()}
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Plane className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Flight</p>
                <p className="font-medium text-gray-900">{booking.flight?.flight_no}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Route</p>
                <p className="font-medium text-gray-900">
                  {booking.flight?.origin} → {booking.flight?.destination}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(booking.flight?.departs_at || ''), 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(booking.flight?.departs_at || ''), 'HH:mm')} - {' '}
                  {format(new Date(booking.flight?.arrives_at || ''), 'HH:mm')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-700">
                {booking.seat?.seat_number[0]}
              </div>
              <div>
                <p className="text-sm text-gray-500">Seat</p>
                <p className="font-medium text-gray-900">
                  {booking.seat?.seat_number} ({booking.seat?.class} Class)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Passenger Information</h2>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-900">
                {booking.passengers?.[0]?.full_name || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Passport Number</p>
              <p className="font-medium text-gray-900">{booking.passengers?.[0]?.passport_no || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nationality</p>
              <p className="font-medium text-gray-900">{booking.passengers?.[0]?.nationality || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium text-gray-900">{booking.passengers?.[0]?.dob || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price</span>
              <span className="font-medium">{formatPrice(booking.flight?.base_price || 0)}</span>
            </div>
            {booking.seat?.extra_fee && booking.seat.extra_fee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Seat Extra Fee</span>
                <span className="text-gray-700">
                  +{formatPrice(booking.seat.extra_fee)}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="font-bold text-gray-900">Total Paid</span>
              <span className="font-bold text-xl text-green-600">{formatPrice(booking.total_price)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDownloadReceipt}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition font-medium flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            
            {booking.status === 'confirmed' && (
              <button
                onClick={() => setIsCancelDialogOpen(true)}
                className="w-full py-3 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
              >
                Cancel Booking
              </button>
            )}
            
            {booking.status === 'confirmed' && (
              <button
                className="w-full py-3 px-4 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reschedule Flight
              </button>
            )}
          </div>

          {cancelResult?.error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{cancelResult.error}</p>
            </div>
          )}
        </div>
      </div>

      <CancelDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={handleCancel}
        departureTime={booking.flight?.departs_at || ''}
      />
    </div>
  );
}
