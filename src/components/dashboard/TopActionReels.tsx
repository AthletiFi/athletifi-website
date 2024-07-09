//import { useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useParams } from 'next/navigation';
import MuxPlayer, { MuxPlayerRefAttributes } from '@mux/mux-player-react';

import { useDashboardData } from '@/states/dashboardStore';
import { IMatchDataExtended } from '@/types/Dashboard.type';
import TopActionReelThumbnail from '@/components/dashboard/TopActionReelThumbnail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IActionReelProps {
  playback_id: string | null;
  home_club_logo: string | null;
  away_club_logo: string | null;
  description: string;
  start_timestamp: string;
  datetime: string | null;
}

const ActionReel: React.FC<IActionReelProps> = ({
  playback_id,
  home_club_logo,
  away_club_logo,
  description,
  start_timestamp,
  datetime,
}) => {
  ////////////open/close hightlight video
  const [isExpanded, setIsExpanded] = useState(false);
  const playerRef = useRef<MuxPlayerRefAttributes>(null);

  const handlePlay = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };
  useEffect(() => {
    if (isExpanded && playerRef.current && start_timestamp) {
      const [hours, minutes, seconds] = start_timestamp.split(':').map(Number);
      const startTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

      playerRef.current.currentTime = startTimeInSeconds;
      playerRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  }, [isExpanded, start_timestamp]);
  /////////////////////////////////////////

  const dateTime = datetime ? new Date(datetime) : null;
  const formattedDate = dateTime
    ? dateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
      })
    : null;

  return (
    <>
      <div className="flex my-2 justify-start">
        <div className="relative w-full max-w-[230px] min-w-[180px] h-[120px] sm:h-[120px] md:h-[130px]">
          <div className="cursor-pointer w-full h-full" onClick={handlePlay}>
            <TopActionReelThumbnail
              home_logo={home_club_logo}
              away_logo={away_club_logo}
            />
          </div>
          <time className="absolute bottom-2 right-2 bg-black text-primary px-1.5 text-sm font-light">
            {start_timestamp}
          </time>
        </div>
        <div className="ml-2 flex flex-col justify-end w-full min-w-[130px] md:max-w-[230px]">
          <p className="text-sm text-primary font-extralight font-sourceSansPro">
            {description}
          </p>
          {datetime && (
            <p className="mt-2 text-sm text-offwhite font-extralight font-sourceSansPro">
              {formattedDate}
            </p>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
            <MuxPlayer
              ref={playerRef}
              playbackId={playback_id || ''}
              streamType="on-demand"
              className="w-full h-full"
              accent-color="#00C7FF"
              autoPlay
              muted={false}
            />
            <div className="absolute bg-cardsBackground bg-opacity-50 rounded-[5px] top-0 z-10 flex w-full justify-between items-center px-4 py-2">
              <p className="max-w-[240px] py-4  text-sm text-primary font-extralight font-sourceSansPro">
                {description}
              </p>
              <button className="text-primary" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} size="2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function getHighlights(
  matchesList: IMatchDataExtended[],
  maxHighlights: number,
) {
  const allHighlights = matchesList.flatMap(
    (match) =>
      match.highlights?.map((highlight) => ({
        ...highlight,
        home_club_logo: match.home_club_logo,
        away_club_logo: match.away_club_logo,
        playback_id: match.playback_id,
        datetime: match.datetime,
      })) || [],
  );

  return allHighlights.slice(0, maxHighlights);
}

const ActionReelList: React.FC = () => {
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  const { dashboardData } = useDashboardData(cardIdValue);

  const matchesList: IMatchDataExtended[] =
    dashboardData?.data?.matchesList || [];

  ///////filter invalid highlights
  ///////render max of 4, in future randomly render for better UX

  const MAX_HIGHLIGHTS = 4;
  const selectedHighlights = getHighlights(matchesList, MAX_HIGHLIGHTS).filter(
    (highlight) => highlight.playback_id && highlight.clip_description,
  );

  return (
    <>
      {selectedHighlights.length > 0 ? (
        <div className="mt-6 md:mt-0 md:pl-6 border-gray-600 w-full max-w-[560px] md:w-1/2">
          <h3 className="w-full text-primary text-md font-semibold font-sourceSansPro mb-2">
            Top Action Reels
          </h3>
          {selectedHighlights.map((highlight, index) => (
            <ActionReel
              key={index}
              home_club_logo={highlight.home_club_logo || null}
              away_club_logo={highlight.away_club_logo || null}
              playback_id={highlight.playback_id || null}
              description={highlight.clip_description}
              start_timestamp={highlight.start_timestamp}
              datetime={highlight.datetime || null}
            />
          ))}
        </div>
      ) : selectedHighlights.length === 0 ? (
        <div className="border-l-0 md:border-l mt-6 md:mt-0 md:pl-4 border-gray-600 w-full">
          <h3 className="w-full text-primary text-md font-semibold font-sourceSansPro mb-2">
            Top Action Reels
          </h3>
          <div className="mt-8 shadow-md mx-auto bg-cardsDark bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[420px] flex justify-center items-center text-primary opacity-80 text-sm p-6">
            Exciting things are coming! We&apos;re putting together the best
            action reels from this season just for you. Check back soon to watch
            the highlights! We&apos;ll also send you a notification as soon as
            the clips are ready. Stay tuned!
          </div>
        </div>
      ) : (
        <div className="border-l-0 md:border-l min-w-[343px] md:min-w-[340px] lg:min-w-[420px] mt-6 md:mt-0 md:pl-4 border-gray-600">
          <Skeleton className="min-h-[480px] md:min-h-[450px] lg:min-h-[455px]" />
        </div>
      )}
    </>
  );
};

export { ActionReel, ActionReelList };
