'use client';

import { BrandLoader } from '../../_components/main/loading/BrandLoader';
import { useUserProfilePage } from './_components/use-user-profile-page';
import { UserProfileForm } from './_components/UserProfileForm';

export default function UserProfilePage() {
  const state = useUserProfilePage();

  if (state.status === 'loading-user') {
    return <BrandLoader className="min-h-screen" label="Loading profile" />;
  }

  if (state.status === 'signed-out') {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center text-gray-700 text-lg">
        Please sign in first.
      </div>
    );
  }

  if (state.status === 'checking') {
    return <BrandLoader className="min-h-screen" label="Checking profile" />;
  }

  return <UserProfileForm {...state} />;
}
