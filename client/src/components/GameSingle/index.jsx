import React from 'react';
import { Card } from 'react-bootstrap';

const SingleGame = ({ game }) => {
  if (!game) {
    return <h4>No game found</h4>;
  }

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={game.img} alt={game.title} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{game.console}</Card.Subtitle>
        <Card.Text>
          <strong>Genre:</strong> {game.genre} <br />
          <strong>Publisher:</strong> {game.publisher} <br />
          <strong>Developer:</strong> {game.developer} <br />
          <strong>Critic Score:</strong> {game.critic_score} <br />
          <strong>Release Date:</strong> {game.release_date} <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleGame;
