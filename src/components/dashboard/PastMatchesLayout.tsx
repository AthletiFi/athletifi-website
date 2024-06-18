import PastMatches from './PastMatches';
import Teammates from './Teammates';
import React, { useRef, useEffect, useState } from 'react';

const PastMatchesLayout: React.FC = () => {
  const [height, setHeight] = useState(0);
  const pastMatchesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (pastMatchesRef.current) {
        setHeight(pastMatchesRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="flex flex-col  w-full md:max-w-none lg:max-w-[1130px] md:px-2">
      <div className="flex justify-between gap-8 pt-6">
        <h2 className="px-4 py-2 text-primary font-semibold w-full text-md bg-cardsBackground  shadow-portalNav rounded-[5px]">
          Upcoming matches
        </h2>
        <h2 className="hidden lg:block px-4 py-2 text-primary font-semibold  text-md lg:w-[350px] bg-cardsBackground  rounded-[5px]">
          Teammates
        </h2>
      </div>
      <div className=" flex flex-col lg:flex-row justify-between my-4 items-center md:items-start min-h-min gap-8 mb-12">
        <div ref={pastMatchesRef} className="w-full mb-8">
          <PastMatches />
        </div>
        <div
          className="w-full lg:w-[350px] overflow-auto"
          style={{ maxHeight: height }}
        >
          <h2 className="lg:hidden block px-4 py-2 text-primary font-semibold  text-md lg:w-[350px] bg-cardsBackground  rounded-[5px]">
            Teammates
          </h2>
          <Teammates />
        </div>
      </div>
    </div>
  );
};

export default PastMatchesLayout;
