'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActiveRequests } from './_components/ActiveRequests';
import { ProcessedRequests } from './_components/ProcessedRequests';
import { RequestLoadingOverlay } from './_components/RequestLoadingOverlay';
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

function sortRequestsNewestFirst(requests: BenefitRequest[]) {
  return [...requests].sort((first, second) => {
    const firstCreatedAt = first.createdAt
      ? new Date(first.createdAt).getTime()
      : 0;
    const secondCreatedAt = second.createdAt
      ? new Date(second.createdAt).getTime()
      : 0;

    if (secondCreatedAt !== firstCreatedAt) {
      return secondCreatedAt - firstCreatedAt;
    }

    return second.id - first.id;
  });
}

const RequestManagementPage = () => {
  const [requests, setRequests] = useState<BenefitRequest[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchInFlightRef = useRef(false);

  const fetchData = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      if (fetchInFlightRef.current) return;
      fetchInFlightRef.current = true;

      if (!silent) {
        setLoading(true);
        setError('');
      }

      try {
        const [requestsData, benefitsData, employeesData] = await Promise.all([
          gqlRequest(GetBenefitRequestsDocument),
          gqlRequest(GetBenefitsDocument),
          gqlRequest(GetEmployeesDocument),
        ]);

        setRequests(requestsData.benefitRequests);
        setBenefits(benefitsData.benefits);
        setEmployees(employeesData.employees);
      } catch (e: unknown) {
        if (!silent) {
          setError(e instanceof Error ? e.message : 'Failed to load');
        }
      } finally {
        if (!silent) {
          setLoading(false);
        }
        fetchInFlightRef.current = false;
      }
    },
    [],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Realtime polling: every 10s when tab is visible
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchData({ silent: true });
      }
    }, 10000);

    return () => window.clearInterval(id);
  }, [fetchData]);

  // Refresh when user returns to tab/window
  useEffect(() => {
    const onFocus = () => fetchData({ silent: true });
    window.addEventListener('focus', onFocus);

    return () => window.removeEventListener('focus', onFocus);
  }, [fetchData]);

  function handleUpdated(updatedRequest: BenefitRequest) {
    setRequests((prev) =>
      sortRequestsNewestFirst(
        prev.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)),
      ),
    );

    // Keep UI in sync with server state after mutation
    void fetchData({ silent: true });
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
    <>
      <RequestLoadingOverlay open={actionLoading} />

      <div className="w-full min-h-screen py-8">
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
                setActionLoading={setActionLoading}
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
    </>
  );
};

export default RequestManagementPage;
