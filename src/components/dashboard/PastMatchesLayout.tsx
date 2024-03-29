import PastMatches from './PastMatches';
import Teammates from './Teammates';
import { IPastMatchesLayoutProps } from '@/types/Dashboard.type';

const PastMatchesLayout: React.FC<IPastMatchesLayoutProps> = ({
  past_matches,
  teammates,
}: IPastMatchesLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between my-4 items-center md:items-start w-full px-4 max-w-[620px] md:max-w-none lg:max-w-[1130px]">
      <PastMatches past_matches={past_matches} />
      <Teammates teammates={teammates} />
    </div>
  );
};

export default PastMatchesLayout;
