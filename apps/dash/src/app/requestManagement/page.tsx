// import React from 'react';
// import { ActiveRequests, ProcessedRequests } from './_components';

// const requestManagementPage = () => {
//   return (
//     <div className="w-full min-h-screen bg-[#F9FAFB] p-12">
//       <div className="flex flex-col justify-start items-start">
//         <div className="flex flex-col p-5">
//           <div className="self-stretch justify-start text-gray-900 text-3xl font-bold  leading-10 tracking-tight">
//             Request Management
//           </div>
//           <div className="self-stretch justify-start text-gray-500 text-base font-normal  leading-8 tracking-tight">
//             Review and process employee benefit requests
//           </div>
//         </div>
//         <div className="flex flex-col justify-center items-center gap-8 w-full">
//           <ActiveRequests />
//           <ProcessedRequests />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default requestManagementPage;

'use client';

import React, { useEffect, useState } from 'react';
import { ActiveRequests } from './_components/ActiveRequests';
import { ProcessedRequests } from './_components/ProcessedRequests';
import {
  GetBenefitRequestsDocument,
  GetBenefitsDocument,
  GetEmployeesDocument,
  type GetBenefitRequestsQuery,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

const RequestManagementPage = () => {
  const [requests, setRequests] = useState<BenefitRequest[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [requestsData, benefitsData, employeesData] = await Promise.all([
          gqlRequest(GetBenefitRequestsDocument),
          gqlRequest(GetBenefitsDocument),
          gqlRequest(GetEmployeesDocument),
        ]);
        setRequests(requestsData.benefitRequests);
        setBenefits(benefitsData.benefits);
        setEmployees(employeesData.employees);
      } catch (e: any) {
        setError(e.message ?? 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleUpdated(updatedRequest: BenefitRequest) {
    setRequests((prev) =>
      prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)),
    );
  }

  const activeRequests = requests.filter(
    (r) => r.status?.toLowerCase() === 'pending',
  );

  const processedRequests = requests.filter(
    (r) =>
      r.status?.toLowerCase() === 'approved' ||
      r.status?.toLowerCase() === 'rejected',
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] p-12">
      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-col p-5">
          <div className="self-stretch justify-start text-gray-900 text-3xl font-bold leading-10 tracking-tight">
            Request Management
          </div>
          <div className="self-stretch justify-start text-gray-500 text-base font-normal leading-8 tracking-tight">
            Review and process employee benefit requests
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <ActiveRequests
            requests={activeRequests}
            benefits={benefits}
            employees={employees}
            onUpdated={handleUpdated}
          />
          <ProcessedRequests
            requests={processedRequests}
            benefits={benefits}
            employees={employees}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestManagementPage;
