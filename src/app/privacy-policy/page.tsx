import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { SEO_CONFIG } from '@/utils/seoConfig';
import PrivacyPolicy from '@/components/terms/PrivacyPolicy';
import { Metadata } from 'next';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';

export const metadata: Metadata = {
  title: SEO_CONFIG.privacyPolicy.title,
  description: SEO_CONFIG.privacyPolicy.description,
  openGraph: {
    images: SEO_CONFIG.privacyPolicy.image,
  },
};

export default async function PrivacyPolicyPage() {
  const hero: Hero = {
    heading: 'Privacy Policy',
  };

  const auth = await isAuthenticated();
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <Header userData={userData as UserData} />
      <CommonHero hero={hero} />
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}
