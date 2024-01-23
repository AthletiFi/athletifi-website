// HeroHomepage.tsx

// This component renders the hero section on the homepage, which is the top section below the menu with a big image and a call to action.

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BlueButton from '../common/BlueButton';

const HeroHomepage = () => {
  return (
    <>
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] pt-28  sm:pt-32  mx-auto">
        <div className="flex items-center flex-col lg:flex-row">
          <div className="max-w-[490px] lg:max-w-[520px] xl:max-w-[608px]">
            <h1 className="font-HelveticaNeueMedium text-white text-center lg:text-start text-[30px] sm:text-[45px] lg:text-[50px] xl:text-xxl font-medium leading-[35px] sm:leading-[45px] md:leading-[50px] lg:leading-[66px]">
              {/* Make club soccer more affordable */}
              Stay Connected with your Favorite Young Soccer Players
            </h1>
            <p className="font-Segoe text-white text-[16px] sm:text-md font-normal mt-4 opacity-80 text-center lg:text-start">
              AthletiFi is the youth soccer portal to the digital world. We
              create commemorative physical player cards that you can collect to
              follow a young soccer player&apos;s journey through tournaments
              and matches, no matter where they occur.
            </p>
            <p className="font-Segoe text-white text-[16px] sm:text-md font-normal mt-4 mb-12 opacity-80 text-center lg:text-start">
              Every player card becomes a journey of potential, with a scannable
              link to instantly connect you to the player dashboard, showcasing
              up-to-date stats and highlight clips of the latest and greatest
              plays.
            </p>
            <h2 className="font-HelveticaNeueMedium text-white text-center lg:text-start text-md font-medium leading-[25px]">
              Looking for a Summer Select program in Eastern Pennsylvania?
            </h2>
            <p className="font-Segoe text-white text-[16px] sm:text-md font-normal mt-4 opacity-80 text-center lg:text-start">
              AthletiFi has teamed up with Eastern Pennsylvania&apos;s top
              coaches to create a first-of-its-kind Summer Select program!
            </p>
            {/* CONVERT-INTO-LINK-TAG */}
            <div className="flex lg:justify-start justify-center lg:mt-10 mt-7 lg:pb-14 lg:mb-10">
              <Link
                href="https://www.athletifiselect.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BlueButton text="Learn more about Summer Select" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*  LAPTOP AND MOBILE SCREEN IMG */}
      <div className="pt-6 sm:pt-10 lg:pt-0">
        <div className="sm:absolute right-0 top-[65%] md:-translate-y-1/2 max-w-[400px] sm:max-w-[500px] xl:max-w-[600px] sm:hidden lg:inline-block ms-auto">
          <Image
            className="w-full"
            src="/assets/img/webp/hero_female_player.webp"
            alt="Female player leaping to kick the ball with her left foot"
            width={600}
            height={600}
          />
        </div>
      </div>
      {/*  IPAD SCREEN IMG */}
      <div className="hidden sm:block lg:hidden w-full">
        <Image
          className="mx-auto"
          src="/assets/img/webp/hero_female_player_2.webp"
          alt="Female player leaping to kick the ball with her left foot"
          width={350}
          height={350}
        />
      </div>
    </>
  );
};

export default HeroHomepage;
