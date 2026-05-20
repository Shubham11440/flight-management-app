'use client';

import Image from "next/image";
import Link from 'next/link';
import { Plane, Search, User, ArrowRight, Globe, Clock, Shield } from 'lucide-react';
import { Navigation } from '@/components/navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-purple-500/70 to-indigo-600/80" />
        </div>

        {/* Foreground Airplane */}
        <div className="absolute top-1/4 right-10 md:right-20 z-10 opacity-90">
          <Image
            src="/airplane.png"
            alt="Airplane"
            width={400}
            height={400}
            className="w-48 h-48 md:w-80 md:h-80 object-contain"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover the World with <span className="text-yellow-300">SkyBook</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              Your journey begins here. Book flights to any destination with ease and comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/search"
                className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <Search className="w-5 h-5" />
                Search Flights
              </Link>
              <Link
                href="/my-bookings"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-bold flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                My Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose SkyBook?
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Everything you need for a seamless travel experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Fast Booking
            </h3>
            <p className="text-base text-gray-600">
              Book flights in seconds with our streamlined booking process
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Secure Payments
            </h3>
            <p className="text-base text-gray-600">
              Your data is protected with industry-standard security
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
              <Globe className="w-8 h-8 text-white" />
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
