// WhoWeAre.tsx

// This component renders the "Our Mission" section on the "About Us" page.
// It provides information about the company's mission and objectives.

import React from 'react';
import Image from 'next/image';
import { UnderLineText } from '../common/Icon';
import { CenterBlueShadow } from '../common/Icon';

const WhoWeAre = () => {
  const playerImageMission = 'stebi-card-mission';
  return (
    <section className="sm:py-10 py-8 lg:mt-14 relative">
      <div className="lg:w-[600px] lg:h-[700px] w-1/4 absolute -end-20 top-10 z-0">
        {/* GRID IMG */}
        <Image
          src="/assets/img/png/our-mission-grid-img.png"
          width={692}
          height={200}
          alt=""
          className="w-full h-full"
        />
      </div>
      {/* SHADOW IMG */}
      <Image
        className="absolute top-100 end-0 z-0"
        src="/assets/img/png/what-we-do-shadow.png"
        width={608}
        height={448}
        alt=""
      />
      <span className="absolute -top-48 start-[45%] -translate-x-1/2 z-0">
        <CenterBlueShadow />
      </span>
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 sm:py-2 z-10 relative">
        <div className="flex lg:flex-row flex-col-reverse justify-between">
          <div className="lg:w-5/12 xl:w-[531px] min-[1530px]:w-[40%] w-9/12 sm:w-3/5 mx-auto lg:ms-0  mt-6 sm:mt-8 lg:mt-0">
            <div
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="100"
              data-aos-offset="200"
              className="flex justify-center lg:justify-start"
            >
              <Image
                src={`/assets/img/webp/${playerImageMission}.webp`}
                className="xl:h-[603px] xl:w-[505px] min-[1530px]:w-full"
                width={505}
                height={603}
                alt="Player card of Stebi Vidal from Villanova Soccer Academy"
              />
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-[506px] min-[1530px]:w-1/2 ">
            <div
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="600"
              data-aos-offset="100"
              className="flex flex-col justify-center h-full text-center min-[1530px]:items-end lg:text-start"
            >
              <h2 className="font-HelveticaNeueMedium md:text-5xl sm:text-4xl text-[26px] min-[1530px]:w-[506px] sm:mt-6 text-[#FDFEFF] font-medium leading-[60px] md:mb-4">
                <span className="relative">
                  Who We Are
                  <span className="absolute -bottom-2 left-0">
                    <UnderLineText />
                  </span>
                </span>
              </h2>
              <p className="font-normal font-Segoe text-md leading-7 text-[#FDFEFF] text-center mx-auto lg:ms-0 min-[1530px]:me-0 lg:text-start md:max-w-[506px] xl:w-auto opacity-80 m-0 font-sans sm:pt-4">
                AthletiFi is a team of innovators, technology experts, soccer
                coaches and former professional players united by a shared love
                for the game and a commitment to youth sports development. We
                bring together extensive experience in technology, sports
                analytics, and community engagement, making us uniquely equipped
                to bring our vision to life.
              </p>
              <p className="font-normal font-Segoe text-md leading-7 text-[#FDFEFF] text-center mx-auto lg:ms-0 min-[1530px]:me-0 lg:text-start md:max-w-[506px] xl:w-auto opacity-80 m-0 font-sans sm:pt-4">
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
