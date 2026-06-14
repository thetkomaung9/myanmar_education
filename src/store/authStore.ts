import { create } from 'zustand';
import type { AuthSession } from '@/lib/auth';

interface AuthState {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isAuthenticated: false,

  setSession: (session) =>
    set({
      session,
      isAuthenticated: true,
    }),

  clearSession: () =>
    set({
      session: null,
      isAuthenticated: false,
    }),
}));
