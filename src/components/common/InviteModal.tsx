'use client';

import { AlertModalType } from '@/types/AlertModalType';
import { invitationData } from '@/types/User.type';
import { useState } from 'react';
import AlertModal from '@/components/common/AlertModal';

export default function InviteModal({
  inviteData,
}: {
  inviteData: invitationData | undefined;
}) {
  const [inviteStatus, setInviteStatus] = useState<AlertModalType | null>();
  const [hasSetState, setHasSetState] = useState(false);

  // Get the value of 'hasShownModal' from local storage
  if (typeof window !== 'undefined') {
    const hasShownModal = localStorage.getItem('hasShownModal');
    // If the modal has not been shown and there is valid invite data
    if (
      !hasShownModal &&
      inviteData &&
      inviteData.invitation.invite_id &&
      hasSetState === false
      // inviteData.invitation.invite_status !== 'SUCCESS'
    ) {
      let inviteTitle: null | string = null;
      let inviteMessage: null | string = null;

      // Set the invite message based on the invite status
      if (inviteData.invitation.invite_status === 'REVOKED') {
        inviteTitle = 'Card Access Revoked';
        inviteMessage =
          'We understand you were previously granted access to this card. However, the card owner has chosen to revoke your access privileges. We apologize for any inconvenience this may cause.';
      } else if (inviteData.invitation.invite_status === 'EXPIRED') {
        inviteTitle = 'Invitation Expired';
        inviteMessage =
          'The access you were granted to this card has now expired. The card owner may choose to reinstate your access if they wish. Thank you for your understanding.';
      } else if (inviteData.invitation.invite_status === 'CARD_NOT_FOUND') {
        inviteTitle = 'Invitation Card Not Found';
        inviteMessage =
          'We had trouble locating the intended player card. Please contact support@athleti.fi about this issue.';
      } else if (
        inviteData.invitation.invite_status ===
        'REDEMPTION_BY_OWNER_NOT_ALLOWED'
      ) {
        inviteTitle = 'Invitation Redemption Error';
        inviteMessage =
          'You are already the card owner. Please share the card with family or friends instead.';
      } else if (
        inviteData.invitation.invite_status === 'UNEXPECTED_STATUS' ||
        inviteData.invitation.invite_status === 'NOT_FOUND'
      ) {
        inviteTitle = 'Invitation Error';
        inviteMessage =
          "Oops! We encountered an issue processing your invitation. It's possible the invitation doesn't exist or there was a problem on our end. Please double-check the invitation details or contact the card owner for assistance.";
      } else if (inviteData.invitation.invite_status === 'ALREADY_ACCEPTED') {
        inviteTitle = 'Invitation Already Accepted';
        inviteMessage =
          'This invitation has already been redeemed. If you believe this is an error, please contact our support team for assistance.';
      } else if (inviteData.invitation.invite_status === 'SUCCESS') {
        inviteTitle = 'Invitation Success';
        inviteMessage =
          'You have successfully accepted the invitation to access this card. You can now view and manage this card from your dashboard.';
      } else if (inviteData.invitation.invite_status === 'SUCCESS_OWNER_SET') {
        inviteTitle = 'Registration Success';
        inviteMessage =
          'Thank you for registering! You have successfully claimed your card. You can now view and manage it from your dashboard. If you have any questions, feel free to contact our support team.';
      }

      // Set the invite status state with the title and message
      setInviteStatus({
        title: inviteTitle,
        textBody: inviteMessage,
      });
      // Store a flag in local storage to indicate that the modal has been shown
      localStorage.setItem('hasShownModal', 'true');
      setHasSetState(true);
    }
  }

  // Function to close the modal by setting the invite status to null
  const closeModal = () => {
    setInviteStatus(null);
  };

  return (
    <>
      {inviteStatus && (
        <AlertModal
          title={inviteStatus.title}
          textBody={inviteStatus.textBody}
          onClose={closeModal}
        />
      )}
    </>
  );
}
