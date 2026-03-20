'use client';

import { Suspense } from 'react';
import { DashboardSkeleton } from '../_components/skeletonCompMainpage/DashboardSkeleton';
import { RepeatingGradient } from '../_components/backgroundGradient/RepeatingGradients';
import { DashboardInsightsSection } from './_components/DashboardInsightsSection';

const heroStats = [
  {
    title: 'Active',
    value: '2',
    note: '12% employee sent request',
    noteColor: 'text-[#00A63E]',
  },
  {
    title: 'Eligible',
    value: '2',
    note: '80% employee used last month',
    noteColor: 'text-[#00A63E]',
  },
  {
    title: 'Pending',
    value: '1',
    note: '5.6% awaiting',
    noteColor: 'text-[#E7000B]',
  },
  {
    title: 'Locked',
    value: '2',
    note: '2 not available',
    noteColor: 'text-[#E7000B]',
  },
];

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <div className="relative isolate min-h-screen ">
        <RepeatingGradient />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 ">
          <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-7">
              <div className="max-w-[1215px]">
                <h1 className="text-3xl font-semibold tracking-wider text-[#0F172A] md:text-5xl">
                  Dashboard Overview
                </h1>
                <p className="mt-2 text-base leading-6 tracking-[-0.312px] font-normal text-[#45556C] md:text-[18px]">
                  Welcome back! Here's what's happening with your team today.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {heroStats.map((stat) => (
                  <div
                    key={stat.title}
                    className=" rounded-3xl border border-white/60 bg-white/45 py-4 px-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm"
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-sm leading-5 font-regular text-[#45556C]">
                        {stat.title}
                      </p>
                      <p className=" text-2xl leading-9 font-normal tracking-tight text-[#0A0A0A]">
                        {stat.value}
                      </p>
                      <p
                        className={` text-sm font-normal tracking-[-0.15px] ${stat.noteColor}`}
                      >
                        {stat.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* <div className="bg-[#fafafa] py-10"> */}
            <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#fafafa] py-10 pb-24 min-h-screen">
              <div className="mx-auto max-w-[1215px] px-4">
                <DashboardInsightsSection />
              </div>
            </div>

            {/* </div> */}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
