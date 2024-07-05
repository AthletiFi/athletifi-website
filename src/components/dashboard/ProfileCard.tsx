import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'next/navigation';
import { useDashboardData } from '@/states/dashboardStore';

const Profile: React.FC = () => {
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  const { dashboardData } = useDashboardData(cardIdValue);
  const profile = dashboardData.data?.playerProfile;
  return (
    <>
      {profile ? (
        <div className="w-full h-[560px] bg-cardsBackground rounded-10 p-4 my-4 lg:my-0 lg:-mt-[100px] flex flex-col tracking-wide">
          <h2 className="text-primary text-[24px] mb-4 font-semibold">
            Profile
          </h2>
          <table className="text-primary w-full divide-y divide-gray-200">
            <tbody className="font-light text-base">
              {profile.age && (
                <tr className="border-b border-partnersBorders">
                  <td className="text-left py-2 px-[4px]">Age</td>
                  <td className="text-right min-w-24 px-[4px]">
                    {profile.age}
                  </td>
                </tr>
              )}
              {profile.club && (
                <tr className="border-b border-partnersBorders">
                  <td className="text-left py-2 px-[4px]">Club</td>
                  <td className="text-right px-[4px]">{profile.club}</td>
                </tr>
              )}
              {profile.league && (
                <tr className="border-b border-partnersBorders">
                  <td className="text-left py-2 px-[4px]">League</td>
                  <td className="text-right px-[4px]">{profile.league}</td>
                </tr>
              )}
              {profile.team && (
                <tr className="border-b border-partnersBorders">
                  <td className="text-left py-2 px-[4px]">Team name</td>
                  <td className="text-right px-[4px]">{profile.team}</td>
                </tr>
              )}
              {profile.age_group && (
                <tr className="border-b border-partnersBorders">
                  <td className="text-left py-2 px-[4px]">Age group</td>
                  <td className="text-right px-[4px]">{profile.age_group}</td>
                </tr>
              )}
              {profile.gender && (
                <tr className="border-b border-partnersBorders">
                  <td className="text-left py-2 px-[4px]">Gender</td>
                  <td className="text-right px-[4px]">{profile.gender}</td>
                </tr>
              )}
              {profile.coach && (
                <tr>
                  <td className="text-left py-2 px-[4px]">Coach</td>
                  <td className="text-right px-[4px]">{profile.coach}</td>
                </tr>
              )}
            </tbody>
          </table>
          {profile.bio && (
            <>
              <h3 className="text-primary text-[20px] mt-6 mb-2 w-full">Bio</h3>
              <div className="h-full overflow-y-auto mb-4">
                <p className="text-primary font-light text-base">
                  {profile.bio}
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="lg:-mt-[86px]">
          <Skeleton
            className="min-w-[351px] md:min-w-[626px] lg:min-w-[387px] min-h-[584px] mb-3"
            borderRadius={10}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
