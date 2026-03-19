'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPaginationItems = () => {
    const pages: (number | string)[] = [];

    for (let i = 1; i <= Math.min(2, totalPages); i++) {
      pages.push(i);
    }

    const rangeStart = Math.max(3, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 2, currentPage + 1);

    if (rangeStart > 3) {
      pages.push('...');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 2) {
      pages.push('...');
    }

    for (let i = Math.max(totalPages - 1, 3); i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  const paginationItems = getPaginationItems();

  if (totalPages <= 1) return null;

  return (
    <div className="self-stretch w-full h-14 px-5 pt-3.5 border-t-[0.77px] border-gray-100 inline-flex flex-col justify-start items-start">
      <div className="self-stretch w-full h-7 inline-flex justify-between items-center">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex justify-start items-center gap-0.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed outline-none"
        >
          <ChevronLeft className="w-3 h-3" />

          <div className="text-center justify-start text-gray-600 text-xs font-medium">
            Previous
          </div>
        </button>

        <div className="h-5 flex justify-center items-center gap-4">
          {paginationItems.map((page, index) => {
            if (page === '...') {
              return (
                <div key={`ellipsis-${index}`} className="w-6 h-5 relative">
                  <div className="left-[6.19px] top-[-0.39px] absolute justify-start text-gray-400 text-xs font-normal leading-5">
                    ...
                  </div>
                </div>
              );
            }

            const pageNumber = page as number;
            const formattedPage = String(pageNumber).padStart(2, '0');
            const isActive = currentPage === pageNumber;

            if (isActive) {
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => onPageChange(pageNumber)}
                  className="w-9 px-2.5 py-[3px] bg-indigo-500 rounded inline-flex flex-col justify-center items-center gap-2.5 outline-none"
                >
                  <div className="self-stretch text-center justify-start text-white text-xs font-medium">
                    {formattedPage}
                  </div>
                </button>
              );
            }

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => onPageChange(pageNumber)}
                className="text-center justify-start text-gray-600 text-xs font-medium transition hover:text-gray-900 outline-none"
              >
                {formattedPage}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex justify-start items-center gap-[3px] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed outline-none"
        >
          <div className="text-center justify-start text-gray-900 text-xs font-medium">
            Next
          </div>

          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
