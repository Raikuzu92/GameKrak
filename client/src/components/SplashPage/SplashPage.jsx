// src/SplashPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css'; 

const SplashPage = () => {
  const [start, setStart] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setStart(true);
    
    
    setTimeout(() => {
      navigate('/home'); // Redirect to home page
    }, 8000); // Adjust this time to match your animation duration
  };

  return (
    <div className={`splash-page ${start ? 'animate' : ''}`}>
      <div className="coin"></div>
      <button onClick={handleStart} className="start-button">Start</button>
    </div>
  );
};

export default SplashPage;
