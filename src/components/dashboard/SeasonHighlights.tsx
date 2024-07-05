import { useDashboardData } from '@/states/dashboardStore';
import { useParams } from 'next/navigation';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SeasonHighlights: React.FC = () => {
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  const { dashboardData } = useDashboardData(cardIdValue);

  const seasonHighlights = dashboardData.data?.seasonHighlights;
  return (
    <>
      {seasonHighlights && seasonHighlights[0] !== '' ? (
        <div
          className="flex flex-col w-full md:w-1/2 ml-2 mr-4 md:mr-6 mb-4 py-8 md:py-0 border-spacing-6 
    md:my-0 items-center md:items-start max-w-[560px] md:max-w-[540px]"
        >
          <h2 className="leading-7 w-full text-[24px] md:text-lg text-primary font-[600] mb-2 text-top">
            Season Highlights
          </h2>
          <div className="">
            {seasonHighlights.map((highlight, index) => (
              <React.Fragment key={index}>
                <div className="h-px bg-partnersBorders opacity-50 w-full my-4" />

                <p className="text-base text-primary font-extralight max-w-[560px] md:max-w-[540px] md:px-2">
                  {highlight}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : seasonHighlights === null ? (
        <div className="w-full mt-[20px] md:mt-0 md:mr-[16px]">
          <h2 className="leading-7 w-full text-[24px] md:text-lg text-primary font-[600] mb-2 text-top">
            Season Highlights
          </h2>
          <div className="mt-6 mb-12 shadow-md bg-cardsBackground bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[420px] flex justify-center items-center text-primary opacity-80 text-sm p-6">
            Hang tight! We&apos;re gathering all the exciting moments from this
            season. Check back soon to see the highlights! Plus, we&apos;ll
            notify you as soon as the data is ready. Stay tuned!
          </div>
        </div>
      ) : (
        <div className="mt-[20px] md:mt-0 md:mr-[16px]">
          <Skeleton className="min-w-[343px] md:min-w-[340px] lg:min-w-[420px] min-h-[496px] md:min-h-[450px] lg:min-h-[455px]" />
        </div>
      )}
    </>
  );
};

export default SeasonHighlights;
