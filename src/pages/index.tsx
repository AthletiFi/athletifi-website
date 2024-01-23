// index.tsx

// This is the HOME PAGE - the main landing page of the website.
// It includes various components to showcase the features and services offered.

import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
// import LatestNews from "@/components/home/LatestNews"; //Add this back if you want to have the news section
// import OurStrategicAdvisor from "@/components/home/OurStrategicAdvisor"; //Add this back if you want to have the Darren section
import StatsReimagined from '@/components/home/FundraisingReimagined';
import TrustedPartners from '@/components/home/TrustedPartners';
import SoccerExpensive from '@/components/home/PassiveEngagement';
import UniqueAthletifi from '@/components/home/BeyondTheNumbers';
import HeroHomepage from '@/components/home/HeroHomepage';
import BackToTop from '@/components/common/BackToTop';
import { useEffect, useState } from 'react';
import { PageLogo } from '@/components/common/Icon';
import Seo from '@/components/common/Seo';
import { GetRequestHandler } from '@/components/common/api/Api';
import { NewsListApiHandler } from '@/components/common/api/ApiUrls';
import { SEO_CONFIG } from '@/utils/seoConfig';

//Importing the Inter font
const inter = Inter({ subsets: ['latin'] });

interface NewsProps {
  allNewsList: any;
}

// Main function component for the home page
const Home: React.FC<NewsProps> = props => {
  const { allNewsList } = props;
  // PRELOADER
  // State variable for preloader. A preloader is a visual element that appears on the screen while a webpage or a portion of a webpage is loading.
  const [preloader, setpreloader] = useState(true);
  // The preloader state variable is initially set to true, indicating that the preloader should be displayed.

  // useEffect hook to handle preloader and body overflow
  useEffect(() => {
    // Delay for preloader to disappear
    setTimeout(() => {
      setpreloader(false);
    }, 1500);

    // Adding CSS classes to body for overflow control
    if (preloader) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  });

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={SEO_CONFIG.home} />
      {/* PRELOADER is conditionally rendered based on the value of the preloader state variable. */}
      {preloader && (
        <div
          className={`preloader__icon preloader__bg fixed min-h-screen top-0 left-0 w-full z-50 flex justify-center items-center`}
        >
          <span>
            <PageLogo />
          </span>
        </div>
      )}
      <div className="overflow-hidden">
        <div className="home-page__hero-bg min-h-screen bg-no-repeat bg-cover flex flex-col justify-center bg-center">
          <Header />
          <div className="flex lg:items-center lg:flex-row flex-col flex-grow relative">
            <HeroHomepage />
            <Image
              className="absolute right-0 hero__grid-position -z-10 hidden lg:block w-[450px] xl:w-[700px]"
              src="/assets/img/svg/hero_grid.svg"
              alt=""
              width={700}
              height={700}
            />
          </div>
        </div>
        <main>
          <StatsReimagined />
          <SoccerExpensive />
          <UniqueAthletifi />
          {/* <OurStrategicAdvisor /> */}
          <TrustedPartners />
          {/* <LatestNews allNewsList={allNewsList} /> */}
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const response = await GetRequestHandler(NewsListApiHandler());

    return {
      props: {
        allNewsList: response,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        allNewsList: null,
      },
    };
  }
}
export default Home;
