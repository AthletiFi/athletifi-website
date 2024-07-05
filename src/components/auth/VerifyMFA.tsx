'use client';

import { ChangeEvent, useState } from 'react';
import handleTOTPVerification from '@/app/utils/auth/handleTOTPVerification';
import handleUpdateMFAPreference from '@/app/utils/auth/handleUpdateMFAPreference';

function VerifyMFA({
  setQRState,
}: {
  setQRState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [formState, setFormState] = useState({ authCode: '' });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function verifyTOTP() {
    if (formState.authCode !== '') {
      try {
        await handleTOTPVerification(formState.authCode);
        await handleUpdateMFAPreference();
        setQRState('enabled');
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg mt-5">
        Use your authenticator app to finalize your setup
      </h1>
      <form className="max-w-400 mt-10 mb-4">
        <div>
          <label>Authenticator Code:</label>
          <input
            className="mx-3 px-2 text-black"
            onChange={(e) => onChange(e)}
            name="authCode"
            type="text"
          />
        </div>
      </form>
      <button
        className="m-3 p-3 bg-skyblue text-black font-medium min-w-90 rounded-10"
        onClick={verifyTOTP}
      >
        Continue
      </button>
    </div>
  );
}

export default VerifyMFA;
