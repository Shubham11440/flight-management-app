import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  sessionToken: string | null;
  user: {
    id: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  cachedBookings: any[] | null;
  
  setSessionToken: (token: string | null) => void;
  setUser: (user: { id: string; email: string } | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setCachedBookings: (bookings: any[] | null) => void;
  logout: () => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      sessionToken: null,
      user: null,
      isAuthenticated: false,
      cachedBookings: null,
      
      // Actions
      setSessionToken: (token) => set({ sessionToken: token }),
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setCachedBookings: (bookings) => set({ cachedBookings: bookings }),
      
      logout: () => set({
        sessionToken: null,
        user: null,
        isAuthenticated: false,
        cachedBookings: null,
      }),
      
      reset: () => set({
        sessionToken: null,
        user: null,
        isAuthenticated: false,
        cachedBookings: null,
      }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      // Persist only the session token as per assignment requirements
      partialize: (state) => ({
        sessionToken: state.sessionToken,
      }),
    }
  )
);
