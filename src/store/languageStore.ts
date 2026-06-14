import { create } from 'zustand';
import type { SupportedLocale } from '@/i18n/types';

export type { SupportedLocale };

interface LanguageState {
  activeLocale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

export const LANGUAGE_STORAGE_KEY = 'edusphere_lang';

/**
 * Reads the stored locale from localStorage in a SSR-safe way.
 * Returns 'en' as the default when running server-side or when no preference is stored.
 */
function getInitialLocale(): SupportedLocale {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'en' || stored === 'mm') return stored;
  return 'en';
}

/**
 * Zustand store for active UI language.
 *
 * - Initializes from localStorage['edusphere_lang'] on the client (SSR-safe).
 * - Defaults to 'en' when no stored preference exists.
 * - setLocale() updates the store AND persists to localStorage.
 *
 * Validates: Requirements 8.1, 8.2, 8.5
 */
export const useLanguageStore = create<LanguageState>(() => ({
  activeLocale: getInitialLocale(),

  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    }
    useLanguageStore.setState({ activeLocale: locale });
  },
}));
