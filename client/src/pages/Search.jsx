import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from '../utils/queries';
import { Container, Form, Button, Card, Spinner, Row, Col, Alert } from 'react-bootstrap';
import './Search.css'; // Import custom CSS for further tweaking

const SearchPage = () => {
  const [title, setTitle] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const [searchGame, { loading, data, error }] = useLazyQuery(QUERY_SINGLE_GAME, {
    onCompleted: () => setHasSearched(true),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    searchGame({
      variables: { title: title.trim() },
    });
  };

  const game = data?.gameByTitle;

  return (
    <Container fluid className="search-container py-5">
      <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search for games by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="me-2 search-input"
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </Form>

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        {loading && <Spinner animation="border" variant="primary" />}
        {!loading && hasSearched && !game && title && (
          <Alert variant="danger" className="w-100 text-center">
            No game found with the title "{title}"
          </Alert>
        )}
        {game && (
          <Row>
            <Col md={6}>
              <Card className="game-card mb-4">
                {game.img && (
                  <img
                    variant="top"
                    src={`https://www.vgchartz.com${game.img}`}
                    alt={game.title}
                    className="game-image"
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </Card>
            </Col>
            <Col md={6}>
              <Card className="game-card p-3">
                <h4 className="mt-5"><strong>{game.title}</strong></h4>
                <p><strong>Console(s):</strong> {Array.isArray(game.console) ? game.console.join(', ') : game.console}</p>
                <p><strong>Publisher:</strong> {game.publisher}</p>
                <p><strong>Release Date:</strong> {game.release_date}</p>
              </Card>
            </Col>
          </Row>
        )}
        {hasSearched && error && (
          <Alert variant="danger" className="w-100 text-center">
            Error occurred: {error.message}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default SearchPage;
