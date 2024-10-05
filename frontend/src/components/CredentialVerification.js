import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { verifyCredential, payForPremiumFeature } from '../utils/solanaInteractions';
import { useWallet } from '@solana/wallet-adapter-react';

const CredentialVerification = () => {
  const [result, setResult] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const wallet = useWallet();

  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      const verified = await verifyCredential(data);
      setIsVerified(verified);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handlePremiumUpgrade = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const tx = await payForPremiumFeature(1, wallet.publicKey, 'YOUR_PREMIUM_ADDRESS');
      console.log('Premium upgrade transaction:', tx);
      setIsPremium(true);
    } catch (error) {
      console.error('Failed to upgrade to premium:', error);
    }
  };

  return (
    <div>
      <h2>Credential Verification</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>Scanned Result: {result}</p>
      <p>Verification Status: {isVerified ? 'Verified' : 'Not Verified'}</p>
      {!isPremium && (
        <button onClick={handlePremiumUpgrade}>Upgrade to Premium</button>
      )}
    </div>
  );
};

export default CredentialVerification;