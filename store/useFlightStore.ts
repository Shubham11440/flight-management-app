import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SearchQuery, SelectedFlight, Seat, PassengerFormData } from '@/types';

interface FlightState {
  // Search state
  searchQuery: SearchQuery | null;
  searchResults: any[] | null;
  
  // Selected flight
  selectedFlight: SelectedFlight | null;
  
  // Selected seat
  selectedSeat: Seat | null;
  
  // Optimistic seat selection (before server confirms)
  optimisticSeatId: string | null;
  
  // Booking flow state
  currentBookingStep: 'search' | 'seats' | 'passengers' | 'confirmation';
  passengerFormData: PassengerFormData | null;
  
  // Actions
  setSearchQuery: (query: SearchQuery) => void;
  setSearchResults: (results: any[]) => void;
  setSelectedFlight: (flight: SelectedFlight) => void;
  setSelectedSeat: (seat: Seat) => void;
  setOptimisticSeatId: (seatId: string | null) => void;
  setBookingStep: (step: 'search' | 'seats' | 'passengers' | 'confirmation') => void;
  setPassengerFormData: (data: PassengerFormData) => void;
  resetSearch: () => void;
  resetSelection: () => void;
  resetAll: () => void;
}

export const useFlightStore = create<FlightState>()(
  persist(
    (set) => ({
      // Initial state
      searchQuery: null,
      searchResults: null,
      selectedFlight: null,
      selectedSeat: null,
      optimisticSeatId: null,
      currentBookingStep: 'search',
      passengerFormData: null,
      
      // Actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchResults: (results) => set({ searchResults: results }),
      setSelectedFlight: (flight) => set({ selectedFlight: flight }),
      setSelectedSeat: (seat) => set({ selectedSeat: seat }),
      setOptimisticSeatId: (seatId) => set({ optimisticSeatId: seatId }),
      setBookingStep: (step) => set({ currentBookingStep: step }),
      setPassengerFormData: (data) => set({ passengerFormData: data }),
      
      resetSearch: () => set({ searchQuery: null, searchResults: null }),
      
      resetSelection: () => set({ 
        selectedFlight: null, 
        selectedSeat: null,
        optimisticSeatId: null,
        currentBookingStep: 'search',
        passengerFormData: null,
      }),
      
      resetAll: () => set({
        searchQuery: null,
        searchResults: null,
        selectedFlight: null,
        selectedSeat: null,
        optimisticSeatId: null,
        currentBookingStep: 'search',
        passengerFormData: null,
      }),
    }),
    {
      name: 'flight-storage',
      storage: createJSONStorage(() => localStorage),
      // Partialize to persist only non-sensitive data (exclude passport numbers)
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        selectedFlight: state.selectedFlight ? {
          flight: state.selectedFlight.flight,
          seat: state.selectedFlight.seat,
          cabinClass: state.selectedFlight.cabinClass,
        } : null,
        currentBookingStep: state.currentBookingStep,
        // Exclude passengerFormData which contains passport_no
      }),
    }
  )
);
