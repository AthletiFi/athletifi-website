import Header from './Header';

const CardsByTeam = ({ team }) => (
  <div>
    {team.map((card, index) => (
      <div key={index}>
        <h2>{team.teamName}</h2>
        {team.cards.map((card, index) => (
          <div key={index}>
            <p>{card.id}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default CardsByTeam;