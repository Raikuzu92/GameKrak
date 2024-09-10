import React, { useState } from 'react';
import Buy from '../components/Buy/Buy'; // Import Buy component from the components folder
import Sell from '../components/Sell/Sell'; // Import Sell component from the components folder
import Trade from '../components/Trade/Trade'; // Import Trade component from the components folder

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
    <div className="marketplace">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'trade' ? 'active' : ''}`}
            onClick={() => setActiveTab('trade')}
          >
            Trade
          </button>
        </li>
      </ul>

      <div className="tab-content mt-4">
        {renderTab()}
      </div>
    </div>
  );
};

export default Market;
