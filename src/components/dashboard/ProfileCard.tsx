import React from 'react';

interface ProfileProps {
  age: number;
  club: string;
  league: string;
  teamName: string;
  ageGroup: string;
  gender: string;
  coach: string;
}

const Profile: React.FC<ProfileProps> = ({
  age,
  club,
  league,
  teamName,
  ageGroup,
  gender,
  coach,
}: ProfileProps) => {
  return (
    <div className="w-full h-[500px] bg-cardsBackground rounded-10 p-4 mb-4 font-sourceSansPro overflow-scroll">
      <h2 className="text-primary text-[24px] mb-4 font-semibold">Profile</h2>
      <table className="text-primary w-full divide-y divide-gray-200">
        <tbody className="font-extralight text-base">
          <tr className="border-b border-partnersBorders ">
            <td className="text-left py-1.5">Age</td>
            <td className="text-right">{age}</td>
          </tr>
          <tr className="border-b border-partnersBorders py-4">
            <td className="text-left py-1.5">Club</td>
            <td className="text-right">{club}</td>
          </tr>
          <tr className="border-b border-partnersBorders py-4">
            <td className="text-left py-1.5">League</td>
            <td className="text-right ">{league}</td>
          </tr>
          <tr className="border-b border-partnersBorders">
            <td className="text-left py-1.5">Team name</td>
            <td className="text-right">{teamName}</td>
          </tr>
          <tr className="border-b border-partnersBorders">
            <td className="text-left py-1.5">Age group</td>
            <td className="text-right">{ageGroup}</td>
          </tr>
          <tr className="border-b border-partnersBorders">
            <td className="text-left py-1.5">Gender</td>
            <td className="text-right">{gender}</td>
          </tr>
          <tr>
            <td className="text-left py-1.5">Coach</td>
            <td className="text-right">{coach}</td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-primary text-md mt-6 mb-px">Bio</h3>
      <p className="text-primary font-extralight text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
        <br />
        Volutpat est velit egestas dui id ornare arcu.
      </p>
    </div>
  );
};

export default Profile;
