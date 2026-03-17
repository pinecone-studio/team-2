import React from 'react';
import Dashboard from './dashboard/page';

export default function Page() {
  return (
    <div className="flex h-screen bg-white max-w-[100vw] mx-auto">
      <main className="flex-1 overflow-y-auto text-gray-900">
        <Dashboard />
      </main>
    </div>
  );
}
