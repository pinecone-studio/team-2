import React from 'react';
import { useUser } from '@clerk/nextjs';

const DEFAULT_NAME = 'John Doe';
const DEFAULT_ROLE = 'Engineering';

function getUserName(fullName: string | null | undefined): string {
  return fullName || DEFAULT_NAME;
}

function getUserRole(role: unknown): string {
  return (role as string) || DEFAULT_ROLE;
}

function UserInfo() {
  const { user } = useUser();
  const userName = getUserName(user?.fullName);
  const userRole = getUserRole(user?.publicMetadata?.role);

  return (
    <div className="flex flex-col truncate">
      <p className="text-sm font-bold text-gray-800 truncate">{userName}</p>
      <p className="text-[11px] text-gray-500 font-medium">{userRole}</p>
    </div>
  );
}

export { UserInfo };
