import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function CertificateVerification() {
  const [employeeData, setEmployeeData] = useState('');
  const [hashedData, setHashedData] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');

  const handleEmployeeDataChange = (e) => {
    setEmployeeData(e.target.value);
  };

  const handleHashData = async () => {
    // Placeholder functions
    const someZKPHashFunction = async (data) => `hashed_${data}`;
    const storeOnSolanaBlockchain = async (hash) => `tx_${hash}`;

    const hash = await someZKPHashFunction(employeeData);
    setHashedData(hash);
    
    const transactionId = await storeOnSolanaBlockchain(hash);
    
    setQrCodeData(`https://yourwebsite.com/verify/${transactionId}`);
  };

  return (
    <div className="certificate-verification">
      <h2>Employee Data Hashing and QR Code Generation</h2>
      <textarea
        value={employeeData}
        onChange={handleEmployeeDataChange}
        placeholder="Enter employee data"
      />
      <button onClick={handleHashData}>Hash and Store Data</button>
      {hashedData && (
        <div>
          <h3>Hashed Data:</h3>
          <p>{hashedData}</p>
        </div>
      )}
      {qrCodeData && (
        <div>
          <h3>QR Code:</h3>
          <QRCodeSVG value={qrCodeData} />
          <a href={qrCodeData} download="qr-code.png">Download QR Code</a>
        </div>
      )}
    </div>
  );
}

export default CertificateVerification;