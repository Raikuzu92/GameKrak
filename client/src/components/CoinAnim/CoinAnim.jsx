// src/SplashPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoinAnim.css'; 
import CoinSlot from '../CoinSlot/CoinSlot';

// const [animationState, setAnimationState] = useState('none'); // Manage animation state
// const navigate = useNavigate();

// const handleStart = () => {
//   setAnimationState('spin'); // Start the spin animation

//   setTimeout(() => {
//     setAnimationState('fall'); // Change to fall animation after spinning
//   }, 6000); // Duration for 3 spins (2s each) = 6s

//   setTimeout(() => {
//     navigate('/home'); // Redirect after falling animation
//   }, 8000); // Total duration (6s spin + 2s fall)
// };

const SplashPage = () => {
  const [startAnimation, setStartAnimation] = useState('none');
  const navigate = useNavigate();

  const handleStart = () => {
    console.log("spin started");
    setStartAnimation('flip');
    console.log("spin stopped");
    setTimeout(() => {
      console.log("fall started");
      setStartAnimation('fall');
      console.log("fall stopped");
    }, 6000);
    
    setTimeout(() => {
      setStartAnimation('none');
      console.log("We did it yayyyy");
      // navigate('/home'); // Redirect to home page
    }, 8000); // Adjust this time to match your animation duration
  };

  return (
    <>
       <div className={`coin anim-${startAnimation}`}></div>
<CoinSlot/>
      <button onClick={handleStart} className="start-button">Start</button>
    </>
  );
};

export default SplashPage;
