'use client';

import React, { useEffect, useState } from 'react';
import {
  GetBenefitRequestsDocument,
  GetBenefitsDocument,
  GetEmployeesDocument,
  type GetBenefitRequestsQuery,
  type GetBenefitsQuery,
  type GetEmployeesQuery,
} from 'apps/dash/src/graphql/generated/graphql';
import { ProcessedRequestsSkeleton } from './skeletonComp/ProcessedRequestsSkeleton';
import { gqlRequest } from 'apps/dash/src/graphql/helpers/graphql-client';
import { RecentActivities } from '../../_components/RecentActivities';

type BenefitRequest = GetBenefitRequestsQuery['benefitRequests'][number];
type Benefit = GetBenefitsQuery['benefits'][number];
type Employee = GetEmployeesQuery['employees'][number];

type Props = {
  variant?: 'table' | 'feed';
};

export const ProcessedRequestsStandalone = ({ variant = 'table' }: Props) => {
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
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <ProcessedRequestsSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <RecentActivities
      requests={requests}
      benefits={benefits}
      employees={employees}
      variant={variant}
    />
  );
};
