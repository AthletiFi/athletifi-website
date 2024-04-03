'use client';
//card thumbnail component
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from 'react';
import Card from './../../../public/assets/img/png/jose-card-img.png';
import Image from 'next/image';
import { ButtonWhiteArrow } from '../common/Icon';
import { IProfileProps } from '@/types/Dashboard.type';

const profileProps: IProfileProps = {
  name: 'Salvador Carillo',
  number: '#22',
  club: 'villanova soccer',
  team: 'team 2009',
  card_url: Card,
};

function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

const CardThumbnail: React.FC<IProfileProps> = ({
  name,
  number,
  club,
  team,
  card_url,
}) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const emailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log(email);
    } else {
      console.log('invalid email');
    }
  };
  const toggleEmailInput = () => {
    setIsToggle(!isToggle);
  };
  const cardRef = useRef<HTMLDivElement>(null);
  useOutsideClick(cardRef, () => setIsToggle(false));
  return (
    <div
      ref={cardRef}
      className="container flex flex-col bg-cardsBackground max-w-500 rounded-lg gap-6"
    >
      <div className="flex justify-around gap-0 mx-4 items-stretch">
        <div className="flex flex-col justify-center">
          <h2 className="font-SourceSansPro mb-2 font-bold text-lg md:text-lgl text-primary relative min-w-[256px]">
            {name}
          </h2>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative min-w-[256px]">
            {club}
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative min-w-[256px]">
            {team}
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative min-w-[256px]">
            {number}
          </p>
        </div>
        <div className="-mt-10">
          <Image src={card_url} alt="Card Thumbnail" width={200} height={200} />
        </div>
      </div>
      <div className="flex justify-center w-full border-t border-card_border">
        <button
          className={`text-primary font-SourceSansPro-Semibold text-sm md:text-base leading-6 w-full p-3 ${isToggle ? 'bg-buttonCardBg' : 'border-r border-card_border'}`}
        >
          go to dashboard
        </button>
        <button
          onClick={toggleEmailInput}
          className="text-primary font-SourceSansPro-Semibold text-sm md:text-base leading-6 w-full p-3"
        >
          refer to friend/family
        </button>
      </div>
      {isToggle && (
        <div className="w-full p-3 flex flex-col justify-center">
          <p className="font-SourceSansPro-Semibold px-3 text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative min-w-[256px]">
            Enter the email of the recipient to share this
          </p>
          <form className="w-full p-3 flex" onSubmit={emailSubmit}>
            <input
              type="email"
              value={email}
              placeholder="Type email here"
              className="w-full p-3 border rounded-l-lg "
              onChange={handleChange}
            />
            {/* create a submit button here */}
            <button
              type="submit"
              className="w-1/6 p-3 text-primary font-SourceSansPro-Semibold text-sm md:text-base leading-6 flex items-center justify-center bg-darkerSkyBlue rounded-r-lg"
            >
              <ButtonWhiteArrow />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// this has to be modified when the real data is available
const RenderCardThumbnail = () => <CardThumbnail {...profileProps} />;

export default RenderCardThumbnail;

// export default CardThumbnail;
