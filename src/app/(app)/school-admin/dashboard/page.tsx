'use client';

import Link from 'next/link';

export default function SchoolAdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          School Administration Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage your school&apos;s overall operations and performance
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '1,234', icon: '👨‍🎓' },
          { label: 'Total Teachers', value: '64', icon: '👨‍🏫' },
          { label: 'Avg Attendance', value: '92%', icon: '📊' },
          { label: 'Classes', value: '48', icon: '🏫' },
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Management */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            Management Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Students',
                desc: '1,234 enrolled',
                action: 'Manage',
                href: '/school-admin/students',
              },
              {
                title: 'Teachers',
                desc: '64 staff',
                action: 'Manage',
                href: '/school-admin/teachers',
              },
              {
                title: 'Classes',
                desc: '48 active',
                action: 'Manage',
                href: '/school-admin/classes',
              },
              {
                title: 'Reports',
                desc: 'Attendance & Performance',
                action: 'View',
                href: '/school-admin/reports/attendance',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-block text-sm text-brand-600 hover:font-semibold dark:text-brand-400"
                >
                  {item.action} →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {[
              { type: 'warning', msg: '3 low attendance cases' },
              { type: 'info', msg: 'Staff training scheduled' },
              { type: 'success', msg: 'Term data imported' },
            ].map((alert, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-sm ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-100'
                    : alert.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-100'
                      : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-100'
                }`}
              >
                {alert.msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
