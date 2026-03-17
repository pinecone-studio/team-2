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

  const tabs = ['All', 'Active', 'Eligible', 'Pending', 'Locked'];

  return (
    <Tabs value={filter} onValueChange={handleChange} className="w-full">
      <TabsList className="bg-transparent gap-2">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="px-[42px] py-[10px] rounded-[10px] font-Montserrat font-semibold 
                       text-[#64748B] 
                       data-[state=active]:bg-[#FB923C] 
                       data-[state=active]:text-white 
                       data-[state=active]:shadow-md 
                       transition-all duration-200 hover:bg-gray-50"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
