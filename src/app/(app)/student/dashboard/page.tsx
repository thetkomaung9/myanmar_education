'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function StudentDashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, Student!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Here's an overview of your academic progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Attendance Rate', value: '96%', icon: '📊' },
          { label: 'Assignments Done', value: '23/25', icon: '✓' },
          { label: 'Current Grade', value: 'A', icon: '⭐' },
          { label: 'Classes Today', value: '5', icon: '📚' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            This Week's Schedule
          </h2>
          <div className="space-y-3">
            {['Mathematics', 'English', 'Science', 'History'].map((subject, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <span className="font-medium text-slate-900 dark:text-white">{subject}</span>
                <span className="text-xs px-3 py-1 bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-100 rounded-full">
                  {i + 1} class
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Links</h2>
          <div className="space-y-2">
            {[
              { label: 'View Materials', href: '#' },
              { label: 'Check Assignments', href: '#' },
              { label: 'My Grades', href: '#' },
              { label: 'Announcements', href: '#' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="block p-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
