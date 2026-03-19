import { Skeleton } from '@team/source-ui';

export function BenefitsManagementSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] py-8">
      {/* Header — real content, no skeleton */}
      <div className="max-w-[1215px] mx-auto flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[#0F172A] text-2xl font-bold tracking-tight">
            Benefits Management
          </h1>
          <p className="text-[#64748B] text-sm mt-1">
            Configure and manage company benefits
          </p>
        </div>
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white rounded-lg border border-gray-200 opacity-50 cursor-not-allowed"
        >
          Add Benefit
        </button>
      </div>

      {/* Table */}
      <div className="max-w-[1215px] mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                'Name',
                'Category',
                'Vendor',
                'Subsidy',
                'Status',
                'Actions',
              ].map((_, i) => (
                <th key={i} className="p-4 pb-1">
                  <Skeleton className="h-3 w-14" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 7 }).map((_, i) => (
              <tr key={i}>
                <td className="p-4">
                  <Skeleton className="h-4 w-36 mb-1.5" />
                  <Skeleton className="h-3 w-52" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-20 rounded-md" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-10" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-16 rounded-lg" />
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-1">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
