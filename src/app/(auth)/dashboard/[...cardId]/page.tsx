// import { addUserPostSignIn } from '@/app/actions/userDataActions';
import { getUserData } from '@/app/utils/fetchHelper';
// import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import Header from '@/components/common/Header';
// import InviteModal from '@/components/common/InviteModal';
// import { invitationData, UserData } from '@/types/User.type';
import { UserData } from '@/types/User.type';
// import { redirect } from 'next/navigation';
import DashboardMain from '@/components/dashboard/DashboardMain';

export default async function PlayerDashboardPage({
  params,
  // searchParams
}: {
  params: { cardId: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const cardId = params.cardId.join('/');

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
      <Header userData={userData as UserData} />
      <DashboardMain cardId={cardId} />
    </>
  );
}
