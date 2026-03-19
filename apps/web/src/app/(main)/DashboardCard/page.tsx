'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Header } from '../DashboardCard/_components';

const DashboardCard = () => {
  const { isLoaded } = useUser();

  return (
    <div>
      <Header isLoading={!isLoaded} />
      {/* <Card isLoading={loading} /> */}
    </div>
  );
};

export default DashboardCard;
