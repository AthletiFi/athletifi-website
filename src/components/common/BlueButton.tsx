import React from 'react';
import { ArrowButton } from './Icon';

interface BlueButtonProps {
  text: string;
}

const BlueButton: React.FC<BlueButtonProps> = props => {
  return (
    <>
      <span className="sm:px-[24px] px-4 sm:py-[14.5px] py-2 flex bg-skyblue text-base font-semibold text-black font-Segoe leading-6 gap-[6px] group border border-skyblue hover:bg-black hover:text-skyblue btn__cta transition duration-300 ease-in-out cursor-pointer">
        {props.text}
        {/* Arrow */}
        <span className="group-hover:translate-x-3 transition duration-300 ease-out">
          <ArrowButton />
        </span>
      </span>
    </>
  );
};

export default BlueButton;
