import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES } from '../../utils/queries'; // Assuming you have a query to fetch games

const Buy = () => {
  const { loading, data, error } = useQuery(QUERY_GAMES); // Replace QUERY_GAMES with the correct query to fetch items
  const games = data?.games || [];

  // Handle loading state
  if (loading) {
    return <div>Loading games...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading games. Please try again later.</div>;
  }

  // Handle empty data
  if (!games.length) {
    return <div>No games available for purchase at the moment.</div>;
  }

  return (
    <div>
      <h2>Buy Games</h2>
      <div>
        {games.map((game) => (
          <div key={game._id} className='card mb-3'>
            <h4 className='card-header bg-dark text-light p-2 m-0'>{game.name}</h4>
            <div className='card-body bg-light p-2'>
              <h5>Price: ${game.price}</h5>
              <p>{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
