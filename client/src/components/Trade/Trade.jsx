import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRADE_ITEMS } from '../../utils/queries'; 

const Trade = () => {
  const { loading, data, error } = useQuery(QUERY_TRADE_ITEMS); 
  const tradeItems = data?.tradeItems || [];

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
    return <h3>No items available for trade at the moment.</h3>;
  }

  return (
    <div>
      <h2>Trade Games</h2>
      <div>
        {tradeItems.map((item) => (
          <div key={item._id} className='card mb-3'>
            <h4 className='card-header bg-dark text-light p-2 m-0'>{item.name}</h4>
            <div className='card-body bg-light p-2'>
              <h5>Looking to trade for: {item.tradeFor}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;
