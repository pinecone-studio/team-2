'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  const isAdmin = user?.publicMetadata?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-[#E5E7EB] bg-white p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#F28D36]">
            Access Restricted
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#111827]">
            Admin access only
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            Your account does not have the admin role required to use this
            dashboard.
          </p>

          <div className="mt-6">
            <button
              type="button"
              // onClick={() => signOut({ redirectUrl: '/sign-in' })}
              onClick={() => router.push('/sign-in')}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#111827] px-5 text-sm font-medium text-white transition hover:bg-[#1F2937]"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
