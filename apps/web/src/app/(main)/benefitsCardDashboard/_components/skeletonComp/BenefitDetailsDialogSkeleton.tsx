import { Skeleton } from '@team/source-ui';

export function BenefitDetailsDialogSkeleton() {
  return (
    <div className="space-y-4">
      <div className="mt-4 rounded-[8px] bg-[#F8F8F8] px-[16px] py-[18px]">
        <Skeleton className="h-[19px] w-[210px]" />
      </div>

      <section>
        <Skeleton className="h-[19px] w-[96px]" />
        <Skeleton className="mt-[6px] h-[15px] w-full" />
        <Skeleton className="mt-[4px] h-[15px] w-[78%]" />
      </section>

      <section className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[6px] border border-[#E5E7EB] bg-[#F9FAFB] px-[10px] py-[7px] shadow-[0_6px_16px_rgba(15,23,42,0.03)]"
          >
            <Skeleton className="mb-1 h-[12px] w-[72px]" />
            <Skeleton className="h-[16px] w-[88px]" />
          </div>
        ))}
      </section>

      <section>
        <Skeleton className="h-[17px] w-[108px]" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-[12px] bg-[#ECFDF5] px-[14px] py-[10px]"
            >
              <Skeleton className="mt-1.5 h-5 w-5 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-[16px] w-[126px]" />
                <Skeleton className="mt-1.5 h-[14px] w-[172px]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[12px] bg-[#FFFBE9] px-[14px] py-[10px]">
        <div className="flex items-start gap-4">
          <Skeleton className="mt-1.5 h-5 w-5 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-[16px] w-[168px]" />
            <Skeleton className="mt-1.5 h-[14px] w-[220px] max-w-full" />
          </div>
        </div>
      </section>

      <section className="flex gap-2">
        <Skeleton className="h-[33px] flex-1 rounded-[6px]" />
      </section>
    </div>
  );
}
