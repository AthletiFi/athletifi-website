import React from 'react';
import { EyeBallIcon, VillanovaIcon } from '../common/Icon';

const TrustedPartners: React.FC = () => {
  return (
    <>
      <section>
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto xl:px-0 px-5">
          <h2
            className="text-center font-HelveticaNeueMedium font-medium lg:text-5xl md:text-[40px] sm:text-4xl text-[26px] text-primary sm:py-10 pb-5 leading-[120%]"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-easing="linear"
          >
            <span className="relative after:content after:absolute after:bottom-[-10px] sm:after:bottom-[-4px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
              Our trusted
            </span>{' '}
            partners
          </h2>
          <div
            className="flex md:justify-between flex-col md:flex-row lg:pt-5 sm:gap-4 gap-3 md:items-start items-center"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-easing="linear"
            data-aos-delay="400"
            data-aos-offset="200"
          >
            <h3 className="max-w-[396px] text-primary sm:text-2xl text-md font-HelveticaNeueMedium md:text-start text-center">
              Stats for the next generation of soccer superstars
            </h3>
            <p className="font-Segoe text-primary opacity-80 max-w-md md:text-start text-center">
              We have partnered with some of the top soccer clubs in the
              Mid-Atlantic region to bring sports technology to new heights.
            </p>
          </div>
          <div className="flex justify-evenly xl:mt-16 mt-10 xl:mb-28 sm:mb-14 mb-4 sm:flex-row flex-col">
            {/* EYEBALL LOGO */}
            <div
              className="md:w-[43%] sm:max-w-[48%] w-full md:h-[152px] h-[120px] border border-solid border-[#49545C] hover:border-skyblue duration-300 transition-all flex justify-center items-center bg-[#000B13] rounded-lg"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="600"
              data-aos-offset="200"
            >
              <EyeBallIcon />
            </div>
            {/* VILLANOVA LOGO */}
            <div
              className="md:w-[43%] sm:max-w-[48%] w-full mt-4 sm:mt-0 md:h-[152px] h-[120px] border border-solid border-[#49545C] hover:border-skyblue duration-300 transition-all flex justify-center items-center bg-[#000B13] rounded-lg"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="1000"
              data-aos-offset="200"
            >
              <VillanovaIcon />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedPartners;
