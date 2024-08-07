import {
  VillanovaIcon,
  MsaIcon,
  FcSportsIcon,
  AjFootballFactoryIcon,
} from '@/components/common/Icon';

const AOS_DURATION: number = 400;
const AOS_DELAY: number[] = [400, 600, 1000];
const AOS_OFFSET: number = 200;

const TrustedPartners: React.FC = () => {
  return (
    <>
      <section>
        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto mt-3 pt-3 mb-6 pb-6">
          <h2
            className="text-lg md:text-5xl sm:text-4xl text-center font-HelveticaNeueMedium font-medium text-primary sm:py-10 pb-5 leading-120"
            data-aos="fade-up"
            data-aos-duration={AOS_DURATION}
            data-aos-easing="linear"
          >
            <span className="relative">Our trusted</span> partners
          </h2>
          {/* <div
            className="flex md:justify-between flex-col md:flex-row lg:pt-5 sm:gap-4 gap-3 md:items-start items-center"
            data-aos="fade-up"
            data-aos-duration={AOS_DURATION}
            data-aos-easing="linear"
            data-aos-delay={AOS_DELAY[0]}
            data-aos-offset={AOS_OFFSET}
          >
            <h3 className=" max-w-396 text-primary sm:text-2xl text-md font-HelveticaNeueMedium md:text-start text-center">
              Stats for the next generation of soccer superstars
            </h3>
            <p className="font-Segoe text-primary opacity-80 max-w-md md:text-start text-center">
              We have partnered with some of the top soccer clubs in the
              Mid-Atlantic region to bring sports technology to new heights.
            </p>
          </div> */}
          <div className="flex justify-evenly xl:mt-16 mt-10 xl:mb-28 sm:mb-14 mb-4 sm:flex-row flex-col">
            {/* MSA LOGO */}
            <div
              className="md:w-43/100 sm:max-w-48/100 w-full md:h-152 h-120 border border-solid border-partnersBorders hover:border-skyblue duration-300 transition-all flex justify-center items-center bg-blackBG rounded-lg"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY[0]}
              data-aos-offset={AOS_OFFSET}
            >
              {/* <MSAIcon /> */}
              <MsaIcon />
            </div>
            {/* VILLANOVA LOGO */}
            <div
              className="md:w-43/100 sm:max-w-48/100 w-full mt-4 sm:mt-0 md:h-152 h-120 border border-solid border-partnersBorders hover:border-skyblue duration-300 transition-all flex justify-center items-center bg-blackBG rounded-lg"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY[0]}
              data-aos-offset={AOS_OFFSET}
            >
              <VillanovaIcon />
            </div>
            {/* FC Sports  LOGO */}
            <div
              className="md:w-43/100 sm:max-w-48/100 w-full mt-4 sm:mt-0 md:h-152 h-120 border border-solid border-partnersBorders hover:border-skyblue duration-300 transition-all flex justify-center items-center bg-blackBG rounded-lg"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY[0]}
              data-aos-offset={AOS_OFFSET}
            >
              <FcSportsIcon />
            </div>
            {/* AJ Football Factory  LOGO */}
            <div
              className="md:w-43/100 sm:max-w-48/100 w-full mt-4 sm:mt-0 md:h-152 h-120 border border-solid border-partnersBorders hover:border-skyblue duration-300 transition-all flex justify-center items-center bg-blackBG rounded-lg"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY[0]}
              data-aos-offset={AOS_OFFSET}
            >
              <AjFootballFactoryIcon />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedPartners;
