import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import GameList from '../components/GameList';
import { QUERY_GAMES } from '../utils/queries';
import { Button } from 'react-bootstrap';
import './Game.css'; // Import the CSS file

const Game = () => {
  const { loading: loadingGames, data: gamesData } = useQuery(QUERY_GAMES);

  const games = gamesData?.games || [];
  const [limit, setLimit] = useState(6);

  const increaseLimit = () => {
    setLimit(prevLimit => prevLimit + 6);
  };

  return (
    <main>
      <div className="container d-flex justify-content-center flex-wrap">
        <div className="col-12 col-md-8 mb-3">
          {loadingGames ? (
            <div>Loading...</div>
          ) : (
            <>
              {/* Scrollable GameList */}
              <div className="scrollable-container">
                <GameList games={games.slice(0, limit)} />
              </div>

              {/* Load more button */}
              {limit < games.length && (
                <Button onClick={increaseLimit} className="mt-3">
                  Load more
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Game;
