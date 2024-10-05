import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Reclaim } from '@reclaimprotocol/js-sdk';
import { issueCredential } from '../utils/solanaInteractions';

const QRCodeGenerator = () => {
  const [credentialData, setCredentialData] = useState('');
  const [qrData, setQrData] = useState('');

  const handleGenerateQR = async () => {
    try {
      // Generate zero-knowledge proof
      const reclaim = new Reclaim();
      const proof = await reclaim.generateProof(credentialData);

      // Issue credential on Solana
      const txHash = await issueCredential(proof);

      // Generate QR code data
      const qrCodeData = JSON.stringify({ proof, txHash });
      setQrData(qrCodeData);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={credentialData}
        onChange={(e) => setCredentialData(e.target.value)}
        placeholder="Enter credential data"
      />
      <button onClick={handleGenerateQR}>Generate QR Code</button>
      {qrData && <QRCode value={qrData} />}
    </div>
  );
};

export default QRCodeGenerator;