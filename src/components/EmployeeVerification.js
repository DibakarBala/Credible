import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Reclaim } from 'reclaim-sdk';
import QRCode from 'qrcode.react';

const EmployeeVerification = () => {
  const { publicKey, signMessage } = useWallet();
  const [employeeData, setEmployeeData] = useState('');
  const [hashedData, setHashedData] = useState('');
  const [qrCode, setQRCode] = useState('');

  const handleEmployeeDataChange = (e) => {
    setEmployeeData(e.target.value);
  };

  const hashEmployeeData = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const reclaim = new Reclaim();
      const hashed = await reclaim.hash(employeeData);
      setHashedData(hashed);

      // Generate QR code
      setQRCode(hashed);

      // TODO: Store hashed data on Solana blockchain
      // This part will require creating and calling a Solana program
      console.log('Hashed data:', hashed);
    } catch (error) {
      console.error('Error hashing data:', error);
    }
  };

  return (
    <div>
      <h2>Employee Verification</h2>
      <input
        type="text"
        value={employeeData}
        onChange={handleEmployeeDataChange}
        placeholder="Enter employee data"
      />
      <button onClick={hashEmployeeData}>Hash and Store Data</button>
      {hashedData && (
        <div>
          <h3>Hashed Data:</h3>
          <p>{hashedData}</p>
        </div>
      )}
      {qrCode && (
        <div>
          <h3>QR Code:</h3>
          <QRCode value={qrCode} />
        </div>
      )}
    </div>
  );
};

export default EmployeeVerification;