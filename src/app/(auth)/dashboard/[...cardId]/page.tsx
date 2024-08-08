import { addUserPostSignIn } from '@/app/actions/userDataActions';
import { getUserData } from '@/app/utils/fetchHelper';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import Header from '@/components/common/Header';
import InviteModal from '@/components/common/InviteModal';
import { invitationData, UserData } from '@/types/User.type';
import { redirect } from 'next/navigation';
import DashboardMain from '@/components/dashboard/DashboardMain';

export default async function PlayerDashboardPage({
  params,
  searchParams,
}: {
  params: { cardId: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const cardId = params.cardId.join('/');

  const auth = await isAuthenticated();
  if (!auth.isSignedIn) redirect('/login?redirect=/profile');

  const inviteData = await addUserPostSignIn(
    auth.userId,
    auth.name,
    auth.userId,
    searchParams?.invite_id,
  );

  const userData = await getUserData(auth);

  return (
    <>
      <Header userData={userData as UserData} />
      <InviteModal inviteData={inviteData as invitationData | undefined} />
      <DashboardMain cardId={cardId} />
    </>
  );
}
