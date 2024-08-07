// WhoWeAre.tsx

// This component renders the "Our Mission" section on the "About Us" page.
// It provides information about the company's mission and objectives.

import Image from 'next/image';
import { UnderLineText } from '@/components/common/Icon';
import { CenterBlueShadow } from '@/components/common/Icon';

const GRID_IMAGE_WIDTH: number = 692;
const GRID_IMAGE_HEIGHT: number = 200;
const SHADOW_IMAGE_WIDTH: number = 608;
const SHADOW_IMAGE_HEIGHT: number = 448;
const PLAYER_IMAGE_WIDTH: number = 505;
const PLAYER_IMAGE_HEIGHT: number = 603;
const AOS_DURATION: number = 400;
const AOS_DELAY_FIRST: number = 100;
const AOS_DELAY_SECOND: number = 600;
const AOS_OFFSET_FIRST: number = 200;
const AOS_OFFSET_SECOND: number = 100;

const WhoWeAre: React.FC = () => {
  const playerImageMission = 'stebi-card-mission';
  return (
    <section className="sm:py-10 py-8 lg:mt-14 relative">
      <div className="lg:w-600 lg:h-700 w-1/4 absolute -end-20 top-10 z-0">
        {/* GRID IMG */}
        <Image
          src="/assets/img/png/our-mission-grid-img.png"
          width={GRID_IMAGE_WIDTH}
          height={GRID_IMAGE_HEIGHT}
          alt=""
          className="w-full h-full"
          quality={75}
          loading="lazy"
        />
      </div>
      {/* SHADOW IMG */}
      <Image
        className="absolute top-100 end-0 z-0"
        src="/assets/img/png/what-we-do-shadow.png"
        width={SHADOW_IMAGE_WIDTH}
        height={SHADOW_IMAGE_HEIGHT}
        alt=""
        quality={75}
        loading="lazy"
      />
      <span className="absolute -top-48 start-[45%] -translate-x-1/2 z-0">
        <CenterBlueShadow />
      </span>
      <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto px-3 sm:py-2 z-10 relative">
        <div className="flex lg:flex-row flex-col-reverse justify-between">
          <div className="lg:w-5/12 xl:w-531 min-w-40 w-9/12 sm:w-3/5 mx-auto lg:ms-0  mt-6 sm:mt-8 lg:mt-0">
            <div
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY_FIRST}
              data-aos-offset={AOS_OFFSET_FIRST}
              className="flex justify-center lg:justify-start"
            >
              <Image
                src={`/assets/img/webp/${playerImageMission}.webp`}
                className="xl:h-603 xl:w-505 1530:w-full"
                width={PLAYER_IMAGE_WIDTH}
                height={PLAYER_IMAGE_HEIGHT}
                alt="Player card of Stebi Vidal from Villanova Soccer Academy"
                quality={75}
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-506 1530:w-1/2 ">
            <div
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY_SECOND}
              data-aos-offset={AOS_OFFSET_SECOND}
              className="flex flex-col justify-center h-full text-center 1530:items-end lg:text-start"
            >
              <h2 className="font-HelveticaNeueMedium md:text-5xl sm:text-4xl text-lg 1530:w-506 sm:mt-6 text-primary font-medium leading-60 md:mb-4">
                <span className="relative">
                  Who We Are
                  <span className="absolute -bottom-5 left-0">
                    <UnderLineText />
                  </span>
                </span>
              </h2>
              <p className="font-normal font-Segoe text-md leading-7 text-primary text-center mx-auto lg:ms-0 1530:me-0 lg:text-start md:max-w-506 xl:w-auto opacity-80 m-0 font-sans sm:pt-4">
                AthletiFi is a team of innovators, technology experts, soccer
                coaches and former professional players united by a shared love
                for the game and a commitment to youth sports development. We
                bring together extensive experience in technology, sports
                analytics, and community engagement, making us uniquely equipped
                to bring our vision to life.
              </p>
              <p className="font-normal font-Segoe text-md leading-7 text-primary text-center mx-auto lg:ms-0 1530:me-0 lg:text-start md:max-w-506 xl:w-auto opacity-80 m-0 font-sans sm:pt-4">
                We are parents, coaches, and fans ourselves, deeply rooted in
                the soccer community. This personal connection to the sport
                drives our dedication to creating a platform that resonates with
                players and their supporters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
