import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h2>Welcome to Employee ID Verification System</h2>
      <div className="action-buttons">
        <Link to="/issue" className="btn btn-primary">Issue New Credential</Link>
        <Link to="/verify" className="btn btn-secondary">Verify Credential</Link>
      </div>
    </div>
  );
}

export default HomePage;