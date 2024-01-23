// LatestNews.tsx

// This component displays the latest news articles on the homepage.
// It fetches data from the Strapi CMS and renders it in a list format.

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import BlueButton from '../common/BlueButton';

interface NewsProps {
  allNewsList: any;
}

const LatestNews: React.FC<NewsProps> = props => {
  const { allNewsList } = props;
  const DataArray = allNewsList.data;
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(
    allNewsList.meta.pagination.pageCount
  );

  // Calculate the start and end indexes of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = DataArray.slice(startIndex, endIndex);

  return (
    <>
      <div className="py-14 md:py-0 relative before:content-[''] before:absolute sm:before:w-[448px] before:w-[248px] sm:before:h-[448px] before:h-[248px] before:top-0 before:left-0 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-translate-x-1/4 before:z-0 before:rounded-full after:content-[''] after:absolute sm:after:w-[448px] sm:after:h-[448px] after:w-[248px] after:h-[248px] after:bottom-20 after:right-0 after:bg-shadow_blue after:blur-[111px] after:opacity-25 after:translate-x-1/4 after:z-0 after:rounded-full">
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto relative z-10">
          <h2
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-easing="linear"
            data-aos-delay="100"
            data-aos-offset="200"
            className="text-center font-HelveticaNeueMedium font-medium lg:text-5xl md:text-[40px] text-[26px] text-primary md:py-10 pb-5"
          >
            <span className="relative after:content after:absolute after:bottom-[-6px] md:after:bottom-[-2px] after:left-0 md:after:w-[209px] after:w-[150px] after:h-2 after:bg-blue-underline after:bg-contain after:bg-no-repeat">
              Latest News
            </span>
          </h2>
          {displayedItems.map((val: any, index: any) => {
            return (
              <Link href={`/news/${val.slug}?page=1`} key={val.id}>
                <div
                  className="flex md:flex-row flex-col lg:p-8 p-6 bg-darkgray lg:gap-x-12 sm:gap-7 gap-3 rounded-[20px] mb-6 sm:mt-5  "
                  data-aos="fade-up"
                  data-aos-duration="400"
                  data-aos-easing="ease"
                  data-aos-delay={val.delay}
                  key={index}
                >
                  <Image
                    className="md:w-[315px] max-h-[244px] rounded-[10px] object-cover w-full"
                    src={`https://vidalco.in${val.image.url}`}
                    width={315}
                    height={240}
                    alt="football match"
                  />
                  <div className="sm:pt-0 pt-3">
                    {/* NEWS HEADING */}
                    <h3 className="sm:text-basemd text-[18px] text-primary font-HelveticaNeueMedium leading-[140%]">
                      {val.title}{' '}
                    </h3>
                    <div className="flex sm:items-center sm:flex-row flex-col sm:gap-3 gap-2 pt-2">
                      <h4 className="lg:pe-3 ">
                        <span className="lg:text-md text-base text-primary font-Segoe opacity-80 font-normal lg:pe-2 pe-1">
                          by
                        </span>{' '}
                        <span className="lg:text-base text-sm text-primary font-Segoe font-semibold">
                          {val.author.fullName}
                        </span>
                      </h4>
                      {/* NEWS CATEGORY */}
                      {val.categories.map((obj: any, i: any) => {
                        return (
                          <span key={i} className="flex gap-x-3">
                            <button className="lg:text-base md:text-[13px] text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-[10px] sm:px-[18px] bg-matchtitles rounded-full leading-[150%] duration-300 hover:text-white">
                              {obj.title}
                            </button>
                          </span>
                        );
                      })}
                    </div>
                    {/* NEWS DATA */}
                    <p className="sm:text-md text:base text-primary opacity-80 font-Segoe leading-[150%] sm:pt-6 pt-3 lg:pe-14 sm:pe-4">
                      {val.previewSummary}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* <div className="flex justify-between lg:max-w-[210px] py-3  max-w-[230px] mx-auto bg-darkgray rounded-full lg:px-8 px-6 items-center scroll--hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? " opacity-70 cursor-not-allowed" : ""
              } -rotate-90 hover:-translate-x-1 duration-200`}
            >
              <PaginationArrow />
            </button>
            <div className="text-white">
              <span>{currentPage}</span>
              <span className="text-white px-3">of</span>
              <span>{totalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? " opacity-70 cursor-not-allowed"
                  : ""
              } rotate-90 hover:translate-x-1 duration-200 `}
            >
              <PaginationArrow />
            </button>
          </div> */}

          <div className="flex justify-center items-center pt-10 md:pb-14 lg:mb-10 ">
            <Link href="/news?page=1">
              <BlueButton text="View all" />
            </Link>
          </div>
        </div>
        {/* BACKGROUND RIGHT GRID */}
        <Image
          className="xl:w-[600px] lg:[550px] sm:w-[400px] w-[250px] absolute bottom-10 right-[-50px] -z-10"
          src="/assets/img/svg/grid-lines.svg"
          width={716}
          height={692}
          alt=""
        />
        {/* BACKGROUND LEFT GRID */}
        <Image
          className="xl:w-[606px] lg:[550px] sm:w-[400px] w-[250px] absolute top-40 -translate-y-1/3 left-2 -z-10"
          src="/assets/img/svg/grid-lines.svg"
          width={716}
          height={692}
          alt=""
        />
      </div>
    </>
  );
};

export default LatestNews;
