'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

// import {
//   addNotification,
//   deleteNotification,
// } from '@/app/actions/userDataActions';

// const DELAY_TIMEOUT = 3;
// enum ACTION_TYPE {
//   Delete = 1,
//   Add,
// }

const UserNotificationsModal = (
  {
    // amplify_id,
    // setClosedModal,
  }: {
    amplify_id: string;
    setClosedModal: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  // async function handleSubmit(amplify_id: string, action_type: ACTION_TYPE) {
  //   if (action_type === ACTION_TYPE.Delete) {
  //     await addNotification(amplify_id, 'All');
  //   } else if (action_type === ACTION_TYPE.Add) {
  //     await deleteNotification(amplify_id, 'All');
  //   }

  //   await new Promise((r) => setTimeout(r, DELAY_TIMEOUT));
  //   setClosedModal(true);
  // }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-cardsDark shadow-lg w-[550px] h-72 flex rounded-10 opacity-95 relative">
        <form
        // action={() => handleSubmit(amplify_id, ACTION_TYPE.Delete)}
        >
          <button type="submit">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-offwhite z-20 absolute top-0 right-0 mr-6 mt-4 cursor-pointer"
              size="xl"
            />
          </button>
        </form>
        <div className="relative flex items-center justify-center w-1/4">
          <FontAwesomeIcon
            icon={faBell}
            className="text-skyblue z-20 absolute"
            size="2xl"
          />
          <div className="bg-skyblue opacity-30 w-full h-full rounded-l-10"></div>
        </div>
        <div className="flex flex-col justify-around p-4 w-full">
          <h2 className="text-lg text-offwhite mt-4">Don&apos;t miss out!</h2>
          <p className="text-md font-extralight text-offwhite -mt-4">
            Would you like to receive updates and important announcements?
            Enable notifications to stay in the loop. You can always update your
            preferences in the user settings page.
          </p>
          <div className="flex justify-end mt-4">
            <form
            // action={() => handleSubmit(amplify_id, ACTION_TYPE.Add)}
            >
              <button
                className="text-basemd text-primary font-extralight py-px mr-6 border-b border-skyblue hover:text-skyblue"
                type="submit"
              >
                Enable
              </button>
            </form>
            <form
            // action={() => handleSubmit(amplify_id, ACTION_TYPE.Delete)}
            >
              <button
                className="text-basemd text-primary font-extralight py-px mr-2 border-b border-rose-600 hover:text-rose-600"
                type="submit"
              >
                Maybe later
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotificationsModal;
