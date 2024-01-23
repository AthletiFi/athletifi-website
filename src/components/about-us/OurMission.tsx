// OurMission.tsx

// This component renders the "What We Do" section on the "About Us" page.
// It outlines the services and products offered by the company.

import React from 'react';
import Image from 'next/image';
import { BlueShadow, UnderLineText } from '../common/Icon';

const OurMission = () => {
  return (
    <>
      <div className="relative py-6 lg:pt-10 sm:pt-20 pt-14">
        {/* SHADOW IMG */}
        <Image
          className="absolute top-[30%] -translate-y-24 end-0"
          src="/assets/img/png/what-we-do-shadow.png"
          width={500}
          height={500}
          alt=""
        />
        <span className="absolute top-50 -start-10">
          <BlueShadow />
        </span>
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="lg:w-1/2">
              <div
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-offset="200"
                className="flex flex-col justify-center h-full lg:pe-6 xl:p-0 text-center lg:text-start lg:mt-14"
              >
                <h2 className="font-HelveticaNeueMedium font-medium text-[26px]  md:text-5xl sm:text-4xl leading-[60px] text-[#FDFEFF] md:mb-4">
                  <span className="relative">
                    Our Mission
                    <span className="absolute -bottom-2 left-0">
                      <UnderLineText />
                    </span>
                  </span>
                </h2>
                <p className="font-Segoe font-normal text-md md:max-w-[530px] text-[#FDFEFF] mx-auto lg:ms-0 opacity-80 leading-7 sm:pt-4">
                  We are a sports technology company that are looking for ways
                  to increase engagement and bring the excitement of youth
                  soccer to a broader audience.
                </p>
                <p className="font-Segoe font-normal text-md md:max-w-[530px] text-[#FDFEFF] mx-auto lg:ms-0 opacity-80 leading-7 sm:pt-4">
                  Our goal is to enrich the soccer experience, not only by
                  providing valuable insights into player performance but also
                  by fostering a deeper connection between young athletes, their
                  families, and the broader soccer community.
                </p>
                <p className="font-Segoe font-normal text-md md:max-w-[530px] text-[#FDFEFF] mx-auto lg:ms-0 opacity-80 leading-7 sm:pt-4">
                  We understand that soccer is more than just a game; it&apos;s
                  a community. AthletiFi&apos;s platform encourages engagement
                  by providing a fun and informative way for families and
                  community members to connect with young athletes.
                </p>
              </div>
            </div>
            <div className="lg:w-5/12 w-9/12 sm:w-3/5 mx-auto lg:me-0 mt-8">
              <div
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-easing="linear"
                data-aos-delay="500"
                data-aos-offset="100"
                className="flex justify-center lg:justify-start"
              >
                <Image
                  src="/assets/img/webp/what-we-do-card-img.webp"
                  width={496}
                  height={603}
                  alt="Player card of Oscar Gasga from Villanova Soccer Academy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMission;
