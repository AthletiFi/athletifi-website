'use client';
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from 'react';
import Image from 'next/image';
import { IProfileProps } from '@/types/Dashboard.type';
import { Source_Sans_3 } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAtomValue, useAtom } from 'jotai';
import { invitesDataAtom } from '@/states/invitesDataStore';
import { inviteRevokeActionAtom } from '@/states/InviteRevokeStore';
import { useRouter } from 'next/navigation';

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

const CardThumbnail: React.FC<{
  cardData: any;
  isOwned: boolean;
  inSettings: boolean;
}> = ({ cardData, isOwned, inSettings }) => {
  const [, inviteRevokeAction] = useAtom(inviteRevokeActionAtom);
  const router = useRouter();
  console.log('cardData in the cardThumbnail', cardData);
  //  this is the function i craeted to test the logic of the revoke and invite. the action adn guest_email params are manually set.
  // const triggerRevokeOrInvite = () => {
  //   console.log('clicked');
  //   inviteRevokeAction({
  //     action: 'revoke', // this is either 'revoke' or 'invite'.
  //     guest_email: 'haacny86+agudelo@gmail.com',
  //     card_image_id: cardData.guestCardInfo.card_id, // this card_image_id need to change according to the action. revoke the info is gotten from guest cards while invite from the owned cards.
  //     //card_image_id: cardData.ownedCardInfo.card_id, // this card_image_id need to change according to the action. revoke the info is gotten from guest cards while invite from the owned cards.
  //     inviteId: cardData.guestCardInfo.invite_id,
  //   });
  // };

  //filter card status

  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<{ name: string; email: string }>( //stored data from form
    {
      name: '',
      email: '',
    },
  );
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false); //to render success message when submit
  const [declinedInviteId, setDeclinedInviteId] = useState<string | null>(null);

  const { name, team, club, card_url, number, club_logo } = cardData.result;

  const handleGoToDashboard = (slug: string) => {
    //go to dashboard click
    router.push(`/dashboard/${slug}`);
  };

  //atom to render the invites
  const invites = useAtomValue(invitesDataAtom);
  console.log(invites);
  ////////////////////////////////////////email invite
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvitation((prevInvitation) => ({
      ...prevInvitation,
      [name]: value,
    }));
  };
  //when submit, action to "invite", render success message, clear from and close toggle
  const emailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (invitation.email) {
      inviteRevokeAction({
        action: 'invite',
        guest_email: invitation.email,
        card_image_id: cardData.ownedCardInfo.card_id,
      })
        .then(() => {
          setEmailSubmitted(true);
          setInvitation({ name: '', email: '' });

          // Delay the toggle by 2 seconds
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              setIsToggle(false);
              setEmailSubmitted(false);
              resolve();
            }, 3000);
          });
        })
        .catch((error) => console.error('Failed to send invitation', error));
    } else {
      console.log('invalid email');
    }
  };
  /////////////////////// action to "revoke"
  const triggerRevokeOrInvite = (inviteId: string) => {
    inviteRevokeAction({
      action: 'revoke',
      inviteId: inviteId,
    })
      .then(() => console.log('Revoke successful'))
      .catch((error) => console.error('Failed to revoke invitation', error));
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //IN CASE THE LOGIC IS THE SAME, ADD ACTION DECLINE ?
  const triggerDecline = (inviteId: string) => {
    inviteRevokeAction({
      action: 'decline',
      inviteId: inviteId,
    })
      .then(() => console.log('Decline successful'))
      .catch((error) => console.error('Failed to decline invitation', error));
  };

  //////////////////////////////////////////////
  const formRef = useRef<HTMLDivElement>(null); // Track the form element
  useOutsideClick(formRef, () => {
    if (emailSubmitted) {
      setIsToggle(false);
      setEmailSubmitted(false); // Reset the emailSubmitted state
    }
  });

  const cardRef = useRef<HTMLDivElement>(null); //track element to click outside the form
  useOutsideClick(cardRef, () => setIsToggle(false));

  return (
    <div ref={cardRef} className={`${isOwned || inSettings ? 'w-full' : ''}`}>
      {isOwned ? (
        inSettings ? (
          <div className="rounded bg-cardsDark p-4 md:py-8 mb-4 shadow-portalNav flex flex-col md:flex-row content-start md:flex-nowrap justify-around items-start gap-4">
            <div className="flex justify-start items-start min-w-[260px]">
              <div
                className="relative w-24 h-28 justify-end"
                onClick={() =>
                  handleGoToDashboard(cardData?.ownedCardInfo.dashboard_slug)
                }
              >
                <Image
                  src={card_url as string}
                  alt="Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex mt-2 flex-col flex-shrink">
                <h2 className="mx-[6px] mb-[6px] font-bold text-md text-primary">
                  {name}
                </h2>
                <div className="mx-[6px] flex flex-col text-sm flex-1">
                  <p className="pb-1 leading-4 text-primary opacity-80 relative">
                    {club}
                  </p>
                  <p className="pb-1 leading-4 text-primary opacity-80 relative">
                    {team}
                  </p>
                  <p className="leading-4 text-primary opacity-80 lg:max-w-769 relative">
                    #{number}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-1 bg-partnersBorders w-full md:w-0 opacity-20"></div>
            <div className="w-full px-2px md:px-[4px] lg:ml-6 md:max-w-[520px]">
              <p className="font-extralight mt-2">
                Manage guests for this card
              </p>
              {/* add list of guests / render conditionally */}
              {/* filter the guests to the rendered card */}
              <div className="mt-4">
                <div className="flex flex-col">
                  {invites
                    .filter(
                      (invite) =>
                        invite.card_image_id === cardData.ownedCardInfo.card_id,
                    )
                    .map((invite, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between min-h-12 items-center border-b border-partnersBorders border-opacity-50 py-6"
                      >
                        <div className="flex flex-wrap gap-2 items-center max-w-[260px] md:max-w-none">
                          {/* if status is pending, add label */}
                          {invite.invite_status === 'pending' && (
                            <span className="text-xs md:text-sm bg-chartYellow rounded-[4px] px-2 py-[4px]">
                              Pending
                            </span>
                          )}
                          {invite.invite_status === 'revoked' && (
                            <span className="text-xs md:text-sm bg-chartRed rounded-[4px] px-2 py-[4px]">
                              Revoked
                            </span>
                          )}
                          {invite.invite_status === 'accepted' && (
                            <span className="text-xs md:text-sm bg-chartBlue rounded-[4px] px-2 py-[4px]">
                              Accepted
                            </span>
                          )}
                          <p className="text-sm md:text-base max-w-[220px] md:max-w-none break-words">
                            {invite.guest_email}
                          </p>
                        </div>
                        {invite.invite_status !== 'revoked' && (
                          <div
                            className="flex items-center cursor-pointer justify-end"
                            onClick={() =>
                              triggerRevokeOrInvite(invite.invite_id)
                            }
                          >
                            <div className={`mx-[6px] md:mx-4`}>revoke</div>
                            <FontAwesomeIcon
                              className="text-chartRed text-md md:text-2xl"
                              icon={faXmark}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                <div
                  className="w-full flex justify-between items-center mt-4"
                  onClick={() => setIsToggle(!isToggle)}
                  ref={cardRef}
                >
                  {!isToggle && (
                    <>
                      <p>New guest</p>
                      <button
                        className="flex items-center cursor-pointer"
                        type="submit"
                      >
                        <div className="flex justify-between items-center py-4 text-sm mx-[6px] md:mx-4">
                          invite
                        </div>
                        <FontAwesomeIcon
                          className=" text-skyblue text-md md:text-2xl"
                          icon={faPlus}
                        />
                      </button>
                    </>
                  )}
                </div>
                <AnimatePresence>
                  {isToggle && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { height: 'auto' },
                        collapsed: { height: 0 },
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="w-full"
                    >
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 100 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.08,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="py-6"
                      >
                        <p className="text-sm mb-6 text-start text-primary lg:max-w-769 relative min-w-[256px] transition-opacity duration-300 opacity-100">
                          {emailSubmitted
                            ? 'Invitation sent! Your card is now accessible to your guest. We will notify them shortly.'
                            : 'Invite someone to view this player card by providing their information below.'}
                        </p>
                        {!emailSubmitted && (
                          <form
                            className="w-full flex flex-col gap-3 items-end"
                            onSubmit={emailSubmit}
                          >
                            <input
                              type="text"
                              name="name"
                              value={invitation.name}
                              placeholder="Type guest name here"
                              className="h-8 text-sm bottom-0 left-0 w-full md:max-w-[460px] p-3 border border-partnersBorders rounded text-offwhite focus:text-primary bg-cardsBackground"
                              onChange={handleChange}
                            />
                            <input
                              type="email"
                              name="email"
                              value={invitation.email}
                              placeholder="Type email here"
                              className="h-8 text-sm bottom-0 left-0 w-full md:max-w-[460px] p-3 border border-partnersBorders rounded text-offwhite focus:text-primary bg-cardsBackground"
                              onChange={handleChange}
                            />
                            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="h-8 py-3 px-6 text-sm leading-6 flex items-center justify-center bg-darkerSkyBlue rounded"
                              >
                                Send invitation
                              </button>
                              <button
                                type="button"
                                className="h-8 py-3 px-6 text-sm leading-6 flex items-center justify-center bg-chartRed rounded text-white"
                                onClick={() => setIsToggle(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          // render owend cards in profila page
          <>
            <div className="flex justify-between flex-col md:flex-row items-center w-full">
              <div className="relative w-[300px] h-[350px] md:w-[160px] md:h-[210px]">
                {card_url ? (
                  <Image
                    src={card_url}
                    alt="Card Thumbnail"
                    layout="fill"
                    objectFit="contain"
                  />
                ) : (
                  <Image
                    src={card_url as string}
                    alt="Default Card Thumbnail"
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
              <div className="flex flex-col lg:flex-row gap-[12px] items-center flex-1 lg:justify-evenly">
                <h2 className="leading-8 font-bold text-[28px] md:text-[24px] text-primary text-center">
                  {name}
                </h2>

                <div className="flex gap-4">
                  <div className="w-16 h-18 relative">
                    <Image
                      src={club_logo as string}
                      alt="club crest"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="gap-1 flex flex-col text-sm">
                    <p className={`text-primary opacity-80 relative`}>{club}</p>
                    <p className={`text-primary opacity-80 relative`}>{team}</p>
                    <p
                      className={`text-primary opacity-80 lg:max-w-769 relative`}
                    >
                      #{number}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col my-6 md:mx-4 gap-2 items-center justify-center">
                <button
                  className="text-darkgray w-[140px] md:w-[160px] h-8 bg-skyblue text-xs md:text-sm rounded-full font-normal hover:opacity-90 transform hover:scale-95 ease-in-out"
                  onClick={() =>
                    handleGoToDashboard(cardData?.ownedCardInfo.dashboard_slug)
                  }
                >
                  go to dashboard
                </button>
                <button
                  className="text-primary w-[140px] md:w-[160px] h-8 text-xs md:text-sm border border-offwhite rounded-full font-extralight bg-transparent hover:bg-skyblue hover:border-skyblue transform hover:scale-95 ease-in-out"
                  onClick={() => setIsToggle(!isToggle)}
                >
                  share access to card
                </button>
              </div>
            </div>
            <AnimatePresence>
              {isToggle && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { height: 'auto' },
                    collapsed: { height: 0 },
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  className="px-3 w-full flex justify-center md:justify-end max-w-[980px] md:max-w-none"
                >
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.08,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="mt-2 mb-8 flex flex-col justify-end lg:gap-3 "
                  >
                    <p
                      className={`text-sm mb-2 lg:mb-0 text-offwhite relative min-w-[216px] transition-opacity duration-300 opacity-100 md:mr-4 ${emailSubmitted ? 'bg-cardsDark rounded-10' : ''}`}
                    >
                      {emailSubmitted
                        ? 'Invitation sent! Your card is now accessible to your guest. We will notify them shortly.'
                        : 'Invite someone to view this card'}
                    </p>
                    {!emailSubmitted && (
                      <form
                        className="w-full flex flex-col md:flex-row gap-3 justify-end"
                        onSubmit={emailSubmit}
                      >
                        <input
                          type="text"
                          name="name"
                          value={invitation.name}
                          placeholder="Type guest name here"
                          className="h-8 text-sm bottom-0 left-0 w-full md:max-w-[460px] p-3 border border-partnersBorders rounded text-offwhite focus:text-primary bg-cardsBackground"
                          onChange={handleChange}
                        />
                        <input
                          type="email"
                          name="email"
                          value={invitation.email}
                          placeholder="Type email here"
                          className="h-8 text-sm bottom-0 left-0 w-full md:max-w-[460px] p-3 border border-partnersBorders rounded text-offwhite focus:text-primary bg-cardsBackground"
                          onChange={handleChange}
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="py-3 px-6 w-[146px] md:w-[150px] h-8 text-xs md:text-sm leading-6 flex items-center justify-center bg-darkerSkyBlue rounded "
                          >
                            Send invitation
                          </button>
                          <button
                            type="button"
                            className="h-8 py-3 px-6 text-sm leading-6 flex items-center justify-center bg-chartRed rounded text-white"
                            onClick={() => setIsToggle(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )
      ) : inSettings ? (
        // render guest card in settings
        <div className="rounded bg-cardsDark p-4 md:py-8 mb-4 shadow-portalNav flex flex-col md:flex-row content-start md:flex-nowrap justify-around items-start gap-2 md:gap-4">
          <div className="flex justify-start items-start min-w-[250px]">
            <div
              className="relative w-24 h-28 justify-end"
              onClick={() =>
                handleGoToDashboard(cardData?.guestCardInfo.dashboard_slug)
              }
            >
              <Image
                src={card_url as string} // Cast card_url to string
                alt="Card Thumbnail"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex mt-2 flex-col flex-shrink">
              <h2 className="mx-[6px] mb-[6px] font-bold text-md text-primary">
                {name}
              </h2>
              <div className="mx-[6px] flex flex-col text-sm flex-1">
                <p className="pb-1 leading-4 text-primary opacity-80 relative">
                  {club}
                </p>
                <p className="pb-1 leading-4 text-primary opacity-80 relative">
                  {team}
                </p>
                <p className="leading-4 text-primary opacity-80 lg:max-w-769 relative">
                  #{number}
                </p>
              </div>
            </div>
          </div>
          <div className="h-1 bg-partnersBorders w-full opacity-20 md:w-0"></div>
          <div className="flex flex-col justify-between w-full mt-2 md:max-w-[500px] px-[4px] lg:ml-8">
            <div className="items-start mt-0 w-full">
              <p className="font-extralight text-base">Card owner</p>
              <div className="flex justify-between items-center">
                <div className="text-sm flex flex-col">
                  <p className="md:text-center font-extralight">
                    {cardData?.guestCardInfo?.inviter_email}
                  </p>
                </div>
                <div
                  className="flex items-center justify-end cursor-pointer"
                  onClick={() => {
                    console.log('decline successful, change status');
                    //triggerDecline(invite.invite_id);
                    setDeclinedInviteId(cardData?.guestCardInfo.invite_id);
                  }}
                >
                  <div className="text-sm py-4 mx-2 md:mx-4 text-end">
                    decline
                  </div>
                  <FontAwesomeIcon
                    className="text-chartRed text-md md:text-2xl"
                    icon={faXmark}
                  />
                </div>
              </div>
              {declinedInviteId === cardData?.guestCardInfo.invite_id && (
                <p className="text-xs text-primary mt-1">
                  We will notify the owner you decline this invitation
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // render guest card in profile page
        <div className="flex flex-col bg-cardsBackground min-w-[250px] w-full max-w-[280px] md:w-[350px] lg:w-[320px] min-h-[200px] rounded-lg justify-between p-0 my-6 shadow-lg">
          <div className="flex flex-col-reverse md:flex-row justify-between min-h-[160px] mx-4 md:mx-0">
            <div className="flex flex-col justify-start ml-[4px] md:ml-3 w-full md:w-1/2 mr-auto mb-2 mt-4 md:mt-8">
              <h2
                className={`${sourceSans3.className} mb-2 font-bold text-[20px] text-primary relative mr-auto`}
              >
                {name}
              </h2>
              <p
                className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative w-[170px]`}
              >
                {club}
              </p>
              <p
                className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative`}
              >
                {team}
              </p>
              <p
                className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative`}
              >
                #{number}
              </p>
            </div>
            <div className="-mt-0 md:-mt-6 w-full md:w-1/2 h-56 md:h-36 relative">
              {card_url ? (
                <Image
                  src={card_url}
                  alt="Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src={card_url as string}
                  alt="Default Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
          </div>
          <div className="w-full flex justify-end pb-4 pr-4">
            <button
              // onClick={triggerRevokeOrInvite}
              onClick={() =>
                handleGoToDashboard(cardData?.guestCardInfo.dashboard_slug)
              }
              className="text-darkgray w-[130px] md:w-[160px] h-8 bg-skyblue text-sm rounded-full font-normal hover:opacity-90 transform hover:scale-95 ease-in-out"
            >
              go to dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RenderCardThumbnail: React.FC<{
  cardData: any | null | undefined;
  isOwned: boolean;
  inSettings: boolean;
}> = ({ cardData, isOwned, inSettings }) => {
  if (!cardData) {
    return (
      <div className="card-thumbnail-error">Card data is not available.</div>
    );
  }

  return (
    <CardThumbnail
      cardData={cardData}
      isOwned={isOwned}
      inSettings={inSettings}
    />
  );
};

export default RenderCardThumbnail;
