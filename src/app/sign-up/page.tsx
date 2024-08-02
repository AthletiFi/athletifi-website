import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SignUpForm from '@/components/sign-up/SignUpForm';
import { SEO_CONFIG } from '@/utils/seoConfig';
import { Metadata } from 'next';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { Hero } from '@/types/CommonHero.type';

export const metadata: Metadata = {
  title: SEO_CONFIG.signUp.title,
  description: SEO_CONFIG.signUp.description,
  openGraph: {
    images: SEO_CONFIG.signUp.image,
  },
};

export default async function SignUp() {
  // SEO
  const hero: Hero = {
    heading: 'Start Your Digital Soccer Card Collection Journey',
    subtitle: 'Your Subtitle Here',
    title: 'Your Title Here',
  };

  const userData = await getUserData();

  return (
    <>
      <div className="signup-page__hero-bg bg-no-repeat bg-cover overflow-hidden">
        <Header userData={userData as UserData} />
        <CommonHero hero={hero} />
      </div>
      <main>
        <SignUpForm />
      </main>
      <Footer />
    </>
  );
}
