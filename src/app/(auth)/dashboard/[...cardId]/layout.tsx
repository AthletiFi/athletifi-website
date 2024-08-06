// import { addUserPostSignIn } from '@/app/actions/userDataActions';
// import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { getUserData } from '@/app/utils/fetchHelper';
import Header from '@/components/common/Header';
// import InviteModal from '@/components/common/InviteModal';
// import { invitationData, UserData } from '@/types/User.type';
import { UserData } from '@/types/User.type';
// import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  // params,
}: {
  children: React.ReactNode;
  params: { cardId: string[]; invite_id: string | undefined };
}) {
  // const auth = await isAuthenticated();
  // if (!auth.isSignedIn)
  //   redirect(`/login?redirect=/dashboard/${params.cardId.join('/')}`);

  // let inviteData = undefined;
  // if (params?.invite_id) {
  //   try {
  //     inviteData = await addUserPostSignIn(
  //       params.invite_id,
  //       auth.userId,
  //       auth.name,
  //       auth.userId,
  //     );
  //   } catch (error) {
  //     console.error(`Error adding user post sign-in: ${JSON.stringify(error)}`);
  //   }
  // }
  const tmpAuth = {
    userId: '',
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
      {/* <InviteModal inviteData={inviteData as invitationData | undefined} /> */}
      {children}
    </>
  );
}
