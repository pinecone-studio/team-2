'use client';

import { ProcessedRequestsStandalone } from '../requestManagement/_components/ProcessedRequestsStandalone';
import { EmployeeSearchPanel } from './EmployeeSearchPanel';

export function DashboardInsightsSection() {
  return (
    <div>
      <section className="grid grid-cols-1 gap-[50px]  xl:grid-cols-[minmax(0,1.65fr)_380px] xl:items-start">
        <div className="min-w-0">
          <EmployeeSearchPanel />
        </div>

        <div className="min-w-0">
          <ProcessedRequestsStandalone variant="feed" />
        </div>
      </section>
    </div>
  );
}
