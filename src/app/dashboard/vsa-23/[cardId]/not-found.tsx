import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Dashboard404 from '@/components/common/Dashboard404';
import Header from '@/components/common/Header';

const NotFound = () => {
  const hero: Hero = {
    heading: '',
  };

  return (
    <>
      <div>
        <Header />
        <CommonHero hero={hero} />
      </div>
      <Dashboard404 />
    </>
  );
};

export default NotFound;
