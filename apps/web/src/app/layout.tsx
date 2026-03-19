import './global.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { SidebarProvider } from '@team/source-ui';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Employee',
  description: 'Employee Benefits Management System',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="en" suppressHydrationWarning>
        <body>
          <SidebarProvider>
            <div className=" h-screen">
              {/* <TopNavBar /> */}
              <main className="flex-1 overflow-y-auto  text-gray-900">
                {children}
              </main>
            </div>
          </SidebarProvider>

          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
