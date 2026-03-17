import React from 'react';
import Dashboard from './dashboard/page';
import { RepeatingGradient } from './_components/main/backgroundGradient/RepeatingGradients';

export default function Page() {
  return (
    <div className="relative min-h-screen max-w-[100vw] mx-auto">
      <RepeatingGradient />

      <main className="relative z-10 flex-1 overflow-y-auto p-8 text-gray-900">
        <Dashboard />
      </main>
    </div>
  );
}
