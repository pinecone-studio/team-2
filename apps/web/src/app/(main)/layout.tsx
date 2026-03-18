import { SidebarProvider } from '@team/source-ui';
import { TopNavBar } from '../_components/main/topSideBar/TopSideBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className=" h-screen flex flex-col">
        <TopNavBar />
        <main className="flex-1 overflow-y-auto  text-gray-900">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
