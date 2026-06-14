'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { ContactForm } from '@/components/marketing/ContactForm';

export default function ContactContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <section className="px-4 py-20 md:py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>

            <div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {t('contact.emailLabel')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">hello@edusphere.mm</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {t('contact.phoneLabel')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">+95 (0) 1 234 5678</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {t('contact.locationLabel')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">Yangon, Myanmar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            {t('contact.faqTitle')}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {t(`contact.faq${i}.question`)}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{t(`contact.faq${i}.answer`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
