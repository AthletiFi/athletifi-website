import Link from 'next/link';
import Header from '@/components/common/Header';
import ProfileHeader from '@/components/user-portal/ProfileHeader';
import BackToTop from '@/components/common/BackToTop';
import Footer from '@/components/common/Footer';
import Accordion from '@/components/user-portal/FAQ';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { addUserPostSignIn } from '@/app/actions/userDataActions';
import { getUserData } from '@/app/utils/fetchHelper';
import { invitationData, UserData } from '@/types/User.type';
import { redirect } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faFlag,
  faPaperPlane,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import InviteModal from '@/components/common/InviteModal';

export default async function HelpPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const auth = await isAuthenticated();
  if (!auth.isSignedIn) redirect('/login?redirect=/help-support');

  let inviteData = undefined;
  if (searchParams?.invite_id) {
    try {
      inviteData = await addUserPostSignIn(
        searchParams.invite_id,
        auth.userId,
        auth.name,
        auth.userId,
      );
    } catch (error) {
      console.error('Error adding user post sign-in: error');
    }
  }
  const userData = await getUserData(auth);

  return (
    <>
      <Header userData={userData as UserData} />
      <InviteModal inviteData={inviteData as invitationData | undefined} />
      <main className="${sourceSans3.className} overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground w-full">
        {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${sourceSans3.className} overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground w-full`}
      > */}
        <div className="mx-4 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-sm md:text-base">
          <ProfileHeader
            pageTitle={'Help & Support'}
            userData={userData as UserData}
          />
          <div className="flex justify-center">
            <div className="flex flex-col w-full justify-center max-w-[880px]">
              <div className="shadow-portalNav">
                <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-2 md:px-4">
                  Frequently asked questions
                </h2>
              </div>
              <div className="flex justify-center">
                <Accordion faqData={[]} />
              </div>
              <div className="h-px w-full bg-partnersBorders opacity-20 my-12"></div>
              <div>
                <p className="text-primary text-sm md:text-base mb-6">
                  Can’t find what you are looking for?
                </p>

                <div className="w-full flex justify-between bg-cardsDark py-2 px-6 rounded-10 shadow-portalNav">
                  <a
                    href="mailto:send-an-email@athleti.fi?subject=Question%20about%20AthletiFi&body=Dear%20Support%20Team,%0D%0A%0D%0AI%20have%20a%20question%20regarding%20your%20website.%0D%0A%0D%0A[Please%20provide%20more%20details%20about%20your%20inquiry]%0D%0A%0D%0AThank%20you%20for%20your%20assistance.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]"
                    className="flex my-4"
                  >
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="text-skyblue mr-3"
                    />
                    <p className="text-primary text-sm md:text-base font-extralight">
                      Send an email
                    </p>
                  </a>
                  <a
                    href="mailto:chat-with-us@athleti.fi?subject=Chat%20Request&body=Dear%20Support%20Team,%0D%0A%0D%0AI%20would%20like%20to%20chat%20with%20a%20representative%20regarding%20a%20question%20I%20have.%0D%0A%0D%0A[Please%20provide%20more%20details%20about%20your%20chat%20request]%0D%0A%0D%0AThank%20you%20for%20your%20assistance.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]"
                    className="flex my-4"
                  >
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="text-skyblue mr-3"
                    />
                    <p className="text-primary text-sm md:text-base font-extralight">
                      Chat with us
                    </p>
                  </a>
                </div>
              </div>
              <div className="h-px w-full bg-partnersBorders opacity-20 my-12"></div>
              <div className="" id="report-a-problem">
                <div className="flex my-4">
                  <a
                    href="mailto:report-a-problem@athleti.fi?subject=Problem%20Report&body=Description%20of%20the%20Problem:%0D%0A[Please%20describe%20the%20problem%20you%20encountered%20in%20detail]%0D%0A%0D%0AWhat%20were%20you%20trying%20to%20do%20when%20the%20problem%20occurred?%0D%0A[Explain%20what%20you%20were%20attempting%20to%20do%20on%20the%20website]%0D%0A%0D%0AWhat%20did%20you%20expect%20to%20happen?%0D%0A[Describe%20what%20you%20thought%20should%20have%20happened]%0D%0A%0D%0AWhat%20actually%20happened?%0D%0A[Describe%20what%20occurred%20instead]%0D%0A%0D%0AAny%20additional%20information%20that%20might%20be%20helpful:%0D%0A[Feel%20free%20to%20include%20any%20other%20details,%20such%20as%20screenshots%20or%20links,%20that%20could%20assist%20us%20in%20understanding%20the%20problem]%0D%0A%0D%0AThank%20you%20for%20bringing%20this%20to%20our%20attention.%20We%20appreciate%20your%20help%20in%20improving%20our%20website.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]"
                    className="flex my-4"
                  >
                    <FontAwesomeIcon
                      className="text-skyblue mr-3"
                      icon={faFlag}
                    />
                    <p className="text-primary text-sm md:text-base">
                      Report a problem
                    </p>
                  </a>
                </div>

                <div className="flex items-center cursor-pointer">
                  <div className="flex my-4">
                    <FontAwesomeIcon
                      className="text-skyblue mr-3"
                      icon={faCircleInfo}
                    />
                    <p className="text-primary text-sm md:text-base">
                      <Link
                        href="/terms-of-use"
                        className="hover:text-skyblue hover:underline"
                      >
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privacy-policy"
                        className="hover:text-skyblue hover:underline"
                      >
                        Policies
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
        <Footer />
        {/* </motion.div> */}
      </main>
    </>
  );
}
