import React from 'react';
import { BlueShadow, UnderLineText } from '../common/Icon';
import Image from 'next/image';

const videos = [
  { src: '/video3.mp4', thumbnail: '/poster2.png' },
  { src: '/video2.mp4', thumbnail: '/poster3.png' },
  { src: '/video2.mp4', thumbnail: '/poster3.png' },
  { src: '/video3.mp4', thumbnail: '/poster2.png' },
];

const Highlights = () => {
  return (
    <div className="w-full xl:w-3/4 2xl:w-3/4 min-h-full">
      <div className="container__border--blue-gradient bg-blue_linear_gradient after:absolute relative lg:py-16 py-5 md:py-10 z-0  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px] h-full flex items-center justify-center">
        <div
          className="flex flex-col justify-center items-stretch relative z-20"
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-easing="ease-in-sine"
          data-aos-delay="300"
          data-aos-offset="100"
        >
          <h2 className="font-HelveticaNeueMedium md:text-4xl text-[26px] text-[#FDFEFF] font-medium leading-[60px] relative z-20 text-center md:mb-4">
            <span className="relative ">
              Highlights
              <span className="absolute -bottom-2 left-0 z-0">
                <UnderLineText />
              </span>
            </span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 p-5">
            {videos.map((video, index) => (
              <div key={index} className="my-2">
                <video
                  width="300"
                  height="240"
                  controls
                  poster={video.thumbnail}
                  className="mx-auto"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
