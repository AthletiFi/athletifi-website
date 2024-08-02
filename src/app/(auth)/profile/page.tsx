import addUserPostSignIn from '@/app/actions/userDataActions';
import { getUserData } from '@/app/utils/fetchHelper';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import Header from '@/components/common/Header';
import InviteModal from '@/components/common/InviteModal';
import Preloader from '@/components/common/Preloader';
import ProfileMain from '@/components/user-portal/ProfileMain';
import { invitationData, UserData } from '@/types/User.type';
import { redirect } from 'next/navigation';

export default async function Profile({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { isSignedIn } = await isAuthenticated();
  let userData = await getUserData();

  if (!isSignedIn || !userData) redirect('/login?redirect=/profile');

  let inviteData = undefined;
  if (searchParams?.invite_id) {
    inviteData = await addUserPostSignIn(searchParams.invite_id);
    userData = await getUserData();
  }

  return (
    <>
      <Preloader />
      <Header userData={userData as UserData} />
      <InviteModal inviteData={inviteData as invitationData | undefined} />
      <ProfileMain userData={userData as UserData} />
    </>
  );
}
