import { atom } from 'jotai';
import { userDataAtom } from '@/states/userStore';

//store INVITES
export const invitesDataAtom = atom((get) => {
  const userData = get(userDataAtom);
  const invites = Array.isArray(userData?.data?.invites)
    ? userData.data.invites
    : [];
  return invites;
});
