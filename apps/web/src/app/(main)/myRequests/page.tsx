import React from 'react';
import { MyRequestsDashboard } from './_components/MyRequestsDashboard';
import { SecondaryPagesGradient } from '../../_components/main/backgroundGradient/SecondaryPagesGradient';

const MyRequests = () => {
  return (
    <div className="relative isolate min-h-screen">
      <SecondaryPagesGradient />
      <div className="relative z-10">
        <MyRequestsDashboard />
      </div>
    </div>
  );
};

export default MyRequests;
