import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import LoggedOut from '@/components/auth/LoggedOut';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { addUserPostSignIn } from '@/app/actions/userDataActions';

export default async function LogoutPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const hero: Hero = {
    heading: '',
  };

  const auth = await isAuthenticated();
  if (auth.isSignedIn) {
    await addUserPostSignIn(
      auth.userId,
      auth.name,
      auth.userId,
      searchParams?.invite_id,
    );
  }
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <Header userData={userData as UserData} />
      <CommonHero hero={hero} />
      <LoggedOut />
      <Footer />
    </>
  );
}
