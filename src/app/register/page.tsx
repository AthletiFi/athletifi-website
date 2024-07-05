import AuthClient from '@/components/auth/AuthClient';
import Header from '@/components/common/Header';
import { Suspense } from 'react';

const RegisterPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="">
          <Suspense>
            <AuthClient defaultScreen={'signUp'} />;
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
