import { atom } from 'jotai';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const inviteRevokeActionAtom = atom(
  null,
  async (get, set, actionData) => {
    const response = await fetch(`${baseURL}/referralInvite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(actionData),
    });

    if (!response.ok) {
      throw new Error('Failed to trigger lambda function');
    }

    const data = await response.json();
    return data;
  },
);
