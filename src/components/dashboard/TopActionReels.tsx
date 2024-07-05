//import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import MuxPlayer from '@mux/mux-player-react';

//import { useDashboardData } from '@/states/dashboardStore';
import { IActionReel } from '@/types/Dashboard.type';
import TopActionReelThumbnail from '@/components/dashboard/TopActionReelThumbnail';

const ActionReel: React.FC<IActionReel> = ({
  playback_id,
  title,
  description,
  home_club_logo,
  away_club_logo,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="flex my-2 justify-start">
      <div className="relative w-full max-w-[230px] min-w-[180px] h-[120px] sm:h-[120px] md:h-[130px]">
        {isVideoPlaying && playback_id ? (
          <>
            <MuxPlayer
              className="w-full h-full object-cover rounded rounded-5"
              playbackId={playback_id}
              autoPlay={isVideoPlaying}
            />
            <time className="absolute bottom-2 right-2 bg-black text-primary px-1.5 text-sm font-light">
              00:00
            </time>
          </>
        ) : (
          <div className="flex w-full h-full">
            <div
              className="cursor-pointer mx-[2px] flex-1"
              onClick={() => setIsVideoPlaying(true)}
            >
              <TopActionReelThumbnail
                home_logo={home_club_logo}
                away_logo={away_club_logo}
              />
            </div>
          </div>
        )}
      </div>
      <div className=" ml-2 flex flex-col justify-end w-full min-w-[130px] md:max-w-[230px]">
        <h4 className="text-sm font-semibold mb-2 text-primary font-sourceSansPro">
          {title}
        </h4>
        <p className="text-sm text-primary font-extralight font-sourceSansPro">
          {description}
        </p>
      </div>
    </div>
  );
};

const ActionReelList: React.FC = () => {
  ////////// This code is temporary and will be replaced with the logic for handling real data
  // const { cardId } = useParams();
  // const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  // const { dashboardData } = useDashboardData(cardIdValue);
  // const actionReels = dashboardData.data?.topActionReels;
  const actionReels = [];

  return (
    <>
      {actionReels?.length === 0 ? (
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
