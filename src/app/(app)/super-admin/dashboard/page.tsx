'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function SuperAdminDashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Platform Administration
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Monitor all schools and manage the platform
        </p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Schools', value: '47', icon: '🏫' },
          { label: 'Total Users', value: '18,234', icon: '👥' },
          { label: 'System Health', value: '99.9%', icon: '✓' },
          { label: 'Support Tickets', value: '12', icon: '🎫' },
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* School Management */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Platform Management
          </h2>
          <div className="space-y-3">
            {[
              { item: 'Schools', value: '47 active', action: 'Manage' },
              { item: 'User Accounts', value: '18,234 total', action: 'Manage' },
              { item: 'System Logs', value: 'View activity', action: 'View' },
              { item: 'Settings', value: 'Configure platform', action: 'Edit' },
            ].map((record, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{record.item}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{record.value}</p>
                </div>
                <button className="px-4 py-2 text-sm bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-100 rounded-lg">
                  {record.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">System Status</h2>
          <div className="space-y-3">
            {[
              { service: 'API Server', status: 'Online' },
              { service: 'Database', status: 'Online' },
              { service: 'Email Service', status: 'Online' },
              { service: 'Storage', status: 'Online' },
              { service: 'CDN', status: 'Online' },
            ].map((service, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300 text-sm">
                  {service.service}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400">
                    {service.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
