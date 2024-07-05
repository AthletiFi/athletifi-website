import React from 'react';
import Image from 'next/image';
import { IRating } from '@/types/Dashboard.type';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'next/navigation';
import { useDashboardData } from '@/states/dashboardStore';

const LOGO_SIZE = 54;

const RatingBox = ({
  rating,
  isLast,
}: {
  rating: IRating;
  isLast: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h4 className="text-center text-md">{rating.rating}</h4>
        <p className="text-xs sm:text-sm font-light">{rating.attribute}</p>
      </div>
      {!isLast && <span className="min-h-6 min-w-[1px] bg-partnersBorders" />}
    </>
  );
};

const LatestMatch: React.FC = () => {
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  const { dashboardData } = useDashboardData(cardIdValue);

  const latestMatch = dashboardData.data?.latestMatch;
  const latestPlayerRatings = dashboardData.data?.latestPlayerRating;

  const weatherIcon = latestMatch?.weather?.weatherIcon;
  const iconNameWithoutExtension = weatherIcon?.split('.')[0];
  const localWeatherIcon = `/assets/weather-icons-webp/${iconNameWithoutExtension}.webp`;

  return (
    <>
      {latestMatch?.datetime !== null && latestMatch?.datetime !== undefined ? (
        <div className="bg-cardsBackground h-full flex flex-col justify-between p-4 relative w-full rounded-10 text-primary ">
          {latestMatch?.datetime === undefined ? (
            <div className="bg-cardsBackground h-[310px] sm:h-[310px] md:h-56 flex flex-col relative w-full rounded-10 text-primary ">
              <h1 className="text-[24px] font-semibold">Latest Match</h1>
              <div className="flex h-full text-gray-500 justify-center items-center">
                We&apos;re gathering the latest performance and match details of
                your player. Please check back soon to see all the exciting
                updates!
              </div>
            </div>
          ) : (
            <>
              <div className=" flex flex-col md:flex-row justify-between">
                <h1 className="text-[24px] font-semibold">Latest Match</h1>
                <div className="flex flex-col justify-start gap-[3px] items-center md:items-end mt-4 md:mt-0 text-sm font-light">
                  <p className="text-center md:text-right">
                    {latestMatch?.datetime}
                  </p>
                  <p className="text-center md:text-right">
                    {latestMatch?.location}
                  </p>
                  {weatherIcon && (
                    <div className="flex items-center justify-center sm:justify-center md:justify-end">
                      <div className=" w-6 text-center mr-1">
                        <Image
                          src={localWeatherIcon}
                          alt="Weather Icon"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="">{latestMatch?.weather?.tempFahr}&deg;F</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end items-center w-full max-w-[450px] md:max-w-[500px] my-4 h-full self-center">
                <div className="flex justify-end items-center h-full w-1/2">
                  <div className="flex flex-col-reverse w-full md:flex-row items-center">
                    <p className="text-center md:mr-2 max-h-6 leading-5 text-sm md:text-base">
                      {latestMatch?.home_club}
                    </p>
                    {!!latestMatch?.home_club_logo && (
                      <Image
                        src={latestMatch?.home_club_logo}
                        alt="crest"
                        className="mb-[6px] md:mb-0"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                        quality={75}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  {' '}
                  <p className="text-lg h-full md:items-center pt-2 lg:pt-0 px-2 md:px-4">
                    {`${latestMatch?.home_score}`}
                  </p>
                  <p className="px-2 h-full flex items-center justify-center">
                    -
                  </p>
                  <p className="text-lg  h-full flex md:items-center pt-2 lg:pt-0 px-2 md:px-4">{`${latestMatch?.away_score}`}</p>
                </div>

                <div className="flex  md:items-center h-full w-1/2">
                  <div className="flex flex-col w-full md:flex-row items-center">
                    {!!latestMatch?.away_club_logo && (
                      <Image
                        src={latestMatch?.away_club_logo}
                        alt="crest"
                        className="mb-[6px] md:mb-0"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                        quality={75}
                        loading="lazy"
                      />
                    )}
                    <p className="text-center md:ml-2 max-h-6 leading-5 text-sm md:text-base">
                      {latestMatch?.away_club}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {latestPlayerRatings && latestPlayerRatings.length > 0 && (
            <div className="flex justify-around items-center mt-10 md:mt-6">
              {latestPlayerRatings.map((rating, idx) => (
                <RatingBox
                  key={idx}
                  isLast={idx === latestPlayerRatings.length - 1}
                  rating={rating}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Skeleton
          className="min-w-[351px] min-h-[310px] md:min-h-[224px]"
          borderRadius={10}
        />
      )}
    </>
  );
};

export default LatestMatch;
