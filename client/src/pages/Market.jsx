import React, { useState } from 'react';
import Buy from '../components/Buy/Buy.jsx'; 
import Sell from '../components/Sell/Sell.jsx'; 
import Trade from '../components/Trade/Trade.jsx'; 
import './Market.css';

const Market = () => {
  const [activeTab, setActiveTab] = useState('buy'); // Default to Buy tab

  const renderTab = () => {
    switch (activeTab) {
      case 'buy':
        return <Buy />;
      case 'sell':
        return <Sell />;
      case 'trade':
        return <Trade />;
      default:
        return <Buy />;
    }
  };

  return (
    <div className="marketplace-container">
      <div className="tab-buttons">
        <button
          className={activeTab === 'buy' ? 'active' : ''}
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
        <button
          className={activeTab === 'sell' ? 'active' : ''}
          onClick={() => setActiveTab('sell')}
        >
          Sell
        </button>
        <button
          className={activeTab === 'trade' ? 'active' : ''}
          onClick={() => setActiveTab('trade')}
        >
          Trade
        </button>
      </div>

      <div className="tab-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default Market;
