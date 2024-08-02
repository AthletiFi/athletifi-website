'use client';
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { ICards } from '@/types/User.type';
import { Invites } from '@/types/User.type';
import { sourceSans3 } from '@/app/utils/helpers';
import {
  invitationAction,
  inviteRevokeAction,
  inviteDeclineAction,
} from '@/app/actions/invitationAction';

interface ICardThumbnailProps {
  cardData: ICards;
  allInvites: Invites[] | null;
  isOwned: boolean;
  inSettings: boolean;
}

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
/////////////////////filter only invites for this card, filter the duplicated emails.
const filterAndKeepBestInvite = (
  invites: Invites[],
  cardId: string | null,
): Invites[] => {
  if (!cardId) return [];
  const inviteMap: { [email: string]: Invites } = {};
  invites
    .filter((invite) => invite.card_image_id === cardId)
    .forEach((invite) => {
      const email = invite.guest_email;
      if (email) {
        // If there's no existing invite, or the current one is better, replace it
        if (
          !inviteMap[email] ||
          (invite.invite_status !== 'revoked' &&
            inviteMap[email].invite_status === 'revoked') ||
          (invite.invite_status === 'accepted' &&
            inviteMap[email].invite_status === 'pending')
        ) {
          inviteMap[email] = invite;
        }
      }
    });

  return Object.values(inviteMap);
};

const getFilteredInvites = (
  invites: Invites[],
  cardData: ICards,
): Invites[] => {
  const typeOwnerInvitationFilter = invites.filter(
    (invitation) => invitation.inviter_email !== invitation.guest_email,
  );
  const cardId = cardData.card_id;
  if (cardId) {
    return filterAndKeepBestInvite(typeOwnerInvitationFilter, cardId);
  }
  return [];
};

const CardThumbnail: React.FC<ICardThumbnailProps> = ({
  cardData,
  allInvites,
  isOwned,
  inSettings,
}) => {
  const router = useRouter();
  const filteredInvites = allInvites
    ? getFilteredInvites(allInvites, cardData)
    : [];

  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<{ name: string; email: string }>( //stored data from form
    {
      name: '',
      email: '',
    },
  );
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false); //to render success message when submit
  const [dupeInvite, setDupeInvite] = useState<{
    isDupe: boolean;
    email: string;
  }>({
    isDupe: false,
    email: '',
  });
  const [declinedInviteId, setDeclinedInviteId] = useState<string | null>(null);
  const [revokeSubmittedId, setRevokeSubmittedId] = useState<string | null>(
    null,
  );
  const { name, team, club, card_image_url, number, club_logo } = cardData;
  const handleGoToDashboard = (slug: string | null) => {
    //go to dashboard click
    router.push(`/dashboard/${slug}`);
  };

  ////////////////////////////////////////email invite
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvitation((prevInvitation) => ({
      ...prevInvitation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cardID = cardData.card_id;
    if (formData.get('email') && cardID) {
      invitationAction(cardID, formData)
        .then((response) => {
          if (
            response.message ===
            'WARNING: Invite to the same guest is already pending. No changes made.'
          ) {
            setDupeInvite({
              isDupe: true,
              email: invitation.email,
            });
            setInvitation({ name: '', email: '' });

            // Delay the toggle by 5 seconds
            return new Promise<void>((resolve) => {
              setTimeout(() => {
                setDupeInvite({
                  isDupe: false,
                  email: '',
                });
                resolve();
              }, 5000);
            });
          } else {
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
          }
        })
        .catch((error) => console.error('Failed to send invitation', error));
    } else {
      console.warn('invalid email');
    }
  };

  const triggerRevoke = (
    inviteId: string | null,
    card_name?: string | null,
  ) => {
    inviteRevokeAction(inviteId, card_name)
      .then(() => {
        setRevokeSubmittedId(inviteId);
        setTimeout(() => {
          setRevokeSubmittedId(null);
        }, 3000);
      })
      .catch((error) => console.error('Failed to revoke invitation', error));
  };

  const triggerDecline = (
    inviteId: string | null,
    owner_email?: string | null,
    card_name?: string | null,
  ) => {
    inviteDeclineAction(inviteId, owner_email, card_name)
      .then(() => {
        setDeclinedInviteId(inviteId);
        setTimeout(() => {
          setRevokeSubmittedId(null);
        }, 3000);
        // triggerReRender();
      })
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
                className="relative w-24 h-28 justify-end cursor-pointer"
                onClick={() => handleGoToDashboard(cardData.dashboard_slug)}
              >
                <Image
                  src={card_image_url as string}
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
                  {number && (
                    <p className="leading-4 text-primary opacity-80 lg:max-w-769 relative">
                      #{number}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="h-1 bg-partnersBorders w-full md:w-0 opacity-20"></div>
            <div className="w-full px-2px md:px-[4px] lg:ml-6 md:max-w-[520px]">
              <p className="font-extralight mt-2">
                Manage guests for this card
              </p>
              {/* add list of guests / render conditionally */}
              <div className="mt-4">
                <div className="flex flex-col">
                  {filteredInvites.map((invite, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col py-6 border-b border-partnersBorders border-opacity-50"
                    >
                      <div className="flex  justify-between min-h-12 items-center  ">
                        <div className="flex flex-wrap gap-2 items-center max-w-[260px] md:max-w-none">
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
                            onClick={() => {
                              triggerRevoke(invite.invite_id, cardData.name);
                            }}
                          >
                            <div className={`mx-[6px] md:mx-4`}>revoke</div>
                            <FontAwesomeIcon
                              className="text-chartRed text-md md:text-2xl"
                              icon={faXmark}
                            />
                          </div>
                        )}
                      </div>
                      {revokeSubmittedId === invite.invite_id && (
                        <p className="text-xs text-offwhite mt-2 text-end">
                          Revoked successfully. We will notify your guest
                          shortly.
                        </p>
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
                            onSubmit={handleSubmit}
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
                        {dupeInvite.isDupe && (
                          <p className="text-sm mb-6 text-start text-chartYellow lg:max-w-769 relative min-w-[256px] transition-opacity duration-300 opacity-100">
                            This user <strong>{dupeInvite.email}</strong> is
                            already an active guest for this card.
                          </p>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          // render owned cards in profile page
          <>
            <div className="flex justify-between flex-col md:flex-row items-center w-full">
              <div className="relative w-[300px] h-[350px] md:w-[160px] md:h-[210px]">
                {card_image_url ? (
                  <Image
                    src={card_image_url}
                    alt="Card Thumbnail"
                    layout="fill"
                    objectFit="contain"
                  />
                ) : (
                  <Image
                    src={card_image_url as string}
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
                    {number && (
                      <p
                        className={`text-primary opacity-80 lg:max-w-769 relative`}
                      >
                        #{number}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col my-6 md:mx-4 gap-2 items-center justify-center">
                <button
                  className="text-darkgray w-[140px] md:w-[160px] h-8 bg-skyblue text-xs md:text-sm rounded-full font-normal hover:opacity-90 transform hover:scale-95 ease-in-out"
                  onClick={() => handleGoToDashboard(cardData.dashboard_slug)}
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
                        : 'Invite someone to view this player card by providing their information below.'}
                    </p>
                    {!emailSubmitted && (
                      <form
                        className="w-full flex flex-col md:flex-row gap-3 justify-end"
                        onSubmit={handleSubmit}
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
                    {dupeInvite.isDupe && (
                      <p className="text-sm mb-6 text-start text-chartYellow lg:max-w-769 relative min-w-[256px] transition-opacity duration-300 opacity-100">
                        This user <strong>{dupeInvite.email}</strong> is already
                        an active guest for this card.
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )
      ) : inSettings ? (
        // render guest card in settings
        <div className="rounded bg-cardsDark p-2 md:py-8 mb-4 shadow-portalNav flex flex-col md:flex-row content-start md:flex-nowrap justify-around items-start gap-2 md:gap-4">
          <div className="flex justify-start items-start min-w-[250px]">
            <div
              className="relative w-24 h-28 justify-end cursor-pointer"
              onClick={() => handleGoToDashboard(cardData.dashboard_slug)}
            >
              <Image
                src={card_image_url as string}
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
                {number && (
                  <p className="leading-4 text-primary opacity-80 lg:max-w-769 relative">
                    #{number}
                  </p>
                )}
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
                    {cardData.inviter_email}
                  </p>
                </div>
                <div
                  className="flex items-center justify-end cursor-pointer"
                  onClick={() => {
                    triggerDecline(
                      cardData.invite_id as string,
                      cardData.inviter_email,
                      cardData.name,
                    );
                    setDeclinedInviteId(cardData.invite_id as string);
                  }}
                >
                  <div className="text-sm py-4 mx-2 md:mx-4 text-end">
                    Opt out
                  </div>
                  <FontAwesomeIcon
                    className="text-chartRed text-md md:text-2xl"
                    icon={faXmark}
                  />
                </div>
              </div>
              {declinedInviteId === cardData.invite_id && (
                <p className="text-xs text-primary mt-1">
                  We will notify the owner you decline this invitation
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // render guest card in profile page
        <div className="flex flex-col bg-cardsBackground min-w-[280px] w-full md:w-[350px] lg:w-[320px] min-h-[200px] rounded-lg justify-between p-0 my-6 shadow-lg">
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
              {number && (
                <p
                  className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative`}
                >
                  #{number}
                </p>
              )}
            </div>
            <div className="-mt-0 md:-mt-6 w-full md:w-1/2 h-56 md:h-36 relative">
              {card_image_url ? (
                <Image
                  src={card_image_url}
                  alt="Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src={card_image_url as string}
                  alt="Default Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
          </div>
          <div className="w-full flex justify-end pb-4 pr-4">
            <button
              onClick={() => handleGoToDashboard(cardData.dashboard_slug)}
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
  cardData: ICards | null | undefined;
  allInvites: Invites[] | null;
  isOwned: boolean;
  inSettings: boolean;
}> = ({ cardData, allInvites, isOwned, inSettings }) => {
  if (!cardData) {
    return (
      <div className="card-thumbnail-error">Card data is not available.</div>
    );
  }

  return (
    <CardThumbnail
      cardData={cardData}
      allInvites={allInvites}
      isOwned={isOwned}
      inSettings={inSettings}
    />
  );
};

export default RenderCardThumbnail;
