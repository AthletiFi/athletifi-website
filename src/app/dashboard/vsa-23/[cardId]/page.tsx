'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
// import { SEO_CONFIG } from '@/utils/seoConfig';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
// import { PlayerDashboardProps } from '@/types/Dashboard.type';
import Highlights from '@/components/dashboard/Highlights';
import Teammates from '@/components/dashboard/Teammates';
import HeroBanner from '@/components/dashboard/HeroBanner';
// import PlayerStats from '@/components/dashboard/PlayerStats';
// import PlayerInfo from '@/components/dashboard/PlayerInfo';
// import PlayerCard from '@/components/dashboard/PlayerCard';
import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import Profile from '@/components/dashboard/ProfileCard';
import LatestMatch from '@/components/dashboard/LatestMatchCard';
import Charts from '@/components/dashboard/Charts';
import { useMediaQuery } from '@/app/utils/useMediaQuery';
interface PageProps {
  params: { cardId: number };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const MIN_PLAYER_ID = 1;
const MAX_PLAYER_ID = 1134;

// TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
// export const metadata = {
//   title: 'Player Dashboard | AthletiFi',
//   description:
//     'Explore detailed player statistics, highlights, and more on the AthletiFi Player Dashboard.',
// };

const PlayerDashboardPage: NextPage<PageProps> = ({ params }) => {
  // const PlayerDashboardPage = ({ playerId }: PlayerDashboardProps) => {
  const { cardId } = params;

  if (cardId < MIN_PLAYER_ID || cardId > MAX_PLAYER_ID) {
    notFound();
  }
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // SAMPLE DATA
  // TODO: FETCH PLAYER DATA FROM BACKEND
  // const playerProfile = {
  //   name: 'Lionel Messi',
  // };

  // SEO
  // const hero: Hero = {
  //   heading: playerProfile?.name || `Player data not found`,
  //   subtitle:
  //     'Here you can find all the latest stats and highlights on a player!',
  //   title: 'AthletiFi Player Dashboard',
  // };

  return (
    <>
      <div className="overflow-hidden">
        <div className="about-page__hero-bg bg-no-repeat bg-cover">
          <Header />
          {/* <CommonHero hero={hero} /> */}
          <HeroBanner />
        </div>
        {isMobile ? (
          <div className="flex flex-col py-3">
            <div className="mx-3">
              <Profile
                age={13}
                club={'River City FC'}
                league={'Youth Soccer Association'}
                teamName={'River City Raptors'}
                ageGroup={'U14'}
                gender={'Male'}
                coach={'Daniel Smith'}
              />
            </div>
            <div className="mx-3">
              <LatestMatch />
            </div>
            <div className="mt-3 mx-3">
              <Charts />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:grid md:grid-cols-11 py-3">
            <div className="col-start-2 col-span-6 my-3 mx-3 lg:mx-6">
              <LatestMatch />
            </div>
            <div className="col-start-2 col-span-6 my-3 mx-3 lg:mx-6">
              <Charts />
            </div>
            <div className="col-start-8 col-span-3 my-3 mx-3 lg:mx-0">
              <Profile
                age={13}
                club={'River City FC'}
                league={'Youth Soccer Association'}
                teamName={'River City Raptors'}
                ageGroup={'U14'}
                gender={'Male'}
                coach={'Daniel Smith'}
              />
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default PlayerDashboardPage;
