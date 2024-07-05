import type { Payload } from 'recharts/types/component/DefaultLegendContent';
import { StaticImageData } from 'next/image';

export type PlayerDashboardProps = {
  params: { cardId: number };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export enum Attributes {
  Skill = 'skill',
  Attacking = 'attacking',
  Goalkeeping = 'goalkeeping',
  Physical = 'physical',
  Mentality = 'mentality',
  Defending = 'defending',
}

export interface IAttributeConfig {
  skill: {
    color: string;
    description: string;
  };
  attacking: {
    color: string;
    description: string;
  };
  goalkeeping: {
    color: string;
    description: string;
  };
  physical: {
    color: string;
    description: string;
  };
  mentality: {
    color: string;
    description: string;
  };
  defending: {
    color: string;
    description: string;
  };
}

export interface IProfileProps {
  name?: string | null;
  number?: string | null;
  age?: number | null;
  club?: string | null;
  club_logo?: string | null;
  league?: string | null;
  team?: string | null;
  age_group?: string | null;
  gender?: string | null;
  coach?: string | null;
  bio?: string | null;
  card_url?: string | StaticImageData | null;
}

export const emptyProfileProps: IProfileProps = {
  name: null,
  number: null,
  age: null,
  club: null,
  club_logo: null,
  league: null,
  team: null,
  age_group: null,
  gender: null,
  coach: null,
  bio: null,
  card_url: null,
};

export interface IRatingRaw {
  rating_date: string;
  skill: string | number;
  attacking_goalkeeping?: string | number;
  attacking?: string | number;
  goalkeeping?: string | number;
  physical: string | number;
  mentality: string | number;
  defending: string | number;
}

export interface IRating {
  attribute: string;
  rating: number;
}

export interface IRatingProps {
  overall_rating?: number | null;
  latest_player_ratings?: IRating[] | null;
  player_ratings?: IRatingRaw[] | null;
  is_goalkeeper?: boolean | null;
  chart_fields?: string[];
}

export interface IBarProps {
  click: Attributes | undefined | null;
  hover: Attributes | undefined | null;
}

export interface ILineProps {
  skill?: boolean;
  attacking?: boolean;
  goalkeeping?: boolean;
  physical?: boolean;
  mentality?: boolean;
  defending?: boolean;
  hover: Attributes | undefined | null;
}

export interface ILegendProps {
  payload?: Payload[];
}

export interface IMatchData {
  match_id?: string | null;
  datetime?: string | null;
  location?: string | null;
  home_club?: string | null;
  home_club_logo?: string | null;
  home_score?: number | null;
  away_club?: string | null;
  away_club_logo?: string | null;
  away_score?: number | null;
}

export interface IMatchDataWithWeather extends IMatchData {
  weather?: {
    date?: string | null;
    location?: string | null;
    precipIn?: number | null;
    precipMm?: number | null;
    weatherIcon?: string | null;
    tempFahr?: number | null;
    tempCelc?: number | null;
  };
}

export interface ILatestMatchProps extends IMatchDataWithWeather {
  player_ratings: IRating[] | null;
}

export const emptyLatestMatchData: IMatchDataWithWeather = {
  match_id: '',
  datetime: null,
  location: null,
  weather: { tempFahr: null, tempCelc: null },
  home_club: null,
  home_club_logo: null,
  home_score: null,
  away_club: null,
  away_club_logo: null,
  away_score: null,
};

export interface IActionReel {
  playback_id: string | null;
  title: string | null;
  description: string | null;
  home_club_logo: string | null;
  away_club_logo: string | null;
}

export const emptyActionReel: IActionReel = {
  playback_id: null,
  title: null,
  description: null,
  home_club_logo: null,
  away_club_logo: null,
};

export interface ITeammate {
  name: string | null;
  number: number | null;
  avatar_url: string | null;
}

export const emptyTeammate: ITeammate = {
  name: null,
  number: null,
  avatar_url: null,
};

export interface ITeammates {
  teammates: ITeammate[] | undefined;
}

export interface IPastMatches {
  past_matches: IMatchDataExtended[] | undefined;
}

export interface IPastMatchesLayoutProps {
  teammates: ITeammate[] | undefined;
  past_matches: IMatchDataExtended[] | undefined;
}

export interface IVideo {
  title: string | null;
  url: string;
  thumbnail: string | null;
  description: string | null;
}

export const emptyVideoData: IVideo = {
  title: null,
  url: '',
  thumbnail: null,
  description: null,
};

export interface IHighlight {
  clip_description: string;
  duration: string;
  start_timestamp: string;
}

export interface IMatchDataExtended extends IMatchDataWithWeather {
  home_club_logo: string | null;
  away_club_logo: string | null;
  home_club: string | null;
  away_club: string | null;
  home_team?: string | null;
  away_team?: string | null;
  home_score: number | null;
  away_score: number | null;
  playback_id: string | null;
  video_key?: string | null;
  highlights: IHighlight[] | null;
  match_summary?: string | null;
}

export const emptyMatchData: IMatchDataExtended = {
  match_id: '',
  home_club_logo: null,
  away_club_logo: null,
  home_club: null,
  away_club: null,
  home_score: null,
  away_score: null,
  datetime: null,
  location: null,
  weather: { tempFahr: null, tempCelc: null },
  playback_id: null,
  highlights: null,
};

export interface ILatestPlayerRatings {
  name: string | null;
  skill: string | null;
  attacking?: string | null;
  goalkeeping?: string | null;
  physical: string | null;
  mentality: string | null;
  defending: string | null;
}

export const emptyLatestPlayerRatings: ILatestPlayerRatings = {
  name: '',
  skill: null,
  attacking: null,
  goalkeeping: null,
  physical: null,
  mentality: null,
  defending: null,
};

export interface DashboardData {
  latestMatch: IMatchDataWithWeather | null;
  latestPlayerRating: IRating[] | null;
  playerRatings: IRatingRaw[] | null;
  matchesList: IMatchDataExtended[] | null;
  playerProfile: IProfileProps | null;
  teammates: ITeammate[] | null;
  isGoalkeeper: boolean | null;
  seasonHighlights: string[] | null;
  topActionReels: IActionReel[] | null;
}

export const emptyDashboardData: DashboardData = {
  latestMatch: null,
  latestPlayerRating: null,
  playerRatings: null,
  matchesList: null,
  playerProfile: null,
  teammates: null,
  isGoalkeeper: null,
  seasonHighlights: null,
  topActionReels: null,
};

export interface ISeasonHighlights {
  seasonHighlights: string[] | null;
}
