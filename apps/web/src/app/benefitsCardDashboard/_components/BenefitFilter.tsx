'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@team/source-ui';

type BenefitFilterProps = {
  onChange: (value: string) => void;
};

export function BenefitFilter({ onChange }: BenefitFilterProps) {
  const [filter, setFilter] = useState<string>('All');

  const handleChange = (value: string) => {
    setFilter(value);
    onChange(value);
  };

  return (
    <Tabs value={filter} onValueChange={handleChange}>
      <TabsList className="bg-transparent gap-2 ">
        <TabsTrigger
          value="All"
          className="px-3 py-1 rounded-2xl data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          All
        </TabsTrigger>

        <TabsTrigger
          value="Active"
          className="px-3 py-1 rounded-2xl data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          Active
        </TabsTrigger>

        <TabsTrigger
          value="Eligible"
          className="px-3 py-1 rounded-2xl data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          Eligible
        </TabsTrigger>

        <TabsTrigger
          value="Pending"
          className="px-3 py-1 rounded-2xl data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          Pending
        </TabsTrigger>

        <TabsTrigger
          value="Locked"
          className="px-3 py-1 rounded-2xl data-[state=active]:bg-blue-500 data-[state=active]:text-white"
        >
          Locked
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
