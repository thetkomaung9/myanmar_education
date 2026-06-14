'use client';

import { useTheme as useNextTheme } from 'next-themes';

/**
 * useTheme — wraps next-themes to expose theme state and toggle.
 *
 * Validates: Requirements 1.5, 1.7
 */
export function useTheme() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();

  const isDark = resolvedTheme === 'dark';

  function toggleTheme() {
    setTheme(isDark ? 'light' : 'dark');
  }

  return {
    theme,
    resolvedTheme,
    systemTheme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
