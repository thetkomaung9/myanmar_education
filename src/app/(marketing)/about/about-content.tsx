'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useRef, useState } from 'react';

const CountUpNumber = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress === 1) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [isVisible, target, duration]);

  return <div ref={ref}>{count}+</div>;
};

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="px-4 py-20 md:py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">{t('about.subtitle')}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('about.missionTitle')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('about.mission')}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('about.visionTitle')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('about.vision')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'schoolsServing', target: 50 },
              { label: 'studentsImpacted', target: 15000 },
              { label: 'teachersUsing', target: 1500 },
              { label: 'uptime', target: 99 },
            ].map(({ label, target }, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">
                  <CountUpNumber target={target} />
                </div>
                <p className="text-slate-600 dark:text-slate-300">{t(`about.${label}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            {t('about.teamTitle')}
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12">
            {t('about.teamDescription')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t(`about.team${i}.name`)}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  {t(`about.team${i}.role`)}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t(`about.team${i}.bio`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
