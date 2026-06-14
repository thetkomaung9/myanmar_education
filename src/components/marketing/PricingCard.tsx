'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

export interface PricingTier {
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  isAnnual: boolean;
}

/**
 * PricingCard — Validates: Requirements 5.2, 5.3
 */
export function PricingCard({ tier, isAnnual }: PricingCardProps) {
  const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
  const discountPct =
    tier.monthlyPrice && tier.annualPrice
      ? Math.round((1 - tier.annualPrice / 12 / tier.monthlyPrice) * 100)
      : 0;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md ${
        tier.highlighted
          ? 'border-brand-600 bg-brand-600 text-white'
          : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-400 px-3 py-0.5 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <h3 className={`text-lg font-bold mb-1 ${tier.highlighted ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
          {tier.name}
        </h3>
        <p className={`text-sm ${tier.highlighted ? 'text-brand-100' : 'text-neutral-500 dark:text-neutral-400'}`}>
          {tier.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {price !== null ? (
          <>
            <span className={`text-4xl font-extrabold ${tier.highlighted ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
              ${price}
            </span>
            <span className={`text-sm ml-1 ${tier.highlighted ? 'text-brand-100' : 'text-neutral-500'}`}>
              {isAnnual ? '/ month (billed annually)' : '/ month'}
            </span>
            {isAnnual && discountPct > 0 && (
              <span className="ml-2 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                Save {discountPct}%
              </span>
            )}
          </>
        ) : (
          <span className={`text-2xl font-bold ${tier.highlighted ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
            Contact Us
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-3" role="list">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${tier.highlighted ? 'text-brand-200' : 'text-brand-600'}`} aria-hidden="true" />
            <span className={tier.highlighted ? 'text-brand-100' : 'text-neutral-600 dark:text-neutral-300'}>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact#request-demo-form"
        className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          tier.highlighted
            ? 'bg-white text-brand-600 hover:bg-brand-50 focus-visible:ring-white'
            : 'bg-brand-600 text-white hover:bg-brand-800 focus-visible:ring-brand-600'
        }`}
      >
        {tier.ctaLabel}
      </Link>
    </div>
  );
}
