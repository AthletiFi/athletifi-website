// import { addUserPostSignIn } from '@/app/actions/userDataActions';
import { getUserData } from '@/app/utils/fetchHelper';
// import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import Header from '@/components/common/Header';
// import InviteModal from '@/components/common/InviteModal';
import Preloader from '@/components/common/Preloader';
import ProfileMain from '@/components/user-portal/ProfileMain';
// import { invitationData, UserData } from '@/types/User.type';
import { UserData } from '@/types/User.type';
// import { redirect } from 'next/navigation';

export default async function Profile(
  {
    // searchParams,
  }: {
    searchParams?: { [key: string]: string | undefined };
  },
) {
  // const auth = await isAuthenticated();
  // if (!auth.isSignedIn) redirect('/login?redirect=/profile');

  // let inviteData = undefined;
  // if (searchParams?.invite_id) {
  //   try {
  //     inviteData = await addUserPostSignIn(
  //       searchParams.invite_id,
  //       auth.userId,
  //       auth.name,
  //       auth.userId,
  //     );
  //   } catch (error) {
  //     console.error(`Error adding user post sign-in: ${JSON.stringify(error)}`);
  //   }
  // }
  const tmpAuth = {
    userId: '41cbb580-9081-70d5-fb09-d65bfca50f72',
    name: 'Louis Tmp',
    email: 'louis@athleti.fi',
    signInMethod: 'manual',
    isSignedIn: true,
  };
  // const userData = await getUserData(auth);
  const userData = await getUserData(tmpAuth);

  return (
    <>
      <Preloader />
      <Header userData={userData as UserData} />
      {/* <InviteModal inviteData={inviteData as invitationData | undefined} /> */}
      <ProfileMain userData={userData as UserData} />
    </>
  );
}
