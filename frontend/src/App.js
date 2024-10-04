import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import VerifyEmployee from './components/VerifyEmployee';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Credible</h1>
          <p className="tagline">Protecting Citizens from Fake Professionals</p>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify/:transactionId" element={<VerifyEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;