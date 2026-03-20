'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { LogOut, Settings } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  avatarClassName?: string;
};

// eslint-disable-next-line complexity
export function AccountMenu({ avatarClassName = 'h-8 w-8' }: Props) {
  const { openUserProfile, signOut } = useClerk();
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isSignedIn || !user) return null;

  const avatar = user.imageUrl ? (
    <img
      src={user.imageUrl}
      alt={user.fullName ?? 'User avatar'}
      className={`${avatarClassName} rounded-full object-cover`}
    />
  ) : (
    <div
      className={`${avatarClassName} flex items-center justify-center rounded-full bg-[#8B5E3C] text-sm font-medium text-white`}
    >
      {(user.firstName?.[0] ?? user.primaryEmailAddress?.emailAddress?.[0] ?? 'U').toUpperCase()}
    </div>
  );

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="rounded-full focus:outline-none"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open account menu"
      >
        {avatar}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-[80] mt-3 w-64 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            {avatar}
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-gray-900">
                {user.fullName ?? 'My account'}
              </p>
              <p className="truncate text-sm text-gray-500">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              openUserProfile();
            }}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-base text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Settings size={18} />
            <span>Manage account</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              void signOut({ redirectUrl: '/sign-in' });
            }}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-base text-gray-700 transition-colors hover:bg-gray-50"
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
}
