'use client';

import { useState } from 'react';
import { BenefitFilter } from './_components/BenefitFilter';
import { BenefitCard } from './_components/BenefitCard';
import { benefits } from '../lib/mockdata';

export default function Benefits() {
  const [filter, setFilter] = useState('All');

  const filteredBenefits =
    filter === 'All' ? benefits : benefits.filter((b) => b.status === filter);

  return (
    <div className="m-[30px]">
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
