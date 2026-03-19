import BenefitsCardDashboard from '../benefitsCardDashboard/page';
import DashboardCard from '../DashboardCard/page';
import { RepeatingGradient } from '../../_components/main/backgroundGradient/RepeatingGradients';
import { DashboardWelcomePopup } from './_components/DashboardWelcomePopup';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen w-full">
      <DashboardWelcomePopup />
      <RepeatingGradient />
      <div className="relative z-10 mx-auto px-20">
        <DashboardCard />
        <BenefitsCardDashboard />
      </div>
    </div>
  );
}
