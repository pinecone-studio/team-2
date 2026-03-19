import { SidebarProvider } from '@team/source-ui';
import { TopNavBar } from '../_components/navBar/TopNavBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col w-full bg-gray-50">
        <TopNavBar />
        <main className="flex-1 overflow-y-auto p-8 text-gray-900">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
