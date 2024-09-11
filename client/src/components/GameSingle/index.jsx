import React from 'react';
import { useParams } from 'react-router-dom';

const GameSingle = ({ games }) => {
  const { title } = useParams();
  const game = games.find(g => g.title === title);

  if (!game) {
    return <h4>Game not found</h4>;
  }

  return (
    <div className="game-details">
      <h1>{game.title}</h1>
      <img src={`https://www.vgchartz.com${game.img}`} alt={game.title} />
      <p><strong>Console:</strong> {game.console}</p>
      <p><strong>Release Date:</strong> {game.release_date}</p>
      <p><strong>Publisher:</strong> {game.publisher}</p>
      <p>{game.description}</p>
    </div>
  );
};

export default GameSingle;
