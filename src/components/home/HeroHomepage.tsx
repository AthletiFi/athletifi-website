// HeroHomepage.tsx

// This component renders the hero section on the homepage, which is the top section below the menu with a big image and a call to action.

import Image from 'next/image';
import Link from 'next/link';

import BlueButton from '@/components/common/BlueButton';

const IMAGE_WIDTH_1: number = 600;
const IMAGE_HEIGHT_1: number = 600;
const IMAGE_WIDTH_2: number = 350;
const IMAGE_HEIGHT_2: number = 350;

const HeroHomepage: React.FC = () => {
  return (
    <>
      <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 my-2 pb-8 pt-36 mx-auto">
        <div className="flex items-center flex-col lg:flex-row">
          <div className="max-w-490 lg:max-w-520 xl:max-w-608">
            <h1 className="font-HelveticaNeueMedium text-primary text-center lg:text-start text-basemd md:text-5xl sm:text-4xl font-medium leading-35 sm:leading-45 md:leading-50 lg:leading-66">
              {/* Make club soccer more affordable */}
              Stay Connected with your Favorite Young Soccer Players
            </h1>
            <p className="font-Segoe text-primary text-base sm:text-md font-normal mt-4 opacity-80 text-center lg:text-start">
              AthletiFi is the youth soccer portal to the digital world. We
              create commemorative physical player cards that you can collect to
              follow a young soccer player&apos;s journey through tournaments
              and matches, no matter where they occur.
            </p>
            <p className="font-Segoe text-primary text-base sm:text-md font-normal mt-4 mb-12 opacity-80 text-center lg:text-start">
              Every player card becomes a journey of potential, with a scannable
              link to instantly connect you to the player dashboard, showcasing
              up-to-date stats and highlight clips of the latest and greatest
              plays.
            </p>
            <h2 className="font-HelveticaNeueMedium text-white text-center lg:text-start text-md font-medium leading-25">
              Looking for a Summer Select program in Eastern Pennsylvania?
            </h2>
            <p className="font-Segoe text-primary text-base sm:text-md font-normal mt-4 opacity-80 text-center lg:text-start">
              AthletiFi has teamed up with Eastern Pennsylvania&apos;s top
              coaches to create a first-of-its-kind Summer Select program!
            </p>
            {/* CONVERT-INTO-LINK-TAG */}
            <div className="flex lg:justify-start justify-center mt-12 ">
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
      <div className="pb-0 mb-0">
        <div className="sm:absolute right-0 top-65/100 md:-translate-y-1/2 max-w-400 sm:max-w-500 xl:max-w-600 sm:hidden lg:inline-block ms-auto">
          <Image
            className="w-full"
            src="/assets/img/webp/hero_female_player.webp"
            alt="Female player leaping to kick the ball with her left foot"
            width={IMAGE_WIDTH_1}
            height={IMAGE_HEIGHT_1}
            quality={75}
            loading="lazy"
          />
        </div>
      </div>
      {/*  IPAD SCREEN IMG */}
      <div className="pb-0 mb-0 hidden sm:block lg:hidden w-full">
        <Image
          className="mx-auto"
          src="/assets/img/webp/hero_female_player_2.webp"
          alt="Female player leaping to kick the ball with her left foot"
          width={IMAGE_WIDTH_2}
          height={IMAGE_HEIGHT_2}
          quality={75}
          loading="lazy"
        />
      </div>
    </>
  );
};

export default HeroHomepage;
