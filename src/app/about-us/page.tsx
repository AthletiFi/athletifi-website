// This file renders the "About Us" page.
// It includes various components to display information about the company.
import WhoWeAre from '@/components/about-us/WhoWeAre';
import OurMission from '@/components/about-us/OurMission';
import LookingForward from '@/components/about-us/LookingForward';
import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { SEO_CONFIG } from '@/utils/seoConfig';
import { Metadata } from 'next';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';

export const metadata: Metadata = {
  title: SEO_CONFIG.aboutUs.title,
  description: SEO_CONFIG.aboutUs.description,
  openGraph: {
    images: SEO_CONFIG.aboutUs.image,
  },
};

export default async function AboutUs() {
  // SEO
  const hero: Hero = {
    heading: 'About Us',
    subtitle: 'Your Subtitle Here',
    title: 'Your Title Here',
  };

  const userData = await getUserData();

  return (
    <>
      <div className="overflow-hidden">
        <div className=" about-page__hero-bg bg-no-repeat bg-cover">
          <Header userData={userData as UserData} />
          <CommonHero hero={hero} />
        </div>
        <main>
          <OurMission />
          <WhoWeAre />
          <LookingForward />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
