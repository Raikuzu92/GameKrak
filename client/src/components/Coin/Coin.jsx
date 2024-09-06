
import React from 'react';
import './Coin.css'; 

const Coin = ({ start }) => {
  return (
    <div className={`coin ${start ? 'fall' : ''}`}></div>
  );
};

export default Coin;
