import React from 'react';
import { useRouteError } from 'react-router-dom';
import './ErrorPage.css'; // Import a custom CSS file for styling

export default function ErrorPage() {
  const error = useRouteError();

  console.error('Error details:', error);

  return (
    <div className="error-page-container">
      <div className="error-content">
        <h1 className="error-title">WASTED</h1>
        <p className="error-description">
          Something went wrong. It seems like our game crashed. Please try again later or return to the main menu.
        </p>
        <p className="error-message">
          <i>{error.statusText || error.message || 'An unexpected error occurred.'}</i>
        </p>
        <a href="/" className="error-home-link">Return to Main Menu</a>
      </div>
    </div>
  );
}
