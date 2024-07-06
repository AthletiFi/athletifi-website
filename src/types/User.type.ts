export enum NotificationTypes {
  REFERRAL = 'referral_notifications',
  ATHLETIFI = 'athletifi_updates',
  GENERAL = 'general_highlights',
  PLAYER = 'my_player_updates',
}

export const NotificationTitles = [
  { name: 'Referral Notifications', value: 'referral_notifications' },
  { name: 'AthletiFi Updates', value: 'athletifi_updates' },
  { name: 'General Highlights', value: 'general_highlights' },
  { name: 'My Player Updates', value: 'my_player_updates' },
];

export type NotificationPreferences = {
  referral_notifications: boolean;
  athletifi_updates: boolean;
  general_highlights: boolean;
  my_player_updates: boolean;
};

export const emptyNotifications: NotificationPreferences = {
  referral_notifications: false,
  athletifi_updates: false,
  general_highlights: false,
  my_player_updates: false,
};

export const allNotificationsEnabled: NotificationPreferences = {
  referral_notifications: true,
  athletifi_updates: true,
  general_highlights: true,
  my_player_updates: true,
};

export type LatestChange = {
  notification_types: string[] | null;
  value: boolean | null;
};

export const emptyLatestChange: LatestChange = {
  notification_types: [],
  value: null,
};

export const allLatestChange: LatestChange = {
  notification_types: Object.keys(emptyNotifications),
  value: true,
};

export enum DeleteStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export enum ViewDeleteRequestState {
  INIT = 'init',
  CHECK = 'check',
  CONFIRMED = 'confirmed',
}

export type OwnedCards = {
  card_id: string | null;
  card_image_url: string | null;
  dashboard_slug: string | null;
};

export type GuestCards = {
  invite_id: string | null;
  status: string | null;
  card_id: string | null;
  card_image_url: string | null;
  dashboard_slug: string | null;
  inviter_email: string | null;
};
export type Invites = {
  invite_id: string | null;
  guest_email: string | null;
  inviter_email: string | null;
  guest_id: string | null;
  invite_status: string | null;
  card_image_id: string | null;
  card_image_url: string | null;
};

export type UserData = {
  amplify_id: string | null;
  auth_method: string | null;
  name: string | null;
  email: string | null;
  email_verified: string | null;
  init_notifications: boolean | null;
  notifications: NotificationPreferences | null;
  user_delete_status: DeleteStatus | null;
  owned_cards: OwnedCards | null;
  guest_cards: GuestCards | null;
  invites: Invites | null;
};

export enum UpdatePwErrors {
  INVALIDPW = 'InvalidPasswordException',
  NOTAUTHORIZED = 'NotAuthorizedException',
  LIMITEXCEEDED = 'LimitExceededException',
  EMPTYPW = 'EmptyUpdatePassword',
}
export interface PostHelperResponse {
  message: string;
  user: {
    id: string;
    amplifyId: string;
    email: string;
    name: string;
  };
  invitation: {
    invite_id: string | null;
    invite_status: string | null;
  };
}
