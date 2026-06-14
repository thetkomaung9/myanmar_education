import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  CalendarCheck,
  LayoutDashboard,
  ShieldCheck,
  Users,
  UserSquare,
} from 'lucide-react';
import { FeatureCard } from '@/components/marketing/FeatureCard';
import { Footer } from '@/components/marketing/Footer';
import { HeroSection } from '@/components/marketing/HeroSection';
import { Navbar } from '@/components/marketing/Navbar';
import { TestimonialCard } from '@/components/marketing/TestimonialCard';

export const metadata: Metadata = {
  title: 'EduSphere Myanmar — School Management & E-Class Platform',
  description:
    'EduSphere Myanmar digitizes school management and e-learning for Myanmar schools. Manage students, teachers, attendance, and classes in one platform.',
  openGraph: {
    title: 'EduSphere Myanmar — School Management & E-Class Platform',
    description:
      'EduSphere Myanmar digitizes school management and e-learning for Myanmar schools.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduSphere Myanmar — School Management & E-Class Platform',
    description:
      'EduSphere Myanmar digitizes school management and e-learning for Myanmar schools.',
  },
};

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description:
      'Role-based access for Super Admins, School Admins, Teachers, and Students with JWT security.',
  },
  {
    icon: Users,
    title: 'Student Management',
    description:
      'Manage student profiles, enrollment records, and academic history with powerful search.',
  },
  {
    icon: UserSquare,
    title: 'Teacher Management',
    description: 'Assign subjects, track workloads, and maintain comprehensive teacher profiles.',
  },
  {
    icon: CalendarCheck,
    title: 'Attendance Tracking',
    description:
      'Record daily attendance with Present, Absent, Late statuses and generate reports instantly.',
  },
  {
    icon: LayoutDashboard,
    title: 'Analytics Dashboard',
    description: 'Actionable insights for school performance and attendance summaries at a glance.',
  },
  {
    icon: BookOpen,
    title: 'E-Class System',
    description:
      'Upload materials, create assignments, and publish announcements for online learning.',
  },
];

const howItWorksSteps = [
  {
    number: '01',
    title: 'Register Your School',
    description: 'Create your school profile and set up the administrator account in minutes.',
  },
  {
    number: '02',
    title: 'Onboard Teachers & Students',
    description: 'Add your staff and student roster using our guided setup wizard.',
  },
  {
    number: '03',
    title: 'Go Live',
    description:
      'Start recording attendance, publishing materials, and tracking performance instantly.',
  },
];

const testimonials = [
  {
    quote:
      'EduSphere Myanmar completely transformed how we manage our school. Attendance records that used to take hours now take minutes.',
    authorName: 'Daw Khin Myo',
    role: 'Principal',
    schoolName: 'Basic Education High School No. 1, Yangon',
  },
  {
    quote:
      'The E-Class system lets me share materials with my students easily. They can access everything from their phones.',
    authorName: 'U Kyaw Zin',
    role: 'Mathematics Teacher',
    schoolName: 'Basic Education Middle School No. 3, Mandalay',
  },
  {
    quote:
      'As a school administrator, the dashboard gives me a complete picture of our school every morning. Highly recommended.',
    authorName: 'Daw Aye Aye Thwe',
    role: 'School Administrator',
    schoolName: 'TGI School, Naypyitaw',
  },
];

const trustedSchools = [
  'BEHS No. 1 Yangon',
  'BEMS No. 3 Mandalay',
  'TGI School',
  'မင်္ဂလာ အထကစဉ်',
  'Myoma School',
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        <section
          aria-label="Trusted by schools"
          className="border-y border-neutral-200 bg-neutral-50 py-8 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Trusted by schools across Myanmar
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {trustedSchools.map((school) => (
                <span
                  key={school}
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                Everything Your School Needs
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
                A complete platform designed for modern Myanmar schools
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-brand-50 py-20 dark:bg-brand-900/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-white">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-xl font-extrabold text-white">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900 dark:text-white">
              What Schools Are Saying
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.authorName} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-600 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to Transform Your School?</h2>
            <p className="mb-8 text-brand-100">
              Join schools across Myanmar already using EduSphere.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-bold text-brand-600 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600"
              >
                Request a Demo
              </Link>
              <Link
                href="/features"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 border-white px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
