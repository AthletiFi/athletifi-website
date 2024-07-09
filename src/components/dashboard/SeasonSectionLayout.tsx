import SeasonHighlights from './SeasonHighlights';
import { ActionReelList } from './TopActionReels';

const SeasonSection: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-[1130px] sm:py-8 md:py-20 flex flex-col sm:flex-col md:flex-row justify-between items-center md:items-start">
        <SeasonHighlights />
        <ActionReelList />
        {/* once actionReels are
        ready, we could implement jotai */}
      </div>
    </>
  );
};

export default SeasonSection;
