import { UnderLineText } from '@/components/common/Icon';
import type { PlayerStats } from '@/types/Player.type';

const playerStats: PlayerStats = {
  Attacking: 0,
  Defending: 50,
  Goalkeeping: 90,
  Mentality: 20,
  Physical: 90,
};

const AOS_DURATION: number = 400;
const AOS_DELAY: number = 300;
const AOS_OFFSET: number = 100;

const PlayerStats: React.FC = () => {
  return (
    <div className="lg:w-3/4 xl:w-1/2 2xl:w-1/2 min-h-full order-3 lg:order-1">
      <div className="container__border--blue-gradient bg-blue_linear_gradient after:absolute relative lg:py-16 py-5 md:py-10 z-0  after:contents-[''] after:inset-0 after:p-1 after:rounded-30 rounded-30 h-full flex items-center justify-center">
        <div
          className="flex flex-col justify-center items-center relative z-20"
          data-aos="fade-up"
          data-aos-duration={AOS_DURATION}
          data-aos-easing="ease-in-sine"
          data-aos-delay={AOS_DELAY}
          data-aos-offset={AOS_OFFSET}
        >
          <h2 className="font-HelveticaNeueMedium md:text-4xl text-basemd  text-primary font-medium leading-60 relative z-20 text-center md:mb-4">
            <span className="relative ">
              Player Stats
              <span className="absolute -bottom-2 left-0 z-0">
                <UnderLineText />
              </span>
            </span>
          </h2>
          <div className="flex flex-col p-5">
            {Object.entries(playerStats).map(([stat, value]) => {
              if (
                (stat === 'Goalkeeping' || stat === 'Attacking') &&
                value === 0
              )
                return null;
              return (
                <div
                  key={stat}
                  className="flex justify-center items-center gap-4"
                >
                  <div className="w-full md:w-200 lg:w-230 h-30 bg-gray-200 rounded-30 overflow-hidden my-2">
                    <div
                      className="h-full font-Segoe bg-shadow_blue flex items-center justify-start text-black font-semibold px-4"
                      style={{ width: `${value}%` }}
                    >
                      {stat}
                    </div>
                  </div>
                  <div>
                    <p className="font-Segoe font-semibold text-primary">
                      {value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
