import React from 'react';
import { useParams } from 'react-router-dom';

const GameSingle = ({ games }) => {

  return (
    <div className="game-details">
      <h1>{games.title}</h1>
      <img src={`https://www.vgchartz.com${games.img}`} alt={games.title} />
      <p><strong>Console:</strong> {games.console}</p>
      <p><strong>Release Date:</strong> {games.release_date}</p>
      <p><strong>Publisher:</strong> {games.publisher}</p>
      <p>{games.description}</p>
    </div>
  );
};

export default GameSingle;
