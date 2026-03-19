import { Skeleton } from '@team/source-ui';

function TableSkeleton({ cols, rows = 6 }: { cols: number; rows?: number }) {
  return (
    <div className="p-5 bg-white rounded-lg w-full border border-gray-100 shadow-sm">
      <div className="mb-6 px-4">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-32 mt-1" />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[1000px] table-fixed">
          <thead>
            <tr className="border-b border-black/10">
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="border-b border-black/10 h-14">
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-28" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-36" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-24" />
                </td>
                {cols === 5 && (
                  <td className="px-4 py-2">
                    <Skeleton className="h-4 w-24" />
                  </td>
                )}
                <td className="px-4 py-2">
                  <Skeleton className="h-[29px] w-[90px] rounded-lg" />
                </td>
                {cols === 5 && (
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-20 rounded-lg" />
                      <Skeleton className="h-8 w-20 rounded-lg" />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ProcessedRequestsSkeletonNavbar() {
  return (
    <div className="w-full min-h-screen  py-8">
      <div className="max-w-[1215px] mx-auto">
        <div className="flex flex-col justify-start items-start">
          {/* Real header, no skeleton */}
          <div className="flex flex-col mb-8">
            <h1 className="text-[#0F172A] text-2xl font-bold tracking-tight">
              Request Management
            </h1>
            <p className="text-[#64748B] text-sm mt-1">
              Review and process employee benefit requests
            </p>
          </div>

          {/* Tables */}
          <div className="flex flex-col justify-center items-center gap-8 w-full">
            <TableSkeleton cols={5} rows={4} />
            <TableSkeleton cols={5} rows={6} />
          </div>
        </div>
      </div>
    </div>
  );
}
