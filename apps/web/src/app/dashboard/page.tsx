import React from 'react';
import BenefitsCardDashboard from '../benefitsCardDashboard/page';
import DashboardCard from '../DashboardCard/page';

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 ">
      <DashboardCard />
      <BenefitsCardDashboard />
    </div>
  );
};

export default Dashboard;
