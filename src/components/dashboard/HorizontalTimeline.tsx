import React, { useState, useRef, useEffect } from 'react';

interface HorizontalTimelineProps {
  setCurrentItem: React.Dispatch<React.SetStateAction<number>>;
  currentItem: number;
  handlePlayClick: (index: number) => void;
  timestamps: string[];
  convertToSeconds: (timestamp: string) => number;
}

const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({
  setCurrentItem,
  currentItem,
  handlePlayClick,
  convertToSeconds,
  timestamps,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [, setTimelineWidth] = useState(window.innerWidth);

  useEffect(() => {
    setTimelineWidth(timelineRef.current?.offsetWidth || 0);

    const handleResize = () => {
      setTimelineWidth(timelineRef.current?.offsetWidth || 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [timestamps]);

  const calculateLeftPosition = (time: string): number => {
    const totalVideoDuration = 4600;
    const timelineWidth = timelineRef.current?.offsetWidth || 0;
    const timeInSec = convertToSeconds(time);
    return (timeInSec / totalVideoDuration) * timelineWidth;
  };

  const handleClick = (index: number) => {
    setCurrentItem(index);
  };

  return (
    <div className="relative flex flex-row items-center my-12">
      <div
        className="absolute top-0  h-1 bg-skyblue"
        ref={timelineRef}
        style={{ width: '100%' }}
      ></div>
      <div className="w-[7px] h-[7px] bg-skyblue rounded-full absolute -top-[3px] left-0"></div>

      <div className="absolute top-1/2 -left-[50%] transform translate-y-1/2 h-[1px] bg-skyblue"></div>
      {timestamps.map((time, index) => {
        const leftPosition = calculateLeftPosition(time);

        return (
          <div
            key={index}
            className="relative flex flex-col items-center -m-[13px]"
          >
            <div
              onClick={() => {
                handlePlayClick(index);
                handleClick(index);
              }}
              className={`rounded-full cursor-pointer ${
                currentItem === index ? 'bg-skyblue' : 'bg-gray-300'
              }`}
              style={{
                width: currentItem === index ? '15px' : '11px',
                height: currentItem === index ? '15px' : '11px',
                left: `${leftPosition - 5.5}px`,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            ></div>
            <div
              className={` mt-2 text-sm text-offwhite`}
              style={{
                left: `${leftPosition - 24}px`,
                position: 'absolute',
                top: '16px',
                transform: 'translateY(-50%)',
              }}
            >
              {time}
            </div>
          </div>
        );
      })}
      <div className="w-[7px] h-[7px] bg-skyblue rounded-full absolute -top-[3px] right-0"></div>
    </div>
  );
};

export default HorizontalTimeline;
