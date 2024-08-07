import Image from 'next/image';
import BlueButton from '@/components/common/BlueButton';
import Link from 'next/link';

const FOOTBALL_NET_IMAGE_WIDTH: number = 996;
const FOOTBALL_NET_IMAGE_HEIGHT: number = 768;
const AOS_DURATION: number = 600;
const AOS_DELAY: number = 200;
const AOS_OFFSET: number = 200;
const EXPENSIVE_FOOTBALL_IMAGE_WIDTH: number = 700;
const EXPENSIVE_FOOTBALL_IMAGE_HEIGHT: number = 700;
const FOOTBALL_IMAGE_WIDTH: number = 700;
const FOOTBALL_IMAGE_HEIGHT: number = 400;

const SoccerExpensive: React.FC = () => {
  return (
    <>
      <div className="relative flex items-center lg:bg-soccer-expensive-bg bg-no-repeat bg-cover justify-center flex-col lg:flex-row my:10 py:10 lg:my-20 lg:py-20">
        <Image
          className="absolute -top-20 -left-0 w-40/100 lg:block hidden z-0  h-120"
          src="/assets/img/png/football_net.png"
          width={FOOTBALL_NET_IMAGE_WIDTH}
          height={FOOTBALL_NET_IMAGE_HEIGHT}
          alt="Football net"
          quality={75}
          loading="lazy"
        />
        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto">
          <div className="max-w-623 mx-auto lg:mx-0 relative after:content after:absolute lg:after:w-690 lg:after:h-420 lg:after:bg-blackBG after:blur-55 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:z-0">
            <div
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY}
              data-aos-offset={AOS_OFFSET}
              className=" relative z-10"
            >
              <h2 className="font-HelveticaNeueMedium text-lg md:text-5xl sm:text-4xl text-primary font-medium mb-4 text-center lg:text-start leading-[120%] xl:leading-60 pt-10">
                <span className="relative">
                  {/* Soccer is{" "} */}
                  Passive Engagement,{' '}
                </span>
                {/* Expensive & Reduces Accessibility */}
                Active Impact
              </h2>
              <p className="font-Segoe font-normal text-md text-primary opacity-80 text-center lg:text-start">
                {/* There is an unfortunate contradiction at the heart of club
                soccer — a sport renowned for its global unity, yet hindered by
                prohibitive costs that reduce accessibility and limit
                participation. Club soccer is creating a system that excludes
                potential players from less privileged backgrounds. */}
                AthletiFi&apos;s player cards keep the thrill of soccer at your
                fingertips. With dynamically updating performance stats and
                thrilling highlight clips, you will never miss a moment of your
                favorite player&apos;s progression. All the while knowing that
                their journey is just the beginning.
              </p>
              <div className="flex lg:justify-start justify-center items-center mt-10">
                <Link href="/about-us">
                  <BlueButton text="Read&nbsp;more" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={AOS_DURATION}
          data-aos-easing="linear"
          data-aos-delay={AOS_DELAY}
          data-aos-offset={AOS_OFFSET}
        >
          <div className="absolute right-0 lg:top-[40%] lg:-translate-y-[50%] xl:w-700 xl:h-1000 w-300 sm:w-450 lg:w-500 hidden lg:inline-block -z-10">
            <Image
              className="w-full"
              src="/assets/img/webp/expensive_football.webp"
              alt="Football at the back of the net"
              width={EXPENSIVE_FOOTBALL_IMAGE_WIDTH}
              height={EXPENSIVE_FOOTBALL_IMAGE_HEIGHT}
              quality={75}
              loading="lazy"
            />
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration={AOS_DURATION}
          data-aos-easing="linear"
          data-aos-delay={AOS_DELAY}
          data-aos-offset={AOS_OFFSET}
        >
          {/* SMALL FOOTBALL CORNER */}
          <div className="lg:hidden relative w-full sm:w-80/100 mx-auto mt-5">
            <Image
              className="mx-auto"
              src="/assets/img/png/football_img_2.png"
              alt="Football at the back of the net"
              width={FOOTBALL_IMAGE_WIDTH}
              height={FOOTBALL_IMAGE_HEIGHT}
              quality={75}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SoccerExpensive;
