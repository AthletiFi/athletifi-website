// OurStrategicAdvisor.tsx

// This component showcases the strategic advisors associated with the company.

import Image from 'next/image';

import BlueButton from '@/components/common/BlueButton';
import Link from 'next/link';

const NET_IMAGE_WIDTH: number = 996;
const NET_IMAGE_HEIGHT: number = 768;
const STRATEGIC_IMAGE_WIDTH: number = 475;
const STRATEGIC_IMAGE_HEIGHT: number = 430;
const AOS_DURATION: number = 600;
const AOS_DELAY: number = 200;
const AOS_OFFSET: number = 200;

const OurStrategicAdvisor: React.FC = () => {
  return (
    <>
      <div className=" bg-no-repeat bg-cover relative">
        {/* BACKGROUND GRID IMAGE */}
        <Image
          className="absolute top-0 -right-0 w-40/100 lg:block hidden z-0  h-full opacity-70"
          src="/assets/img/png/football_net.png"
          width={NET_IMAGE_WIDTH}
          height={NET_IMAGE_HEIGHT}
          alt=""
          quality={75}
          loading="lazy"
        />
        <div className="container xl:pb-14">
          <div
            data-aos="fade-in"
            data-aos-duration={AOS_DURATION}
            data-aos-easing="linear"
            data-aos-delay={AOS_DELAY}
            data-aos-offset={AOS_OFFSET}
            className="flex items-center justify-center lg:gap-8 xl:gap-114 flex-col-reverse lg:flex-row pt-14 pb-14 xl:pt-95 xl:pb-150"
          >
            {/* ADVISOR IMAGE */}
            <Image
              className="max-w-270 sm:max-w-350 lg:max-w-400 xl:max-w-475 xl:max-h-430 mt-8 lg:mt-0 shadow-coach-shadow"
              src="/assets/img/webp/meet_our_strategic_profile.webp"
              alt="Meet Darren John an accomplished pro-player turned coach"
              width={STRATEGIC_IMAGE_WIDTH}
              height={STRATEGIC_IMAGE_HEIGHT}
              quality={75}
              loading="lazy"
            />
            <div
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY}
              data-aos-offset={AOS_OFFSET}
              className="lg:max-w-555 lg:after:w-690 relative after:absolute after:content-[''] after:lg:h-420 lg:after:bg-blackBG after:blur-55 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:z-0"
            >
              <div className="relative z-10">
                <h3 className="text-primary font-HelveticaNeueMedium text-basemd sm:text-lgxl xl:text-5xl lg:text-sxl md:text-lg2xl font-medium lg:!leading-60 sm:leading-45 md:leading-58 leading-35 text-center lg:text-start">
                  <span className="relative after:absolute after:bottom--8 sm:after:bottom--5 after:left-0 md:after:w-209 after:w-150 after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
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
                  <Link href="/contact-us">
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
