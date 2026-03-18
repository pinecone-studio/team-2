'use client';

import React from 'react';

export const QuickActionsSkeleton = () => {
  return (
    <div className="w-full max-w-[400px] flex flex-col gap-6 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-6 w-32 bg-gray-200 rounded-md ml-1" />

      {/* Action Buttons Grid Skeleton */}
      <div className="grid grid-cols-2 gap-5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="p-7 bg-white/70 border border-gray-100 rounded-[16px] min-h-[170px] flex flex-col gap-4"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-xl" />
            <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
            <div className="h-3 w-full bg-gray-100 rounded-md" />
          </div>
        ))}
      </div>

      {/* Timeline Card Skeleton */}
      <div className="bg-white/70 border border-gray-100 rounded-[16px] p-8 flex flex-col gap-9">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
              <div className="h-3 w-3/4 bg-gray-100 rounded-md" />
              <div className="h-3 w-1/4 bg-gray-50 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BenefitFilterSkeleton = () => {
  return (
    <div className="flex gap-4 mb-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-11 w-32 bg-gray-200 rounded-[10px]" />
      ))}
    </div>
  );
};
