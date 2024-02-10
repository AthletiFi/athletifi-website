import React from 'react';
import Image from 'next/image';
import cardImage from '../../../public/assets/img/png/anderson-card-img.png';

const CARD_IMAGE_WIDTH: number = 620;
const CARD_IMAGE_HEIGHT: number = 300;

const PlayerCard: React.FC = () => {
  return (
    <div className="lg:w-full min-h-full order-1 lg:order-2 h-full flex justify-end items-center lg:my-5 xl:my-0">
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
  );
};

export default PlayerCard;
