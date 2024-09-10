import React, { useState } from 'react';
import './CoinSlot.css'; 
import Coin from '../Coin/Coin';

const CoinSlot = () => {
    const [isCoinMoving, setIsCoinMoving] = useState(false);

    const handleStartClick = () => {
        setIsCoinMoving(true);
    };

    return (
        <div>
            <button onClick={handleStartClick}>Start</button> {/* Button to trigger coin animation */}
            <div className="coin-slot">
                <div className="slot-gap"></div> {/* Represents the visible part of the slot */}
                <Coin start={isCoinMoving} /> {/* Represents the coin */}
            </div>
        </div>
    );
};

export default CoinSlot;
