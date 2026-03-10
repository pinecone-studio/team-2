'use client';

import React from 'react';
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useAuth,
} from '@clerk/nextjs';

const getUserId = (
  isSignedIn: boolean | undefined,
  userId: string | null | undefined,
): string | null => {
  return isSignedIn ? (userId ?? null) : null;
};

const SignedOutButtons = () => (
  <>
    <SignInButton mode="modal" />
    <SignUpButton>
      <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
        Sign Up
      </button>
    </SignUpButton>
  </>
);

export const Header = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const userId = getUserId(isSignedIn, user?.id);

  console.log({ userId });

  return (
    <div className="py-2 px-6 bg-gray-200 w-screen flex justify-end">
      {!isSignedIn && <SignedOutButtons />}
      {isSignedIn && <UserButton />}
    </div>
  );
};
