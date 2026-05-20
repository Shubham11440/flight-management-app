'use client';

import { signup } from '@/lib/actions/auth';
import { Plane, ArrowRight, Shield, Clock, Globe, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section with Images */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/commercial_clear_blue_sky.png"
            alt="Clear blue sky"
            fill
            className="object-cover"
            priority
          />
          {/* Purple overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-pink-800/60 to-rose-900/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl font-bold text-white tracking-tight">SkyBook</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Join the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200">Adventure</span>
            </h1>
            <p className="text-xl text-purple-100 mb-12 leading-relaxed">
              Create your account and start booking flights today
            </p>
          </div>

          {/* Airplane Image */}
          <div className="relative mb-12">
            <div className="w-full h-48 relative">
              <Image
                src="/airplane.png"
                alt="Airplane"
                fill
                className="object-contain drop-shadow-2xl"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Check className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white">Free to Join</h3>
                <p className="text-purple-200 text-sm">No hidden fees</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white">Quick Setup</h3>
                <p className="text-purple-200 text-sm">Get started in minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white">Secure Platform</h3>
                <p className="text-purple-200 text-sm">Your data is safe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 relative">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-purple-100">
              <Plane className="w-8 h-8 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-gray-900">SkyBook</span>
          </div>

          <div className="rounded-3xl shadow-2xl p-8 sm:p-10 bg-white">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2 text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-600">
                Join thousands of travelers worldwide
              </p>
            </div>

            {searchParams.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 text-sm font-medium">{searchParams.error}</p>
              </div>
            )}

            <form action={signup} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white"
                  placeholder="Create a password"
                />
                <p className="text-xs mt-2 text-gray-500">Minimum 6 characters</p>
              </div>

              <div className="flex items-start">
                <label className="flex items-start">
                  <input type="checkbox" required className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1" />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-purple-600 hover:underline font-medium">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-purple-600 hover:underline font-medium">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <Link
                href="/login"
                className="mt-6 w-full block text-center py-4 px-4 border-2 rounded-2xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 transform hover:scale-[1.02] border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <p className="text-center text-sm mt-6 text-gray-400">
            Your account is secure with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}
