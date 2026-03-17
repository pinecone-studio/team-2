import { Skeleton } from '@team/source-ui';
import { Separator } from '@team/source-ui';

export function BenefitDetailsDialogSkeleton() {
  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-14 rounded-lg" />
      </div>
      <Skeleton className="h-4 w-3/4" />

      {/* Section 1: Benefit Details */}
      <section>
        <Skeleton className="h-3 w-24 mb-3" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2"
            >
              <Skeleton className="h-2.5 w-16 mb-1.5" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Section 2: Eligibility Rules */}
      <section>
        <Skeleton className="h-3 w-28 mb-3" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
            >
              <Skeleton className="h-4 w-4 rounded-full shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2.5 w-2/3" />
              </div>
              <Skeleton className="h-5 w-12 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Section 3: My Request */}
      <section>
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </section>
    </div>
  );
}
