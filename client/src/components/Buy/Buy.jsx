import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_BUY_LISTINGS } from '../../utils/queries';
import './Buy.css'; // Import the custom CSS for Buy page

const Buy = () => {
  const { loading, data, error } = useQuery(QUERY_BUY_LISTINGS);
  const listings = data?.listings || [];

  if (loading) {
    return <div>Loading listings...</div>;
  }

  if (error) {
    return <div>Error loading listings. Please try again later.</div>;
  }

  if (!listings.length) {
    return <div>No games available for purchase at the moment.</div>;
  }

  return (
    <div id='buy-page'>
      <h2 id="buy-heading">Buy Games</h2>
      <div id="buy-listing-cards">
        {listings.map((listing) => (
          <div key={listing._id} className='buy-card'>
            <div className='buy-left'>
              <img 
                src={`https://www.vgchartz.com${listing.game.img}`}
                alt={listing.game?.title} 
                className='buy-game-img'
              />
            </div>
            <div className='buy-right'>
              <h4 className='buy-card-header'><strong>{listing.game?.title}</strong></h4>
              <h5>Price: ${listing.price}</h5>
              <p>{listing.description}</p>
              <p>Condition: {listing.condition}</p>
              <p>Seller: {listing.user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
