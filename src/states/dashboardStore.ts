import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { DashboardData, IActionReel } from '@/types/Dashboard.type';
import {
  filterRatingData,
  transformRatingData,
} from '@/app/utils/dashboardHelper';

export interface DashboardState {
  data: DashboardData | null;
  fetchStatus: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

// Define the state shape for the dashboard
export const dashboardDataAtom = atom<DashboardState>({
  data: null,
  fetchStatus: 'idle',
  errorMessage: null,
});

const dummyActionReels: IActionReel[] = [
  {
    playback_id: 'gztxhJtnd7o5lL02zkX3VF01UqoH7EcWwnU5wNqVuFHKg',
    title: "Oscar Gasga's Long-Range Screamer",
    description:
      'Oscar Gasga unleashes a powerful shot from 30 yards out, finding the top corner and leaving the goalkeeper rooted to the spot.',
    home_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/vsa-logo.svg',
    away_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
  },
  {
    playback_id: 'bKxhJtnd7o5lL02zkX3VF01UqoH7EcWwnU5wNqVuFHLm',
    title: "Oscar Gasga's Brilliant Free-Kick",
    description:
      'Oscar Gasga curls a perfect free-kick over the wall and into the net, showcasing his exceptional technical ability.',
    home_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/vsa-logo.svg',
    away_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
  },
  {
    playback_id: 'fRtxhJtnd7o5lL02zkX3VF01UqoH7EcWwnU5wNqVuFHPq',
    title: "Oscar Gasga's Skillful Assist",
    description:
      'Oscar Gasga dribbles past two defenders with a clever nutmeg, then delivers a pinpoint cross for his teammate to head home.',
    home_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/vsa-logo.svg',
    away_club_logo:
      'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/stellar-fc-logo.svg',
  },
];

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Function to fetch dashboard data from the API
async function fetchDashboardData(
  cardId: string,
  set: (value: DashboardState) => void,
) {
  set({
    data: null,
    fetchStatus: 'loading',
    errorMessage: null,
  });

  try {
    const response = await fetch(`${baseURL}/dashboard/${cardId}`);
    if (!response.ok) {
      throw new Error('Data load error. Please try again.');
    }
    const data = await response.json();
    // Transform the fetched data into the desired shape
    const dataObject: DashboardData = {
      latestMatch: data.result.past_matches
        ? data.result.past_matches[0]
        : null,
      latestPlayerRating: data.result.player_ratings
        ? transformRatingData(
            data.result.player_ratings[0],
            data.result.is_goalkeeper,
          )
        : null,
      playerRatings: data.result.player_ratings
        ? filterRatingData(
            data.result.player_ratings,
            data.result.is_goalkeeper,
          )
        : null,
      matchesList: data.result.past_matches,
      playerProfile: data.result,
      teammates: data.result.teammates,
      isGoalkeeper: data.result.is_goalkeeper,
      seasonHighlights: data.result.season_highlights,
      topActionReels: dummyActionReels,
    };
    // Update the state with the fetched data
    set({
      data: dataObject,
      fetchStatus: 'success',
      errorMessage: null,
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    set({
      data: null,
      fetchStatus: 'error',
      errorMessage: 'Data load error. Please try again.',
    });
  }
}
// Custom hook to use the dashboard data in a component
export function useDashboardData(cardId: string) {
  // Use jotai's useAtom to manage the state
  const [dashboardData, setDashboardData] = useAtom(dashboardDataAtom);
  // Fetch the dashboard data whenever the cardId changes
  useEffect(() => {
    if (cardId) {
      fetchDashboardData(cardId, setDashboardData);
    }
  }, [cardId]);
  // Return the current state of the dashboard data
  return { dashboardData };
}
