/**
 * Authentication utilities — token management and session cookie helpers.
 */

export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string; // null for Super Admin
  avatarUrl?: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string; // JWT, stored in HttpOnly cookie
  expiresAt: number; // Unix timestamp
  rememberMe: boolean;
}

/** Cookie max-age in seconds for "Remember Me" sessions (30 days). */
export const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 30; // 2_592_000 seconds

/**
 * Set the authentication session cookie.
 * - rememberMe === true  → Max-Age=2592000 (30 days)
 * - rememberMe === false → session cookie (no Max-Age)
 */
export function setSessionCookie(token: string, rememberMe: boolean): void {
  const maxAge = rememberMe ? `; Max-Age=${REMEMBER_ME_MAX_AGE}` : '';
  document.cookie = `access_token=${token}; Path=/; SameSite=Strict${maxAge}`;
}

/** Remove the authentication session cookie. */
export function clearSessionCookie(): void {
  document.cookie = 'access_token=; Path=/; Max-Age=0; SameSite=Strict';
}

/** Read the access token from document.cookie (client-side only). */
export function getAccessTokenFromCookie(): string | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='));
  return match ? match.split('=')[1] : null;
}

/**
 * Map a UserRole to its dashboard route.
 * Used after successful login to redirect to the correct portal.
 */
export function getDashboardRoute(role: UserRole): string {
  const routes: Record<UserRole, string> = {
    super_admin: '/super-admin/dashboard',
    school_admin: '/school-admin/dashboard',
    teacher: '/teacher/dashboard',
    student: '/student/dashboard',
  };
  return routes[role];
}
