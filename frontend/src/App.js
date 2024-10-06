import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/LandingPage'; // Import your homepage component
import SignInPage from './components/SignIn'; // Import your sign-in page component
import Dashboard from './components/Dashboard';
import VerifyTransaction from './components/VerifyTransaction';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Set your homepage as the root path */}
      <Route path="/signin" element={<SignInPage />} /> {/* Route for the sign-in page */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Route for the dashboard */}
      <Route path="/verify/:transactionId" element={<VerifyTransaction />} /> {/* Route for transaction verification */}
    </Routes>
  </Router>
);

export default App;