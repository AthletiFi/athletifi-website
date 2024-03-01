import React from 'react';
import Image from 'next/image';
import cardImage from '../../../public/assets/img/png/anderson-card-img.png';
import { UnderLineText } from '@/components/common/Icon';
import { Player } from '@/types/Player.type';
import { VillanovaIcon } from '@/components/common/Icon';

const playerInformation: Player = {
  club: 'Villanova Soccer Academy',
  name: 'Salvador Carrillo',
  team: 'team 2009',
};

// const AOS_DURATION: number = 400;
// const AOS_DELAY: number = 300;
// const AOS_OFFSET: number = 100;

const CARD_IMAGE_WIDTH: number = 500;
const CARD_IMAGE_HEIGHT: number = 300;

const HeroBanner: React.FC = () => {
  return (
    <>
      <section className="flex flex-col justify-start items-stretch lg:flex-row h-full pt-5 lg:p-0 z-10">
        <div className="lg:w-3/4 xl:w-1/2 2xl:w-1/2 min-h-full order-2 lg:order-1">
          <div className=" relative lg:py-16 py-5 md:py-10 z-0  rounded-30 h-full flex items-center justify-center gap-2">
            <VillanovaIcon />
            <div
              className="flex justify-start items-center relative z-20 "
              // data-aos="fade-up"
              // data-aos-duration={AOS_DURATION}
              // data-aos-easing="ease-in-sine"
              // data-aos-delay={AOS_DELAY}
              // data-aos-offset={AOS_OFFSET}
            >
              <div className="flex flex-col justify-start">
                <h2 className="font-SourceSansPro-Bold md:text-lgl text-lg   text-primary relative z-20 text-start">
                  {playerInformation.name}
                </h2>
                <p className="font-SourceSansPro-Semibold text-sm md:text-basesm leading-7 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
                  {playerInformation.club}
                </p>
                <p className="font-SourceSansPro-Semibold text-sm md:text-basesm leading-7 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
                  {`team ${playerInformation.team}`}
                </p>
                <div className="relative">
                  <hr className="border-t-1 border-lineAtBase absolute top-3 left-0 right-0 ml-0 lg:-mr-20 xl:-mr-40 2xl:-mr-72 3xl:-mr-96 4xl:-mr-500 mt-3 hidden lg:block" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-full xl:w-1/2 2xl:w-1/2 min-h-full h-full flex justify-center items-center lg:-mb-56 lg:mt-40 order-1">
          <Image
            className=""
            src={cardImage}
            alt="Player card"
            width={CARD_IMAGE_WIDTH}
            height={CARD_IMAGE_HEIGHT}
            quality={75}
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
