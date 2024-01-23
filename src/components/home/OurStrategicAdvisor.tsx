// OurStrategicAdvisor.tsx

// This component showcases the strategic advisors associated with the company.

import Image from 'next/image';
import React from 'react';
import BlueButton from '../common/BlueButton';
import Link from 'next/link';

const OurStrategicAdvisor = () => {
  return (
    <>
      <div className=" bg-no-repeat bg-cover relative">
        {/* BACKGROUND GRID IMAGE */}
        <Image
          className="absolute top-0 -right-0 w-[40%] lg:block hidden z-0  h-[100%] opacity-70"
          src="/assets/img/png/football_net.png"
          width={996}
          height={768}
          alt=""
        />
        <div className="container xl:pb-14">
          <div
            data-aos="fade-in"
            data-aos-duration="600"
            data-aos-easing="linear"
            data-aos-delay="200"
            data-aos-offset="200"
            className="flex items-center justify-center lg:gap-8 xl:gap-[114px] flex-col-reverse lg:flex-row pt-14 pb-14 xl:pt-[95px] xlpb-[150px]"
          >
            {/* ADVISOR IMAGE */}
            <Image
              className="max-w-[270px] sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[475px] xl:max-h-[430px] mt-8 lg:mt-0 shadow-coach-shadow"
              src="/assets/img/webp/meet_our_strategic_profile.webp"
              alt="Meet Darren John an accomplished pro-player turned coach"
              width={475}
              height={430}
            />
            <div
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-easing="linear"
              data-aos-delay="200"
              data-aos-offset="200"
              className="lg:max-w-[555px] lg:after:w-[690px] relative after:absolute after:content-[''] after:lg:h-[420px] lg:after:bg-[#040F16] after:blur-[55px] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:z-0"
            >
              <div className="relative z-10">
                <h3 className="text-primary font-HelveticaNeueMedium text-[26px] sm:text-[36px] xl:text-5xl lg:text-[43px] md:text-[40px] font-medium lg:!leading-[60px] sm:leading-[45px] md:leading-[58px] leading-[36px] text-center lg:text-start">
                  <span className="relative after:absolute after:bottom-[-8px] sm:after:bottom-[-5px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
                    Meet our
                  </span>{' '}
                  strategic advisor Darren John
                </h3>
                <p className="text-primary text-base md:text-md font-Segoe font-normal opacity-80 mt-4 text-center lg:text-start">
                  In 2009 Darren played in the Trinidad and Tobago pro league as
                  a 16 year old where he completed one year with Northeast Stars
                  before migrating to the U.S. During his coaching career Darren
                  has coached at several clubs in Montgomery County which
                  includes Philadelphia Union pre academy and FC Delco. He is
                  also the technical director of the Villanova Soccer Academy.
                </p>
                <div className="flex justify-center lg:justify-start pt-5 lg:pt-10">
                  <Link href="/sign-up">
                    <BlueButton text="Join now" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStrategicAdvisor;
