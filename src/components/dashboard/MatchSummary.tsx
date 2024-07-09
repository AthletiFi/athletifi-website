import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { IMatchDataExtended } from '@/types/Dashboard.type';
import HorizontalTimeline from './HorizontalTimeline';
import SummaryHighlightCard from './SummaryHighlightCard';
import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react';
import { motion, AnimatePresence } from 'framer-motion';

function convertToSeconds(timestamp: string): number {
  const [hours, minutes, seconds] = timestamp.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

const accentColors = ['#FC6713', '#27B6BD', '#DA393B', '#B09E03', '#5A54A2'];

interface MatchSummaryProps {
  matchData: IMatchDataExtended;
  isFuture?: boolean;
  isThisWeek?: boolean;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({
  matchData,
  isFuture,
  isThisWeek,
}) => {
  const [showRecap, setShowRecap] = useState(false);
  const {
    home_club_logo,
    away_club_logo,
    home_club,
    away_club,
    home_score,
    away_score,
    datetime,
    location,
    weather,
    playback_id,
    highlights,
    match_summary,
  } = matchData;

  const [currentItem, setCurrentItem] = useState<number>(-1);
  const [isHighlightPlaying, setIsHighlightPlaying] = useState(false);
  const muxPlayerRef = useRef<MuxPlayerRefAttributes>(null);
  const [highlightProgress, setHighlightProgress] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function convertToMilliseconds(timestamp: string): number {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }

  const handlePlayClick = (index: number) => {
    if (!highlights) {
      console.warn('Highlights are null or undefined.');
      return;
    }

    if (muxPlayerRef.current) {
      const videoElement = muxPlayerRef.current as unknown as HTMLVideoElement;
      const cuePoints = highlights
        .map((highlight) => convertToMilliseconds(highlight.start_timestamp))
        .filter((time) => !isNaN(time) && isFinite(time))
        .sort((a, b) => a - b);

      if (cuePoints.length > 0) {
        const track = videoElement.addTextTrack('captions', '', 'en');

        cuePoints.forEach((cueTime) => {
          const duration = convertToSeconds(highlights[index].duration);
          const cue = new VTTCue(
            cueTime / 1000,
            (cueTime + duration) / 1000,
            `Highlight ${index + 1}`,
          );
          track.addCue(cue);
        });

        if (isHighlightPlaying && currentItem === index) {
          videoElement.pause();
        } else {
          videoElement.currentTime = cuePoints[index] / 1000 || 0;
          videoElement.play();
        }

        setIsHighlightPlaying(!isHighlightPlaying);
        setCurrentItem(index);
      }

      const duration = convertToMilliseconds(highlights[index].duration);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      setHighlightProgress(0);

      intervalRef.current = setInterval(() => {
        setHighlightProgress((prevProgress) => {
          const increment = 100;
          if (prevProgress >= duration) {
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
            }
            setIsHighlightPlaying(false);
            return 0;
          }
          return prevProgress + increment;
        });
      }, 100);

      if (!videoElement.pauseListenerAdded) {
        videoElement.addEventListener('pause', handlePause);
        videoElement.pauseListenerAdded = true;
      }
    } else {
      console.warn("MuxPlayer element not found. Cue points can't be added.");
    }
  };

  // Function to handle pause
  const handlePause = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    //setHighlightProgress(0);
  };

  useEffect(() => {
    const currentRef = muxPlayerRef.current as unknown as HTMLVideoElement;

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  const handleSummaryClick = () => {
    setShowRecap(true);
  };
  const dateTime = new Date(datetime as string);
  const formattedDate = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handlePrevClick = () => {
    if (currentItem > 0) {
      const newIndex = currentItem - 1;
      setCurrentItem(newIndex);
      handlePlayClick(newIndex);
    }
  };

  const handleNextClick = () => {
    if (highlights && currentItem < highlights.length - 1) {
      const newIndex = currentItem + 1;
      setCurrentItem(newIndex);
      handlePlayClick(newIndex);
    } else {
      console.warn('no highlights available');
    }
  };
  const iconNameWithoutExtension = weather?.weatherIcon?.split('.')[0];

  const localWeatherIcon = `/assets/weather-icons-webp/${iconNameWithoutExtension}.webp`;

  return (
    <div className="w-full flex-col justify-between items-center text-primary px-2">
      {isFuture && (
        <div className="flex justify-start gap-3 w-full 2sm:mb-6">
          <p className="text-sm md:text-base py-[4px]">{formattedDate}</p>
          {isThisWeek && (
            <p className="text-primary text-sm bg-chartRed font-semibold px-2 rounded-[3px] leading-7 shadow-sm">
              This Week
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between my-2 flex-col 2sm:flex-row md:flex-row">
        {' '}
        <div className="flex justify-between items-center w-full max-w-[200px] min-w-[200px] my-4 2sm:my-0 2sm:mr-2">
          {home_club_logo !== null && (
            <div className="relative w-[75px] 2sm:w-[60px] md:w-[65px] h-[75px] 2sm:h-[60px] md:h-[65px]">
              <Image src={home_club_logo} alt="Crest" layout="fill" />
            </div>
          )}
          <div className="mx-2 min-w-12 flex justify-between md:mx-3">
            <span>{home_score}</span> - <span>{away_score}</span>
          </div>
          {away_club_logo !== null && (
            <div className="relative w-[75px] 2sm:w-[60px] md:w-[65px] h-[75px] 2sm:h-[60px] md:h-[65px]">
              <Image src={away_club_logo} alt="Crest" layout="fill" />
            </div>
          )}
        </div>
        <div className="flex-col justify-center items-center mb-4 2sm:mb-0">
          <div className="relative flex flex-col md:flex-row md:items-center justify-center gap-4 w-full">
            <div className="flex-grow text-center md:text-right pr-2">
              <span className="text-base 2sm:text-sm md:text-base">
                {home_club}
              </span>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none">
              <span className="text-skyblue">VS</span>
            </div>
            <div className="flex-grow text-center md:text-left pl-2 ">
              <span className="text-base 2sm:text-sm md:text-base">
                {away_club}
              </span>
            </div>
          </div>
        </div>
        {isFuture ? (
          <div className="text-sm text-offwhite text-center  min-w-[120px] md:gap-[4px]2sm:items-end flex flex-col items-center 2sm:text-end 2sm:items-end md:items-end mb-2">
            <p className="text-center 2sm:text-end">{formattedTime}</p>
            <p>{location}</p>
            {isThisWeek && weather && (
              <div className="flex items-center justify-center 2sm:justify-end">
                <div className="relative w-[18px] md:w-[30px] h-[18px] md:h-[30px]">
                  <Image src={localWeatherIcon} alt="Crest" layout="fill" />
                </div>
                <span>{weather.tempCelc}°C</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center 2sm:items-end md:items-end">
            {' '}
            {!isFuture && (
              <div className="flex flex-col items-center 2sm:text-end 2sm:items-end md:items-end mb-2">
                {' '}
                <div className="text-sm text-offwhite pt-[4px]">
                  {formattedDate}
                </div>
                <p className="text-sm text-offwhite pt-[2px]">{location}</p>
              </div>
            )}
            <button
              className="-mr-[4px] w-[120px] h-[26px] md:h-[30px] px-2 bg-skyblue text-black text-sm rounded-30 ml-[4px] mt-4"
              onClick={handleSummaryClick}
            >
              summary
            </button>
          </div>
        )}
      </div>

      {/* SUMMARY CARD */}
      <AnimatePresence>
        {showRecap && (
          <motion.div
            key="match-modal"
            initial={{ y: 70, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 70, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
            className="bg-[#0b2230] shadow-lg fixed inset-0 w-full py-6 md:py-10 px-2 md:px-4 z-50 flex flex-col items-center overflow-y-auto "
          >
            <div className="w-full shadow-md mb-4 bg-cardsBackground rounded-[5px] py-2 px-4 flex items-center justify-between lg:max-w-[1030px]">
              {' '}
              <h2 className="text-[20px] w-full lg:max-w-[1030px]">
                Match Summary
              </h2>
              <button onClick={() => setShowRecap(false)} className="">
                <FontAwesomeIcon icon={faTimes} size="xl" />
              </button>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-start items-center gap-4  text-primary mt-2 px-2 lg:max-w-[1030px] ">
              <div className="flex justify-center items-center min-w-[280px] w-[280px] md:mr-2">
                {home_club_logo !== null && (
                  <div className="relative min-w-[75px] h-[75px]">
                    <Image src={home_club_logo} alt="Crest" layout="fill" />
                  </div>
                )}
                <div className="mx-2 min-w-12 flex justify-between md:mx-4">
                  <span>{home_score}</span> - <span>{away_score}</span>
                </div>
                {away_club_logo !== null && (
                  <div className="relative min-w-[75px] h-[75px]">
                    <Image src={away_club_logo} alt="Crest" layout="fill" />
                  </div>
                )}
              </div>

              <div className="text-[20px] flex flex-col md:flex-row  items-center justify-center md:gap-4 mt-4 md:mt-0 ">
                <span className="">{home_club} </span>
                <span className="text-skyblue">VS</span>
                <span className=""> {away_club}</span>
              </div>
            </div>
            <div className=" w-full max-w-[1030px] my-4 md:my-8 border-t border-opacity-50 border-partnersBorders"></div>
            <div className="relative flex flex-col pb-4  lg:max-w-[1030px] items-center justify-center w-full">
              <div className="mb-8 mx-2  flex flex-col md:flex-row gap-4 w-full">
                <div className="text-base text-primary min-w-[280px] w-[280px]">
                  <p className="pb-[2px]">{formattedDate}</p>
                  <p className="pb-[2px]">{location}</p>
                  {weather && (
                    <div className="flex  items-center justify-start">
                      <div className="w-6 text-center mr-1">
                        <Image
                          src={localWeatherIcon}
                          alt="Weather Icon"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p>{weather?.tempFahr}</p>
                    </div>
                  )}
                </div>

                <div className="w-full md:mt-0">
                  {match_summary && (
                    <div className="w-full mt-12 md:mt-0">
                      <p className="text-base tracking-wide font-light">
                        {match_summary}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full mt-6 md:mt-0">
                <h2 className="text-[20px] mb-4 bg-cardsBackground rounded-[5px] py-2 px-4 shadow-md">
                  Full Recap
                </h2>
                {/* <div className="h-1 mb-4 bg-partnersBorders" /> */}
                <div className="w-full relative rounded-10">
                  {playback_id ? (
                    <div className="w-full h-full">
                      <MuxPlayer
                        playbackId={playback_id}
                        ref={muxPlayerRef}
                        accent-color="#00C7FF"
                        className=" w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <p>No video currently available for this match</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-4 w-full">
                <div className="flex justify-between items-center bg-cardsBackground rounded-[5px] py-2 px-4 shadow-md">
                  <h3 className="text-base">Jump to highlights</h3>

                  {highlights && highlights.length > 1 && (
                    <div className="flex gap-8 mr-2">
                      <button
                        onClick={() => {
                          handlePrevClick();
                        }}
                        disabled={currentItem === 0}
                        className="text-skyblue"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button
                        onClick={() => {
                          handleNextClick();
                        }}
                        disabled={currentItem === highlights.length - 1}
                        className="text-skyblue"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  )}
                </div>
                {highlights && highlights.length > 1 ? (
                  <>
                    <HorizontalTimeline
                      currentItem={currentItem}
                      handlePlayClick={handlePlayClick}
                      setCurrentItem={setCurrentItem}
                      convertToSeconds={convertToSeconds}
                      timestamps={highlights.map(
                        ({ start_timestamp }) => start_timestamp,
                      )}
                    />
                    <div>
                      {highlights?.map(
                        (
                          highlight: {
                            clip_description: string;
                            duration: string;
                            start_timestamp: string;
                          },
                          index: number,
                        ) => (
                          <div
                            key={`${highlight.clip_description}-${index}`}
                            className="flex flex-row sm:flex-row md:flex-col"
                          >
                            {playback_id && highlight.start_timestamp ? (
                              <>
                                <SummaryHighlightCard
                                  key={`${highlight.clip_description}-${index}`}
                                  highlight={highlight}
                                  index={index}
                                  currentItem={currentItem}
                                  isHighlightPlaying={isHighlightPlaying}
                                  handlePlayClick={handlePlayClick}
                                  setCurrentItem={setCurrentItem}
                                  playback_id={playback_id}
                                  accentColors={accentColors}
                                  convertToMilliseconds={convertToMilliseconds}
                                  highlightProgress={highlightProgress}
                                />
                              </>
                            ) : (
                              <div className="bg-partnersBorders rounded-[4px] w-full min-h-[128px] md:max-w-[450px] flex justify-center items-center text-center">
                                <p className="text-offwhite">
                                  No highlights for this match yet, but stay
                                  tuned! We&apos;ll bring you all the exciting
                                  moments soon. Check back later for updates!
                                </p>
                              </div>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-8 shadow-md mx-auto bg-cardsBackground bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[450px] flex justify-center items-center text-center">
                    <p className="text-offwhite text-sm">
                      No highlights for this match yet, but stay tuned!
                      We&apos;ll bring you all the exciting moments soon. Check
                      back later for updates!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchSummary;
