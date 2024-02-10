import React from 'react';
import { Player } from '@/types/Player.type';
import Image from 'next/image';
import cardImage from '../../../public/assets/img/png/anderson-card-img.png';
// import vsa_logo from '../../../public/assets/img/png/vsa_logo.png';

const CARD_IMAGE_WIDTH: number = 200;
const CARD_IMAGE_HEIGHT: number = 100;

const playerInformation: Player = {
  name: 'Leo Messi',
  club: 'Villanova FC',
  team: '2009s',
};

const AOS_DURATION: number = 400;
const AOS_DELAY: number = 300;
const AOS_OFFSET: number = 100;

const PlayerInfo: React.FC = () => {
  return (
    <div className='lg:w-3/4 xl:w-1/2 2xl:w-11/12 flex justify-start items-start min-h-full'>
      <div
        className='flex flex-row justify-center items-center relative z-20 '
        data-aos='fade-up'
        data-aos-duration={AOS_DURATION}
        data-aos-easing='ease-in-sine'
        data-aos-delay={AOS_DELAY}
        data-aos-offset={AOS_OFFSET}
      >
        <div>
          <div className='lg:w-10/12 xl:w-10/12 2xl:w-full min-h-full order-1 lg:order-2 h-full flex justify-end items-center lg:my-5 xl:my-0'>
            <Image
              className=''
              src={cardImage}
              alt='Player card'
              width={CARD_IMAGE_WIDTH}
              height={CARD_IMAGE_HEIGHT}
              quality={75}
              loading='lazy'
            />
          </div>
        </div>
        <div className='flex flex-col justify-center items-start p-5 gap-2'>
          <h4 className='font-bold font-Segoe text-5xl leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-0.5 px-0.5 xl:px-0.5 relative z-20'>
            {playerInformation.name}
          </h4>
          <p className='font-Segoe font-normal text-3xl leading-7 text-center pb-0.5 text-primary opacity-80 m-0 sm:pt-4 lg:max-w-769 mx-auto sm:px-0.5 px-0.5 xl:px-0.5 relative z-20'>
            {playerInformation.club}
          </p>
          <p className='font-Segoe font-normal text-3xl leading-7 text-center pb-0.5 text-primary opacity-80 m-0 sm:pt-4 lg:max-w-769 mx-auto sm:px-0.5 px-0.5 xl:px-0.5 relative z-20'>
            {playerInformation.team}
          </p>
          {/* {Object.entries(playerInformation).map(([key, value]) => (
              <div key={key} className='my-2'>
                <span className='font-bold font-Segoe text-md leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-0.5 px-0.5 xl:px-0.5 relative z-20'>
                  {key}:{' '}
                </span>
                <span className='font-Segoe font-normal text-md leading-7 text-center pb-0.5 text-primary opacity-80 m-0 sm:pt-4 lg:max-w-769 mx-auto sm:px-0.5 px-0.5 xl:px-0.5 relative z-20'>
                  {value}
                </span>
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
