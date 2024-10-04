import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CertificateQRCode() {
  const params = useParams();
  const id = params.id;
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    // TODO: Implement actual verification logic
    const verifyId = async () => {
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setVerificationStatus('Valid');
      } catch (error) {
        console.error('Verification failed:', error);
        setVerificationStatus('Invalid');
      }
    };

    verifyId();
  }, [id]);

  return (
    <div className="certificate-qr-code">
      <h2>Certificate Verification</h2>
      <p>ID: {id}</p>
      <p>Status: {verificationStatus}</p>
    </div>
  );
}

export default CertificateQRCode;