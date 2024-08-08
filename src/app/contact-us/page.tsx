import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ContactUsForm from '@/components/contact-us/ContactUsForm';
import { SEO_CONFIG } from '@/utils/seoConfig';
import { Metadata } from 'next';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { addUserPostSignIn } from '@/app/actions/userDataActions';

export const metadata: Metadata = {
  title: SEO_CONFIG.contactUs.title,
  description: SEO_CONFIG.contactUs.description,
  openGraph: {
    images: SEO_CONFIG.contactUs.image,
  },
};

export default async function ContactUs({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  // SEO
  const hero: Hero = {
    heading: 'Connect with the AthletiFi team',
    subtitle: '',
    title: '',
  };

  const auth = await isAuthenticated();
  if (auth.isSignedIn) {
    await addUserPostSignIn(
      auth.userId,
      auth.name,
      auth.userId,
      searchParams?.invite_id,
    );
  }
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      {/* SEO */}
      <div className="contact-us-page__hero-bg bg-no-repeat bg-cover overflow-hidden">
        <Header userData={userData as UserData} />
        <CommonHero hero={hero} />
      </div>
      <main>
        <ContactUsForm />
      </main>
      <Footer />
    </>
  );
}
