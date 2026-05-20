'use client';

import { login } from '@/lib/actions/auth';
import { Plane, ArrowRight, Shield, Clock, Globe, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const { theme } = useTheme();

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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/60 to-indigo-900/70"></div>
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
              Your Journey<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">Starts Here</span>
            </h1>
            <p className="text-xl text-purple-100 mb-12 leading-relaxed">
              Experience seamless flight booking with our modern platform
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
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white">Fast Booking</h3>
                <p className="text-purple-200 text-sm">Book flights in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white">Secure Payments</h3>
                <p className="text-purple-200 text-sm">Your data is protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white">Global Coverage</h3>
                <p className="text-purple-200 text-sm">Flights worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={`flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} relative`}>
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-100'}`}>
              <Plane className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-purple-600'}`} />
            </div>
            <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>SkyBook</span>
          </div>

          <div className={`rounded-3xl shadow-2xl p-8 sm:p-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="mb-8">
              <h2 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Welcome Back
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Sign in to your account to continue
              </p>
            </div>

            {searchParams.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 text-sm font-medium">{searchParams.error}</p>
              </div>
            )}

            <form action={login} className="space-y-6">
              <div>
                <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                  <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-4 rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className={`absolute inset-0 flex items-center`}>
                  <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-4 ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                    Don't have an account?
                  </span>
                </div>
              </div>

              <Link
                href="/signup"
                className={`mt-6 w-full block text-center py-4 px-4 border-2 rounded-2xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 transform hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'border-purple-600 text-purple-400 hover:bg-purple-600/10'
                    : 'border-purple-600 text-purple-600 hover:bg-purple-50'
                }`}
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            By signing in, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
