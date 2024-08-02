import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Dashboard404 from '@/components/common/Dashboard404';
import Header from '@/components/common/Header';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';

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
      <Dashboard404 />
    </>
  );
}
