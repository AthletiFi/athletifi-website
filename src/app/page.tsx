// This is the HOME PAGE - the main landing page of the website.
// It includes various components to showcase the features and services offered.
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LatestNews from '@/components/home/LatestNews'; //Add this back if you want to have the news section
// import OurStrategicAdvisor from "@/components/home/OurStrategicAdvisor"; //Add this back if you want to have the Darren section
import FollowTomorrow from '@/components/home/FollowTomorrow';
import TrustedPartners from '@/components/home/TrustedPartners';
import PassiveEngagement from '@/components/home/PassiveEngagement';
import BeyondNumbers from '@/components/home/BeyondNumbers';
import HeroHomepage from '@/components/home/HeroHomepage';
import { SEO_CONFIG } from '@/utils/seoConfig';
import { getNewsList } from '@/utils/ApiHelper';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';

const BackToTop = dynamic(() => import('@/components/common/BackToTop'), {
  ssr: false,
});
const Preloader = dynamic(() => import('@/components/common/Preloader'), {
  ssr: false,
});

const IMAGE_WIDTH_HERO_GRID = 700;
const IMAGE_HEIGHT_HERO_GRID = 700;

// export const metadata = {
const metadata = {
  title: SEO_CONFIG.home.title,
  description: SEO_CONFIG.home.description,
  openGraph: {
    images: SEO_CONFIG.home.image,
  },
};
console.log(`TODO: Implement metadata properly ${metadata}`);

// Main function component for the home page
export default async function Home() {
  const { allNewsList, allNewsListError } = await getNewsList();

  if (allNewsListError) return <div>Failed to fetch news list.</div>;
  if (!allNewsList) return <div>Loading news list...</div>;

  return (
    <>
      <Preloader />
      <div className="overflow-hidden">
        <div className="home-page__hero-bg min-h-screen bg-no-repeat bg-cover flex flex-col justify-center bg-center">
          <Header />
          <div className="flex lg:items-center lg:flex-row flex-col flex-grow relative">
            <HeroHomepage />
            <Image
              className="absolute right-0 hero__grid-position -z-10 hidden lg:block w-450 xl:w-700"
              src="/assets/img/svg/hero_grid.svg"
              alt=""
              width={IMAGE_WIDTH_HERO_GRID}
              height={IMAGE_HEIGHT_HERO_GRID}
              quality={75}
              loading="lazy"
            />
          </div>
        </div>
        <main>
          <RenderCardThumbnail /> {/*This is the card thumbnail component */}
          <FollowTomorrow />
          <PassiveEngagement />
          <BeyondNumbers />
          {/* <OurStrategicAdvisor /> */}
          <TrustedPartners />
          {LatestNews && <LatestNews allNewsList={allNewsList} />}
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
