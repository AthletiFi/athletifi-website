'use client';

import { useState, useEffect, ChangeEvent } from 'react';
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
import { ViewDeleteRequestState, DeleteStatus } from '@/types/User.type';
import { UpdatePwErrors } from '@/types/User.type';
import { updatePassword } from 'aws-amplify/auth';

import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormElements extends HTMLFormControlsCollection {
  currentPw: HTMLInputElement;
  newPw: HTMLInputElement;
}

interface UpdatePwFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const MINLEN = 8;

export default function AccountDetails() {
  const { userData } = useUserData();
  const [qrState, setQRState] = useState('off');
  const [qrSrc, setQRSrc] = useState<string | null | undefined>(null);
  const [qrKey, setQRKey] = useState<string>('');
  const [deleteRequestState, setDeleteRequestState] =
    useState<ViewDeleteRequestState>(ViewDeleteRequestState.INIT);
  const [currentMFA, setCurrentMFA] = useState<FetchMFAPreferenceOutput>({
    enabled: undefined,
    preferred: undefined,
  });
  const [viewUpdatePw, setViewUpdatePw] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [currentPw, setCurrentPw] = useState('');
  const [isCurrentPwValid, setIsCurrentPwValid] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [isNewPwValid, setIsNewPwValid] = useState(false);
  const [confirmPw, setConfirmPw] = useState('');

  async function handleUpdatePassword(
    event: React.FormEvent<UpdatePwFormElement>,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const oldPassword = form.elements.currentPw.value;
    const newPassword = form.elements.newPw.value;

    const toastOptions: ToastOptions = {
      draggable: false,
      position: 'bottom-right',
    };

    try {
      await updatePassword({ oldPassword, newPassword });
      setViewUpdatePw(false);
      toast.success('Password has been successfully updated!', toastOptions);
    } catch (err) {
      console.error(JSON.stringify(err));
      const errMsg = renderErrorMessage(err.name);
      toast.error(
        `We hit a snag trying to update your password: ${errMsg}`,
        toastOptions,
      );
    }
  }

  function handleCurrentPwChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentPw(e.target.value);
  }

  useEffect(() => {
    if (currentPw !== '' && currentPw.length > MINLEN - 1) {
      setIsCurrentPwValid(true);
    } else {
      setIsCurrentPwValid(false);
    }
  }, [currentPw]);

  function handleNewPwChange(e: ChangeEvent<HTMLInputElement>) {
    setNewPw(e.target.value);
  }

  useEffect(() => {
    if (newPw !== '' && newPw.length >= MINLEN) {
      setIsNewPwValid(true);
    } else {
      setIsNewPwValid(false);
    }
  }, [newPw]);

  function handleConfirmPwChange(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPw(e.target.value);
  }

  useEffect(() => {
    if (
      newPw !== '' &&
      isCurrentPwValid &&
      isNewPwValid &&
      newPw === confirmPw
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [currentPw, newPw, confirmPw, isCurrentPwValid, isNewPwValid]);

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

  function renderErrorMessage(param: UpdatePwErrors) {
    switch (param) {
      case UpdatePwErrors.INVALIDPW:
        return 'Password needs to be atleast 8 characters';
      case UpdatePwErrors.NOTAUTHORIZED:
        return 'Your current password is incorrect';
      case UpdatePwErrors.LIMITEXCEEDED:
        return 'Too many attempts, try again later';
      case UpdatePwErrors.EMPTYPW:
        return 'New password is empty, please try again';
      default:
        return `Error ${param}`;
    }
  }

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
      setDeleteRequestState(ViewDeleteRequestState.CONFIRMED);
    }
  }

  return (
    <div className="flex flex-col mt-16 text-primary" id="account-details">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-2 md:px-4 shadow-portalNav">
        Account Details
      </h2>
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 mt-4">
        <div>{userData.data?.email}</div>
      </div>
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 border-t border-t-partnersBorders border-opacity-50">
        <div>password: **********</div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setViewUpdatePw(!viewUpdatePw);
            setSubmitDisabled(true);
          }}
        >
          <div className="mx-2 md:mx-4">change</div>
          <FontAwesomeIcon
            className="text-skyblue text-md md:text-2xl"
            icon={faPencil}
          />
        </div>
      </div>
      {viewUpdatePw && (
        <form
          onSubmit={handleUpdatePassword}
          className="flex flex-col mx-2 md:mx-4 py-3 gap-y-2"
        >
          <label htmlFor="currentPw">Current Password:</label>
          <input
            className="text-black py-1.5 px-3 rounded-10"
            id="currentPw"
            type="password"
            onChange={handleCurrentPwChange}
          />
          <label htmlFor="newPw">New Password:</label>
          <input
            className="text-black py-1.5 px-3 rounded-10"
            id="newPw"
            type="password"
            onChange={handleNewPwChange}
          />
          <label htmlFor="confirmNewPw">Confirm Password:</label>
          <input
            className="text-black py-1.5 px-3 rounded-10"
            id="confirmNewPw"
            type="password"
            onChange={handleConfirmPwChange}
          />
          <button
            className={`my-4 py-2 px-4 rounded-10 ${submitDisabled ? 'bg-settingsGray' : 'bg-skyblue hover:bg-sky-600'}`}
            type="submit"
            disabled={submitDisabled}
          >
            Submit
          </button>
          {newPw !== '' && confirmPw !== '' && newPw !== confirmPw && (
            <div className="text-red-500">
              Password confirmation does not match
            </div>
          )}
          {newPw !== '' && newPw.length < MINLEN && (
            <div className="text-red-500">
              Passwords need to be 8 or more characters
            </div>
          )}
        </form>
      )}
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
            {deleteRequestState === ViewDeleteRequestState.CONFIRMED && (
              <div className="text-skyblue text-sm">
                Your request is logged. Expect a confirmation in 3-5 business
                days.
              </div>
            )}
            {deleteRequestState === ViewDeleteRequestState.CHECK && (
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
                  onClick={() =>
                    setDeleteRequestState(ViewDeleteRequestState.INIT)
                  }
                >
                  No
                </button>
              </>
            )}
            {deleteRequestState === ViewDeleteRequestState.INIT && (
              <FontAwesomeIcon
                className="text-chartRed cursor-pointer text-md md:text-2xl"
                icon={faTrashCan}
                onClick={() =>
                  setDeleteRequestState(ViewDeleteRequestState.CHECK)
                }
              />
            )}
          </div>
        )}
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}
