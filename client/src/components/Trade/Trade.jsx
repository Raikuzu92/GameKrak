import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRADE_LISTINGS } from '../../utils/queries'; // Import the new trade listings query

const Trade = () => {
  const { loading, data, error } = useQuery(QUERY_TRADE_LISTINGS); // Use the trade-specific query
  const tradeItems = data?.listings || []; // Use the correct data field from the query

  console.log(tradeItems)

  // Handle loading state
  if (loading) {
    return <div>Loading trade items...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading trade items. Please try again later.</div>;
  }

  // Handle empty data
  if (!tradeItems.length) {
    return <div>No items available for trade at the moment.</div>;
  }

  return (
    <div>
      <h2>Trade Games</h2>
      <div>
        {tradeItems.map((item) => (
          <div key={item._id} className="card mb-3">
            <h4 className="card-header bg-dark text-light p-2 m-0">Trading: {item.game.title}</h4>
            <div className="card-body bg-light p-2">
              <h5>Looking for: {item.trade_for ? item.trade_for.title : 'Not specified'}</h5>
              <p>Condition (<span className="text-italic">{item.game.title}</span>): {item.condition}</p>
              <p>Note: {item.description}</p>
              <p>Owner: {item.user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;
