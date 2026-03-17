import React from 'react';
import BenefitsCardDashboard from '../benefitsCardDashboard/page';
import DashboardCard from '../DashboardCard/page';

const Dashboard = () => {
  return (
    <div className="mx-auto px-20">
      <DashboardCard />
      <BenefitsCardDashboard />
    </div>
  );
};

export default Dashboard;
