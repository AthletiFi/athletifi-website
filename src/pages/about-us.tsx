// about-us.tsx

// This file renders the "About Us" page.
// It includes various components to display information about the company.

import WhoWeAre from '@/components/about-us/WhoWeAre';
import OurMission from '@/components/about-us/OurMission';
import LookingForward from '@/components/about-us/LookingForward';
import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import { SEO_CONFIG } from '@/utils/seoConfig';

const AboutUs = () => {
  // SEO
  const hero = {
    heading: 'About Us',
    subtitle: 'Your Subtitle Here',
    title: 'Your Title Here',
  };

  return (
    <>
      <Seo pageSEO={SEO_CONFIG.aboutUs} />
      <div className="overflow-hidden">
        <div className=" about-page__hero-bg bg-no-repeat bg-cover">
          <Header />
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
};

export default AboutUs;
