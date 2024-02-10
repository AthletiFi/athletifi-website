import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import { SEO_CONFIG } from '@/utils/seoConfig';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';

import Highlights from '@/components/dashboard/Highlights';
import Teammates from '@/components/dashboard/Teammates';
import PlayerStats from '@/components/dashboard/PlayerStats';
import PlayerInfo from '@/components/dashboard/PlayerInfo';
import PlayerCard from '@/components/dashboard/PlayerCard';

const Dashboard = () => {
  const hero: Hero = {
    heading: 'Dashboard',
    subtitle: 'Your Subtitle Here',
    title: 'Your Title Here',
  };
  let DashboardJSX = (
    <>
      <Seo pageSEO={SEO_CONFIG.dashboard} />
      <div className='overflow-hidden'>
        <div className=' about-page__hero-bg bg-no-repeat bg-cover'>
          <Header />
          <CommonHero hero={hero} />
        </div>
        <main className='flex flex-col px-3 min-h-full gap-5 m-10 sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-7xl  mx-auto'>
          <section className='grid grid-cols-2 gap-1 h-full'>
            <div className='col-span-2 md:col-span-1 md:row-span-1 order-2 md:order-1'>
               <PlayerInfo />
            </div>
            <div className='col-span-2 md:col-span-1 relative z-10 md:row-span-1 order-1 md:order-2 -mb-52'>
             <PlayerCard />
            </div>
            {/* <div className='col-span-2 lg:col-span-1'>
             <PlayerStats /> 
            </div> */}
          </section>
          {/* <section className="flex flex-col justify-center items-stretch lg:flex-row h-full gap-5">
            <PlayerStats />
            <PlayerCard />
            <PlayerInfo />
          </section> */}
          <section className='flex flex-col xl:flex-row justify-center items-stretch flex-grow h-full gap-5 '>
            <Teammates />
            <Highlights />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );

  // const hideDashboardForNow = () => {
  //   // This function is a temporary addition to re-render the dashboard as a Coming Soon Page
  //   hero.heading = 'Coming Soon!';
  //   DashboardJSX = (
  //     <>
  //       <Seo pageSEO={SEO_CONFIG.dashboard} />
  //       <div className="overflow-hidden">
  //         <div className=" about-page__hero-bg bg-no-repeat bg-cover">
  //           <Header />
  //           <CommonHero hero={hero} />
  //         </div>
  //         <Footer />
  //       </div>
  //     </>
  //   );
  // };

  // // Delete the below function to reveal the dashboard
  // hideDashboardForNow();

  return DashboardJSX;
};

export default Dashboard;
