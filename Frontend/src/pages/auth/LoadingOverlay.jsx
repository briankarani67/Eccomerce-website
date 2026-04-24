import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="main-spinner"></div>
        <p>Processing, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;