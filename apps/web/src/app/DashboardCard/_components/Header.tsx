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

        {/* Right */}
        <div className="flex items-center gap-6">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-5 h-5 rounded" />

          <div className="flex items-center gap-3 border-l pl-6">
            <div className="space-y-1 text-right">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
            <Skeleton className="w-9 h-9 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-[32px]">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hello {user?.firstName ?? user?.fullName ?? ''}
        </h1>
        <p className="text-[#666666]">Welcome to the company benefit system </p>
      </div>
    </div>
  );
}
