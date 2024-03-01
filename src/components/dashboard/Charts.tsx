import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMediaQuery } from '@/app/utils/useMediaQuery';

import StatsBarChart from '@/components/dashboard/BarChart';
import StatsLineChart from '@/components/dashboard/LineChart';

const Tab = styled.button<{ $primary?: boolean; $active?: boolean }>`
  width: 100%;
  border-radius: ${(props) => (props.$primary ? '10px 0 0 0' : '0 10px 0 0')};
  color: white;
  font-size: 14px;
  padding: 14px 0px;
  cursor: pointer;
  background: rgb(3, 36, 54);
  border: 0;
  border-bottom: 1px solid gray;
  outline: 0;
  ${(props) =>
    props.$active &&
    `
  font-weight: bold;
  background: rgba(17, 52, 72, 0);
  text-decoration: underline;
`}
`;
const ButtonGroup = styled.div`
  display: flex;
`;

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

const Charts = () => {
  const [activeTab, setActiveTab] = useState(tabInfo[0].type);
  const isMobile = useMediaQuery('(max-width: 850px)');

  return (
    <div className="stats-chart__container bg-cardsBackground">
      <ButtonGroup>
        {tabInfo.map((tab, idx) => {
          return (
            <Tab
              $primary={idx === 0}
              $active={activeTab === tab.type}
              key={`${tab.title}-${idx}`}
              onClick={() => setActiveTab(tab.type)}
            >
              <div className="flex justify-center w-full">
                <div className="px-3">{tab.title}</div>
                <Image
                  alt="bar chart icon"
                  src={tab.icon}
                  width={isMobile ? 13 : 17}
                  height={isMobile ? 13 : 17}
                  quality={75}
                  loading="lazy"
                  className={`stats-chart__icon--white ${tab.type === 'latest' ? 'stats-chart__icon--rotate90' : ''}`}
                />
              </div>
            </Tab>
          );
        })}
      </ButtonGroup>
      <section className="flex flex-col items-start h-full gap-5 pt-6">
        {activeTab === tabInfo[0].type ? <StatsBarChart /> : <StatsLineChart />}
      </section>
    </div>
  );
};

export default Charts;
