import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const GameList = ({ games }) => {
  if (!games.length) {
    console.log(games)
    return <h4>No games found</h4>;
  }

  return (
    <Row className="g-4">
      {games.map((game) => (
        <Col key={game.id} xs={12} md={4}>
          <Card>
            <Card.Img variant="top" src={`https://www.vgchartz.com${game.img}`} alt={game.title} />
            <Card.Body>
              <Card.Title className="text-white">{game.title}</Card.Title>
              <Card.Subtitle className="text-white">
                {game.console}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GameList;
