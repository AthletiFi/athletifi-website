import React from 'react';
import { BlueShadow, UnderLineText } from '../common/Icon';
import Image from 'next/image';
import cardImage from '../../../public/assets/img/png/anderson-card-img.png';

const PlayerCard = () => {
  return (
    <div className="lg:w-full xl:w-1/2 2xl:w-1/2 min-h-full order-1 lg:order-2 h-full flex justify-center items-center lg:my-5 xl:my-0">
      <Image
        className=""
        src={cardImage}
        alt="Player card"
        width={500}
        height={300}
      />
    </div>
  );
};

export default PlayerCard;
