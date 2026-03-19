'use client';

import { Skeleton } from '@team/source-ui';
import { SecondaryPagesGradient } from '../../../_components/main/backgroundGradient/SecondaryPagesGradient';

export function SettingsFormSkeleton() {
  return (
    <div className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-white">
      <SecondaryPagesGradient />

      <div className="relative z-10 mx-auto flex h-full max-w-[1027px] items-center">
        <div className="w-full bg-transparent shadow-none">
          <div className="mb-10 flex flex-col items-center md:items-start">
            <Skeleton className="h-6 w-28 rounded-md" />
            <Skeleton className="mt-2 h-0.5 w-16 rounded-full" />
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8">
              <div className="relative">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="absolute bottom-1 right-1 h-8 w-8 rounded-full" />
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />
                <FieldSkeleton />

                <div className="col-span-full flex items-center gap-3 pt-2">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-4 w-28 rounded-md" />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-end gap-3">
                <Skeleton className="h-11 w-full rounded-lg md:w-40" />
                <Skeleton className="h-5 w-44 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-4 w-28 rounded-md" />
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}
