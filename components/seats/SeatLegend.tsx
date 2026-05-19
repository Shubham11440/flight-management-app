'use client';

export default function SeatLegend() {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-purple-100 border-2 border-purple-300" />
        <span className="text-gray-700">First Class</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-blue-100 border-2 border-blue-300" />
        <span className="text-gray-700">Business</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-green-100 border-2 border-green-300" />
        <span className="text-gray-700">Economy</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-blue-500 text-white flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-gray-700">Selected</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-gray-300 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <span className="text-gray-700">Occupied</span>
      </div>
    </div>
  );
}
