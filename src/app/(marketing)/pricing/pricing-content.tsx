'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { PricingCard } from '@/components/marketing/PricingCard';
import { useState } from 'react';

const PRICING_PLANS = [
  { id: 'starter', students: 100, monthlyPrice: 50, annualPrice: 500 },
  { id: 'professional', students: 500, monthlyPrice: 150, annualPrice: 1500, featured: true },
  { id: 'enterprise', students: 2000, monthlyPrice: 400, annualPrice: 4000 },
];

export default function PricingContent() {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="px-4 py-20 md:py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
            {t('pricing.subtitle')}
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
              }`}
            >
              {t('pricing.annual')}{' '}
              <span className="ml-2 text-sm font-semibold text-green-600">
                {t('pricing.save10')}
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                name={t(`pricing.${plan.id}.name`)}
                description={t(`pricing.${plan.id}.description`)}
                price={billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                billingCycle={billingCycle}
                students={plan.students}
                features={[
                  t(`pricing.${plan.id}.feature1`),
                  t(`pricing.${plan.id}.feature2`),
                  t(`pricing.${plan.id}.feature3`),
                  t(`pricing.${plan.id}.feature4`),
                ]}
                featured={plan.featured}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            {t('pricing.faqTitle')}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {t(`pricing.faq${i}.question`)}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{t(`pricing.faq${i}.answer`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
