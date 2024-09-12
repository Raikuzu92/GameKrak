import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from '../utils/queries';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import './Search.css'; // Import your CSS for custom styling

const SearchPage = () => {
  const [title, setTitle] = useState('');
  const [hasSearched, setHasSearched] = useState(false); // Track if the search has been initiated

  const [searchGame, { loading, data, error }] = useLazyQuery(QUERY_SINGLE_GAME, {
    onCompleted: () => setHasSearched(true), // Set search flag on successful search
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true); // Mark that search has been initiated
    searchGame({
      variables: { title: title.trim() },
    });
  };

  const game = data?.gameByTitle;

  return (
    <>
      <Container fluid className="search-container py-5" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={handleSearch} className="d-flex search-bar">
              <Form.Control
                type="text"
                placeholder="Search for games by title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="me-2 search-input"
              />
              <Button type="submit" className="btn btn-dark">Search</Button>
            </Form>
          </Col>
        </Row>

        <Row className="mt-4 justify-content-center">
          {loading && <Spinner animation="border" variant="primary" />}
          {!loading && hasSearched && !error && !game && title && (
            <Col md={12} className="mt-4">
              <Alert variant="bg-dark" className="text-danger">No game found with the title "{title}"</Alert>
            </Col>
          )}
          {game && (
            <Col md={12} lg={8} className="mt-4">
              <Card className="game-card" style={{ height: '100vh' }}>
                <Row>
                  {game.img && (
                    <Col md={6} className="image-container" style={{ height: '600px' }}>
                      <Card.Img variant="top" src={`https://www.vgchartz.com${game.img}`} alt={game.title} className="img-fluid" style={{ height: '100%', objectFit: 'contain', alignSelf: 'flex-start' }} />
                    </Col>
                  )}
                  <Col md={6} className="game-info-container">
                    <Card.Body>
                      {game.title && <Card.Title className="game-title">{game.title}</Card.Title>}
                      {game.console && (
                        <Card.Subtitle className="game-console">
                          Console(s): {Array.isArray(game.console) ? game.console.join(', ') : game.console}
                        </Card.Subtitle>
                      )}
                      {game.genre && <Card.Text>Genre: {game.genre}</Card.Text>}
                      {game.publisher && <Card.Text>Publisher: {game.publisher}</Card.Text>}
                      {game.developer && <Card.Text>Developer: {game.developer}</Card.Text>}
                      {game.release_date && <Card.Text>Release Date: {game.release_date}</Card.Text>}
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
          {hasSearched && error && (
            <Col md={12} className="mt-4">
              <Alert variant="bg-dark" className="text-danger">Error occurred: {error.message}</Alert>
            </Col>
          )}
        </Row>
      </Container>
      <div className="footer">Footer</div>
    </>
  );
};

export default SearchPage;
