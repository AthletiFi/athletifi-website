import Charts from '@/components/dashboard/Charts';
import Footer from '@/components/common/Footer';
import HeroBanner from '@/components/dashboard/HeroBanner';
import LatestMatch from '@/components/dashboard/LatestMatchCard';
import PastMatchesLayout from '@/components/dashboard/PastMatchesLayout';
import Profile from '@/components/dashboard/ProfileCard';
import SeasonSection from '@/components/dashboard/SeasonSectionLayout';
import BackToTop from '@/components/common/BackToTop';

import { sourceSans3 } from '@/app/utils/helpers';
import DashboardFetchError from '@/components/dashboard/DashboardFetchError';
import { getDashboardData } from '@/app/utils/fetchHelper';

export default async function DashboardMain({ cardId }: { cardId: string }) {
  const dashboardData = await getDashboardData(cardId);

  return (
    <div className={`overflow-hidden ${sourceSans3.className}`}>
      {dashboardData ? (
        <>
          <div className="bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] flex justify-center w-full border-collapse">
            <HeroBanner profile={dashboardData.playerProfile} />
          </div>
          <div className="flex justify-center w-full">
            <div className="w-full flex flex-col py-3 lg:py-2 mt-2 max-w-[650px] lg:max-w-[1130px] lg:grid md:grid-cols-11 lg:items-end">
              <div className="mx-3 lg:col-start-8 lg:col-span-4 lg:my-2 lg:ml-0 lg:mr-6 order-1 lg:order-3">
                <Profile profile={dashboardData.playerProfile} />
              </div>
              <div className="mb-4 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-2 lg:order-1">
                <LatestMatch dashboardData={dashboardData} />
              </div>
              <div className="mb-3 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-3 lg:order-2">
                <Charts
                  latestPlayerRating={dashboardData.latestPlayerRating}
                  playerRatings={dashboardData.playerRatings}
                  isGoalkeeper={dashboardData.isGoalkeeper}
                />
              </div>
            </div>
          </div>
          <main className="w-full px-4 flex flex-col items-center bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] bg-opacity-95">
            <SeasonSection dashboardData={dashboardData} />
            <span className="h-px bg-partnersBorders w-full max-w-[1130px] my-8 md:my-4" />
            <PastMatchesLayout dashboardData={dashboardData} />
          </main>
          <BackToTop />
          <Footer />
        </>
      ) : (
        <DashboardFetchError message={'Failed to fetch data'} />
      )}
    </div>
  );
}
