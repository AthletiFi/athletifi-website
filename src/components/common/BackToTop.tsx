'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 200;
const ARROW_IMAGE_WIDTH = 48;
const ARROW_IMAGE_HEIGHT = 48;

export default function BackToTop() {
  const [scrollPosition, setScrollPosition] = useState(0);

  function scrollToTop(): void {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  }

  function handleScroll(): void {
    const position = window.scrollY;
    setScrollPosition(position);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {scrollPosition > SCROLL_THRESHOLD ? (
        <div
          className="fixed  backtotop sm:bottom-20 bottom-14 right-7 z-40 md:max-h-12 md:max-w-48 max-h-9 max-w-36  cursor-pointer bg-skyblue rounded-lg border-2 border-skyblue hover:border-white duration-300"
          onClick={() => scrollToTop()}
        >
          {/* UP-ARROW-IMG */}
          <div className="w-full h-full flex justify-center items-center">
            <Image
              alt="Back to top icon"
              src="/assets/img/svg/back_to_top.svg"
              width={ARROW_IMAGE_WIDTH}
              height={ARROW_IMAGE_HEIGHT}
              quality={75}
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
