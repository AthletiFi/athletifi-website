import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import { SEO_CONFIG } from '@/utils/seoConfig';
import CommonHero from '@/components/common/CommonHero';

import Highlights from '@/components/dashboard/Highlights';
import Teammates from '@/components/dashboard/Teammates';
import PlayerStats from '@/components/dashboard/PlayerStats';
import PlayerInfo from '@/components/dashboard/PlayerInfo';
import PlayerCard from '@/components/dashboard/PlayerCard';

const Dashboard = () => {
  const hero = {
    heading: 'Dashboard',
    subtitle: 'Your Subtitle Here',
    title: 'Your Title Here',
  };
  return (
    <>
      <Seo pageSEO={SEO_CONFIG.dashboard} />
      <div className="overflow_hidden">
        <div className=" bg-about-hero bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <main className="flex flex-col px-3 min-h-full gap-5 m-10 sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-7xl  mx-auto">
          <section className="flex flex-col justify-center items-stretch lg:flex-row h-full gap-5">
            <PlayerStats />
            <PlayerCard />
            <PlayerInfo />
          </section>
          <section className="flex flex-col xl:flex-row justify-center items-stretch flex-grow h-full gap-5 ">
            <Teammates />
            <Highlights />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
