'use client';

import { useEffect, useState } from 'react';

type UserProfileCreatedPopupProps = {
  open: boolean;
};

export function UserProfileCreatedPopup({
  open,
}: UserProfileCreatedPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) return;

    setVisible(true);

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [open]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
      <div className="flex h-[198px] w-[300px] flex-col items-center justify-center gap-3 rounded-[8px] border border-[#E2E2E6] bg-white px-10 py-[30px] shadow-xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#22C55E]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-5 w-5 text-[#22C55E]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 6 9 17l-5-5"
            />
          </svg>
        </div>

        <p className="text-sm font-medium text-[#111827]">Saved</p>
      </div>
    </div>
  );
}
