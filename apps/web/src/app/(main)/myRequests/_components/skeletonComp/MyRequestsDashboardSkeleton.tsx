import { Skeleton } from '@team/source-ui';

function TableSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#EEF2F6] bg-white/92 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#EEF2F6]">
            {Array.from({ length: 6 }).map((_, i) => (
              <th key={i} className="px-5 py-4">
                <Skeleton className="h-3 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEF2F6]">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-5 py-4">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MyRequestsDashboardSkeleton() {
  return (
    <div className="mx-auto mt-4 space-y-8 px-36 py-2">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-5 w-72" />
      </div>

      {/* Pending section */}
      <section>
        <div className="mb-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
        <TableSkeleton rows={4} />
      </section>

      {/* Processed section */}
      <section>
        <div className="mb-3">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
        <TableSkeleton rows={4} />
      </section>
    </div>
  );
}
