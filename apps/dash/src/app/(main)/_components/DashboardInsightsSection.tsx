'use client';

import { EmployeeSearchPanel } from './EmployeeSearchPanel';
import { ProcessedRequestsStandalone } from '../requestManagement/_components/ProcessedRequestsStandalone';

export function DashboardInsightsSection() {
  return (
     <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_380px] xl:items-start">
      <div className="min-w-0">
        <EmployeeSearchPanel />
      </div>

      <div className="min-w-0">
        <ProcessedRequestsStandalone variant="feed" />
      </div>
    </section>
      

   
  );
}
