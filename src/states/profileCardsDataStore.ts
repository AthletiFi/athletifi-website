import { atom } from 'jotai';
import { userDataAtom } from '@/states/userStore';

// Base URL for API calls
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Parameterized atom to fetch dashboard data
// This atom takes a slug as a parameter and returns an atom
// The atom's read function fetches the dashboard data for the given slug from the API
export const dashboardDataAtom = (slug: string) =>
  atom(async () => {
    // Fetch the dashboard data from the API
    const response = await fetch(`${baseURL}/dashboard/${slug}`);
    // Parse the response as JSON
    const data = await response.json();
    // Return the data
    return data;
  });

// Atom to fetch owned cards data
// This atom's read function fetches the data for all the dashboards owned by the user
export const ownedCardsDataAtom = atom(async (get) => {
  // Get the user's data
  const userData = get(userDataAtom);
  // Get the slugs of the owned dashboards
  const ownedCardSlugs = Array.isArray(userData?.data?.owned_cards)
    ? userData?.data?.owned_cards
    : [];
  // Fetch the data for each owned dashboard
  return await Promise.all(
    ownedCardSlugs.map(async (card) => {
      if (card.dashboard_slug) {
        const dashboardData = await get(dashboardDataAtom(card.dashboard_slug));
        return {
          ...dashboardData,
          ownedCardInfo: card,
          // email: userData?.data?.email,
        };
      } else {
        return {
          ownedCardInfo: card,
        };
      }
    }),
  );
});

// Atom to fetch guest cards data
// This atom's read function fetches the data for all the dashboards where the user is a guest
export const guestCardsDataAtom = atom(async (get) => {
  // Get the user's data
  const userData = get(userDataAtom);
  // Get the guest cards
  const guestCards = Array.isArray(userData?.data?.guest_cards)
    ? userData?.data?.guest_cards
    : [];
  // Fetch the data for each guest dashboard and include the guest card info and guest's email
  return await Promise.all(
    guestCards.map(async (card) => {
      if (card.dashboard_slug) {
        const dashboardData = await get(dashboardDataAtom(card.dashboard_slug));
        return {
          ...dashboardData,
          guestCardInfo: card,
          email: userData?.data?.email,
        };
      } else {
        return {
          ownedCardInfo: card,
        };
      }
    }),
  );
});
