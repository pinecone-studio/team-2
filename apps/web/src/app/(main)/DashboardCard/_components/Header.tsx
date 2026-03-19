'use client';

import { useUser } from '@clerk/nextjs';

type HeaderProps = {
  isLoading?: boolean;
};

export function Header({ isLoading = false }: HeaderProps) {
  const { user } = useUser();
  const containerClassName =
    'mx-auto w-full max-w-[1640px] px-2 sm:px-4 lg:px-5 2xl:px-6';

  if (isLoading) {
    return (
      <div className={`${containerClassName} mb-6 mt-3 animate-[pulse_1.5s_infinite]`}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-10 w-[220px] rounded-md bg-gray-200" />
            <div className="h-[30px] w-[360px] rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClassName} mb-[34px] mt-6`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hello {user?.firstName ?? user?.fullName ?? ''}
          </h1>
          <p className="text-[#666666]">
            Welcome to the company benefit system
          </p>
        </div>
      </div>
    </div>
  );
}
