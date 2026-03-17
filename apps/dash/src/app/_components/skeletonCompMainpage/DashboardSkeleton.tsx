import { Skeleton } from '@team/source-ui';

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-gray-50 max-w-[100vw] mx-auto">
      <main className="flex-1 overflow-y-auto p-8 text-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="max-w-[1215px] flex justify-between items-start mb-8">
              <div>
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-96 mt-2" />
              </div>
            </div>

            {/* Charts row */}
            <div className="flex gap-10 justify-between max-w-[1215px]">
              <Skeleton className="h-64 flex-1 rounded-xl" />
              <Skeleton className="h-64 flex-1 rounded-xl" />
            </div>

            {/* Recent Requests */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-10 w-36 rounded-xl" />
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <th key={i} className="px-4 py-3">
                          <Skeleton className="h-3 w-16" />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3">
                          <Skeleton className="h-4 w-28" />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-4 w-24" />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton className="h-6 w-16 rounded-lg" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
