'use client';

import { useEffect } from 'react';
import {
  useLanguageStore,
  LANGUAGE_STORAGE_KEY,
} from '@/store/languageStore';
import type { SupportedLocale } from '@/i18n/types';
import en from '@/i18n/en.json';
import mm from '@/i18n/mm.json';

type TranslationValue = string | Record<string, unknown>;

const dictionaries: Record<SupportedLocale, Record<string, TranslationValue>> = {
  en: en as Record<string, TranslationValue>,
  mm: mm as Record<string, TranslationValue>,
};

/**
 * Resolves a dot-separated translation key against a nested dictionary object.
 * Falls back to returning the key itself when the path cannot be resolved.
 *
 * @example resolvePath(en, 'nav.features') → "Features"
 * @example resolvePath(en, 'hero.headline') → "Transforming Myanmar's Education..."
 */
export function resolvePath(obj: Record<string, TranslationValue>, path: string): string {
  const keys = path.split('.');
  let current: TranslationValue = obj;
  for (const key of keys) {
    if (typeof current !== 'object' || current === null) return path;
    current = (current as Record<string, TranslationValue>)[key];
    if (current === undefined) return path;
  }
  return typeof current === 'string' ? current : path;
}

/**
 * useLanguage — primary i18n hook.
 *
 * Usage:
 *   const { locale, setLocale, t } = useLanguage()
 *   t('nav.features')   // → "Features" (en) or "လုပ်ဆောင်ချက်များ" (mm)
 *
 * Behaviour:
 * - On first client render, re-hydrates locale from localStorage['edusphere_lang'].
 * - `setLocale` updates both the Zustand store and localStorage atomically.
 * - Falls back to 'en' when no stored preference exists or on the server.
 *
 * Validates: Requirements 8.1, 8.2, 8.5
 */
export function useLanguage() {
  const { activeLocale, setLocale } = useLanguageStore();

  // Re-hydrate from localStorage on client mount in case the store was
  // initialized server-side (SSR) without access to localStorage.
  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLocale | null;
    if (stored === 'en' || stored === 'mm') {
      // Only update if the stored value differs from current store state
      // to avoid unnecessary re-renders.
      if (stored !== useLanguageStore.getState().activeLocale) {
        setLocale(stored);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Translate a dot-separated key path.
   *
   * @param key - Dot-notation key, e.g. "nav.features", "hero.headline"
   * @returns Translated string for the active locale, or the key itself as fallback.
   */
  const t = (key: string): string => {
    const dict = dictionaries[activeLocale];
    return resolvePath(dict, key);
  };

  return {
    locale: activeLocale,
    setLocale,
    t,
  };
}
