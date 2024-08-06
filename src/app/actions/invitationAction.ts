'use server';

import { revalidateTag } from 'next/cache';

const inviteUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/referralInvite`;

type InviteAction = {
  action: 'invite' | 'decline' | 'revoke';
  guest_email?: string | null;
  card_image_id?: string | null;
  inviteId?: string | null;
  owner_email?: string | null;
  card_name?: string | null;
};

type InviteResponse = {
  message?: string | null;
  error?: string | null;
};

async function invitePostHelper(
  inviteParams: InviteAction,
): Promise<InviteResponse> {
  const response = await fetch(`${inviteUrl}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    } as HeadersInit,
    body: JSON.stringify(inviteParams),
  });

  const data: InviteResponse = await response.json();
  return data;
}

export async function invitationAction(
  cardId: string | null,
  formData: FormData,
) {
  try {
    const inviteBody: InviteAction = {
      action: 'invite',
      guest_email: formData.get('email') as string,
      card_image_id: cardId,
    };

    // const response = await axiosClient.post('/referralInvite', body);
    const data = await invitePostHelper(inviteBody);

    if ('error' in data) {
      return {
        error:
          (data.error as string) ||
          'An error occurred during the invitation process.',
      };
    } else {
      revalidateTag('userData');
      return data;
    }
  } catch (error) {
    console.error('Failed to send invitation', error);
    return { error: 'Failed to send invitation' };
  }
}

export async function inviteDeclineAction(
  inviteId: string | null,
  owner_email: string | null | undefined,
  card_name: string | null | undefined,
) {
  try {
    const inviteDeclineBody: InviteAction = {
      action: 'decline',
      inviteId: inviteId,
      owner_email: owner_email,
      card_name: card_name,
    };

    const data = await invitePostHelper(inviteDeclineBody);

    if ('error' in data) {
      return {
        error:
          (data.error as string) ||
          'An error occurred during the decline process.',
      };
    } else {
      revalidateTag('userData');
      return data;
    }
  } catch (error) {
    console.error('Failed to decline invitation', error);
    return { error: 'Failed to decline invitation' };
  }
}

export async function inviteRevokeAction(
  inviteId: string | null,
  card_name: string | null | undefined,
) {
  try {
    const inviteRevokeBody: InviteAction = {
      action: 'revoke',
      inviteId: inviteId,
      card_name: card_name,
    };

    const data = await invitePostHelper(inviteRevokeBody);

    if ('error' in data) {
      return {
        error:
          (data.error as string) ||
          'An error occurred during the revoke process.',
      };
    } else {
      revalidateTag('userData');
      return data;
    }
  } catch (error) {
    console.error('Failed to revoke invitation', error);
    return { error: 'Failed to revoke invitation' };
  }
}
