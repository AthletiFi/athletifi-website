import { addUserPostSignIn } from '@/app/actions/userDataActions';
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
  const auth = await isAuthenticated();

  let inviteData = undefined;
  if (!auth.isSignedIn) {
    redirect('/login?redirect=/profile');
  } else {
    inviteData = await addUserPostSignIn(
      auth.email,
      auth.name,
      auth.userId,
      searchParams?.invite_id,
    );
  }

  const userData = await getUserData(auth);

  return (
    <>
      <Preloader />
      <Header userData={userData as UserData} />
      <InviteModal inviteData={inviteData as invitationData | undefined} />
      <ProfileMain userData={userData as UserData} />
    </>
  );
}
