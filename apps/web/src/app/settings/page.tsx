'use client';

import { SettingsForm } from './_components/SettingsForm';
import { SettingsFormSkeleton } from './_components/SettingsFormSkeleton';
import { useSettingsPage } from './_components/use-settings-page';

export default function SettingsPage() {
  const state = useSettingsPage();

  if (state.status === 'loading-user' || state.status === 'loading-employee') {
    return <SettingsFormSkeleton />;
  }

  if (state.status === 'signed-out') {
    return (
      <div className="p-6 text-red-500">
        You must be signed in to view settings.
      </div>
    );
  }

  if (state.status === 'not-found') {
    return (
      <div className="p-6 text-red-500">
        No employee profile found. Please complete your{' '}
        <a href="/userProfile" className="underline">
          user profile
        </a>{' '}
        first.
      </div>
    );
  }

  return <SettingsForm {...state} />;
}
