// LatestBlogs.tsx

// This component displays the latest blogs articles on the homepage.
// It fetches data from the Strapi CMS and renders it in a list format.
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import BlueButton from '@/components/common/BlueButton';
import { BlogsProps, BlogsArticle, Category } from '@/types/Blogs.type';

const AOS_DURATION: number = 400;
const AOS_DELAY: number = 100;
const AOS_OFFSET: number = 200;
const EXTERNAL_IMG_WIDTH: number = 315;
const EXTERNAL_IMG_HEIGHT: number = 240;
const GRID_IMAGE_WIDTH: number = 716;
const GRID_IMAGE_HEIGHT: number = 692;

const LatestBlogs = ({ allBlogsList }: BlogsProps) => {
  const DataArray = allBlogsList.data;
  const itemsPerPage = 3;
  const [currentPage] = useState<number>(
    allBlogsList.meta.pagination.pageCount,
  );

  // Calculate the start and end indexes of the current page
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const displayedItems: BlogsArticle[] = DataArray.slice(startIndex, endIndex);

  return (
    <>
      <div className="py-14 md:py-0 relative before:content-[''] before:absolute sm:before:w-448 before:w-248 sm:before:h-448 before:h-248 before:top-0 before:left-0 before:bg-shadow_blue before:blur-111 before:opacity-25 before:-translate-x-1/4 before:z-0 before:rounded-full after:content-[''] after:absolute sm:after:w-448 sm:after:h-448 after:w-248 after:h-248 after:bottom-20 after:right-0 after:bg-shadow_blue after:blur-111 after:opacity-25 after:translate-x-1/4 after:z-0 after:rounded-full">
        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto relative z-10">
          <h2
            data-aos="fade-up"
            data-aos-duration={AOS_DURATION}
            data-aos-easing="linear"
            data-aos-delay={AOS_DELAY}
            data-aos-offset={AOS_OFFSET}
            className="text-center font-HelveticaNeueMedium font-medium lg:text-5xl md:text-lg2xl text-basemd text-primary md:py-10 pb-5"
          >
            <span className="relative after:content after:absolute after:bottom--6 md:after:bottom--2 after:left-0 md:after:w-209 after:w-150 after:h-2 after:bg-contain after:bg-no-repeat">
              Latest Blogs
            </span>
          </h2>
          {displayedItems.map((val: BlogsArticle, index: number) => {
            return (
              <Link href={`/blogs/${val.slug}?page=1`} key={val.id}>
                <div
                  className="flex md:flex-row flex-col lg:p-8 p-6 bg-darkgray lg:gap-x-12 sm:gap-7 gap-3 rounded-20 mb-6 sm:mt-5  "
                  data-aos="fade-up"
                  data-aos-duration={AOS_DURATION}
                  data-aos-easing="ease"
                  data-aos-delay="200"
                  key={index}
                >
                  <Image
                    className="md:w-315 max-h-244 rounded-10 object-cover w-full"
                    src={`https://vidalco.in${val.image.url}`}
                    width={EXTERNAL_IMG_WIDTH}
                    height={EXTERNAL_IMG_HEIGHT}
                    alt="football match"
                    quality={75}
                    loading="lazy"
                  />
                  <div className="sm:pt-0 pt-3">
                    {/* NEWS HEADING */}
                    <h3 className="sm:text-basemd text-md text-primary font-HelveticaNeueMedium leading-140">
                      {val.title}{' '}
                    </h3>
                    <div className="flex sm:items-center sm:flex-row flex-col sm:gap-3 gap-2 pt-2">
                      <h4 className="lg:pe-3">
                        <span className="lg:text-md text-base text-primary font-Segoe opacity-80 font-normal lg:pe-2 pe-1">
                          by
                        </span>{' '}
                        <span className="lg:text-base text-sm text-primary font-Segoe font-semibold">
                          {val.author.fullName}
                        </span>
                      </h4>
                      {/* NEWS CATEGORY */}
                      {val.categories.map((obj: Category, i: number) => {
                        return (
                          <span key={i} className="flex gap-x-3">
                            <button className="lg:text-base md:text-xxs text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-10pixel sm:px-18pixel bg-matchtitles rounded-full leading-150 duration-300 hover:text-primary">
                              {obj.title}
                            </button>
                          </span>
                        );
                      })}
                    </div>
                    {/* NEWS DATA */}
                    <p className="sm:text-md text:base text-primary opacity-80 font-Segoe leading-150 sm:pt-6 pt-3 lg:pe-14 sm:pe-4">
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
            <Link href="/blogs?page=1">
              <BlueButton text="View all" />
            </Link>
          </div>
        </div>
        {/* BACKGROUND RIGHT GRID */}
        <Image
          className="xl:w-600 lg:w-550 sm:w-400 w-250 absolute bottom-10 right--50 -z-10"
          src="/assets/img/svg/grid-lines.svg"
          width={GRID_IMAGE_WIDTH}
          height={GRID_IMAGE_HEIGHT}
          alt=""
          quality={75}
          loading="lazy"
        />
        {/* BACKGROUND LEFT GRID */}
        <Image
          className="xl:w-600 lg:550 sm:w-400 w-250 absolute top-40 -translate-y-1/3 left-2 -z-10"
          src="/assets/img/svg/grid-lines.svg"
          width={GRID_IMAGE_WIDTH}
          height={GRID_IMAGE_HEIGHT}
          alt=""
          quality={75}
          loading="lazy"
        />
      </div>
    </>
  );
};

export default LatestBlogs;
