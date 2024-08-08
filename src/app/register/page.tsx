import AuthClient from '@/components/auth/AuthClient';
import Header from '@/components/common/Header';
import { emptyUserData } from '@/types/User.type';
import { Suspense } from 'react';

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <>
      <Header userData={emptyUserData} />
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
