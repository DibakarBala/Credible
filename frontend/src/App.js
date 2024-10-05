import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import EmployeeVerification from './components/EmployeeVerification';
import VerifyEmployee from './components/VerifyEmployee';
import GenerateQRCode from './components/GenerateQRCode';
import CertificateQRCode from './components/CertificateQRCode';
import OktoLogin from './components/OktoLogin';
import PaymentHandler from './components/PaymentHandler';
import { OktoProvider } from './contexts/OktoContext';

import './App.css';

function App() {
  return (
    <OktoProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/employee-details" element={<EmployeeVerification />} />
            <Route path="/verify" element={<VerifyEmployee />} />
            <Route path="/generate-qr" element={<GenerateQRCode />} />
            <Route path="/verify/:id" element={<CertificateQRCode />} />
            <Route path="/okto-login" element={<OktoLogin />} />
            <Route path="/payment" element={<PaymentHandler />} />
          </Routes>
        </div>
      </Router>
    </OktoProvider>
  );
}

export default App;