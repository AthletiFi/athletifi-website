export type PlayerDashboardProps = {
  params: { cardId: number };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export enum Attributes {
  Attacking = 'attacking',
  Skill = 'skill',
  Physical = 'physical',
  Mental = 'mental',
  Defending = 'defending',
}

export interface IBarProps {
  click: Attributes | undefined | null;
  hover: Attributes | undefined | null;
}

export interface ILineProps {
  attacking?: boolean;
  skill?: boolean;
  physical?: boolean;
  mental?: boolean;
  defending?: boolean;
  hover: Attributes | undefined | null;
}
