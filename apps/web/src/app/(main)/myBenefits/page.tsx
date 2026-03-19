import React from 'react';
import MyBenefitsDashboard from './_components/MyBenefitsDashboard';
import { SecondaryPagesGradient } from '../../_components/main/backgroundGradient/SecondaryPagesGradient';

const MyBenefits = () => {
  return (
    <div className="relative isolate min-h-screen">
      <SecondaryPagesGradient />
      <div className="relative z-10">
        <MyBenefitsDashboard />
      </div>
    </div>
  );
};

export default MyBenefits;
