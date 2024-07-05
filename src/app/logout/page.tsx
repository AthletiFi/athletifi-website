import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import LoggedOut from '@/components/auth/LoggedOut';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const LogoutPage = () => {
  const hero: Hero = {
    heading: '',
  };

  return (
    <>
      <Header />
      <CommonHero hero={hero} />
      <LoggedOut />
      <Footer />
    </>
  );
};

export default LogoutPage;
