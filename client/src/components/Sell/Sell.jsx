import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LISTINGS } from '../../utils/queries'; 

const Sell = () => {
  const { loading, data, error } = useQuery(QUERY_LISTINGS); 
  const sellItems = data?.sellItems || [];

  // Handle loading state
  if (loading) {
    return <div>Loading items for sale...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading items for sale. Please try again later.</div>;
  }

  // Handle empty data
  if (!sellItems.length) {
    return <h3>No items available for sale at the moment.</h3>;
  }

  return (
    <div>
      <h2>Sell Games</h2>
      <div>
        {sellItems.map((item) => (
          <div key={item._id} className='card mb-3'>
            <h4 className='card-header bg-dark text-light p-2 m-0'>{item.name}</h4>
            <div className='card-body bg-light p-2'>
              <h5>Price: ${item.price}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sell;
