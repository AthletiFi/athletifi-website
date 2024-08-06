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

export type ICards = {
  card_id: string | null;
  card_image_url: string | null;
  dashboard_slug: string | null;
  name: string | null;
  number: number | null;
  team: string | null;
  club: string | null;
  club_logo: string | null;
  invite_id?: string | null;
  status?: string | null;
  inviter_email?: string | null;
};

export const emptyOwnedCard: ICards = {
  card_id: null,
  card_image_url: null,
  dashboard_slug: null,
  name: null,
  number: null,
  team: null,
  club: null,
  club_logo: null,
};

export const emptyGuestCard: ICards = {
  invite_id: null,
  status: null,
  card_id: null,
  card_image_url: null,
  dashboard_slug: null,
  inviter_email: null,
  name: null,
  number: null,
  team: null,
  club: null,
  club_logo: null,
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
  name: string | null;
  email: string | null;
  init_notifications: boolean | null;
  notifications: NotificationPreferences | null;
  user_delete_status: DeleteStatus | null;
  owned_cards: ICards[] | null;
  guest_cards: ICards[] | null;
  invites: Invites[] | null;
};

export type invitationData = {
  invitation: {
    invite_id: string | null;
    invite_status: string | null;
  };
  message: string | null;
  user: {
    amplify_id: string | null;
    email: string | null;
    id: string | null;
    name: string | null;
  };
};

export type AuthData = {
  userId: string;
  name: string;
  email: string;
  signInMethod: string;
  isSignedIn: boolean;
  error?: string;
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
