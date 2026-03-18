'use client';

import { useUserProfilePage } from './_components/use-user-profile-page';
import { UserProfileForm } from './_components/UserProfileForm';

export default function UserProfilePage() {
  const state = useUserProfilePage();

  if (state.status === 'loading-user') {
    return <div className="p-6">Loading Clerk user...</div>;
  }

  if (state.status === 'signed-out') {
    return <div className="p-6">Please sign in first.</div>;
  }

  if (state.status === 'checking') {
    return <div className="p-6">Checking employee profile...</div>;
  }

  return <UserProfileForm {...state} />;
}
