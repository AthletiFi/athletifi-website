import React from 'react';
import { BlueShadow, UnderLineText } from '../common/Icon';
import Image from 'next/image';

const PlayerInformation = {
  club: 'FC Barcelona',
  name: 'Leo Messi',
  number: '10',
  team: '2009s',
};

const PlayerInfo = () => {
  return (
    <div className="lg:w-3/4 xl:w-1/2 2xl:w-1/2 min-h-full order-2 lg:order-3">
      <div className="container__border--blue-gradient bg-blue_linear_gradient after:absolute relative lg:py-16 py-5 md:py-10 z-0  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px] h-full flex items-center justify-center">
        <div
          className="flex flex-col justify-center items-center relative z-20 "
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-easing="ease-in-sine"
          data-aos-delay="300"
          data-aos-offset="100"
        >
          <h2 className="font-HelveticaNeueMedium md:text-4xl text-[26px] text-[#FDFEFF] font-medium leading-[60px] relative z-20 text-center md:mb-4">
            <span className="relative ">
              Player Info
              <span className="absolute -bottom-2 left-0 z-0">
                <UnderLineText />
              </span>
            </span>
          </h2>
          <div className="flex flex-col justify-center p-5">
            {Object.entries(PlayerInformation).map(([key, value]) => (
              <div key={key} className="my-2">
                <span className="font-bold font-Segoe text-md leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-0.5 px-0.5 xl:px-0.5 relative z-20">
                  {key}:{' '}
                </span>
                <span className="font-Segoe font-normal text-md leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-0.5 px-0.5 xl:px-0.5 relative z-20">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
