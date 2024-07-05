import { IActionReel, IMatchDataExtended } from '@/types/Dashboard.type';

export const transformMatchesToActionReels = (
  matchesList: IMatchDataExtended[],
): IActionReel[] => {
  return matchesList.map((match) => ({
    playback_id: match.playback_id,
    title: `Highlight from ${match.datetime}`,
    description: `${match.home_club} vs ${match.away_club}`,
    home_club_logo: match.home_club_logo,
    away_club_logo: match.away_club_logo,
  }));
};
