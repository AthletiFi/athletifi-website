import { ArrowButton } from './Icon';
import { BlueButtonProps } from '@/types/BlueButton.type';

const BlueButton = ({ text }: BlueButtonProps) => {
  return (
    <>
      <span className="sm:px-24pixel px-4 sm:py-14.5 py-2 flex bg-skyblue text-base font-semibold text-black font-Segoe leading-6 gap-6 group border border-skyblue hover:bg-black hover:text-skyblue btn__cta transition duration-300 ease-in-out cursor-pointer">
        {text}
        {/* Arrow */}
        <span className="group-hover:translate-x-3 transition duration-300 ease-out">
          <ArrowButton />
        </span>
      </span>
    </>
  );
};

export default BlueButton;
