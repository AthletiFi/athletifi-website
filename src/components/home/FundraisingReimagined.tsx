import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const StatsReimagined = () => {
  const playerImageCenter = "jose-card-img";
  const playerImageRight = "stebi-card-img";
  const playerImageLeft = "anderson-card-img-new";

  // SLIDER
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="py-14 sm:mb-10 lg:mb-20 xl:mb-[125px] relative xl:mt-0 z-[1]">
      <div className="absolute sm:-bottom-[40px] lg:-bottom-[80px] bottom-0 start-0 lg:w-[230px] lg:h-[286px] opacity-30">
        <Image
          className="xl:max-w-[240px] sm:max-w-[140px] max-w-[100px]"
          src="/assets/img/png/left-ball.png"
          width={240}
          height={286}
          alt="what we do foot ball"
        />
      </div>
      <Image
        className="absolute -bottom-[300px] start-0 z-0"
        src="/assets/img/png/left-shadow.png"
        width={448}
        height={448}
        alt="shadow"
      />
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto relative z-10">
        <div className="blue_linear_gradient relative after:absolute flex justify-center flex-col items-center  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px]">
          <h2
            className="lg:text-5xl md:text-[40px] sm:text-4xl text-[24px] text-primary font-medium font-HelveticaNeueMedium relative z-20 max-w-[670px] mx-auto text-center md:pt-9 pt-6 px-3 md:px-0 lg:pt-[72px] sm:leading-[45px] md:!leading-[60px]"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-easing="linear"
            data-aos-delay="200"
            data-aos-offset="200"
          >
            <span className="relative after:content after:absolute after:bottom-[-8px] sm:after:bottom-[-4px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
              {/* Stats Reimagined. */}
              Fundraising Reimagined.
            </span>{" "}
            {/* Exposure elevated. */}
          </h2>
          <span
            className="text-primary text-lgxl font-HelveticaNeueRegular leading-normal mt-4"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-easing="linear"
            data-aos-delay="300"
            data-aos-offset="200"
          >
            Empowering Tomorrow's Soccer Stars
          </span>
          <p
            className="font-Segoe font-normal text-md text-center text-[#FDFEFF] leading-7 px-4 md:px-0 max-w-[700px] lg:max-w-[769px] mx-auto md:mt-4 mt-2 relative z-20"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-easing="linear"
            data-aos-delay="400"
            data-aos-offset="200"
          >
            {/* Experience the future of sports collectibles as we integrate dynamic
            statistics into every card, taking your passion for the game to new
            heights. Every goal, pass, and block is updated on the digital
            trading card within 48 hours after every game. */}
            Every young soccer star harbors dreams that pulse with potential. At
            AthletiFi, we're reshaping and nurturing dreams through a
            fundraising paradigm tailored exclusively for youth soccer. We are
            the GoFundMe for young soccer players.{" "}
            <span className="block md:mt-4 mt-2">
              {/* Each purchase directly supports underserved athletes, making club
              soccer more accessible and empowering dreams to flourish. */}
              Our platform is not just about funds— it bridges the gap to foster
              connections. Supporters become part of an athlete's journey,
              receiving captivating updates and witnessing their contributions’
              ripple effect on both players and their clubs.
            </span>
          </p>
          {/* CARD SLIDER SMALL SCREEN */}
          <Slider
            {...settings}
            className="w-full justify-between items-center pt-5 md:pt-0 max-w-[1000px] mx-auto lg:justify-center relative z-20 before:content-[''] before:absolute before:w-[448px] before:h-[448px] before:-top-20 before:left-1/2 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-translate-x-1/2 before:-z-10 before:rounded-full pb-6 sm:pb-0"
          >
            {/* Left Image */}
            <div
              className="md:py-16 sm:pb-8" //ml-[-20px]"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease"
              data-aos-delay="400"
            >
              <div style={{ transform: "translateX(-20px)" }}>
                <Image
                  className="mx-auto w-full max-w-[350px]"
                  src={`/assets/img/webp/${playerImageLeft}.webp`}
                  width={280}
                  height={280}
                  alt="left-card-img"
                />
              </div>
            </div>
            {/* Center Image */}
            <div
              className=" md:py-16 sm:pb-8 relative z-10 "
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease"
              data-aos-delay="800"
            >
              <div>
                <Image
                  className="mx-auto md:scale-125 w-full max-w-[350px]"
                  src={`/assets/img/webp/${playerImageCenter}.webp`}
                  width={409}
                  height={409}
                  alt="center-card-image"
                />
              </div>
            </div>
            {/* Right Image */}
            <div
              className="md:py-16 sm:pb-8" // mr-[2000px]"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease"
              data-aos-delay="1200"
            >
              <div style={{ transform: "translateX(20px)" }}>
                <Image
                  className="mx-auto w-full max-w-[350px] lg:max-w-[350px]"
                  src={`/assets/img/webp/${playerImageRight}.webp`}
                  width={280}
                  height={280}
                  alt="right-card-image"
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
