import React from 'react';
import BenefitsCardDashboard from '../benefitsCardDashboard/page';
import DashboardCard from '../DashboardCard/page';

const Dashboard = () => {
  return (
    <div>
      <DashboardCard />
      <BenefitsCardDashboard />
    </div>
  );
};

export default Dashboard;
