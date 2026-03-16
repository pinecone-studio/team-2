'use client';

import { useState, useEffect } from 'react';

import { BenefitCard, BenefitFilter } from './_components';
import {
  GetBenefitsDocument,
  GetBenefitsQuery,
} from '../../graphql/generated/graphql';
import { gqlRequest } from '../../graphql/helpers/graphql-client';

export default function BenefitsCardDashboard() {
  const [filter, setFilter] = useState('All');
  const [benefits, setBenefits] = useState<GetBenefitsQuery['benefits']>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBenefits() {
      setLoading(true);
      setError('');
      try {
        const data = await gqlRequest(GetBenefitsDocument);
        setBenefits(data.benefits);
      } catch (e: any) {
        setError(e.message ?? 'Failed to fetch benefits');
      } finally {
        setLoading(false);
      }
    }

    fetchBenefits();
  }, []);

  const filteredBenefits =
    filter === 'All'
      ? benefits
      : benefits.filter((b) => b.isActive === (filter === 'Active'));

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 ">
      <BenefitFilter onChange={setFilter} />
      <div className="mt-[38px]">
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols1  gap-9">
          {filteredBenefits.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </div>
    </div>
  );
}
