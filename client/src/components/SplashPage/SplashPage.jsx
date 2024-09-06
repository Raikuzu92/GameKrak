// src/SplashPage.js
import React, { useState } from 'react';
import './SplashPage.css'; 

const SplashPage = () => {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
    // You can add more functionality here for after the animation
  };

  return (
    <div className={`splash-page ${start ? 'animate' : ''}`}>
      <div className="coin"></div>
      <button onClick={handleStart} className="start-button">Start</button>
    </div>
  );
};

export default SplashPage;
