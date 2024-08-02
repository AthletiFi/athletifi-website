import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Custom404 from '@/components/common/Custom404';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { SEO_CONFIG } from '@/utils/seoConfig';
import { Metadata } from 'next';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';

export const metadata: Metadata = {
  title: SEO_CONFIG.notFound.title,
  description: SEO_CONFIG.notFound.description,
  openGraph: {
    images: SEO_CONFIG.notFound.image,
  },
};

export default async function NotFound() {
  const hero: Hero = {
    heading: '',
  };

  const userData = await getUserData();

  return (
    <>
      <div>
        <Header userData={userData as UserData} />
        <CommonHero hero={hero} />
      </div>
      <Custom404 />
      <Footer />
    </>
  );
}
