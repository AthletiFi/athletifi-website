// 'use client';

import AuthClient from '@/components/auth/AuthClient';
import Header from '@/components/common/Header';
import { Suspense } from 'react';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthenticator } from '@aws-amplify/ui-react';
// import { useAtom } from 'jotai';
// import { redirectAtom } from '@/states/userStore';

const LoginPage = () => {
  // const searchParams = useSearchParams();
  // const [redirectUrl, setRedirectUrl] = useAtom(redirectAtom);

  // const router = useRouter();
  // const { route } = useAuthenticator((context) => [context.route]);

  // useEffect(() => {
  //   const redirectPath = searchParams.get('redirect') || '/profile';
  //   setRedirectUrl(redirectPath);
  // }, [searchParams, setRedirectUrl]);

  // useEffect(() => {
  //   if (route === 'authenticated') {
  //     if (redirectUrl === null) {
  //       router.push('/profile');
  //     } else {
  //       router.push(redirectUrl);
  //     }
  //   }
  // }, [route, redirectUrl, router]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <Suspense>
            <AuthClient defaultScreen={''} />;
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
