import Image from 'next/image';
import React from 'react';

// COMMON HEADING
interface HeroProps {
  heading: string;
  title?: string;
  subtitle?: string;
}

const CommonHero: React.FC<{ hero: HeroProps }> = ({ hero }) => {
  return (
    <>
      <section className="relative">
        {/* HERO SHADOW */}
        <Image
          className="absolute start-1/2 -top-28 -z-10 -translate-x-1/2"
          src="/assets/img/png/about-hero-center-shadow.png"
          alt=""
          width={1494}
          height={1494}
        />
        <Image
          className="absolute end-0 md-top-28 -z-10 -translate-x-0"
          src="/assets/img/png/yellow-shadow-hero.png"
          alt=""
          width={1494}
          height={1494}
        />
        <Image
          className="absolute start-0 md-top-28 -z-10 translate-x-0"
          src="/assets/img/png/left-shadow-about-hero.png"
          alt=""
          width={1494}
          height={1494}
        />
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10">
          <div className="sm:pb-16 sm:pt-[160px] xl:pb-[126px] xl:pt-[170px] pb-16 pt-36">
            <h1
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-easing="linear"
              data-aos-offset="100"
              className="font-HelveticaNeueMedium font-medium text-[30px] sm:text-[45px] lg:text-[50px] xl:text-xxl text-white sm:leading-[66px] text-center leading-[110%]"
            >
              {hero.heading}
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommonHero;
