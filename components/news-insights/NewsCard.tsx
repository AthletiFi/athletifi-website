import Link from "next/link";
import React from "react";
import BlueButton from "../common/BlueButton";
import Image from "next/image";

const NewsCard = () => {
  const textHeading =
    "Mastering-the-Game-A-Coach's-Guide-to-Unlocking-Football-Strategies";
  return (
    <>
      <div className="blue_linear_gradient relative after:absolute flex justify-center flex-col items-center  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px] mx-3 sm:mx-10 md:mx-16 after:blur-[75px] blue_linear_gradient mt-[56px] lg:mt-[100px] xl:mt-[154px] sm:mb-[30px] lg:mb-[70px] xl:mb-[156px]">
        <Image
          className="lg:w-[462px] lg:h-[541px] w-[150px] -top-[160px] sm:-left-20 -left-5 absolute opacity-50 -z-20"
          src="/assets/img/svg/news-grid-line.svg"
          width={362}
          height={241}
          alt="grid-line"
        />
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto py-[30px] lg:py-[50px] xl:py-[86px] relative z-10 after:contents-[''] after:w-[207px] after:h-[207px] after:absolute after:top-0 after:-left-[50px] after:bg-[#00c3f47b] after:blur-[111px] after:-z-10 before:contents-[''] before:w-[207px] before:h-[207px] before:absolute before:bottom-0 before:-right-[50px] before:bg-[#00c3f47b] before:blur-[111px] before:-z-10">
          <div className="flex flex-wrap justify-between flex-col-reverse xl:flex-row items-center">
            <div
              className="lg:max-w-[70%] xl:max-w-[46%] text-center xl:text-start"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="100"
              data-aos-offset="400"
            >
              <h3 className="font-medium text-[20px] sm:text-lg text-primary font-HelveticaNeueMedium xl:max-w-[447px] mx-auto xl:mx-0">
                "Mastering the Game: A Coach's Guide to Unlocking Football
                Strategies"
              </h3>
              <p className="text-base text-primary opacity-70 font-Segoe font-normal mt-2">
                by: Graham Clark &bull; 23 June 2023
              </p>
              <p className="text-base sm:text-md text-primary opacity-70 font-Segoe font-normal mt-3 sm:mt-4">
                Football strategies are the tactical blueprints that coaches
                devise to guide their teams to success on the field. These
                strategies encompass a wide range of aspects, including
                formations, player positioning, ball distribution, defensive and
                offensive tactics, and set-piece plays.
              </p>
              <div className="mt-4 flex items-center gap-[14px] justify-center xl:justify-start">
                <button className="lg:text-base md:text-[13px] text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-[10px] sm:px-[18px] bg-matchtittles rounded-full leading-[150%] duration-300 hover:text-white">
                  Most popular
                </button>
                <button className="lg:text-base text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-[10px] sm:px-[18px] bg-matchtittles rounded-full leading-[150%] duration-300 hover:text-white">
                  Trending
                </button>
              </div>
              <div className="flex xl:justify-start justify-center items-center mt-4 sm:mt-10">
                <Link href={`/news-detail/${textHeading}`}>
                  <BlueButton text="Read&nbsp;more" />
                </Link>
              </div>
            </div>
            <div
              className="sm:w-[70%] lg:max-w-[47%] mb-4 md:mb-7 lg:mb-10 xl:mb-0"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="160"
              data-aos-offset="400"
            >
              <Image
                className="w-full"
                src="/assets/img/png/news-playing-image-card.png"
                alt="football"
                width={531}
                height={486}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;