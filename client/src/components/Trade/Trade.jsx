import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRADE_LISTINGS } from '../../utils/queries';
import './Trade.css'; // Import the custom CSS for Trade page

const Trade = () => {
  const { loading, data, error } = useQuery(QUERY_TRADE_LISTINGS);
  const listings = data?.listings || [];

  if (loading) {
    return <div>Loading trade items...</div>;
  }

  if (error) {
    return <div>Error loading trade items. Please try again later.</div>;
  }

  if (!listings.length) {
    return <div>No items available for trade at the moment.</div>;
  }

  return (
    <div id="trade-page">
      <h2 id="trade-heading">Trade Games</h2>
      <div id="trade-listing-cards">
        {listings.map((listing) => (
          <div key={listing._id} className="trade-card">
            <div className="trade-left">
              <img
                src={`https://www.vgchartz.com${listing.game.img}`}
                alt={listing.game?.title}
                className="trade-game-img centered-img"
                style={{ width: '150px', height: '150px' }} // Adjust the size here
              />
              <div className="trade-game-details">
                <div className="mt-3"> Game Owned: </div>
                <h4><strong>{listing.game?.title}</strong></h4>
                <p className="mt-2">Condition: {listing.condition}</p>
                <p>Owner: {listing.user.username}</p>
              </div>
            </div>

            <div className="trade-right">
              <img
                src={`https://www.vgchartz.com${listing.trade_for?.img}`}
                alt={listing.trade_for?.title}
                className="trade-game-img centered-img"
                style={{ width: '150px', height: '150px' }} // Adjust the size here
              />
              <div className="trade-game-details">
                <div className="mt-3"> Looking For: </div>
                <h4 className=""><strong>{listing.trade_for?.title}</strong></h4>
              <p className="mt-4">Note: {listing.description}</p>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;
