// LookingForward.tsx

// This component renders the "Who We Are" section on the "About Us" page.
// It provides background information about the company and its team.

import React from 'react';
import { BlueShadow, UnderLineText } from '../common/Icon';
import Image from 'next/image';

const LookingForward = () => {
  return (
    <section className="pt-10 pb-16 sm:mb-14 sm:pb-12 lg:mb-20 relative">
      <div className="absolute top-0 xl:-top-[70px] -end-[80px]  xl:w-[250px] xl:h-[380px] z-0">
        {/* RIGHT FOOTBALL IMG */}
        <Image
          className="max-w-[176px] me-0"
          src="/assets/img/png/football.png"
          width={176}
          height={286}
          alt=""
        />
      </div>
      {/* SHADOW IMG */}
      <Image
        className="absolute -top-[250px] end-0 z-0"
        src="/assets/img/png/what-we-do-shadow.png"
        width={448}
        height={448}
        alt=""
      />
      <span className="absolute top-50 start-0 z-0">
        <BlueShadow />
      </span>
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative">
        <div className="container__border--blue-gradient bg-blue_linear_gradient after:absolute relative lg:py-16 py-5 md:py-10 sm:mt-6 z-0  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px]">
          <div
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-easing="ease-in-sine"
            data-aos-delay="300"
            data-aos-offset="100"
          >
            <h2 className="font-HelveticaNeueMedium md:text-5xl text-[26px] sm:text-4xl text-[#FDFEFF] font-medium leading-[60px] relative z-20 text-center md:mb-4">
              <span className="relative ">
                Looking Forward
                <span className="absolute -bottom-2 left-0 z-0">
                  <UnderLineText />
                </span>
              </span>
            </h2>
            <p className="font-Segoe font-normal text-md leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-6 px-3 xl:px-0 relative z-20">
              Our mission is to create tools that help keep parents, friends,
              and community members connected with the next generation of soccer
              players, to make sure they never miss a goal, pass or tackle
              again. As we continue to grow, we plan to introduce new features
              and capabilities to our platform, always aiming to enhance user
              engagement and to celebrate the achievements of young soccer
              talents.
              <span className="block pb-2">
                {' '}
                Looking ahead, AthletiFi is committed to broadening our impact
                on the global soccer landscape. We envision a world where
                technology becomes an integral part of the youth soccer
                experience, helping to discover and nurture emerging talents. We
                aim to be a catalyst for positive change, contributing to the
                growth and popularity of the sport we love. AthletiFi is excited
                to be part of this journey, driving innovation in youth soccer
                and building a lasting legacy in the sport.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookingForward;
