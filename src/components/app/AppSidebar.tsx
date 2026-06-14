'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { Menu, X, LogOut, Settings } from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon?: string;
}

const PORTAL_LINKS: Record<string, SidebarLink[]> = {
  'super-admin': [
    { href: '/(app)/super-admin/dashboard', label: 'dashboard' },
    { href: '/(app)/super-admin/schools', label: 'schools' },
    { href: '/(app)/super-admin/users', label: 'users' },
    { href: '/(app)/super-admin/announcements', label: 'announcements' },
  ],
  'school-admin': [
    { href: '/(app)/school-admin/dashboard', label: 'dashboard' },
    { href: '/(app)/school-admin/students', label: 'students' },
    { href: '/(app)/school-admin/teachers', label: 'teachers' },
    { href: '/(app)/school-admin/classes', label: 'classes' },
    { href: '/(app)/school-admin/reports/attendance', label: 'attendance' },
  ],
  teacher: [
    { href: '/(app)/teacher/dashboard', label: 'dashboard' },
    { href: '/(app)/teacher/attendance', label: 'attendance' },
    { href: '/(app)/teacher/materials', label: 'materials' },
    { href: '/(app)/teacher/assignments', label: 'assignments' },
    { href: '/(app)/teacher/announcements', label: 'announcements' },
  ],
  student: [
    { href: '/(app)/student/dashboard', label: 'dashboard' },
    { href: '/(app)/student/attendance', label: 'attendance' },
    { href: '/(app)/student/materials', label: 'materials' },
    { href: '/(app)/student/assignments', label: 'assignments' },
    { href: '/(app)/student/announcements', label: 'announcements' },
  ],
};

export default function AppSidebar({ portal }: { portal: string }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const links = PORTAL_LINKS[portal] || [];

  const handleLogout = () => {
    // TODO: Call logout API
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 text-slate-700 dark:text-slate-300"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl mb-8 text-brand-600">
            EduSphere
          </Link>

          {/* Portal Name */}
          <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
              {t(`portals.${portal}`)}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-100 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t(`portals.common.${link.label}`)}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-sm"
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <Link
              href="/settings"
              className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-sm"
            >
              <Settings size={16} className="inline mr-2" />
              {t('portals.common.settings')}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors text-sm"
            >
              <LogOut size={16} className="inline mr-2" />
              {t('portals.common.logout')}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
