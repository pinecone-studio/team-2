import './global.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'HR | EBMS',
  description: 'Platform for connecting HR and Employee to get a company benefit.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html suppressHydrationWarning lang="en">
        <body>
          {children}
          <Toaster position={'top-center'} />
        </body>
      </html>
    </ClerkProvider>
  );
}
