import { getUserData } from '@/app/utils/fetchHelper';
import AuthClient from '@/components/auth/AuthClient';
import Header from '@/components/common/Header';
import { UserData } from '@/types/User.type';
import { Suspense } from 'react';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { addUserPostSignIn } from '@/app/actions/userDataActions';

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const auth = await isAuthenticated();
  if (auth.isSignedIn) {
    await addUserPostSignIn(
      auth.email,
      auth.name,
      auth.userId,
      searchParams?.invite_id,
    );
  }
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <Header userData={userData as UserData} />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="">
          <Suspense>
            <AuthClient
              defaultScreen={'signUp'}
              redirect={searchParams?.redirect}
              inviteId={searchParams?.invite_id}
            />
            ;
          </Suspense>
        </div>
      </div>
    </>
  );
}
