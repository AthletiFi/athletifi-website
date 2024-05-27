'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTrashCan,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import handleFetchMFAPreference from '@/app/utils/auth/handleFetchMFAPreference';
import { type FetchMFAPreferenceOutput } from 'aws-amplify/auth';
import handleTOTPSetup from '@/app/utils/auth/handleTOTPSetup';
import { useUserData } from '@/states/userStore';
import RegisterMFA from '@/components/auth/RegisterMFA';
import VerifyMFA from '@/components/auth/VerifyMFA';
import EnabledMFAMessage from '@/components/auth/EnabledMFAMessage';
import { DeleteStatus } from '@/types/User.type';

const CHECK = 'check';
const CONFIRMED = 'confirmed';

export default function AccountDetails() {
  const { userData } = useUserData();
  const [qrState, setQRState] = useState('off');
  const [qrSrc, setQRSrc] = useState<string | null | undefined>(null);
  const [qrKey, setQRKey] = useState<string>('');
  const [deleteRequestState, setDeleteRequestState] = useState<string | null>(
    null,
  );
  const [currentMFA, setCurrentMFA] = useState<FetchMFAPreferenceOutput>({
    enabled: undefined,
    preferred: undefined,
  });

  function handleUserChange() {}

  function handlePassChange() {}

  async function handleEnableTOTP() {
    handleTOTPSetup().then(({ src, key }) => {
      setQRSrc(src);
      setQRKey(key);
      setQRState('show-qr');
    });
  }

  async function handleDisableTOTP() {}

  useEffect(() => {
    handleFetchMFAPreference().then((data) => setCurrentMFA(data));
  }, [qrState]);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const postHelper = async (amplify_id: string) => {
    const response = await fetch(`${baseURL}/deleteUserRequest`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        amplify_id: amplify_id,
      }),
    });
    const data = await response.json();
    return data;
  };

  async function handleDeleteRequest() {
    if (userData.data?.amplify_id) {
      await postHelper(userData.data.amplify_id);
      setDeleteRequestState(CONFIRMED);
    }
  }

  return (
    <div className="flex flex-col mt-16 text-primary" id="account-details">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-2 md:px-4 shadow-portalNav">
        Account Details
      </h2>
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 mt-4">
        <div>{userData.data?.email}</div>
        <div
          className="flex items-center cursor-pointer"
          onClick={handleUserChange}
        >
          <div className="mx-2 md:mx-4">remove</div>
          <FontAwesomeIcon
            className="text-skyblue text-md md:text-2xl"
            icon={faPencil}
          />
        </div>
      </div>
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 border-t border-t-partnersBorders border-opacity-50">
        <div>password: **********</div>
        <div
          className="flex items-center cursor-pointer"
          onClick={handlePassChange}
        >
          <div className="mx-2 md:mx-4">remove</div>
          <FontAwesomeIcon
            className="text-skyblue text-md md:text-2xl"
            icon={faPencil}
          />
        </div>
      </div>
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 border-t border-t-partnersBorders border-opacity-50">
        <div>Two-factor authentication</div>
        {userData.data?.auth_method !== 'email' ? (
          <div>2FA is not compatible with social sign-in</div>
        ) : currentMFA.enabled ? (
          <div
            className="flex items-center cursor-pointer"
            onClick={handleDisableTOTP}
          >
            <div title="Click to disable" className="flex">
              <p className="mx-2 md:mx-4 text-skyblue">Status: active</p>
              <FontAwesomeIcon
                className="text-skyblue text-md md:text-2xl"
                icon={faUserShield}
              />
            </div>
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer"
            onClick={handleEnableTOTP}
          >
            <div title="Click to enable" className="flex group">
              <p className="mx-2 md:mx-4 group-hover:text-skyblue">
                Status: inactive
              </p>
              <FontAwesomeIcon
                className="group-hover:text-skyblue text-md md:text-2xl"
                icon={faUserShield}
              />
            </div>
          </div>
        )}
      </div>
      {qrState === 'show-qr' && qrSrc && (
        <RegisterMFA qrSrc={qrSrc} qrKey={qrKey} setQRState={setQRState} />
      )}
      {qrState === 'verify-qr' && <VerifyMFA setQRState={setQRState} />}
      {qrState === 'enabled' && <EnabledMFAMessage />}
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 border-t border-t-partnersBorders border-opacity-50">
        <div className="text-sm">Delete Account</div>
        {userData.data?.user_delete_status === DeleteStatus.PENDING ||
        userData.data?.user_delete_status === DeleteStatus.COMPLETED ? (
          <div className="text-red-500 text-sm">
            Your delete request is in progress. Our team will confirm with you
            once completed.
          </div>
        ) : (
          <div className="flex">
            {deleteRequestState === CONFIRMED && (
              <div className="text-skyblue text-sm">
                Your request is logged. Expect a confirmation in 3-5 business
                days.
              </div>
            )}
            {deleteRequestState === CHECK && (
              <>
                <div>
                  Account deletion is permanent and can take 3-5 business days
                  to fully process. Continue?
                </div>
                <button
                  className="mx-3 hover:text-skyblue hover:underline"
                  onClick={handleDeleteRequest}
                >
                  Yes
                </button>
                <button
                  className="hover:text-skyblue hover:underline"
                  onClick={() => setDeleteRequestState(null)}
                >
                  No
                </button>
              </>
            )}
            {deleteRequestState === null && (
              <FontAwesomeIcon
                className="text-chartRed cursor-pointer text-md md:text-2xl"
                icon={faTrashCan}
                onClick={() => setDeleteRequestState(CHECK)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
