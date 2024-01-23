import Image from 'next/image';
import React from 'react';

const UniqueAthletifi = () => {
  return (
    <>
      <section className="relative lg:before:content-[''] before:absolute lg:before:w-[448px] before:h-[448px] before:-top-20 before:left-0 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-translate-x-1/3 before:-z-10 before:rounded-full after:content-[''] after:absolute after:w-[448px] after:h-[448px] after:-bottom-20 after:right-0 after:bg-shadow_blue after:blur-[111px] after:opacity-25 after:translate-x-1/3 after:-z-10 after:rounded-full lg:pb-24 sm:pb-12">
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto lg:pt-14 relative z-10 lg:mt-14 xl:mt-0">
          <div className="lg:px-14 lg:pt-14 sm:px-8 px-4 pt-6 sm:bg-playground-unique bg-playground-unique-sm bg-opacity-50 bg-[length:100%_100%] bg-center bg-no-repeat flex flex-col items-center ">
            <h2
              className="lg:text-5xl md:text-[40px] sm:text-4xl text-[26px] text-primary font-HelveticaNeueMedium text-center py-2"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-easing="linear"
              data-aos-delay="200"
              data-aos-offset="200"
            >
              <span className="relative after:content after:absolute after:bottom-[-7px] sm:after:bottom-[-2px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat mb-4 lg:leading-[60px] leading-[120%]">
                {/* What Makes */}
                Beyond the Numbers:
              </span>{' '}
              {/* AthletiFi Unique */}
              True Player Insights
            </h2>
            <h3
              className="text-primary text-lgxl font-HelveticaNeueRegular leading-normal"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-easing="linear"
              data-aos-delay="300"
              data-aos-offset="200"
            >
              {/* Empowering Tomorrow's Soccer Stars */}
              Decoding the game for passive followers
            </h3>
            <div
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-easing="linear"
              data-aos-delay="400"
              data-aos-offset="200"
            >
              <p className="font-Segoe text-md opacity-80 text-primary text-center md:pb-10 pb-5 mt-4">
                {/* Stats allow friends, family, and fans to easily support and
                follow their favorite players or players in their community */}
                Soccer is an intricate dance of strategy, skill, and raw
                athleticism. While objective game statistics provide a glimpse
                into a player&apos;s contribution, they barely scratch the
                surface.{' '}
                <span className="block md:mt-4 mt-2">
                  {/* <span className="lg:block"> */}
                  Every single game includes thousands of interactions – goals,
                  passes, shots, assists, etc. This complexity makes monitoring
                  a player’s skill progression challenging.
                </span>
                <span className="block md:mt-4 mt-2">
                  {/* On the other hand, stats allow coaches and scouts to make
                  data-driven choices when building their roster and in-game
                  strategy */}
                  AthletiFi translates raw data into easy-to-follow player
                  ratings, giving you the insights you need without requiring
                  you to pull hours long study sessions.
                </span>
              </p>
            </div>
            {/* FOOTBALL PLAYER IMAGE */}
            <div className="opacity-88">
              <Image
                data-aos="fade-in"
                data-aos-duration="600"
                data-aos-easing="linear"
                data-aos-delay="200"
                data-aos-offset="200"
                // className="mb-[1px] lg:max-w-[267px] max-w-[180px] sm:max-w-[220px]"
                className="mb-[1px] lg:max-w-[652px] max-w-[326px] sm:max-w-[300px] opacity-1"
                // src="/assets/img/png/portrait-young.png"
                src="/assets/img/webp/gen-soccer-player.webp"
                width={652}
                height={512}
                alt="Player jumping through the air chasing after the ball"
              />
            </div>
          </div>
        </div>
        {/* FOOTBALL IMAGE CORNER*/}
        <Image
          className="absolute lg:w-[220px] sm:w-[150px] w-[100px] -bottom-8 right-0 z-0"
          src="/assets/img/png/unique-football.png"
          width={220}
          height={286}
          alt=""
        />
      </section>
    </>
  );
};

export default UniqueAthletifi;
