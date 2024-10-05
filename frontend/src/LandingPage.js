import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Credible: Decentralized Employee Verification</h1>
        <WalletMultiButton />
      </header>
      
      {/* ... rest of the component ... */}
    </div>
  );
};

export default LandingPage;