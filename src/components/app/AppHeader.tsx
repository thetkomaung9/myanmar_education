'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Breadcrumb {
  label: string;
  href?: string;
}

export default function AppHeader({ breadcrumbs = [] }: { breadcrumbs?: Breadcrumb[] }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  // Generate breadcrumbs from pathname if not provided
  const defaultBreadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .slice(1) // Skip (app) group
    .map((segment, i, arr) => ({
      label: t(`breadcrumb.${segment}`) || segment,
      href: i === arr.length - 1 ? undefined : `/${arr.slice(0, i + 1).join('/')}`,
    }));

  const displayBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2">
          {displayBreadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-slate-400">/</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-900 dark:text-white font-semibold">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
              <span className="hidden sm:inline text-sm font-medium text-slate-900 dark:text-white">
                Admin
              </span>
              <ChevronDown size={16} className="text-slate-600 dark:text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {t('portals.common.profile')}
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {t('portals.common.settings')}
                </Link>
                <hr className="my-2 border-slate-200 dark:border-slate-700" />
                <button
                  onClick={() => {
                    // TODO: Handle logout
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  {t('portals.common.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
