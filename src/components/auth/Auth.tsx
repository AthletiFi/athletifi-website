'use client';

import { Amplify } from 'aws-amplify';
import config from '@/custom-aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(config, { ssr: true });
// Amplify.configure(awsExports, { ssr: true });

const Auth = ({ children }: { children: React.ReactNode }) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};

export default Auth;
