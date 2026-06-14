'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-400/10 dark:from-background-dark dark:via-neutral-900 dark:to-neutral-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div>
            <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600 mb-4">
              School Management & E-Class Platform
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
              {t('hero.headline')}
            </h1>
            <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
              {t('hero.subHeadline')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                {t('hero.primaryCta')}
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-brand-600 px-6 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                {t('hero.secondaryCta')}
              </Link>
            </div>
          </div>

          {/* Product screenshot */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <Image
                src="/images/dashboard-preview.png"
                alt="EduSphere Myanmar admin dashboard showing student management, attendance charts, and class overview"
                width={1200}
                height={630}
                className="w-full object-cover"
                priority
                onError={(e) => {
                  // Fallback to a placeholder gradient if image not found
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback illustrated preview */}
              <div className="flex h-72 w-full items-center justify-center bg-gradient-to-br from-brand-100 to-accent-400/20 text-brand-600">
                <div className="text-center p-8">
                  <div className="text-5xl mb-3">📊</div>
                  <p className="font-semibold text-brand-800">EduSphere Dashboard</p>
                  <p className="text-sm text-brand-600 mt-1">School Management Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
