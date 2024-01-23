import Image from 'next/image';
import React, { useEffect, useState } from 'react';
const BackToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {scrollPosition > 200 ? (
        <div
          className="fixed  backtotop sm:bottom-20 bottom-14 right-7 z-40 md:max-h-12 md:max-w-[48px] max-h-9 max-w-[36px]  cursor-pointer bg-skyblue rounded-lg border-[2px] border-skyblue hover:border-white duration-300"
          onClick={() => scrollToTop()}
        >
          {/* UP-ARROW-IMG */}
          <div className="w-full h-full flex justify-center items-center">
            <Image
              alt="Back to top icon"
              src="/assets/img/svg/back_to_top.svg"
              width={48}
              height={48}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default BackToTop;
