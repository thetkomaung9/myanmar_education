'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordContent() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Call API endpoint to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch {
      setError(t('auth.errorSendingEmail'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-slate-950">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {t('auth.checkYourEmail')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {t('auth.resetEmailSent')} <strong>{email}</strong>
          </p>
          <Link
            href="/login"
            className="inline-block text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-semibold"
          >
            {t('auth.backToLogin')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-slate-950">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t('auth.forgotPasswordTitle')}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {t('auth.forgotPasswordDescription')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
              <p className="text-red-800 dark:text-red-100 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              {t('auth.emailLabel')}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder')}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {isLoading ? t('auth.sending') : t('auth.sendResetLink')}
          </button>
        </form>

        <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
          {t('auth.rememberPassword')}{' '}
          <Link
            href="/login"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-semibold"
          >
            {t('auth.signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
}
