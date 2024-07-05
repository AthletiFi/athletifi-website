import React from 'react';
import MatchSummary from './MatchSummary';
import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IMatchDataExtended } from '@/types/Dashboard.type';
import { useParams } from 'next/navigation';
import { useDashboardData } from '@/states/dashboardStore';

const parseDate = (dateString: string) => new Date(dateString);

const isThisWeek = (date: number | Date) => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
  return date >= startOfWeek && date <= endOfWeek;
};

const PastMatches: React.FC = () => {
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  const { dashboardData } = useDashboardData(cardIdValue);
  const past_matches = dashboardData.data?.matchesList as IMatchDataExtended[];
  const today = new Date();
  const pastMatches =
    past_matches?.filter(
      (match) => parseDate(match.datetime as string) < today,
    ) ?? [];
  const futureMatches =
    past_matches?.filter(
      (match) => parseDate(match.datetime as string) > today,
    ) ?? [];

  // Check if in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

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
          {futureMatches.length > 0 ? (
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
                      isThisWeek={isThisWeek(
                        parseDate(match.datetime as string),
                      )}
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
          ) : (
            <div className="mt-6 mb-12 shadow-md mx-auto bg-cardsBackground  bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[420px] flex justify-center items-center  text-primary opacity-80 text-sm p-6">
              Upcoming match details aren&apos;t available yet. Stay tuned!
              We&apos;ll update you with all the information as soon as the
              games are scheduled.
            </div>
          )}
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
            <div className="mt-6 mb-12 shadow-md mx-auto bg-cardsBackground  bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[420px] flex justify-center items-center text-primary opacity-80 text-sm p-6">
              We&apos;re still gathering the data from past matches. Please
              check back soon to see all the details!
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className="min-w-[343px] md:min-w-[778px] lg:min-w-[640px] min-h-[550px] md:min-h-[355px] mb-10 lg:mb-0" />
      )}
    </>
  );
};

export default PastMatches;
