'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { findCurrentEmployee } from './employee/find-current-employee';
import { Spinner } from 'libs/ui/src/components/spinner';

export function EmployeeGatePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.replace('/sign-in');
      return;
    }

    void routeUser(user.id, router, setError);
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <Spinner className="w-16 h-16 opacity-30" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <Spinner className="w-16 h-16 opacity-30" />
    </div>
  );
}

async function routeUser(
  clerkUserId: string,
  router: ReturnType<typeof useRouter>,
  setError: (value: string) => void,
) {
  try {
    const employee = await findCurrentEmployee(clerkUserId);

    if (employee) {
      router.replace('/dashboard');
      return;
    }

    router.replace('/userProfile');
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to check employee';
    setError(message);
  }
}
