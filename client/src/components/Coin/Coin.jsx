import React from 'react';
import {motion} from 'framer-motion';
import './Coin.css'; 

const Coin = ({ start }) => {
  return (
    <div className={`coin ${start ? 'coin-move' : ''}`}>
      <motion.div
      animate={{rotate:[0,200,200,0]}}
      transition={{repeat:Infinity, duration:1}}></motion.div>
    </div>
  );
};

export default Coin;
