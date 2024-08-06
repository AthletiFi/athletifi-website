// This is the HOME PAGE - the main landing page of the website.
// It includes various components to showcase the features and services offered.
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import LatestBlog from '@/components/home/LatestBlog'; //Add this back if you want to have the blog section
// import OurStrategicAdvisor from "@/components/home/OurStrategicAdvisor"; //Add this back if you want to have the Darren section
import FollowTomorrow from '@/components/home/FollowTomorrow';
import TrustedPartners from '@/components/home/TrustedPartners';
import PassiveEngagement from '@/components/home/PassiveEngagement';
import BeyondNumbers from '@/components/home/BeyondNumbers';
import HeroHomepage from '@/components/home/HeroHomepage';
import { getBlogList } from '@/utils/ApiHelper';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';

const BackToTop = dynamic(() => import('@/components/common/BackToTop'), {
  ssr: false,
});
const Preloader = dynamic(() => import('@/components/common/Preloader'), {
  ssr: false,
});

const IMAGE_WIDTH_HERO_GRID = 700;
const IMAGE_HEIGHT_HERO_GRID = 700;

// Main function component for the home page
export default async function Home() {
  const { allBlogList, allBlogListError } = await getBlogList();

  if (allBlogListError) return <div>Failed to fetch blog list.</div>;
  if (!allBlogList) return <div>Loading blog list...</div>;

  const auth = await isAuthenticated();
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <Preloader />
      <div className="overflow-hidden">
        <div className="home-page__hero-bg min-h-screen bg-no-repeat bg-cover flex flex-col justify-center bg-center">
          <Header userData={userData as UserData} />
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
          <FollowTomorrow />
          <PassiveEngagement />
          <BeyondNumbers />
          {/* <OurStrategicAdvisor /> */}
          <TrustedPartners />
          {LatestBlog && <LatestBlog allBlogList={allBlogList} />}
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
