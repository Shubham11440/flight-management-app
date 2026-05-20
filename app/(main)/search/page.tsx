import SearchForm from '@/components/search/SearchForm';
import { Plane, Search, Globe, Clock, Shield } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              SkyBook
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Find Your Perfect Flight</p>
          <p className="text-gray-500">Search and book flights to your destination with ease</p>
        </div>

        {/* Search Form */}
        <div className="mb-16">
          <SearchForm />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-4">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Booking</h3>
            <p className="text-gray-600">Book flights in seconds with our streamlined process</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-600">Your data is protected with industry-standard security</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-4">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global Coverage</h3>
            <p className="text-gray-600">Access flights to destinations worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
}
