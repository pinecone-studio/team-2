'use client';

import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@team/source-ui';

type HeaderProps = {
  isLoading?: boolean;
};

export function Header({ isLoading = false }: HeaderProps) {
  const { user } = useUser();
  if (isLoading) {
    return (
      <div className="flex items-center justify-between mb-6 animate-[pulse_1.5s_infinite]">
        {/* Left */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded" />
          <Skeleton className="h-4 w-96 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-[34px] mt-3">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hello {user?.firstName ?? user?.fullName ?? ''}
        </h1>
        <p className="text-[#666666]">Welcome to the company benefit system </p>
      </div>
    </div>
  );
}
