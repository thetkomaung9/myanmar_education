'use client';

import { useAuthStore } from '@/store/authStore';
import { clearSessionCookie, setSessionCookie, getDashboardRoute } from '@/lib/auth';
import type { AuthSession, AuthUser, UserRole } from '@/lib/auth';
import { apiClient } from '@/lib/api';

/**
 * useAuth — authentication state hook.
 *
 * Reads from authStore (Zustand); exposes user, isAuthenticated, role,
 * login(), and logout() helpers.
 *
 * Validates: Requirements 9.5, 9.6
 */
export function useAuth() {
  const { session, isAuthenticated, setSession, clearSession } = useAuthStore();

  const user: AuthUser | null = session?.user ?? null;
  const role: UserRole | null = user?.role ?? null;

  /**
   * Perform login: POST credentials to the auth API, store the session,
   * set the cookie, and return the dashboard redirect path.
   */
  async function login(
    email: string,
    password: string,
    rememberMe = false
  ): Promise<string> {
    const response = await apiClient.post<{ session: AuthSession }>('/auth/login', {
      email,
      password,
    });

    const newSession: AuthSession = {
      ...response.data.session,
      rememberMe,
    };

    setSession(newSession);
    setSessionCookie(newSession.accessToken, rememberMe);
    return getDashboardRoute(newSession.user.role);
  }

  /** Clear the auth session and remove the cookie. */
  function logout(): void {
    clearSession();
    clearSessionCookie();
  }

  return {
    user,
    session,
    isAuthenticated,
    role,
    login,
    logout,
  };
}
