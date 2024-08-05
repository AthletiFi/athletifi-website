import addUserPostSignIn from '@/app/actions/userDataActions';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { getUserData } from '@/app/utils/fetchHelper';
import Header from '@/components/common/Header';
import InviteModal from '@/components/common/InviteModal';
import { invitationData, UserData } from '@/types/User.type';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { cardId: string[]; invite_id: string | undefined };
}) {
  const auth = await isAuthenticated();
  if (!auth.isSignedIn)
    redirect(`/login?redirect=/dashboard/${params.cardId.join('/')}`);

  let inviteData = undefined;
  if (params?.invite_id) {
    inviteData = await addUserPostSignIn(params.invite_id);
  }
  const userData = await getUserData(auth);

  return (
    <>
      <Header userData={userData as UserData} />
      <InviteModal inviteData={inviteData as invitationData | undefined} />
      {children}
    </>
  );
}
