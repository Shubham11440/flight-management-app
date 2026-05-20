'use client';

import Image from "next/image";
import Link from 'next/link';
import { Plane, Search, User, ArrowRight, Globe, Clock, Shield } from 'lucide-react';
import { Navigation } from '@/components/navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/commercial_clear_blue_sky.png"
            alt="Clear blue sky"
            fill
            className="object-cover"
            priority
          />
          {/* Lighter purple overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-purple-800/50 to-indigo-900/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-block bg-white/30 p-4 rounded-2xl backdrop-blur-sm mb-6 shadow-2xl">
                <Plane className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                Your Journey<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white">
                  Starts Here
                </span>
              </h1>
              <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-medium">
                Experience seamless flight booking with our modern platform. Search, book, and manage your flights with ease.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold hover:bg-purple-50 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-2 transform hover:scale-105"
              >
                Search Flights
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/my-bookings"
                className="bg-white/40 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/50 transition-all duration-300 backdrop-blur-md border-2 border-white/50 flex items-center justify-center gap-2 transform hover:scale-105 shadow-2xl"
              >
                My Bookings
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose SkyBook?
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Everything you need for a seamless travel experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl transition-all duration-300 hover:scale-105 bg-white hover:bg-purple-50 shadow-xl">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-purple-100">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Fast Booking
            </h3>
            <p className="text-base text-gray-600">
              Book flights in seconds with our streamlined booking process
            </p>
          </div>

          <div className="p-8 rounded-3xl transition-all duration-300 hover:scale-105 bg-white hover:bg-purple-50 shadow-xl">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-purple-100">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Secure Payments
            </h3>
            <p className="text-base text-gray-600">
              Your data is protected with industry-standard security
            </p>
          </div>

          <div className="p-8 rounded-3xl transition-all duration-300 hover:scale-105 bg-white hover:bg-purple-50 shadow-xl">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-purple-100">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Global Coverage
            </h3>
            <p className="text-base text-gray-600">
              Access flights to destinations worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-white border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2026 SkyBook. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
