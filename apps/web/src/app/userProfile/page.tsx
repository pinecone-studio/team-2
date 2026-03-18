'use client';

import { useUserProfilePage } from './_components/use-user-profile-page';
import { UserProfileForm } from './_components/UserProfileForm';
import { SettingsFormSkeleton } from '../settings/_components/SettingsFormSkeleton';

export default function UserProfilePage() {
  const state = useUserProfilePage();

  if (state.status === 'loading-user') {
    return <SettingsFormSkeleton />;
  }

  if (state.status === 'signed-out') {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center text-gray-700 text-lg">
        Please sign in first.
      </div>
    );
  }

  if (state.status === 'checking') {
    return <SettingsFormSkeleton />;
  }

  return <UserProfileForm {...state} />;
}
