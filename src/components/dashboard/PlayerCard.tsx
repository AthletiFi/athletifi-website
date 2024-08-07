import Image from 'next/image';

const card_url = '/assets/img/png/anderson-card-img.png';

const CARD_IMAGE_WIDTH: number = 500;
const CARD_IMAGE_HEIGHT: number = 300;

const PlayerCard: React.FC = () => {
  return (
    <div className="lg:w-full xl:w-1/2 2xl:w-1/2 min-h-full order-1 lg:order-2 h-full flex justify-center items-center lg:my-5 xl:my-0">
      <Image
        className=""
        src={card_url}
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
