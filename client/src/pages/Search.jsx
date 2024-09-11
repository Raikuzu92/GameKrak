import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SINGLE_GAME } from '../utils/queries'; // Make sure this query is defined correctly
import GameList from '../components/GameList';
import GameSingle from '../components/GameSingle'; // Import the correct component
import { Form, Button, Container, Row } from 'react-bootstrap';
import './Search.css'; // Import any specific styling if needed

const SearchPage = () => {
  const [title, setTitle] = useState('');

  // Correct usage of useLazyQuery, called at the top level of the component
  const [searchGame, { loading, data, error }] = useLazyQuery(QUERY_SINGLE_GAME);
  const games = data?.gameByTitle || [];

  const handleSearch = (e) => {
    e.preventDefault();

    // Trigger the search query when the form is submitted
    searchGame({
      variables: { title: title },
    });

    // window.location.assign('/games/single');
  };

  if (!games) {
    return <h4>Game not found</h4>;
  }

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Form onSubmit={handleSearch} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search for games by title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="me-2"
          />
          <Button type="submit">Search</Button>
        </Form>
      </Row>

      <Row className="mt-4">
        {loading && <div>Loading...</div>}
        {error && <div>Error occurred: {error.message}</div>}
        {data && <GameSingle games={games} />} {/* Assuming data.gameByTitle is the correct path */}
      </Row>
    </Container>
  );
};

export default SearchPage;
