import { Skeleton } from '@team/source-ui';

const accentSkeletonStyles = ['bg-[#F9DDE7]', 'bg-[#FCE3E9]', 'bg-[#F9DDE7]'];

export function MyBenefitsDashboardSkeleton() {
  return (
    <div className="mx-auto px-36 mt-4 py-2">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-10 w-44" />
        <Skeleton className="h-6 w-72 mt-2" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 justify-items-start gap-4 xl:grid-cols-[repeat(3,minmax(0,1fr))] xl:gap-x-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="relative w-full min-h-[261px] overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.08)] md:p-7"
          >
            <div
              className={`absolute right-0 top-0 h-[132px] w-[132px] rounded-bl-[132px] opacity-80 md:h-[144px] md:w-[144px] md:rounded-bl-[144px] ${accentSkeletonStyles[i % accentSkeletonStyles.length]}`}
            />

            <div className="relative z-10 flex min-h-[210px] flex-col md:min-h-[224px]">
              <Skeleton className="h-12 w-12 rounded-[16px] md:h-14 md:w-14" />

              <div className="mt-8 md:mt-9">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="mt-3 h-5 w-1/2" />
              </div>

              <div className="mt-auto pt-8 md:pt-10">
                <div className="h-px w-full bg-[#EEF2F6]" />
                <div className="flex items-center justify-between gap-4 pt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
