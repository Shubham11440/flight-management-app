import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SearchQuery, SelectedFlight, Seat } from '@/types';

interface FlightState {
  // Search state
  searchQuery: SearchQuery | null;
  searchResults: any[] | null;
  
  // Selected flight
  selectedFlight: SelectedFlight | null;
  
  // Selected seat
  selectedSeat: Seat | null;
  
  // Actions
  setSearchQuery: (query: SearchQuery) => void;
  setSearchResults: (results: any[]) => void;
  setSelectedFlight: (flight: SelectedFlight) => void;
  setSelectedSeat: (seat: Seat) => void;
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
      
      // Actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchResults: (results) => set({ searchResults: results }),
      setSelectedFlight: (flight) => set({ selectedFlight: flight }),
      setSelectedSeat: (seat) => set({ selectedSeat: seat }),
      
      resetSearch: () => set({ searchQuery: null, searchResults: null }),
      
      resetSelection: () => set({ 
        selectedFlight: null, 
        selectedSeat: null 
      }),
      
      resetAll: () => set({
        searchQuery: null,
        searchResults: null,
        selectedFlight: null,
        selectedSeat: null,
      }),
    }),
    {
      name: 'flight-storage',
      storage: createJSONStorage(() => localStorage),
      // Partialize to persist only non-sensitive data
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        selectedFlight: state.selectedFlight,
      }),
    }
  )
);
