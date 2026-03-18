export const EmployeeFormSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Profile Photo Card Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gray-100" />
        <div className="space-y-3">
          <div className="h-4 w-32 bg-gray-100 rounded" />
          <div className="h-3 w-48 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Form Fields Section Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="p-7 space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-10 w-full bg-gray-50 rounded-lg border border-gray-100" />
              </div>
            ))}
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 bg-gray-100 rounded" />
                <div className="h-10 w-full bg-gray-50 rounded-lg border border-gray-100" />
              </div>
            ))}
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="h-10 w-full bg-gray-50 rounded-lg border border-gray-100" />
              </div>
            ))}
          </div>

          <div className="h-14 w-full bg-gray-50 rounded-xl border border-gray-100" />
        </div>

        <div className="bg-gray-50/80 px-7 py-5 border-t border-gray-100 flex justify-end gap-3">
          <div className="h-9 w-20 bg-gray-200 rounded-lg" />
          <div className="h-10 w-32 bg-gray-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
