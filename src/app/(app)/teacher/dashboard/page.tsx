'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function TeacherDashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, Teacher!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage your classes, attendance, and student materials
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Classes Today', value: '4', icon: '📚' },
          { label: 'Students', value: '125', icon: '👥' },
          { label: 'Pending Assignments', value: '8', icon: '📝' },
          { label: 'Attendance Avg', value: '94%', icon: '✓' },
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Classes */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">My Classes</h2>
          <div className="space-y-3">
            {[
              'Grade 10A - English',
              'Grade 10B - English',
              'Grade 11A - Literature',
              'Grade 11B - Literature',
            ].map((classRoom, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border-l-4 border-brand-500"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{classRoom}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">45 students</p>
                </div>
                <button className="px-4 py-2 text-sm bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-100 rounded-lg hover:bg-brand-200 dark:hover:bg-brand-800 transition-colors">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tasks</h2>
          <div className="space-y-2">
            {[
              { task: 'Grade assignments', due: 'Today' },
              { task: 'Add attendance', due: 'Today' },
              { task: 'Review lesson plan', due: 'Tomorrow' },
              { task: 'Create exam', due: 'This week' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <input type="checkbox" className="mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.task}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
