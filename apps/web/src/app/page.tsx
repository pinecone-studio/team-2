import React from 'react';
import { EmployeeGatePage } from './userProfile/_components/EmployeeGatePage';

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-50 max-w-[100vw] mx-auto">
      <main className="relative flex-1 overflow-hidden  text-gray-900">
        <EmployeeGatePage />
      </main>
    </div>
  );
}
