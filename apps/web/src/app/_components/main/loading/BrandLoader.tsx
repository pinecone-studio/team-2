'use client';

type BrandLoaderProps = {
  label?: string;
  className?: string;
};

export function BrandLoader({
  label = 'Loading your workspace',
  className = '',
}: BrandLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-10 flex w-full items-center justify-center ${className}`}
    >
      <div className="pointer-events-none flex flex-col items-center justify-center gap-5">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(251,146,60,0.28)_0%,_rgba(250,204,21,0.12)_45%,_transparent_72%)] blur-md animate-pulse" />
          <div className="absolute h-20 w-20 rounded-full border-[3px] border-transparent border-t-[#FB923C] border-r-[#F59E0B] animate-spin" />
          <div className="absolute h-12 w-12 rounded-full border-[3px] border-transparent border-b-[#FDBA74] border-l-[#FACC15] animate-[spin_1.4s_linear_infinite_reverse]" />
          <div className="h-3.5 w-3.5 rounded-full bg-[#FB923C] shadow-[0_0_24px_rgba(251,146,60,0.55)]" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-[#17233C]">{label}</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#FB923C]">
            Please wait
          </p>
        </div>
      </div>
    </div>
  );
}
