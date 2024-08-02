'use client';

import 'src/styles/AuthStyles.css';
import {
  Authenticator,
  ThemeProvider,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { ComponentOverrides, FormFieldsOverrides } from './AuthOverrides';
import { loginTheme } from './AuthTheme';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignUpInput, signUp } from 'aws-amplify/auth';
import { sourceSans3 } from '@/app/utils/helpers';

const AuthClient = ({
  defaultScreen,
  redirect,
  inviteId,
}: {
  defaultScreen: string;
  redirect: string | undefined;
  inviteId: string | undefined;
}) => {
  const router = useRouter();

  const { route } = useAuthenticator((context) => [
    context.user,
    context.route,
  ]);

  useEffect(() => {
    if (route === 'authenticated') {
      const inviteParam = inviteId ? `?invite_id=${inviteId}` : '';
      if (redirect) {
        router.push(redirect + inviteParam);
      } else {
        router.push(`/profile${inviteParam}`);
      }
    }
  }, [route, redirect, router, inviteId]);

  const services = {
    async handleSignUp(formData: SignUpInput) {
      try {
        const result = await signUp(formData);
        // SignUp is successful, but user is not authenticated yet.
        // Do not fetch attributes or call post sign-in here.
        return result; // Just return the result indicating successful sign-up.
      } catch (error) {
        console.error('Error signing up:', error);
        throw error;
      }
    },
  };

  return (
    <div
      className={`bg-cardsDark ${sourceSans3.className} p-4 md:p-8 shadow-sm flex justify-center rounded-10 mt-16`}
    >
      <ThemeProvider theme={loginTheme}>
        <div className="mb-12">
          <p className="text-primary font-extralight leading-8 mt-12">
            Signup for
          </p>
          <h1
            className={`text-xl text-primary leading-8 ${sourceSans3.className}`}
          >
            AthletiFi
          </h1>
        </div>

        <Authenticator
          services={services}
          components={ComponentOverrides}
          formFields={FormFieldsOverrides}
          initialState={
            defaultScreen as 'signIn' | 'signUp' | 'forgotPassword' | undefined
          }
        />
      </ThemeProvider>
    </div>
  );
};

export default AuthClient;
