// This is the article that appears in the headline section (aka Hero) on top of the News page.
import Link from 'next/link';
import React from 'react';
import BlueButton from '../common/BlueButton';
import Image from 'next/image';
import moment from 'moment';

interface NewsProps {
  newsListData: any;
}

const FocusArticle: React.FC<NewsProps> = props => {
  const { newsListData } = props;

  const focusArticleData = newsListData[0] || {};

  const imagePath = focusArticleData.image?.url
    ? 'https://vidalco.in' + focusArticleData.image.url
    : '';

  return (
    <>
      <div className="container__border--blue-gradient relative after:absolute flex justify-center flex-col items-center after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px] mx-3 sm:mx-10 md:mx-16 after:blur-[75px] mt-[45px] lg:mt-[80px] xl:mt-[123px] sm:mb-[24px] lg:mb-[56px] xl:mb-[125px]">
        <Image
          className="lg:w-[462px] lg:h-[541px] w-[150px] -top-[160px] sm:-left-20  -left-5 absolute opacity-50 -z-20"
          src="/assets/img/svg/news-grid-line.svg"
          width={362}
          height={241}
          alt=""
        />
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto py-[15px] lg:py-[25px] xl:py-[43px] relative z-10 after:contents-[''] after:w-[207px] after:h-[207px] after:absolute after:top-0 after:-left-[50px] after:bg-[#00c3f47b] after:blur-[111px] after:-z-10 before:contents-[''] before:w-[207px] before:h-[207px] before:absolute before:bottom-0 before:-right-[50px] before:bg-[#00c3f47b] before:blur-[111px] before:-z-10">
          <div className="flex flex-wrap justify-between flex-col-reverse xl:flex-row items-center">
            <div
              className="lg:max-w-[70%] xl:max-w-[46%] text-center xl:text-start"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="100"
              data-aos-offset="100"
            >
              <h2 className="font-medium text-[20px] sm:text-lg text-primary font-HelveticaNeueMedium xl:max-w-[447px] mx-auto xl:mx-0">
                {focusArticleData.title}
              </h2>
              <p className="text-base text-primary opacity-70 font-Segoe font-normal mt-2">
                by : {focusArticleData.author?.fullName} &bull;{' '}
                {moment(focusArticleData.createdAt).format('DD MMM YY')}
              </p>
              <p className="text-base sm:text-md text-primary opacity-70 font-Segoe font-normal mt-3 sm:mt-4">
                {focusArticleData.previewSummary}
              </p>
              {/*      LET'S GET RID OF THE CATEGORIES FOR NOW. UNCOMMENT THIS BLOCK TO BRING THEM BACK

              <div className="mt-4 flex items-center gap-[14px] justify-center xl:justify-start">
                {focusArticleData.categories?.map((val: any, i: any) => {
                  return (
                    <button
                      key={i}
                      className="lg:text-base md:text-[13px] text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-[10px] sm:px-[18px] bg-matchtitles rounded-full leading-[150%] duration-300 hover:text-white"
                    >
                      {val.title}
                    </button>
                  );
                })}
              </div> 
              
              */}
              <div className="flex xl:justify-start justify-center items-center mt-4 sm:mt-10">
                <Link href={`news/${focusArticleData.slug}?page=1`}>
                  <BlueButton text="Read&nbsp;more" />
                </Link>
              </div>
            </div>
            <div
              className="lg:max-w-[30%] xl:max-w-[50%] relative mt-10 xl:mt-0"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-easing="linear"
              data-aos-delay="200"
              data-aos-offset="100"
            >
              <Image
                className="w-full rounded-2xl"
                src={imagePath}
                width={531}
                height={486}
                alt={focusArticleData.title}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FocusArticle;
