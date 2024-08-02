'use client';

import { motion } from 'framer-motion';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';
import {
  ICards,
  UserData,
  emptyGuestCard,
  emptyOwnedCard,
} from '@/types/User.type';
import ProfileHeader from '@/components/user-portal/ProfileHeader';

//motion variants to animate the team bars
const variants = {
  initial: { y: 100 },
  animate: {
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function ProfileMain({ userData }: { userData: UserData }) {
  const ownedCardsData =
    userData.owned_cards === null ? [emptyOwnedCard] : userData.owned_cards;
  const guestCardsData =
    userData.guest_cards === null ? [emptyGuestCard] : userData.guest_cards;

  const acceptedGuestCards = guestCardsData.filter(
    (card) => card.status === 'accepted',
  );

  // ADD SKELETON
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden"
      >
        <div className="absolute top-0 left-0 bg-gradient-to-r from-cardsDark2 to-cardsBackground h-[280px] lg:h-[330px] w-full -z-10"></div>
        <main className="mx-2 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
          <ProfileHeader pageTitle={'Cards'} userData={userData} />
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center mt-4 md:pt-7"
          >
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
                      (cardData: ICards, idx: React.Key | null | undefined) => {
                        if (!cardData.card_id) {
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
                            cardData={cardData}
                            allInvites={userData.invites}
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
                      (cardData: ICards, idx: React.Key | null | undefined) => {
                        if (!cardData) {
                          return null;
                        }
                        return (
                          <RenderCardThumbnail
                            key={idx}
                            cardData={cardData}
                            allInvites={userData.invites}
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
}
