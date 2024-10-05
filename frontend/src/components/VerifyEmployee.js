import React, { useState } from 'react';
import { verifyCredential } from '../utils/solanaUtils';

function VerifyEmployee() {
  const [qrData, setQrData] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleVerify = async () => {
    try {
      const { hashedData } = JSON.parse(qrData);
      const isValid = await verifyCredential(hashedData);
      setVerificationStatus(isValid ? 'Valid Employee' : 'Invalid Employee');
    } catch (error) {
      console.error('Error verifying employee:', error);
      setVerificationStatus('Verification failed');
    }
  };

  return (
    <div className="verify-employee">
      <h2>Verify Employee Credential</h2>
      <textarea
        value={qrData}
        onChange={(e) => setQrData(e.target.value)}
        placeholder="Paste QR code data here"
      />
      <button onClick={handleVerify}>Verify</button>
      {verificationStatus && <p>Status: {verificationStatus}</p>}
    </div>
  );
}

export default VerifyEmployee;