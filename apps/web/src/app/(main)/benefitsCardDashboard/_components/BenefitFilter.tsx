'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@team/source-ui';

type BenefitFilterProps = {
  onChange: (value: string) => void;
  counts: Record<string, number>;
};

export function BenefitFilter({ onChange, counts }: BenefitFilterProps) {
  const [filter, setFilter] = useState<string>('All');

  const handleChange = (value: string) => {
    setFilter(value);
    onChange(value);
  };

  const tabs = ['All', 'Pending', 'Locked'];

  return (
    <Tabs value={filter} onValueChange={handleChange} className="w-full">
      <TabsList className="bg-transparent gap-2 h-auto p-0 flex-wrap">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="
              px-[24px] py-[10px] rounded-[10px] 
              font-montserrat font-semibold text-[16px] leading-normal
              text-[#717182] transition-all duration-200 
              hover:bg-gray-100/50
              
              /* Идэвхтэй үеийн стиль */
              data-[state=active]:!bg-[#FB923C] 
              data-[state=active]:!text-white 
              data-[state=active]:shadow-none
              
              /* Flexbox ашиглан текст болон тоог зэрэгцүүлэх */
              display-flex items-center gap-2
              border-none
            "
          >
            {/* Текст (жишээ нь: Active) */}
            <span>{tab}</span>

            {/* Тоо (жишээ нь: 2) */}
            <span className="opacity-90 ml-1">{counts[tab] || 0}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
