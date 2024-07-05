import { atomWithStorage } from 'jotai/utils';
import { useState, useEffect } from 'react';
import {
  UserData,
  allNotificationsEnabled,
  NotificationTypes,
  NotificationPreferences,
  emptyNotifications,
  LatestChange,
  emptyLatestChange,
} from '@/types/User.type';
import { getCurrentUser } from 'aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import handleFetchUserAttributes from '@/app/utils/auth/handleFetchUserAttributes';
import handlePostSignIn from '@/app/utils/auth/handlePostSignIn';
import {
  atom,
  WritableAtom,
  PrimitiveAtom,
  useAtom,
  SetStateAction,
} from 'jotai';

export interface UserState {
  data: UserData | null;
  fetchStatus: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

// Define the state shape for the user
export const userDataAtom = atom<UserState>({
  data: null,
  fetchStatus: 'idle',
  errorMessage: null,
});

// Define a function to check if the code is running in a browser environment
const isBrowser = () => typeof window !== 'undefined';

// Custom storage object with expiration
const createStorageWithExpiration = (storage: Storage, expiration: number) => ({
  getItem: (key: string) => {
    if (!isBrowser()) return null; // Ensure storage is accessed only on the client side
    const item = storage.getItem(key);
    if (item) {
      const { value, expiration: itemExpiration } = JSON.parse(item);
      if (itemExpiration && itemExpiration < Date.now()) {
        storage.removeItem(key);
        return null;
      }
      return value;
    }
    return null;
  },
  setItem: (key: string, value: string | null) => {
    if (!isBrowser()) return; // Ensure storage is accessed only on the client side
    const item = {
      value,
      expiration: expiration ? Date.now() + expiration : null,
    };
    storage.setItem(key, JSON.stringify(item));
  },
  removeItem: (key: string) => {
    if (!isBrowser()) return; // Ensure storage is accessed only on the client side
    storage.removeItem(key);
  },
});
// export const postHelperResponseAtom = atom<any, any, void>(
//   (get) => get(postHelperResponseAtom),
//   (get, set, update) => set(postHelperResponseAtom, update),
// );
export const postHelperResponseAtom = atom<
  ((value: SetStateAction<UserState>) => void) | null
>(null);
//TODO: replace the any type with the actual type of the response from the postHelper function
// Define `inviteIdAtom` differently based on environment

export let inviteIdAtom:
  | WritableAtom<string | null, [string | null], void>
  | PrimitiveAtom<string | null>;

// Define `redirectUrlAtom` differently based on environment
export let redirectAtom:
  | WritableAtom<string | null, [string | null], void>
  | PrimitiveAtom<string | null>;

if (isBrowser()) {
  const expirationInMs = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
  const storage = createStorageWithExpiration(localStorage, expirationInMs);

  // atomWithStorage accepts a storage interface and utilizes a tuple for updates
  inviteIdAtom = atomWithStorage<string | null>('inviteId', null, storage);
  redirectAtom = atomWithStorage<string | null>('redirectUrl', null, storage);
} else {
  // Simple atom that only stores a value without complex updates.
  inviteIdAtom = atom<string | null>(null);
  redirectAtom = atom<string | null>(null);
}

function transformNotificationPreferences(dataArray: NotificationTypes[]) {
  const tmp = { ...emptyNotifications };
  dataArray.map((item: keyof NotificationPreferences) => {
    tmp[item] = true;
  });
  return tmp;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Function to fetch user data from the API
async function fetchUserData(
  currState: UserState,
  set: (value: UserState) => void,
  inviteId: string | null,
  setPostHelperResponse: (value: SetStateAction<UserState>) => void, // Specify the type of value as SetStateAction<UserState>
) {
  let amplify_id, userAttributes, auth_method;
  if (currState.data) {
    // Use existing authenticated user details
    amplify_id = currState.data.amplify_id;
    auth_method = currState.data.auth_method;
    userAttributes = {
      name: currState.data.name,
      email: currState.data.email,
      email_verified: currState.data.email_verified,
    };
  } else {
    // Get authenticated user
    try {
      const user = await getCurrentUser();
      amplify_id = user.username;

      if (
        amplify_id.split('_').length > 1 &&
        (amplify_id.split('_')[0] === 'google' ||
          amplify_id.split('_')[0] === 'facebook')
      ) {
        auth_method = amplify_id.split('_')[0];
      } else {
        auth_method = 'email';
      }

      userAttributes = await handleFetchUserAttributes();

      const postData = await handlePostSignIn(userAttributes, inviteId);
      setPostHelperResponse(postData);
    } catch (err) {
      console.warn('User is currently not logged in. Skipping userData fetch');
      return;
    }
  }

  set({
    data: amplify_id === currState.data?.amplify_id ? currState.data : null,
    fetchStatus: 'loading',
    errorMessage: null,
  });

  try {
    const response = await fetch(`${baseURL}/user?amplify_id=${amplify_id}`);
    if (!response.ok) {
      throw new Error('Data load error. Please try again.');
    }

    const data = await response.json();

    const dataObject: UserData = {
      amplify_id: amplify_id,
      auth_method: auth_method,
      name: userAttributes.name as string,
      email: userAttributes.email as string,
      email_verified: userAttributes.email_verified as string,
      init_notifications: data.result.init_notifications,
      notifications:
        data.result.notifications_enabled.length > 0
          ? transformNotificationPreferences(data.result.notifications_enabled)
          : emptyNotifications,
      user_delete_status: data.result.delete_status,
      owned_cards: data.result.owned_cards,
      guest_cards: data.result.guest_cards,
      invites: data.result.invites,
    };
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

enum AuthEvents {
  SignIn = 'signIn',
  SignOut = 'signOut',
  SignUp = 'signUp',
  SignInFailure = 'signIn_failure',
  TokenRefresh = 'tokenRefresh',
  TokenRefreshFailure = 'tokenRefresh_failure',
  CustomOAuthState = 'customOAuthState',
  SignedIn = 'signedIn',
  SignedOut = 'signedOut',
  SignInWithRedirect = 'signInWithRedirect',
  SignInWithRedirectFailure = 'signInWithRedirect_failure',
}

// Custom hook to use the user data in a component
export function useUserData() {
  // Use jotai's useAtom to manage the state
  const [userData, setUserData] = useAtom(userDataAtom);

  const [latestChange, setLatestChange] =
    useState<LatestChange>(emptyLatestChange);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inviteId, setInviteId] = useAtom(inviteIdAtom);
  const [, setPostHelperResponse] = useAtom(postHelperResponseAtom);

  // Remove invite_id from localStorage when user logs out
  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event } }) => {
      if (event === AuthEvents.SignedOut) {
        setInviteId(null); // This will remove invite_id from localStorage
        setPostHelperResponse(null);
      }
    });

    return unsubscribe;
  }, [setInviteId]);

  // Fetch the user data whenever the amplify_id changes
  useEffect(() => {
    fetchUserData(
      userData,
      setUserData,
      inviteId,
      setPostHelperResponse as (value: SetStateAction<UserState>) => void,
    );
  }, [isLoggedIn, inviteId]);

  useEffect(() => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const postHelper = async (
      amplify_id: string,
      notification_types: string[],
    ) => {
      const response = await fetch(`${baseURL}/user`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          amplify_id: amplify_id,
          notification_type: notification_types[0],
        }),
      });
      const data = await response.json();
      return data;
    };

    const deleteHelper = async (
      amplify_id: string,
      notification_types: string[],
    ) => {
      const response = await fetch(
        `${baseURL}/user?amplify_id=${amplify_id}&notification_types=${JSON.stringify(notification_types)}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      const data = await response.json();
      return data;
    };

    if (userData.data?.amplify_id && latestChange.notification_types) {
      if ((latestChange.notification_types as string[])[0] === 'All') {
        if (latestChange.value) {
          postHelper(
            userData.data?.amplify_id,
            latestChange.notification_types,
          ).then(() => {
            setUserData({
              ...userData,
              data: {
                ...(userData.data as UserData),
                notifications: allNotificationsEnabled,
              },
            });
          });
        } else {
          deleteHelper(
            userData.data?.amplify_id,
            Object.keys(emptyNotifications),
          ).then(() => {
            setUserData({
              ...userData,
              data: {
                ...(userData.data as UserData),
                notifications: emptyNotifications,
              },
            });
          });
        }
      } else {
        if (latestChange.value) {
          postHelper(
            userData.data?.amplify_id,
            latestChange.notification_types,
          ).then(() => {
            // Manually construct updated userData state object after POST
            setUserData({
              ...userData,
              data: {
                ...(userData.data as UserData),
                notifications: {
                  ...(userData.data?.notifications as NotificationPreferences),
                  [(latestChange.notification_types as string[])[0]]: true,
                },
              },
            });
          });
        } else if (latestChange.value === false) {
          deleteHelper(
            userData.data?.amplify_id,
            latestChange.notification_types,
          ).then(() => {
            // Build object with update notification preferences
            const updateArray = (
              latestChange.notification_types as string[]
            ).map((key) => {
              return {
                [key]: false,
              };
            });
            const updateObject = Object.assign({}, ...updateArray);
            // Manually construct updated userData state object after DELETE
            setUserData({
              ...userData,
              data: {
                ...(userData.data as UserData),
                notifications: {
                  ...(userData.data?.notifications as NotificationPreferences),
                  ...updateObject,
                },
              },
            });
          });
        }
      }
    }
  }, [latestChange]);

  function resetUserDataState() {
    setUserData({
      data: null,
      fetchStatus: 'idle',
      errorMessage: null,
    });
  }

  // Return the current state of the user data
  return {
    userData: userData,
    setLatestChange: setLatestChange,
    setIsLoggedIn: setIsLoggedIn,
    resetUserDataState: resetUserDataState,
  };
}
