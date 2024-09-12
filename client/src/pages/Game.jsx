import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import GameList from '../components/GameList';
import GameSingle from '../components/GameSingle';
import { QUERY_GAMES } from '../utils/queries';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import './Game.css';

const Game = () => {
  const [limit, setLimit] = useState(6);

  const { loading: loadingGames, data: gamesData } = useQuery(QUERY_GAMES, {
    variables: { limit: limit },
  });

  const games = gamesData?.games || [];

  const increaseLimit = () => {
    setLimit(prevLimit => prevLimit + 6);
  };

  const filterLimit = (value) => {
    setLimit(value);
  };

  return (
    <main>
      <div className="container d-flex justify-content-center flex-wrap">
        <div className="">
          {loadingGames ? (
            <div className='text-white'>Loading...</div>
          ) : (
            <>
              <div className="scrollable-container">
                <GameList games={games} />
              </div>

              {/* Load more button */}
              <div className="load-more-container">
                <div className='px-3'>
                  <Button onClick={increaseLimit} className="load-more-btn">
                    Load more
                  </Button>
                </div>
                <div className='px-3'>
                  <DropdownButton id="dropdown-basic-button" title="Filter" menuVariant="dark">
                    <Dropdown.Item onClick={() => filterLimit(24)}>24</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterLimit(60)}>60</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterLimit(120)}>120</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Game;
