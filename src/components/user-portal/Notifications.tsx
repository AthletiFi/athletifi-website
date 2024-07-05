import {
  NotificationTitles,
  NotificationPreferences,
  emptyNotifications,
} from '@/types/User.type';
import { useUserData } from '@/states/userStore';
import { ChangeEvent } from 'react';

export default function Notifications() {
  const { userData, setLatestChange } = useUserData();

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    notificationType: keyof NotificationPreferences,
  ) {
    e.preventDefault();
    setLatestChange({
      notification_types: [notificationType],
      value: e.target.checked,
    });
  }

  function handleUnsubscribe() {
    setLatestChange({
      notification_types: Object.keys(emptyNotifications),
      value: false,
    });
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
            className={`flex justify-between items-center py-4 mx-4 border-b border-b-partnersBorders border-opacity-20`}
          >
            <div>{setting.name}</div>
            <div className="flex items-center cursor-pointer">
              <div className="toggle-scale">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={
                      userData.data?.notifications
                        ? userData.data.notifications[
                            setting.value as keyof NotificationPreferences
                          ]
                        : false
                    }
                    onChange={(e) =>
                      handleChange(
                        e,
                        setting.value as keyof NotificationPreferences,
                      )
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        ))}
        <div className={`flex justify-between items-center py-6 mx-4`}>
          <div className="font-bold">Unsubscribe from all notifications</div>
          <button
            className="h-8 py-3 px-6 text-sm leading-6 flex items-center justify-center bg-chartRed rounded text-white"
            onClick={handleUnsubscribe}
          >
            Unsubscribe
          </button>
        </div>
      </div>
    </div>
  );
}
