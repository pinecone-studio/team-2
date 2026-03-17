import { Skeleton } from '@team/source-ui';

export function BenefitsCardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Filter skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Cards grid skeleton */}
      <div className="mt-[38px] grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[24px] border border-gray-100 p-6 flex flex-col gap-4 min-h-[240px]"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <div className="mt-auto">
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
