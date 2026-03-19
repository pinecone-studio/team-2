'use client';

type RequestLoadingOverlayProps = {
  open: boolean;
};

export function RequestLoadingOverlay({ open }: RequestLoadingOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
      <div className="flex h-[181px] w-[181px] flex-col items-center justify-center gap-3 rounded-[12px] border-[3px] border-white bg-[#D9D9D9] shadow-2xl">
        <div className="animate-spin">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="22"
              cy="22"
              r="15"
              stroke="white"
              strokeOpacity="0.55"
              strokeWidth="3.5"
            />
            <path
              d="M22 7
                 A15 15 0 0 1 36.5 22"
              stroke="#78C96A"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="text-[15px] font-medium text-white/85">Loading</p>
      </div>
    </div>
  );
}
