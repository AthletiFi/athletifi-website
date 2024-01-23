import React from 'react';
import { BlueShadow, UnderLineText } from '../common/Icon';
import Image from 'next/image';

const playerStats = {
  Attacking: 0,
  Defending: 50,
  Goalkeeping: 90,
  Mentality: 20,
  Physical: 90,
};

const PlayerStats = () => {
  return (
    <div className="lg:w-3/4 xl:w-1/2 2xl:w-1/2 min-h-full order-3 lg:order-1">
      <div className="container__border--blue-gradient bg-blue_linear_gradient after:absolute relative lg:py-16 py-5 md:py-10 z-0  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px] h-full flex items-center justify-center">
        <div
          className="flex flex-col justify-center items-center relative z-20"
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-easing="ease-in-sine"
          data-aos-delay="300"
          data-aos-offset="100"
        >
          <h2 className="font-HelveticaNeueMedium md:text-4xl text-[26px]  text-[#FDFEFF] font-medium leading-[60px] relative z-20 text-center md:mb-4">
            <span className="relative ">
              Player Stats
              <span className="absolute -bottom-2 left-0 z-0">
                <UnderLineText />
              </span>
            </span>
          </h2>
          <div className="flex flex-col p-5">
            {Object.entries(playerStats).map(([stat, value]) => {
              if (
                (stat === 'Goalkeeping' || stat === 'Attacking') &&
                value === 0
              )
                return null;
              return (
                <div
                  key={stat}
                  className="flex justify-center items-center gap-4"
                >
                  <div className="w-full md:w-[200px] lg:w-[230px] h-[30px] bg-gray-200 rounded-[30px] overflow-hidden my-2">
                    <div
                      className="h-full font-Segoe bg-shadow_blue flex items-center justify-start text-black font-semibold px-4"
                      style={{ width: `${value}%` }}
                    >
                      {stat}
                    </div>
                  </div>
                  <div>
                    <p className="font-Segoe font-semibold text-[#FDFEFF]">
                      {value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
