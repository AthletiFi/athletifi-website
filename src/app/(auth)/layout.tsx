import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import AuthClient from '@/components/auth/AuthClient';
import { Suspense } from 'react';
import Header from '@/components/common/Header';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = await isAuthenticated();
  return (
    <>
      <Header />

      {isSignedIn ? (
        children
      ) : (
        <Suspense>
          <AuthClient defaultScreen={''} />
        </Suspense>
      )}
    </>
  );
}
