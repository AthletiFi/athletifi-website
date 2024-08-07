'use client';
import Image from 'next/image';

import Slider from 'react-slick';
import { SliderSettings } from '@/types/Slider.type';

const AOS_DURATION: number[] = [500, 600];
const AOS_DELAY: number[] = [200, 300, 400, 800, 1200];
const AOS_OFFSET: number = 200;
const LEFT_BALL_IMAGE_WIDTH: number = 240;
const LEFT_BALL_IMAGE_HEIGHT: number = 286;
const LEFT_SHADOW_IMAGE_WIDTH: number = 448;
const LEFT_SHADOW_IMAGE_HEIGHT: number = 448;
const SOCCER_PLAYER_IMAGE_WIDTH_LEFT: number = 280;
const SOCCER_PLAYER_IMAGE_HEIGHT_LEFT: number = 280;
const SOCCER_PLAYER_IMAGE_WIDTH_CENTER: number = 409;
const SOCCER_PLAYER_IMAGE_HEIGHT_CENTER: number = 409;
const SOCCER_PLAYER_IMAGE_WIDTH_RIGHT: number = 280;
const SOCCER_PLAYER_IMAGE_HEIGHT_RIGHT: number = 280;

const StatsReimagined = () => {
  const playerImageCenter = 'jose-card-img';
  const playerImageRight = 'stebi-card-img';
  const playerImageLeft = 'anderson-card-img-new';

  // SLIDER
  const settings: SliderSettings = {
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    infinite: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
    slidesToScroll: 1,
    slidesToShow: 3,
    speed: 500,
  };
  return (
    <section className="mb-3 pb-3 mt-10 pt-10 relative z-[1]">
      <div className="absolute sm:-bottom-40pixel lg:-bottom-80pixel bottom-0 start-0 lg:w-230 lg:h-286 opacity-30">
        <Image
          className="xl:max-w-240 sm:max-w-140 max-w-100"
          src="/assets/img/png/left-ball.png"
          width={LEFT_BALL_IMAGE_WIDTH}
          height={LEFT_BALL_IMAGE_HEIGHT}
          alt=""
          quality={75}
          loading="lazy"
        />
      </div>
      <Image
        className="absolute -bottom-300 start-0 z-0"
        src="/assets/img/png/left-shadow.png"
        width={LEFT_SHADOW_IMAGE_WIDTH}
        height={LEFT_SHADOW_IMAGE_HEIGHT}
        alt=""
        quality={75}
        loading="lazy"
      />
      <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto relative z-10">
        <div className="container__border--blue-gradient relative after:absolute flex justify-center flex-col items-center  after:contents-[''] after:inset-0 after:p-1 after:rounded-30 rounded-30">
          <h2
            className="text-lg md:text-5xl sm:text-4xl text-primary font-medium font-HelveticaNeueMedium relative z-20 max-w-670 mx-auto text-center md:pt-9 pt-6 px-3 md:px-0 lg:pt-72pixel sm:leading-45 md:!leading-60"
            data-aos="fade-up"
            data-aos-duration={AOS_DURATION[1]}
            data-aos-easing="linear"
            data-aos-delay={AOS_DELAY[0]}
            data-aos-offset={AOS_OFFSET}
          >
            <span className="relative">
              {/* Stats Reimagined. */}
              Follow Tomorrow&apos;s Soccer Stars Today
            </span>{' '}
            {/* Exposure elevated. */}
          </h2>
          <h3
            className="text-primary text-lg md:text-4xl sm:text-3xl font-HelveticaNeueRegular leading-normal mt-4 text-center"
            data-aos="fade-up"
            data-aos-duration={AOS_DURATION[1]}
            data-aos-easing="linear"
            data-aos-delay={AOS_DELAY[1]}
            data-aos-offset={AOS_OFFSET}
          >
            Never fall behind on their progress
          </h3>
          <p
            className="font-Segoe font-normal text-md text-center text-primary leading-7 px-4 md:px-0 max-w-700 lg:max-w-769 mx-auto md:mt-4 mt-2 relative z-20"
            data-aos="fade-up"
            data-aos-duration={AOS_DURATION[1]}
            data-aos-easing="linear"
            data-aos-delay={AOS_DELAY[2]}
            data-aos-offset={AOS_OFFSET}
          >
            {/* Experience the future of sports collectibles as we integrate dynamic
            statistics into every card, taking your passion for the game to new
            heights. Every goal, pass, and block is updated on the digital
            trading card within 48 hours after every game. */}
            Every young soccer star harbors dreams that pulse with potential. At
            AthletiFi, we believe the more support young players receive the
            more likely they are to succeed.{' '}
            <span className="block md:mt-4 mt-2">
              {/* Each purchase directly supports underserved athletes, making club
              soccer more accessible and empowering dreams to flourish. */}
              AthletiFi gives you the tools to follow their journey at whatever
              time-commitment level you can afford. Don&apos;t have time to
              watch a full game? Catch up with highlight videos of the best
              plays for each player. Only have a glance to spare? The
              easy-to-follow player stats will catch you up on their latest
              performance.
            </span>
          </p>
          {/* CARD SLIDER SMALL SCREEN */}
          <Slider
            {...settings}
            className="w-5/6 justify-between items-center pt-5 md:pt-0 max-w-1000 mx-auto lg:justify-center relative z-20 before:content-[''] before:absolute before:w-448 before:h-448 before:-top-20 before:left-1/2 before:bg-shadow_blue before:blur-111 before:opacity-25 before:-translate-x-1/2 before:-z-10 before:rounded-full pb-6 sm:pb-0"
          >
            {/* Left Image */}
            <div
              className="md:py-16 sm:pb-8" //ml-[-20px]"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION[0]}
              data-aos-easing="ease"
              data-aos-delay={AOS_DELAY[2]}
            >
              <div className="translate-x-[-20]">
                <Image
                  className="mx-auto w-full max-w-350"
                  src={`/assets/img/webp/${playerImageLeft}.webp`}
                  width={SOCCER_PLAYER_IMAGE_WIDTH_LEFT}
                  height={SOCCER_PLAYER_IMAGE_HEIGHT_LEFT}
                  alt="Player card of Anderson Rodriguez from Villanova Soccer Academy"
                  quality={75}
                  loading="lazy"
                />
              </div>
            </div>
            {/* Center Image */}
            <div
              className=" md:py-16 sm:pb-8 relative z-10"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION[0]}
              data-aos-easing="ease"
              data-aos-delay={AOS_DELAY[3]}
            >
              <div>
                <Image
                  className="mx-auto md:scale-110 w-full max-w-350"
                  src={`/assets/img/webp/${playerImageCenter}.webp`}
                  width={SOCCER_PLAYER_IMAGE_WIDTH_CENTER}
                  height={SOCCER_PLAYER_IMAGE_HEIGHT_CENTER}
                  alt="Player card of Jose Hernandez from Villanova Soccer Academy"
                  quality={75}
                  loading="lazy"
                />
              </div>
            </div>
            {/* Right Image */}
            <div
              className="md:py-16 sm:pb-8" // mr-[2000px]"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION[0]}
              data-aos-easing="ease"
              data-aos-delay={AOS_DELAY[4]}
            >
              <div>
                <Image
                  className="mx-auto w-full max-w-350 lg:max-w-350"
                  src={`/assets/img/webp/${playerImageRight}.webp`}
                  width={SOCCER_PLAYER_IMAGE_WIDTH_RIGHT}
                  height={SOCCER_PLAYER_IMAGE_HEIGHT_RIGHT}
                  alt="Player card of Stebi Vidal from Villanova Soccer Academy"
                  quality={75}
                  loading="lazy"
                />
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default StatsReimagined;
