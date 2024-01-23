import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="container not-found__container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10 text-white">
      <div className="font-HelveticaNeueMedium md:text-5xl text-[26px] sm:text-4xl text-[#FDFEFF] font-medium leading-[60px] relative z-20 text-center md:mb-4">
        Oops. There was a problem.
      </div>
      <div className="font-Segoe font-normal text-md leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-6 px-3 xl:px-0 relative z-20">
        We could not find the page you were looking for.
        <br /> Go back to the{' '}
        <Link href="/" className="not-found__link">
          home page
        </Link>
      </div>
    </div>
  );
};
export default Custom404;
