import React from 'react';
import { BlueShadow, UnderLineText } from '../common/Icon';
import Image from 'next/image';
import portrait from './portrait.jpg';

const players = [
  'Paul smith',
  'Carlos Fuentes',
  'Leo Messi',
  'Paul Sanders',
  'Frank Lampard',
  'Luis Diaz',
  'Andrea Pirlo',
  'Andres Iniesta',
];

const Teammates = () => {
  const handlePlayerClick = (player: string) => {
    console.log(player);
  };
  return (
    <div className="w-full xl:w-1/3 2xl:w-1/3 min-h-full">
      <div className="container__border--blue-gradient bg-blue_linear_gradient after:absolute relative lg:py-16 py-5 md:py-10 z-0  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px] h-full flex items-center justify-center">
        <div
          className="flex flex-col justify-center items-center z-20 gap-4"
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-easing="ease-in-sine"
          data-aos-delay="300"
          data-aos-offset="100"
        >
          <h2 className="font-HelveticaNeueMedium md:text-4xl text-[26px] text-[#FDFEFF] font-medium leading-[60px] relative z-20 text-center md:mb-4">
            <span className="relative ">
              Teammates
              <span className="absolute -bottom-2 left-0 z-0">
                <UnderLineText />
              </span>
            </span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-5 max-w-sm p-5">
            {players.map((player, index) => (
              <button
                key={index}
                onClick={() => handlePlayerClick(player)}
                className="flex flex-col items-center mb-4"
              >
                <img className="w-[100px] h-[70px]" src={portrait.src} />
                <div className="w-full text-[#FDFEFF] font-Segoe text-center">
                  {player}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teammates;
