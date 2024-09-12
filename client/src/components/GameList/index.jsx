import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './GameList.css';

const GameList = ({ games }) => {
  if (!games.length) {
    return <h4>No games found</h4>;
  }

  return (
    <Row className="g-4 justify-content-center">
      {games.map((game) => {
        // Create a class name based on the game title
        const gameClassName = game.title.replace(/\s+/g, '-').toLowerCase();

        return (
          <Col key={game._id} xs={12} md={6} lg={4}>
            <Link to={`/games/${game._id}`}>
              <Card className={`game-card ${gameClassName}`}>
                <Card.Img variant="top" src={`https://www.vgchartz.com${game.img}`} alt={game.title} />
                <Card.Body>
                  <Card.Title className="game-title">{game.title}</Card.Title>
                  <Card.Subtitle className="game-console">{game.console}</Card.Subtitle>
                  <div>Released:</div>
                  <div className="pb-2 game-release-date">{game.release_date}</div>
                  <div>Publisher:</div>
                  <div className="pb-3 game-publisher">{game.publisher}</div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};

export default GameList;
