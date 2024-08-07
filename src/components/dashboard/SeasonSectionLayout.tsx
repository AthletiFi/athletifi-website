import SeasonHighlights from '@/components/dashboard/SeasonHighlights';
import { ActionReelList } from '@/components/dashboard/TopActionReels';
import { DashboardData } from '@/types/Dashboard.type';

export default function SeasonSection({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  return (
    <>
      <div className="w-full max-w-[1130px] sm:py-8 md:py-20 flex flex-col sm:flex-col md:flex-row justify-between items-center md:items-start">
        <SeasonHighlights seasonHighlights={dashboardData.seasonHighlights} />
        <ActionReelList matchesList={dashboardData.matchesList} />
      </div>
    </>
  );
}
