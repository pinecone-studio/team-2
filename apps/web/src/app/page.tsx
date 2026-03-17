import React from 'react';
import { EmployeeGatePage } from './userProfile/_components/EmployeeGatePage';

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-50 max-w-[100vw] mx-auto">
      <main className="relative flex-1 overflow-hidden  text-gray-900">
        <EmployeeGatePage />
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
