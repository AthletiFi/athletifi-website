import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import { SEO_CONFIG } from '@/utils/seoConfig';
import PrivacyPolicy from '@/components/terms/PrivacyPolicy';

const PrivacyPolicyPage = () => {
  const hero = {
    heading: 'Privacy Policy',
  };

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={SEO_CONFIG.signUp} />
      <div>
        <Header />
        <CommonHero hero={hero} />
        <PrivacyPolicy />
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
