'use client';

import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { findCurrentEmployee } from './employee/find-current-employee';
import { BrandLoader } from '../../../_components/main/loading/BrandLoader';

export function EmployeeGatePage() {
  const { user, isLoaded } = useUser();
  const { sessionId } = useAuth();
  const router = useRouter();

  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.replace('/sign-in');
      return;
    }

    void routeUser(user.id, sessionId, router, setError);
  }, [isLoaded, user, sessionId, router]);

  if (!isLoaded) {
    return <BrandLoader className="min-h-screen" label="Loading account" />;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <BrandLoader className="min-h-screen" label="Checking employee access" />
  );
}

async function routeUser(
  clerkUserId: string,
  sessionId: string | null | undefined,
  router: ReturnType<typeof useRouter>,
  setError: (value: string) => void,
) {
  try {
    const employee = await findCurrentEmployee(clerkUserId);

    if (employee) {
      const queuedForSession = sessionStorage.getItem(
        'dashboardWelcomeQueuedForSession',
      );

      if (sessionId && queuedForSession !== sessionId) {
        sessionStorage.setItem('showDashboardWelcome', 'true');
        sessionStorage.setItem('dashboardWelcomeQueuedForSession', sessionId);
      }

      router.replace('/dashboard');
      return;
    }

    router.replace('/userProfile');
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to check employee';
    setError(message);
  }
}
