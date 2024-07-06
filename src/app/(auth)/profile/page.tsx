'use client';

import React, {
  useState,
  // ChangeEvent, FormEvent,
  useEffect,
} from 'react';

import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
//import { IProfileProps } from '@/types/Dashboard.type';
import Header from '@/components/user-portal/Header';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';
import { useAtom } from 'jotai';
import { postHelperResponseAtom } from '@/states/userStore';
import AlertModal from '@/components/common/AlertModal';
import { AlertModalType } from '@/types/AlertModalType';
import { GuestCards, OwnedCards } from '@/types/User.type';
import { IProfileProps } from '@/types/Dashboard.type';
import { PostHelperResponse } from '@/types/User.type';

// import { userDataAtom } from '@/states/userStore';
import { useAtomValue } from 'jotai';
import {
  ownedCardsDataAtom,
  guestCardsDataAtom,
} from '@/states/profileCardsDataStore';
import Preloader from '@/components/common/Preloader';

//motion variants to animate the team bars
const variants = {
  initial: { y: 100 },
  animate: {
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

interface ICardData {
  result: IProfileProps;
  ownedCardInfo: OwnedCards;
  guestCardInfo: GuestCards;
}

const Profile = () => {
  const ownedCardsData = useAtomValue(ownedCardsDataAtom) as ICardData[];
  const guestCardsData = useAtomValue(guestCardsDataAtom) as ICardData[];
  const [inviteData] = useAtom(postHelperResponseAtom) as [
    PostHelperResponse | null,
    (value: PostHelperResponse | null) => void,
  ];
  const [inviteStatus, setInviteStatus] = useState<AlertModalType | null>();
  const [hasSetState, setHasSetState] = useState(false);

  const acceptedGuestCards = guestCardsData.filter(
    (card) => card.guestCardInfo.status === 'accepted',
  );

  // This useEffect hook runs whenever the inviteData changes
  useEffect(() => {
    // Get the value of 'hasShownModal' from local storage
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
  }, [inviteData]); // This hook depends on the inviteData

  // Function to close the modal by setting the invite status to null
  const closeModal = () => {
    setInviteStatus(null);
  };
  // const [openIndex, setOpenIndex] = useState<boolean[]>(
  //   Array(populatedTeams.length).fill(false),
  // );

  // ADD SKELETON
  return (
    <>
      <Preloader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden"
      >
        <div className="absolute top-0 left-0 bg-gradient-to-r from-cardsDark2 to-cardsBackground h-[280px] lg:h-[330px] w-full -z-10"></div>
        <main className="mx-2 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
          <Header pageTitle={'Cards'} />
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center mt-4 md:pt-7"
          >
            {inviteStatus && (
              <AlertModal
                title={inviteStatus.title}
                textBody={inviteStatus.textBody}
                onClose={closeModal}
              />
            )}
            <motion.div
              variants={variants}
              className="overflow-hidden w-full max-w-[1030px] mb-4 text-primary bg-cardsDark shadow-lg rounded-10 flex flex-col px-2 md:px-4 py-8"
            >
              <h2 className="font-semibold text-md text-primary p-2 pt-0">
                My cards
              </h2>

              <div className="flex flex-col">
                <div className="h-1 w-full bg-partnersBorders opacity-50 my-2"></div>
                {ownedCardsData.length > 0 ? (
                  <div className="flex flex-wrap w-full gap-4">
                    {ownedCardsData.map(
                      (
                        cardData: ICardData,
                        idx: React.Key | null | undefined,
                      ) => {
                        if (!cardData.ownedCardInfo.card_id) {
                          return (
                            <div
                              key={idx}
                              className="mt-8 shadow-md mx-auto bg-cardsBackground  bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[420px] flex justify-center items-center text-center"
                            >
                              <p className="text-primary text-sm opacity-80 p-6">
                                You currently do not own any cards. Once you
                                have one, it will be displayed here.
                              </p>
                            </div>
                          );
                        }
                        return (
                          <RenderCardThumbnail
                            key={idx}
                            // userData={cardData}
                            cardData={cardData}
                            isOwned={true}
                            inSettings={false}
                          />
                        );
                      },
                    )}
                  </div>
                ) : (
                  <div className="mt-8 shadow-md mx-auto bg-cardsBackground  bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[420px] flex justify-center items-center text-center">
                    <p className="text-primary text-sm opacity-80 p-6">
                      You currently do not own any cards. Once you have one, it
                      will be displayed here.
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-6">
                <h2 className="font-semibold text-md text-primary p-2 pt-0">
                  Shared with me
                </h2>
                <div className="h-1 w-full bg-partnersBorders opacity-50 my-2"></div>
                {acceptedGuestCards.length > 0 ? (
                  <div className="flex justify-center md:justify-start py-2 overflow-x-auto hide-scrollbar gap-4">
                    {acceptedGuestCards.map(
                      (
                        cardData: ICardData,
                        idx: React.Key | null | undefined,
                      ) => {
                        if (!cardData) {
                          return null;
                        }
                        return (
                          <RenderCardThumbnail
                            key={idx}
                            cardData={cardData}
                            isOwned={false}
                            inSettings={false}
                          />
                        );
                      },
                    )}
                  </div>
                ) : (
                  <div className="mt-8 shadow-md mx-auto bg-cardsBackground bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[450px] flex justify-center items-center text-center">
                    <p className="text-primary text-sm opacity-80 p-6">
                      No cards have been shared with you yet. Once someone
                      shares a card with you, it will appear here.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </motion.div>
    </>
  );
};

export default Profile;
