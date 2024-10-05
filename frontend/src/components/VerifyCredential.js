import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { verifyCredential } from '../utils/solanaUtils';
import './VerifyCredential.css';

function VerifyCredential() {
  const [result, setResult] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      try {
        const { hashedData } = JSON.parse(data);
        const isValid = await verifyCredential(hashedData);
        setVerificationStatus(isValid ? 'Valid' : 'Invalid');
      } catch (error) {
        console.error('Error verifying credential:', error);
        setVerificationStatus('Error');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="verify-credential-container">
      <h2>Verify Employee Credential</h2>
      <div className="qr-reader-container">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {result && (
        <div className="result-container">
          <h3>Scanned Result:</h3>
          <p>{result}</p>
        </div>
      )}
      {verificationStatus && (
        <div className={`verification-status ${verificationStatus.toLowerCase()}`}>
          <h3>Verification Status:</h3>
          <p>{verificationStatus}</p>
        </div>
      )}
    </div>
  );
}

export default VerifyCredential;