import { Skeleton } from '@team/source-ui';

export function BenefitsManagementSkeleton() {
  return (
    <div className="min-h-screen w-full px-4 py-8">
      <div className="mx-auto max-w-[1215px]">
        <div className="mb-8">
          <h1 className="text-5xl font-bold tracking-[-0.04em] text-[#14213D]">
            Benefits Management
          </h1>
          <p className="mt-3 text-lg text-[#74839A]">
            Configure and manage company benefits
          </p>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_152px_152px]">
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, columnIndex) => (
            <section key={columnIndex}>
              <Skeleton className="mb-3 h-14 rounded-[18px]" />

              <div className="space-y-3">
                {columnIndex === 0 && (
                  <Skeleton className="h-24 rounded-[18px]" />
                )}

                {Array.from({ length: 2 }).map((_, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="rounded-[18px] border border-[#E5E7EB] bg-white p-4"
                  >
                    <Skeleton className="h-8 w-48 rounded-lg" />
                    <Skeleton className="mt-3 h-4 w-full rounded-lg" />
                    <Skeleton className="mt-2 h-4 w-3/4 rounded-lg" />
                    <Skeleton className="mt-4 h-6 w-20 rounded-lg" />
                    <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-3">
                      <Skeleton className="h-4 w-20 rounded-lg" />
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
