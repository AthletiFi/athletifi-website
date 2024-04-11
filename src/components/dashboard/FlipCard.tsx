import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

const FlipCard = ({ cardUrl }: { cardUrl: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped((prevState) => !prevState);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: isFlipped ? 360 : 0,
      }}
      transition={{
        duration: 0.4,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className="w-full h-full md:max-w-[300px] lg:max-w-[400px]"
    >
      <div className="relative w-full h-full ">
        <Image
          src={cardUrl}
          alt="Player card"
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={500}
          height={300}
          quality={75}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default FlipCard;
