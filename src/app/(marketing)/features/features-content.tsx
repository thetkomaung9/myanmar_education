'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { FeatureCard } from '@/components/marketing/FeatureCard';
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  ShieldCheck,
  Users,
} from 'lucide-react';

const FEATURES = [
  { key: 'authentication', icon: ShieldCheck },
  { key: 'studentManagement', icon: GraduationCap },
  { key: 'teacherManagement', icon: Users },
  { key: 'attendance', icon: ClipboardCheck },
  { key: 'dashboard', icon: BarChart3 },
  { key: 'eClass', icon: BookOpen },
];

export default function FeaturesContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="px-4 py-20 md:py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('features.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
            {t('features.subtitle')}
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.key}
                icon={feature.icon}
                title={t(`features.${feature.key}.title`)}
                description={t(`features.${feature.key}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            Ready to transform your school?
          </h2>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Request a Demo Today
          </a>
        </div>
      </section>
    </div>
  );
}
