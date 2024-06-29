import React from 'react';
import MatchSummary from './MatchSummary';
import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IMatchDataExtended } from '@/types/Dashboard.type';
// import { useParams } from 'next/navigation';
//import { useDashboardData } from '@/states/dashboardStore';

const dummyMatches: IMatchDataExtended[] = [
  {
    away_club: 'Stellar FC',
    away_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
    away_score: 2,
    away_team: 'Stellar FC U14',
    datetime: '2024-04-24T12:00:00Z',
    highlights: [
      {
        clip_description:
          "Stellar FC's first goal - a beautiful header from a corner kick",
        duration: '00:00:15',
        start_timestamp: '00:15:30',
      },
      {
        clip_description: "VSA's near miss - shot hits the crossbar",
        duration: '00:00:12',
        start_timestamp: '00:37:45',
      },
      {
        clip_description: 'Stellar FC scores their second goal on a breakaway',
        duration: '00:00:18',
        start_timestamp: '01:05:20',
      },
    ],
    home_club: 'Villanova Soccer Academy',
    home_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/vsa-logo.svg',
    home_score: 0,
    home_team: 'VSA 2009s',
    location: 'Philadelphia, PA',
    playback_id: 'qVe4r2Bp2BIB7H23i1ZajlCxP47kjRuCusmfUdqc4lc',
    video_key: 'match_videos/pixellot_video_2.mp4',
    weather: {
      date: '2024-04-24',
      location: 'Philadelphia, PA',
      precipIn: 0,
      precipMm: 0.1,
      tempCelc: 17.8,
      tempFahr: 64.0,
      weatherDesc: 'Cloudy skies',
      weatherIcon: 'Cloudy.gif',
      windSpeedKmh: 20,
      windSpeedMph: 12,
    },
  },
  {
    away_club: 'Galaxy FC',
    away_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
    away_score: 3,
    away_team: 'Galaxy FC U14',
    datetime: '2024-05-22T14:00:00Z',
    highlights: [
      {
        clip_description:
          'Galaxy FC opens the scoring with a long-range strike',
        duration: '00:00:20',
        start_timestamp: '00:10:15',
      },
      {
        clip_description: 'Inter Soccer Academy equalizes with a penalty kick',
        duration: '00:00:25',
        start_timestamp: '00:30:40',
      },
      {
        clip_description: 'Galaxy FC scores two quick goals in succession',
        duration: '00:00:30',
        start_timestamp: '01:15:00',
      },
    ],
    home_club: 'Inter Soccer Academy',
    home_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
    home_score: 1,
    home_team: 'ISA 2009s',
    location: 'New York, NY',
    playback_id: 'aVe4r2Bp2BIB7H23i1ZajlCxP47kjRuCusmfUdqc4lc',
    video_key: 'match_videos/pixellot_video_3.mp4',
    weather: {
      date: '2024-05-22',
      location: 'New York, NY',
      precipIn: 0,
      precipMm: 0,
      tempCelc: 20,
      tempFahr: 68.0,
      weatherDesc: 'Cloudy skies',
      weatherIcon: 'Cloudy.gif',
      windSpeedKmh: 15,
      windSpeedMph: 9,
    },
  },
  {
    away_club: 'Lunar FC',
    away_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
    away_score: 1,
    away_team: 'Lunar FC U14',
    datetime: '2024-06-01T16:00:00Z',
    highlights: [
      {
        clip_description: 'Solar Soccer Academy scores an early goal',
        duration: '00:00:15',
        start_timestamp: '00:05:30',
      },
      {
        clip_description: 'Lunar FC goalkeeper makes a spectacular save',
        duration: '00:00:12',
        start_timestamp: '00:25:15',
      },
      {
        clip_description:
          'Solar Soccer Academy scores three goals in quick succession',
        duration: '00:00:45',
        start_timestamp: '00:55:00',
      },
      {
        clip_description:
          'Lunar FC scores a consolation goal in the final minutes',
        duration: '00:00:18',
        start_timestamp: '01:25:30',
      },
    ],
    home_club: 'Solar Soccer Academy',
    home_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
    home_score: 4,
    home_team: 'SSA 2009s',
    location: 'Boston, MA',
    playback_id: 'bVe4r2Bp2BIB7H23i1ZajlCxP47kjRuCusmfUdqc4lc',
    video_key: 'match_videos/pixellot_video_4.mp4',
    weather: {
      date: '2024-06-01',
      location: 'Boston, MA',
      precipIn: 0,
      precipMm: 0,
      tempCelc: 22,
      tempFahr: 71.6,
      weatherDesc: 'Cloudy skies',
      weatherIcon: 'Cloudy.gif',
      windSpeedKmh: 18,
      windSpeedMph: 11,
    },
  },
  {
    away_club: 'Comet FC',
    away_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
    away_score: 0,
    away_team: 'Comet FC U14',
    datetime: '2024-05-17T18:00:00Z',
    highlights: [
      {
        clip_description: 'Meteor Soccer Academy scores from a free kick',
        duration: '00:00:20',
        start_timestamp: '00:20:10',
      },
      {
        clip_description: 'Comet FC hits the post in a close attempt',
        duration: '00:00:15',
        start_timestamp: '00:40:30',
      },
      {
        clip_description:
          'Meteor Soccer Academy doubles their lead with a header',
        duration: '00:00:18',
        start_timestamp: '01:10:45',
      },
      {
        clip_description:
          'Meteor Soccer Academy seals the win with a late goal',
        duration: '00:00:22',
        start_timestamp: '01:30:15',
      },
    ],
    home_club: 'Meteor Soccer Academy',
    home_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
    home_score: 3,
    home_team: 'MSA 2009s',
    location: 'Chicago, IL',
    playback_id: 'cVe4r2Bp2BIB7H23i1ZajlCxP47kjRuCusmfUdqc4lc',
    video_key: 'match_videos/pixellot_video_5.mp4',
    weather: {
      date: '2024-05-17',
      location: 'Chicago, IL',
      precipIn: 0,
      precipMm: 0,
      tempCelc: 18,
      tempFahr: 64.4,
      weatherDesc: 'Cloudy skies',
      weatherIcon: 'Cloudy.gif',
      windSpeedKmh: 22,
      windSpeedMph: 14,
    },
  },
];

const parseDate = (dateString: string) => new Date(dateString);

const isThisWeek = (date: Date) => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
  return date >= startOfWeek && date <= endOfWeek;
};

const PastMatches: React.FC = () => {
  // const { cardId } = useParams();
  // const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  //const { dashboardData } = useDashboardData(cardIdValue);
  //const past_matches = dashboardData.data?.matchesList;
  const past_matches = dummyMatches;
  const today = new Date();

  const pastMatches =
    past_matches?.filter(
      (match) => parseDate(match.datetime as string) < today,
    ) || [];
  const futureMatches =
    past_matches?.filter(
      (match) => parseDate(match.datetime as string) > today,
    ) || [];
  // const thisWeekMatches =
  //   past_matches?.filter((match) => isThisWeek(parseDate(match.datetime))) ||
  //   [];

  // Check if in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  console.log(past_matches);
  //varints to trigger animations with staggered effect
  const staggerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      {past_matches && past_matches[0]?.home_club_logo ? (
        <div className="w-full ">
          <motion.div
            ref={inViewRef}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerVariants}
            className="flex flex-col gap-2"
          >
            {futureMatches.map((match, index) => (
              <React.Fragment key={index}>
                <motion.div
                  variants={staggerVariants}
                  className="overflow-hidden"
                >
                  <MatchSummary
                    matchData={match}
                    isFuture={true}
                    isThisWeek={isThisWeek(parseDate(match.datetime as string))}
                  />
                </motion.div>
                {index !== futureMatches.length - 1 && (
                  <motion.span
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={staggerVariants}
                    className="h-px bg-partnersBorders inline-block min-w-min"
                  ></motion.span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
          <h2 className="text-primary font-semibold text-md mt-6 bg-cardsBackground mb-6 px-4 py-2 shadow-portalNav rounded-[5px] w-full">
            Past matches
          </h2>
          <motion.div
            ref={inViewRef}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerVariants}
            className="flex flex-col gap-4"
          >
            {pastMatches.map((match, index) => (
              <React.Fragment key={index}>
                <motion.div
                  variants={staggerVariants}
                  className="overflow-hidden"
                >
                  <MatchSummary matchData={match} />
                </motion.div>
                {index !== pastMatches.length - 1 && (
                  <motion.span
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={staggerVariants}
                    className="h-px my-4 md:my-6 bg-partnersBorders inline-block min-w-min"
                  ></motion.span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      ) : past_matches === null ? (
        <div className="w-full px-0 md:px-4 lg:px-0 lg:w-2/3 lg:max-w-[640px]">
          <h2 className="text-primary font-semibold text-2xl mb-6">
            Past matches
          </h2>
          <div className="text-gray-500 min-w-[343px] md:min-w-[778px] lg:min-w-[640px] min-h-[50px] mb-10 lg:mb-0">
            We are working on getting more match data for your player. Please
            come back soon!
          </div>
        </div>
      ) : (
        <Skeleton className="min-w-[343px] md:min-w-[778px] lg:min-w-[640px] min-h-[550px] md:min-h-[355px] mb-10 lg:mb-0" />
      )}
    </>
  );
};

export default PastMatches;
