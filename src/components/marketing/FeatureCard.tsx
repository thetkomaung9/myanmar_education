import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * FeatureCard — displays a platform capability with icon, title, and description.
 * Description must be ≤25 words. Validates: Requirements 3.3
 */
export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}
