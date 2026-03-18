'use client';

import React, { useEffect, useState } from 'react';
import { ProcessedRequests } from './ProcessedRequests';
import {
  GetBenefitRequestsDocument,
  GetBenefitsDocument,
  GetEmployeesDocument,
  type GetBenefitRequestsQuery,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from '../../../graphql/generated/graphql';
import { gqlRequest } from '../../../graphql/helpers/graphql-client';
import { ProcessedRequestsSkeleton } from './skeletonComp/ProcessedRequestsSkeleton';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

export const ProcessedRequestsStandalone = () => {
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

        const processed = requestsData.benefitRequests.filter(
          (r) =>
            r.status?.toLowerCase() === 'approved' ||
            r.status?.toLowerCase() === 'rejected',
        );

        setRequests(processed);
        setBenefits(benefitsData.benefits);
        setEmployees(employeesData.employees);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <ProcessedRequestsSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ProcessedRequests
      requests={requests}
      benefits={benefits}
      employees={employees}
    />
  );
};
