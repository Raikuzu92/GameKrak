
import React, { useState, useRef, useEffect } from 'react';
import Coin from '../components/Coin/Coin';  
import CoinSlot from '../components/CoinSlot/CoinSlot';  
import '../components/SplashPage/SplashPage';  
import arcadeMusic from '../assets/audio/8-bit-retro.mp3';

const SplashPage = () => {
  const [start, setStart] = useState(false);
  const audioRef = useRef(null);
  
  const handleStart = () => {
    setStart(true);
    // Additional functionality can be added here (e.g., navigation, state changes)
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div className={`splash-page ${start ? 'animate' : ''}`}>
      <Coin start={start} />
      <CoinSlot />
      <button onClick={handleStart} className="start-button">
        Start
      </button>
      <audio ref={audioRef} loop>
        <source src={arcadeMusic} type="audio/mpeg" /> 
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SplashPage;
