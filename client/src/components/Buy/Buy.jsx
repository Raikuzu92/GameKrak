import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LISTINGS } from '../../utils/queries'; // Assuming you have a query to fetch games

const Buy = () => {
  const { loading, data, error } = useQuery(QUERY_LISTINGS); // Replace QUERY_GAMES with the correct query to fetch items
  const listings = data?.listings || [];

  // Handle loading state
  if (loading) {
    return <div>Loading listings...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading games. Please try again later.</div>;
  }

  // Handle empty data
  if (!listings.length) {
    return <div>No games available for purchase at the moment.</div>;
  }

  return (
    <div>
      <h2>Buy Games</h2>
      <div>
        {listings.map((listing) => (
          <div key={listing._id} className='card mb-3'>
            <h4 className='card-header bg-dark text-light p-2 m-0'>{listing.game.title}</h4>
            <div className='card-body bg-light p-2'>
              <h5>Price: ${listing.price}</h5>
              <p>{listing.description}</p>
              <p>{listing.listing_type}</p>
              <p>{listing.condition}</p>
              <p>{listing.user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
