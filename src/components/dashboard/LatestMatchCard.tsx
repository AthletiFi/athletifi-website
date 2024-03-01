import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faSun,
  // faCloud,
  faCloudRain,
  // faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useMediaQuery } from '@/app/utils/useMediaQuery';

const TMP_TEAM_A_URL =
  'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/mls-next-logo.svg';
const TMP_TEAM_B_URL =
  'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/vsa-logo.svg';
const LOGO_SIZE = 50;

const LatestMatch: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div className="bg-cardsBackground h-[310px] sm:h-[310px] md:h-56 flex flex-col justify-between p-4 relative w-full rounded-10 text-primary font-sourceSansPro">
      <h1 className="text-[24px] font-semibold">Latest Match</h1>
      {isMobile ? (
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <p className="px-4">Chelsea</p>
            <Image
              src={TMP_TEAM_A_URL}
              alt="crest"
              className=""
              width={LOGO_SIZE}
              height={LOGO_SIZE}
              quality={75}
              loading="lazy"
            />
          </div>
          <p className="px-4">0 - 2</p>
          <div className="flex flex-col items-center">
            <p className="px-4">Liverpool</p>
            <Image
              src={TMP_TEAM_B_URL}
              alt="crest"
              className=""
              width={LOGO_SIZE}
              height={LOGO_SIZE}
              quality={75}
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="px-4">Chelsea</p>
          <Image
            src={TMP_TEAM_A_URL}
            alt="crest"
            className=""
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            quality={75}
            loading="lazy"
          />
          <p className="px-4">0 - 2</p>
          <Image
            src={TMP_TEAM_B_URL}
            alt="crest"
            className=""
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            quality={75}
            loading="lazy"
          />
          <p className="px-4">Liverpool</p>
        </div>
      )}
      <div className="flex flex-col justify-between h-[70px] text-center sm:relative sm:text-center md:absolute top-4 right-4 text-sm font-light">
        <p className="text-center md:text-right">
          Saturday, 14 Mar 2021 . 01.00 am
        </p>
        <p className="text-center md:text-right">Citypark, St. Louis</p>
        <div className="flex item-center items-center justify-center sm:justify-center md:justify-end">
          <div className=" w-6 text-center mr-2">
            <FontAwesomeIcon icon={faCloudRain} size="lg" />
          </div>
          <p className="">68°F</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2 sm:mb-4 md:mb-0 mx-1 sm:mx-6">
        <div className="flex flex-col justify-center">
          <h4 className="text-center text-md">56</h4>
          <p className="text-xs sm:text-sm font-light">attacking</p>
        </div>

        <span className="h-6 w-1 bg-partnersBorders" />
        <div className="flex flex-col justify-center">
          <h4 className=" text-center text-md">40</h4>
          <p className="text-xs sm:text-sm font-light">mentality</p>
        </div>
        <span className="h-6 w-1 bg-partnersBorders" />
        <div className="flex flex-col justify-center">
          <h4 className=" text-center text-md">87</h4>
          <p className="text-xs sm:text-sm font-light">physical</p>
        </div>
        <span className="h-6 w-1 bg-partnersBorders" />
        <div className="flex flex-col justify-center">
          <h4 className=" text-center text-md">12</h4>
          <p className="text-xs sm:text-sm font-light">skill</p>
        </div>
        <span className="h-6 w-1 bg-partnersBorders" />
        <div className="flex flex-col justify-center">
          <h4 className=" text-center text-md">78</h4>
          <p className="text-xs sm:text-sm font-light">defense</p>
        </div>
      </div>
    </div>
  );
};

export default LatestMatch;
