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
  RequestStatus,
} from 'apps/dash/src/graphql/generated/graphql';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import { ProcessedRequestsSkeletonNavbar } from './_components/skeletonComp/ProcessedRequestsSkeletonNavbar';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

const RequestManagementPage = () => {
  const [requests, setRequests] = useState<BenefitRequest[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');

  console.log('==============================================');
  console.log('requests', requests);
  console.log('benefits', benefits);
  console.log('employees', employees);
  console.log('==============================================');

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
    (r) => r.status === RequestStatus.Pending,
  );

  const processedRequests = requests.filter(
    (r) =>
      r.status === RequestStatus.Approved ||
      r.status === RequestStatus.Rejected,
  );

  if (loading) return <ProcessedRequestsSkeletonNavbar />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] py-8">
      <div className="max-w-[1215px] mx-auto">
        <div className="flex flex-col justify-start items-start">
          <div className="flex flex-col mb-8">
            <h1 className="text-[#0F172A] text-2xl font-bold tracking-tight">
              Request Management
            </h1>
            <p className="text-[#64748B] text-sm mt-1">
              Review and process employee benefit requests
            </p>
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
    </div>
  );
};

export default RequestManagementPage;
