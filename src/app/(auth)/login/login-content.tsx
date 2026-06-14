'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Call API endpoint
      router.push('/student/dashboard');
    } catch {
      setError(t('auth.loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Brand & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 to-brand-800 text-white flex-col justify-between p-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">EduSphere Myanmar</h1>
          <p className="text-brand-100 text-lg">{t('auth.loginSubtitle')}</p>
        </div>

        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-500 flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t(`auth.benefit${i}Title`)}</h3>
                <p className="text-brand-100 text-sm">{t(`auth.benefit${i}Desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white dark:bg-slate-950">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {t('auth.loginTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">{t('auth.loginDescription')}</p>

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

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                {t('auth.passwordLabel')}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                />
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  {t('auth.rememberMe')}
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {isLoading ? t('auth.signingIn') : t('auth.signIn')}
            </button>
          </form>

          <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
            {t('auth.noAccount')}{' '}
            <Link
              href="/"
              className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-semibold"
            >
              {t('auth.contactSupport')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
