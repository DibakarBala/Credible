import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import EmployeeVerification from './components/EmployeeVerification';
import VerifyEmployee from './components/VerifyEmployee';
import GenerateQRCode from './components/GenerateQRCode';
import CertificateQRCode from './components/CertificateQRCode';
import OktoLogin from './components/OktoLogin';
import PaymentHandler from './components/PaymentHandler';
import ReclaimTest from './components/ReclaimTest'; // Add this line
import { OktoProvider } from './contexts/OktoContext';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import './App.css';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <OktoProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employee-details" element={<EmployeeVerification />} />
                  <Route path="/verify" element={<VerifyEmployee />} />
                  <Route path="/generate-qr" element={<GenerateQRCode />} />
                  <Route path="/verify/:id" element={<CertificateQRCode />} />
                  <Route path="/okto-login" element={<OktoLogin />} />
                  <Route path="/payment" element={<PaymentHandler />} />
                  <Route path="/reclaim-test" element={<ReclaimTest />} /> {/* Add this line */}
                </Routes>
              </div>
            </Router>
          </OktoProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;