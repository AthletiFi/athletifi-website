'use client';

import {
  NotificationTitles,
  NotificationPreferences,
  UserData,
} from '@/types/User.type';

import {
  addNotification,
  deleteNotification,
} from '@/app/actions/userDataActions';
import { ChangeEvent } from 'react';
import UnsubscribeButton from './UnsubscribeButton';

export default function Notifications({ userData }: { userData: UserData }) {
  async function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    amplifyId: string,
    notificationType: string,
  ) {
    try {
      if (e.target.checked) {
        await addNotification(amplifyId, notificationType);
      } else {
        await deleteNotification(amplifyId, notificationType);
      }
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  }

  return (
    <div className="flex flex-col mt-16 text-primary" id="notifications">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4 shadow-portalNav">
        Notifications
      </h2>
      <div className="text-offwhite mx-4 my-8">
        What would you like to be notified via email?
      </div>
      <div className="rounded bg-cardsDark shadow-portalNav">
        {NotificationTitles.map((setting, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-4 mx-4 border-b border-b-partnersBorders border-opacity-20"
          >
            <p>{setting.name}</p>
            <div className="flex items-center cursor-pointer">
              <div className="toggle-scale">
                <label className="switch">
                  <input
                    type="checkbox"
                    name={setting.value}
                    checked={
                      userData.notifications
                        ? userData.notifications[
                            setting.value as keyof NotificationPreferences
                          ]
                        : false
                    }
                    onChange={(e) =>
                      handleChange(
                        e,
                        userData.amplify_id as string,
                        setting.value,
                      )
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center py-6 mx-4 border-t border-t-partnersBorders border-opacity-20">
          <div className="font-bold">Unsubscribe from all notifications</div>
          <form
            action={() =>
              deleteNotification(userData.amplify_id as string, 'All')
            }
          >
            <UnsubscribeButton />
          </form>
        </div>
      </div>
    </div>
  );
}
