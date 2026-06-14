'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { demoRequestSchema, type DemoRequestFormData } from '@/lib/validators';

/**
 * ContactForm (Request Demo Form) — Validates: Requirements 7.2–7.7
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    mode: 'onBlur',
  });

  async function onSubmit(data: DemoRequestFormData) {
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server error');
      toast.success("Your demo request has been submitted. We'll be in touch soon.");
      reset();
    } catch {
      toast.error('Submission failed. Please try again.');
    }
  }

  return (
    <form
      id="request-demo-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      {/* School Name */}
      <div>
        <label htmlFor="schoolName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          School Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="schoolName"
          type="text"
          placeholder="e.g. Basic Education High School No. 1"
          {...register('schoolName')}
          className="w-full min-h-[44px] rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-describedby={errors.schoolName ? 'schoolName-error' : undefined}
        />
        {errors.schoolName && (
          <p id="schoolName-error" role="alert" className="mt-1 text-xs text-semantic-error">
            {errors.schoolName.message}
          </p>
        )}
      </div>

      {/* Contact Name */}
      <div>
        <label htmlFor="contactName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Contact Person Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="contactName"
          type="text"
          placeholder="Your full name"
          {...register('contactName')}
          className="w-full min-h-[44px] rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-describedby={errors.contactName ? 'contactName-error' : undefined}
        />
        {errors.contactName && (
          <p id="contactName-error" role="alert" className="mt-1 text-xs text-semantic-error">
            {errors.contactName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Email Address <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          className="w-full min-h-[44px] rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-semantic-error">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Phone Number <span className="text-neutral-400 font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+95 9 xxx xxx xxx"
          {...register('phone')}
          className="w-full min-h-[44px] rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        />
      </div>

      {/* School Size */}
      <div>
        <label htmlFor="schoolSize" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          School Size <span aria-hidden="true">*</span>
        </label>
        <select
          id="schoolSize"
          {...register('schoolSize')}
          className="w-full min-h-[44px] rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-describedby={errors.schoolSize ? 'schoolSize-error' : undefined}
        >
          <option value="">Select school size…</option>
          <option value="small">Fewer than 100 students</option>
          <option value="medium">100–500 students</option>
          <option value="large">More than 500 students</option>
        </select>
        {errors.schoolSize && (
          <p id="schoolSize-error" role="alert" className="mt-1 text-xs text-semantic-error">
            {errors.schoolSize.message}
          </p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <fieldset>
        <legend className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Preferred Contact Method <span aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          {(['email', 'phone', 'in-person'] as const).map((method) => (
            <label key={method} className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <input
                type="radio"
                value={method}
                {...register('contactMethod')}
                className="h-4 w-4 text-brand-600 border-neutral-300 focus:ring-brand-600"
              />
              <span className="capitalize">{method === 'in-person' ? 'In-Person' : method.charAt(0).toUpperCase() + method.slice(1)}</span>
            </label>
          ))}
        </div>
        {errors.contactMethod && (
          <p role="alert" className="mt-1 text-xs text-semantic-error">
            {errors.contactMethod.message}
          </p>
        )}
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Message <span className="text-neutral-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about your school and what you're looking for…"
          {...register('message')}
          className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[44px] rounded-md bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting…' : 'Submit Request'}
      </button>
    </form>
  );
}
