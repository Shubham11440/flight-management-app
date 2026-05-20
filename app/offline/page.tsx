import type { Metadata } from 'next';
import { WifiOff, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Offline - SkyBook',
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
          <WifiOff className="w-10 h-10 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">You are Offline</h1>
        <p className="text-gray-600 mb-8">
          Please check your internet connection. Some features may be limited until you are back online.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
