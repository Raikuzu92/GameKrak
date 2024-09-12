import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SELL_LISTINGS } from '../../utils/queries';
import './Sell.css'; // Custom CSS for Sell page

const Sell = () => {
  const { loading, data, error } = useQuery(QUERY_SELL_LISTINGS);
  const listings = data?.listings || [];

  if (loading) {
    return <div>Loading listings...</div>;
  }

  if (error) {
    return <div>Error loading listings. Please try again later.</div>;
  }

  if (!listings.length) {
    return <div>No games available for sale at the moment.</div>;
  }

  return (
    <div id='sell-page'>
      <h2 id="sell-heading">Sell Games</h2>
      <div id="sell-listing-cards">
        {listings.map((listing) => (
          <div key={listing._id} className='sell-card'>
            <div className='sell-left'>
              <img 
                src={`https://www.vgchartz.com${listing.game.img}`}
                alt={listing.game?.title} 
                className='sell-game-img'
              />
            </div>
            <div className='sell-right'>
              <h2 className='sell-card-header'><strong>{listing.game?.title}</strong></h2>
              <h5 className="pt-3">Price: ${listing.price}</h5>
              <p>Note: {listing.description}</p>
              <p>Condition: {listing.condition}</p>
              <p>Console: {listing.game.console}</p>
              <p>Seller: {listing.user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sell;
