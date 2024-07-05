import { IAttributeConfig, IRatingRaw } from '@/types/Dashboard.type';

export const attributeConfigs: IAttributeConfig = {
  skill: {
    color: '#27B6BD',
    description: `
    The skill rating reflects the player's technical abilities with the ball. It takes into account how well they dribble past opponents, make accurate passes to teammates, and maintain control of the ball under pressure. This rating is based on the player's success rate in dribbling, passing accuracy, and their ability to keep possession of the ball throughout the game. A higher skill rating indicates that the player is confident and proficient in handling the ball.`,
  },
  attacking: {
    color: '#DA393B',
    description: `The attacking rating focuses on the player's contribution to the team's offense. It considers their ability to make accurate crosses into the penalty area, take shots on goal, and create scoring opportunities for themselves and their teammates. This rating is calculated using the player's crossing accuracy, shooting precision, and the frequency of their offensive actions in the attacking third of the field. A strong attacking rating suggests that the player is actively involved in creating and finishing scoring chances.`,
  },
  goalkeeping: {
    color: '#DA393B',
    description: `The goalkeeping rating is an exclusive measurement for players in the goalkeeper position. It evaluates the player's performance in key goalkeeping duties, such as handling the ball, kicking accuracy, positioning, and reflexes. This rating takes into account the player's success rate in catching and punching the ball, the accuracy of their goal kicks, their positioning during aerial challenges, and their ability to make saves. A strong goalkeeping rating suggests that the player is reliable in protecting the goal and is confident in commanding their penalty area.`,
  },
  physical: {
    color: '#B09E03',
    description: `The physical rating assesses the player's physical attributes and how they use them in the game. It takes into account their success in long and medium-range passing, which requires both strength and accuracy. Additionally, it considers their effectiveness in aerial duels, such as heading the ball, and their ability to score from long-range shots. A high physical rating indicates that the player can use their physical strength and power to influence the game.`,
  },
  mentality: {
    color: '#FC6713',
    description: `The mentality rating evaluates the player's psychological strengths on the field. It looks at their assertiveness in making forward passes, their composure under pressure, and their ability to draw fouls from opponents. This rating is based on the player's success rate in attempting forward passes, the frequency of fouls they receive, and how well they maintain their composure throughout the game. A strong mentality rating suggests that the player is confident, makes bold decisions, and can handle the mental challenges of the game.`,
  },
  defending: {
    color: '#5A54A2',
    description: `The defending rating assesses the player's contribution to the team's defense. It considers their ability to make successful clearances, interventions, tackles, and win ground duels against opponents. This rating is calculated based on the frequency and success rate of the player's defensive actions. A high defending rating indicates that the player is proactive in disrupting the opposition's attacks and is effective in regaining possession of the ball for their team.`,
  },
};

export const FieldPlayerRatings = [
  'skill',
  'attacking',
  'physical',
  'mentality',
  'defending',
];

export const GoalKeeperRatings = [
  'skill',
  'goalkeeping',
  'physical',
  'mentality',
  'defending',
];

export function transformRatingData(data: IRatingRaw, is_goalkeeper = false) {
  return Object.keys(data).flatMap((x) => {
    switch (x) {
      case 'rating_date':
        return [];
      case 'attacking_goalkeeping':
        if (is_goalkeeper)
          return {
            attribute: 'goalkeeping',
            rating: Math.trunc(Number(data[x as keyof IRatingRaw])),
          };
        return {
          attribute: 'attacking',
          rating: Math.trunc(Number(data[x as keyof IRatingRaw])),
        };
      default:
        return {
          attribute: x,
          rating: Math.trunc(Number(data[x as keyof IRatingRaw])),
        };
    }
  });
}

export function filterRatingData(
  data: IRatingRaw[],
  is_goalkeeper = false,
): IRatingRaw[] {
  return data.map((x: IRatingRaw) => {
    if (is_goalkeeper) {
      return {
        rating_date: x.rating_date,
        skill: Math.trunc(Number(x.skill)),
        goalkeeping: Math.trunc(Number(x.attacking_goalkeeping)),
        physical: Math.trunc(Number(x.physical)),
        mentality: Math.trunc(Number(x.mentality)),
        defending: Math.trunc(Number(x.defending)),
      };
    } else {
      return {
        rating_date: x.rating_date,
        skill: Math.trunc(Number(x.skill)),
        attacking: Math.trunc(Number(x.attacking_goalkeeping)),
        physical: Math.trunc(Number(x.physical)),
        mentality: Math.trunc(Number(x.mentality)),
        defending: Math.trunc(Number(x.defending)),
      };
    }
  });
}
