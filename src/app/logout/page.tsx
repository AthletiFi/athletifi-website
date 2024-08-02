import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import LoggedOut from '@/components/auth/LoggedOut';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';

export default async function LogoutPage() {
  const hero: Hero = {
    heading: '',
  };

  const userData = await getUserData();

  return (
    <>
      <Header userData={userData as UserData} />
      <CommonHero hero={hero} />
      <LoggedOut />
      <Footer />
    </>
  );
}
