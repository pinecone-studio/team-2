'use client';

import { SidebarProvider } from '@team/source-ui';
import { usePathname } from 'next/navigation';
import { AdminGuard } from '../_components/AdminGuard';
import { TopNavBar } from '../_components/navBar/TopNavBar';
import { SecondaryPagesGradient } from '../_components/backgroundGradient/SecondaryPagesGradient';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPage = pathname === '/' || pathname === '/dashboard';

  return (
    <AdminGuard>
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col bg-[#FCFAF7]">
          <TopNavBar />
          <main className="relative flex-1 overflow-y-auto p-8 text-gray-900">
            {!isDashboardPage && <SecondaryPagesGradient />}
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </AdminGuard>
  );
}
