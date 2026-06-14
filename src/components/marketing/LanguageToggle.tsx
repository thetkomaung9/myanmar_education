'use client';

import { useLanguage } from '@/hooks/useLanguage';
import type { SupportedLocale } from '@/i18n/types';

const LOCALES: { code: SupportedLocale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'mm', label: 'မြ' },
];

/**
 * LanguageToggle — switches between English and Myanmar Unicode.
 * Persists selection to localStorage['edusphere_lang'].
 * Validates: Requirements 8.1, 8.3, 8.4, 8.5
 */
export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-md border border-neutral-200 p-0.5" role="group" aria-label="Select language">
      {LOCALES.map(({ code, label }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            aria-label={code === 'en' ? 'Switch to English' : 'Switch to Myanmar'}
            className={`min-h-[36px] min-w-[36px] rounded px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
              isActive
                ? 'bg-brand-600 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            } ${code === 'mm' ? 'font-myanmar' : ''}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
