'use client';

import { usePathname } from 'next/navigation';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

function getPortalFromPath(pathname: string) {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  if (['super-admin', 'school-admin', 'teacher', 'student'].includes(firstSegment)) {
    return firstSegment;
  }
  return 'student';
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const portal = getPortalFromPath(pathname);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <AppSidebar portal={portal} />
      <div className="ml-0 flex flex-1 flex-col overflow-hidden md:ml-0">
        <AppHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
