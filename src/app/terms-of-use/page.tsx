import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { SEO_CONFIG } from '@/utils/seoConfig';
import TermsOfUse from '@/components/terms/TermsOfUse';
import { Metadata } from 'next';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';

export const metadata: Metadata = {
  title: SEO_CONFIG.termsOfUse.title,
  description: SEO_CONFIG.termsOfUse.description,
  openGraph: {
    images: SEO_CONFIG.termsOfUse.image,
  },
};

export default async function TermsOfUsePage() {
  const hero: Hero = {
    heading: 'Terms of Use',
  };

  const userData = await getUserData();

  return (
    <>
      <Header userData={userData as UserData} />
      <CommonHero hero={hero} />
      <main>
        <TermsOfUse />
      </main>
      <Footer />
    </>
  );
}
