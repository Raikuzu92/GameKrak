import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import GameList from '../components/GameList';
import GameSingle from '../components/GameSingle';
import { QUERY_GAMES } from '../utils/queries';
import './Game.css';

const Game = () => {
  const [limit, setLimit] = useState(10);

  const { loading: loadingGames, data: gamesData } = useQuery(QUERY_GAMES, {
    variables: { limit: limit },
  });

  const games = gamesData?.games || [];

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
              <div className="scrollable-container">
                <GameList games={games} />
              </div>

              {/* Load more button */}
              <div className="load-more-container">
                {limit < games.length && (
                  <button onClick={increaseLimit} className="load-more-btn">
                    Load more
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Game;
