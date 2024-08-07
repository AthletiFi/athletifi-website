import 'server-only';

import {
  AuthData,
  NotificationPreferences,
  NotificationTypes,
  UserData,
  emptyNotifications,
} from '@/types/User.type';

const userDataUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/userData`;

function transformNotificationPreferences(dataArray: NotificationTypes[]) {
  const tmp = { ...emptyNotifications };
  dataArray.map((item: keyof NotificationPreferences) => {
    tmp[item] = true;
  });
  return tmp;
}

export async function getUserData({
  userId,
  name,
  email,
}: AuthData): Promise<UserData | null> {
  try {
    const fetchUrl = `${userDataUrl}?amplify_id=${userId}`;
    const response = await fetch(fetchUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
      } as HeadersInit,
      next: {
        tags: ['userData'],
      },
      cache: 'force-cache',
    });

    const responseJson = await response.json();
    if (responseJson.message !== 'Success') {
      return null;
    }

    const userData = responseJson.result;

    const dataObject: UserData = {
      amplify_id: userId,
      name: name as string,
      email: email as string,
      init_notifications: userData.init_notifications,
      notifications:
        userData.notifications_enabled.length > 0
          ? transformNotificationPreferences(userData.notifications_enabled)
          : emptyNotifications,
      user_delete_status: userData.delete_status,
      owned_cards: userData.owned_cards,
      guest_cards: userData.guest_cards,
      invites: userData.invites,
    };
    console.log('dataObject %s', JSON.stringify(dataObject));

    return dataObject;
  } catch (error) {
    console.error('getUserData error: %s', error);
    return null;
  }
}
