import BackToTop from '@/components/common/BackToTop';
import Footer from '@/components/common/Footer';
import AccountDetails from '@/components/user-portal/AccountDetails';
import Notifications from '@/components/user-portal/Notifications';
import ManageReferrals from '@/components/user-portal/ManageReferrals';
import Header from '@/components/common/Header';
import ProfileHeader from '@/components/user-portal/ProfileHeader';
import { invitationData, UserData } from '@/types/User.type';
import addUserPostSignIn, { getUserData } from '@/app/actions/userDataActions';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { redirect } from 'next/navigation';
import InviteModal from '@/components/common/InviteModal';

export default async function SettingsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { isSignedIn } = await isAuthenticated();
  let userData = await getUserData();

  if (!isSignedIn || !userData) redirect('/login?redirect=/settings');

  let inviteData = undefined;
  if (searchParams?.invite_id) {
    inviteData = await addUserPostSignIn(searchParams.invite_id);
    userData = await getUserData();
  }

  return (
    <>
      <Header userData={userData as UserData} />
      <InviteModal inviteData={inviteData as invitationData | undefined} />
      <div className="overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground ">
        <main className="mx-4 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
          <ProfileHeader
            pageTitle={'Settings'}
            userData={userData as UserData}
          />
          <div className="w-full lg:max-w-[880px] mx-auto gap-4">
            <AccountDetails userData={userData as UserData} />
            <Notifications userData={userData as UserData} />
            <ManageReferrals userData={userData as UserData} />
          </div>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </>
  );
}
