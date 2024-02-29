import React from 'react';
import PastMatches from './PastMatches';
import Teammates from './Teammates';

const teammates = [
  {
    id: 1,
    name: 'David Rodriguez',
    avatar: '/vecteezy_male-3d-avatar_27245487.png',
    playerNumber: 10,
  },
  {
    id: 2,
    name: 'Sophia Nguyen',
    avatar: '/vecteezy_male-3d-avatar_27245487.png',
    playerNumber: 7,
  },
  {
    id: 3,
    name: 'Liam Wilson',
    avatar: '/vecteezy_male-3d-avatar_27245487.png',
    playerNumber: 22,
  },
  {
    id: 4,
    name: 'Isabella Garcia',
    avatar: '/vecteezy_male-3d-avatar_27245487.png',
    playerNumber: 14,
  },
];

const PastMatchesLayout: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] bg-opacity-95 ">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full p-4 md:p-6  max-w-[1030px]">
        <PastMatches />
        <Teammates teammates={teammates} />
      </div>
    </div>
  );
};

export default PastMatchesLayout;
