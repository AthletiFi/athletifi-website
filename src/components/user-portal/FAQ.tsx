'use client';

import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQData {
  question: string;
  answer: string;
}
const faqs = [
  {
    question: `What is the AthletiFi Dashboard, and who is it for?`,
    answer: `The AthletiFi Dashboard is a digital platform that offers in-depth analytics on young soccer players' performance. It's made for players, their families and friends, and anyone who loves soccer to easily check out how players are doing on the field, with highlights of their best moments and detailed looks at their skills and progress over time. AthletiFi aims to make complex soccer data more accessible and engaging for everyone, bridging the gap between the technicalities of sports performance analytics and everyday soccer fans`,
  },
  {
    question: `How do I gain access to a player's dashboard using the player card?`,
    answer: `To access a player's dashboard, simply scan the QR code found on their digital or physical player card. Once scanned, the QR code will automatically bring you to a comprehensive digital dashboard showcasing detailed player statistics, performance trends, video highlights, and soon even live game streams. `,
  },
  {
    question: `How are the player statistics on the dashboard calculated?`,
    answer: `AthletiFi's dashboard player statistics are meticulously calculated through an in-house process that harnesses advanced algorithms that analyze game footage and performance data. These algorithms focus on key performance indicators such as goals, assists, pass accuracy, and others which offer insights into a player's skills and potential for development. These algorithms also track trends in performance over time to ensure accurate and meaningful insights into each player's abilities and progress. For example, if a player's goal-scoring rate increases significantly during the latter part of the season, the algorithm highlights this as a positive trend. Conversely, if there's a notable drop in defensive contributions, it flags this area for potential improvement. This temporal analysis is crucial for understanding how a player develops and adapts throughout the season.`,
  },
  {
    question: `Where do the videos and highlights on the dashboard come from?`,
    answer: `AthletiFi equips participating teams with state-of-the-art, AI-powered 8K cameras that feature automatic pan-and-scan technology, ensuring comprehensive coverage of the game from every angle. The highlights are then created automatically using AthletiFi's proprietary algorithms, which pinpoint key events in a match to generate highlights of the plays you want to see.`,
  },
  {
    question: `What can I do on the AthletiFi Dashboard?`,
    answer: `On the AthletiFi Dashboard, you can dive deep into the world of young soccer talent and their progress. You can track a player’s journey through comprehensive statistics that highlight everything from game-by-game performance to skill ratings and developmental progress over time. Not only does it offer numerical data, but it also brings these numbers to life through video highlights. These clips showcase key moments and notable performances from games, allowing you to visually appreciate the talents and skills of future soccer stars.`,
  },
  {
    question: `What privacy protections are in place for players and their data?`,
    answer: `AthletiFi takes the privacy and protection of player data very seriously, implementing several measures to ensure that all information is handled with the utmost security and confidentiality. AthletiFi adheres to strict data protection laws, such as GDPR, ensuring that personal and performance information is collected and processed with clear consent from individuals or their guardians. Advanced security measures, including encryption for stored and transmitted data and regular security assessments, safeguard against unauthorized access. Access to sensitive information is tightly controlled, limiting it to authorized personnel only. AthletiFi is committed to transparency, informing users about data collection, usage, and sharing practices.`,
  },
  {
    question: `Can coaches and recruiters use the dashboard to identify and track talent?`,
    answer: `This is a future feature we are excited to be working on. Once implemented, it will allow coaches and recruiters to use the dashboard to identify and monitor emerging soccer talent. This service will be designed with privacy in mind, offering players and their families the ability to opt in or out. If you have any thoughts or suggestions about this future feature, we'd love to hear from you! Your feedback is crucial in helping us shape a platform that meets the needs of our community.`,
  },
  {
    question: `How often is the player data on the dashboard updated?`,
    answer: `Player data on the dashboard is updated regularly, ensuring that the latest performance stats and video highlights are available. After each game or recorded training session, the dashboard is refreshed within 1-2 days to reflect the most current insights. We are actively working to bring this turnaround time to less than 24 hours.`,
  },
  {
    question: `Are there any fees associated with using the AthletiFi Dashboard?`,
    answer: `Access to basic features of the AthletiFi Dashboard is free, providing a comprehensive overview of player performance. Premium features, such as in-depth analytics and exclusive video content, may require a subscription or one-time fee, with details available on our website.`,
  },
  {
    question: `How does the AthletiFi Dashboard support player development and engagement?`,
    answer: `The AthletiFi Dashboard significantly enhances player development and engagement by offering a dynamic and detailed view of young soccer players' performances, making it an essential tool for players, families, and coaches alike. By providing real-time updates on performances, including comprehensive stats and video highlights, it helps players pinpoint their strengths and areas for improvement. This visibility motivates players and supports a feedback loop that is critical for growth. The dashboard also fosters a sense of community by enabling easy sharing and discussion of these insights, thereby connecting families and coaches in a supportive network.`,
  },
  {
    question: `Can parents share their child's accomplishments through the dashboard?`,
    answer: `Yes! Parents can share their child's accomplishments and progress by inviting other users to view the player card directly on the dashboard. You can also remove access to anyone you invited at any time. This helps keep access to your child's data fully in your control, while allowing you to easily share important milestones and data with family, friends, coaches, or recruiters as you see fit.`,
  },
  {
    question: `How is feedback incorporated into the development of the dashboard?`,
    answer: `AthletiFi values user feedback as a key component of our development process. Users can submit feedback through the dashboard interface, and our team regularly reviews and incorporates suggestions to improve functionality, features, and user experience.`,
  },
  {
    question: `Is the AthletiFi Dashboard accessible on all devices?`,
    answer: `We believe that our platform should always be guided by the needs and feedback of our community. We are in a crucial development phase where input from our community is more vital than ever to help shape the platform. We know thatthe parents, players, coaches, and recruiter are the backbone of our platform, and we want to hear from you. We value your ideas on how we can improve or new features you'd like to see. By doing so, you help us build a platform that meets your needs and exceeds your expectations.`,
  },
  {
    question: `What is the future roadmap for the AthletiFi Dashboard?`,
    answer: `Our future roadmap includes adding new features such as live streaming, enhanced data analytics tools, and more personalized content. We're committed to continuous improvement and expansion based on user feedback and emerging trends in sports technology.`,
  },
  {
    question: `Who can I contact for support or questions about the dashboard?`,
    answer: `For support or questions, please contact our customer service team via email at support@athletifi.com or through the help section on the dashboard. Our team is available to assist with technical issues, account inquiries, and any other questions you may have.`,
  },
];

const Accordion: FC<{ faqData: FAQData[] }> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full">
      <div className=" bg-cardsDark bg-opacity-70 mt-7 rounded-10 shadow-portalNav">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`flex justify-between items-center px-4`}>
            <div className="flex flex-col text-primary text-base font-extralight w-full">
              <div
                className={`flex justify-between items-center`}
                onClick={() => handleToggle(idx)}
              >
                <div className="px-2 py-6 md:px-2 md:py-8 mr-2 font-normal">
                  {faq.question}
                </div>
                <div className="h-6">
                  <FontAwesomeIcon
                    icon={openIndex === idx ? faMinus : faPlus}
                  />
                </div>
              </div>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`transition-opacity px-2 pb-6 text-primary opacity-80 mr-6 md:mr-16 leading-6`}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className={`h-px ${idx < faqs.length - 1 ? ' bg-partnersBorders opacity-20' : 'bg-transparent'}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
