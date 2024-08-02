'use client';

import type { NextPage } from 'next';
// import { useParams, notFound } from 'next/navigation';
// import { useState, useEffect } from 'react';

import Charts from '@/components/dashboard/Charts';
import Footer from '@/components/common/Footer';
import HeroBanner from '@/components/dashboard/HeroBanner';
import LatestMatch from '@/components/dashboard/LatestMatchCard';
import PastMatchesLayout from '@/components/dashboard/PastMatchesLayout';
import Profile from '@/components/dashboard/ProfileCard';
import SeasonSection from '@/components/dashboard/SeasonSectionLayout';
import BackToTop from '@/components/common/BackToTop';
import DashboardFetchError from '@/components/dashboard/DashboardFetchError';
import { useDashboardData } from '@/states/dashboardStore';
import { useParams } from 'next/navigation';
import { sourceSans3 } from '@/app/utils/helpers';

interface PageProps {
  params: { cardId: string | number };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const PlayerDashboardPage: NextPage<PageProps> = () => {
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  const { fetchStatus, errorMessage } =
    useDashboardData(cardIdValue).dashboardData;

  return (
    <div className={`overflow-hidden ${sourceSans3.className}`}>
      {fetchStatus === 'error' ? (
        <DashboardFetchError message={errorMessage} />
      ) : (
        <>
          <div className="bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] flex justify-center w-full border-collapse">
            <HeroBanner />
          </div>
          <div className="flex justify-center w-full">
            <div className="w-full flex flex-col py-3 lg:py-2 mt-2 max-w-[650px] lg:max-w-[1130px] lg:grid md:grid-cols-11 lg:items-end">
              <div className="mx-3 lg:col-start-8 lg:col-span-4 lg:my-2 lg:ml-0 lg:mr-6 order-1 lg:order-3">
                <Profile />
              </div>
              <div className="mb-4 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-2 lg:order-1">
                <LatestMatch />
              </div>
              <div className="mb-3 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-3 lg:order-2">
                <Charts />
              </div>
            </div>
          </div>
          <main className="w-full px-4 flex flex-col items-center bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] bg-opacity-95">
            <SeasonSection />
            <span className="h-px bg-partnersBorders w-full max-w-[1130px] my-8 md:my-4" />
            <PastMatchesLayout />
          </main>
          <BackToTop />
          <Footer />
        </>
      )}
    </div>
  );
};

export default PlayerDashboardPage;
