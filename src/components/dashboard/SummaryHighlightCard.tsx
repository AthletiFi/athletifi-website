import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';

interface Highlight {
  clip_description: string;
  duration: string;
  start_timestamp: string;
}

interface SummaryHighlightCardProps {
  highlight: Highlight;
  index: number;
  currentItem: number;
  isHighlightPlaying: boolean;
  handlePlayClick: (index: number) => void;
  setCurrentItem: (index: number) => void;
  playback_id: string;
  accentColors: string[];
  convertToMilliseconds: (timestamp: string) => number;
  highlightProgress: number;
}

const SummaryHighlightCard: React.FC<SummaryHighlightCardProps> = ({
  highlight,
  index,
  currentItem,
  isHighlightPlaying,
  handlePlayClick,
  setCurrentItem,
  playback_id,
  accentColors,
  convertToMilliseconds,
  highlightProgress,
}) => {
  const convertToSeconds = (timestamp: string): number => {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  return (
    <div className="flex flex-row sm:flex-row md:flex-col">
      {playback_id && highlight.start_timestamp ? (
        <>
          <div
            style={{
              backgroundColor: `${currentItem === index && isHighlightPlaying ? '#092C3E' : ''}`,
              transform: `${currentItem === index && isHighlightPlaying ? 'scale(0.98)' : 'scale(1)'}`,
              transition: `${currentItem === index && isHighlightPlaying ? 'transform 0.5s' : ''}`,
              borderLeft: `8px solid ${accentColors[(index + 1) % accentColors.length]}`,
            }}
            className="flex justify-between bg-cardsBackground p-4 rounded-[5px] w-full mb-2 items-center border-b border-partnersBorders"
          >
            <div className="video-info text-primary flex flex-col mr-2">
              <div className="flex flex-col md:flex-row items-start tracking-wide">
                <p className="text-sm text-offwhite mr-2 md:mr-4 mt-[2px]">
                  {highlight.start_timestamp}
                </p>
                <div className="flex flex-col">
                  <h3 className="text-base mb-2">{`Highlight ${String(index + 1).padStart(2, '0')}`}</h3>
                  <p className="text-base font-light text-offwhitem-px">
                    {highlight.clip_description}
                  </p>
                  <p className="text-sm text-gray-500 m-px">
                    Duration: {convertToSeconds(highlight.duration)} seconds
                  </p>
                </div>
              </div>
            </div>
            <button
              className="w-12 relative flex items-center justify-center h-full"
              onClick={() => {
                handlePlayClick(index);
                setCurrentItem(index);
              }}
            >
              <div className="rounded-full bg-primary h-8 w-8 absolute"></div>
              <FontAwesomeIcon
                icon={
                  isHighlightPlaying && currentItem === index
                    ? faPauseCircle
                    : faPlayCircle
                }
                className="text-skyblue h-8 w-8 absolute"
              />
            </button>
            <div className="w-full absolute bottom-0 left-0 rounded-full h-1 mt-4">
              {currentItem === index && (
                <div
                  className="absolute left-0 -bottom-1 h-full bg-darkerSkyBlue"
                  style={{
                    width: `${(highlightProgress / convertToMilliseconds(highlight.duration)) * 100}%`,
                    transition: 'width 0.1s linear',
                  }}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-partnersBorders rounded-[4px] w-full min-h-[128px] md:max-w-[450px] flex justify-center items-center text-center">
          <p className="text-offwhite">
            No highlights for this match yet. Stay tuned for updates!
          </p>
        </div>
      )}
    </div>
  );
};

export default SummaryHighlightCard;
