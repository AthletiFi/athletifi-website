'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMediaQuery } from '@/app/utils/useMediaQuery';
import Skeleton from 'react-loading-skeleton';
import {
  FieldPlayerRatings,
  GoalKeeperRatings,
} from '@/app/utils/dashboardHelper';
import { IRating, IRatingRaw } from '@/types/Dashboard.type';

const StatsBarChartWithNoSSR = dynamic(
  () => import('@/components/dashboard/BarChart'),
  {
    ssr: false,
  },
);

const StatsLineChartWithNoSSR = dynamic(
  () => import('@/components/dashboard/LineChart'),
  { ssr: false },
);

const tabInfo = [
  {
    type: 'latest',
    title: 'View Latest Stats',
    icon: '/assets/img/svg/chart-simple-solid.svg',
  },
  {
    type: 'trend',
    title: 'View Trends',
    icon: '/assets/img/svg/chart-line-solid.svg',
  },
];

export default function Charts({
  latestPlayerRating,
  playerRatings,
  isGoalkeeper,
}: {
  latestPlayerRating: IRating[] | null;
  playerRatings: IRatingRaw[] | null;
  isGoalkeeper: boolean | null;
}) {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [isLatestActive, setIsLatestActive] = useState(true);

  const chart_fields = isGoalkeeper ? GoalKeeperRatings : FieldPlayerRatings;

  const overall_rating =
    latestPlayerRating &&
    Math.round(
      latestPlayerRating
        .map((x) => x.rating)
        .reduce(function (avg, value, _, { length }) {
          return avg + value / length;
        }, 0),
    );

  return (
    <>
      {isGoalkeeper !== null && isGoalkeeper !== undefined ? (
        <div className="stats-chart__container bg-cardsBackground">
          <div className="flex text-sm md:text-md text-primary border-b border-partnersBorders">
            <div
              className={`flex justify-center w-full cursor-pointer rounded-tl-10 py-[14px] ${isLatestActive ? 'font-semibold underline' : 'bg-cardsDark'}`}
              onClick={() => setIsLatestActive(true)}
            >
              <p className="px-3">View Latest Stats</p>
              <Image
                alt="bar-chart-icon"
                src={tabInfo[0].icon}
                width={isMobile ? 13 : 17}
                height={isMobile ? 13 : 17}
                quality={75}
                loading="lazy"
                className="stats-chart__icon--white stats-chart__icon--rotate90"
              />
            </div>
            <div
              className={`flex justify-center w-full cursor-pointer rounded-tr-10 py-[14px] ${!isLatestActive ? 'font-semibold underline' : 'bg-cardsDark'}`}
              onClick={() => setIsLatestActive(false)}
            >
              <p className="px-3">View Trends</p>
              <Image
                alt="line-chart-icon"
                src={tabInfo[1].icon}
                width={isMobile ? 13 : 17}
                height={isMobile ? 13 : 17}
                quality={75}
                loading="lazy"
                className="stats-chart__icon--white"
              />
            </div>
          </div>
          <section className="flex flex-col items-start h-full min-h-[450px] gap-5 pt-6">
            {isLatestActive ? (
              <StatsBarChartWithNoSSR
                overall_rating={overall_rating}
                latest_player_ratings={latestPlayerRating}
                player_ratings={[]}
                chart_fields={chart_fields}
              />
            ) : (
              <StatsLineChartWithNoSSR
                overall_rating={overall_rating}
                latest_player_ratings={[]}
                player_ratings={playerRatings}
                chart_fields={chart_fields}
              />
            )}
          </section>
        </div>
      ) : (
        <Skeleton height={498} borderRadius={10} />
      )}
    </>
  );
}
