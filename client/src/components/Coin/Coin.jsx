import React from 'react';
import './Coin.css'; 

const Coin = ({ start }) => {
  return (
    <div className={`coin ${start ? 'coin-move' : ''}`}></div>
  );
};

export default Coin;
