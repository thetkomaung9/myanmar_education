import AppSidebar from '@/components/app/AppSidebar';
import AppHeader from '@/components/app/AppHeader';

export default function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { portal: string };
}) {
  // Extract portal name from the pathname (super-admin, school-admin, teacher, student)
  const portal = params.portal || 'student';

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <AppSidebar portal={portal} />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-0">
        <AppHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
