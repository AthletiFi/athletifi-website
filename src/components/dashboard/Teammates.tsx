import React from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import '@/styles/globals.css';
import { useParams } from 'next/navigation';
import { useDashboardData } from '@/states/dashboardStore';

const Teammates: React.FC = () => {
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  const { dashboardData } = useDashboardData(cardIdValue);
  const teammates = dashboardData?.data?.teammates;
  return (
    <>
      {teammates && teammates[0]?.name ? (
        <div className=" w-full my-8 lg:my-12 lg:mt-0">
          <div className="flex lg:flex-col gap-3 overflow-auto pr-4 pb-4">
            {teammates.map((teammate) => (
              <div key={`${teammate.name}-${teammate.number}`}>
                {teammate.avatar_url && teammate.name && (
                  <div className="flex items-center flex-col lg:flex-row bg-cardsBackground rounded-10 p-3 min-w-32 shadow-md">
                    <Image
                      src={teammate.avatar_url}
                      alt={teammate.name}
                      width={76}
                      height={76}
                      className="rounded-full bg-slate-500 mb-3 lg:mb-0"
                    />
                    <div className="md:ml-0 lg:ml-4 mt-2 md:mt-0 flex flex-col items-center lg:items-start h-[72px] justify-between lg:justify-around">
                      <p className="text-base text-center lg:text-start text-primary leading-5 mt-2 md:mt-0">
                        {teammate.name}
                      </p>
                      {teammate.number !== null && (
                        <p className="text-center inline-block max-w-full text-sm text-offwhite">
                          #{teammate.number}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : teammates === null ? (
        <div className="bg-cardsBackground p-4 w-full lg:w-[330px] rounded-10 my-12 lg:my-0 ml-0 lg:ml-6 shadow-md">
          <h2 className="text-primary font-semibold text-[20px] font-sourceSansPro">
            Teammates
          </h2>
          <div className="h-1 bg-partnersBorders my-2" />
          <div className="text-gray-500 min-w-[343px] md:min-w-[778px] lg:min-w-[330px] min-h-[150px]">
            We are gathering details about the team. Please check back soon for
            updates!
          </div>
        </div>
      ) : (
        <Skeleton className="min-w-[343px] md:min-w-[778px] lg:min-w-[330px] min-h-[426px] md:min-h-[217px] lg:min-h-[355px] mb-12 lg:mb-0" />
      )}
    </>
  );
};

export default Teammates;
