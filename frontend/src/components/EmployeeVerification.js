import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Reclaim } from '@reclaimprotocol/reclaim-sdk';
import { issueCredential } from '../utils/solanaUtils';
import './EmployeeVerification.css';

function EmployeeVerification() {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    id: '',
    position: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    issuingAuthority: ''
  });
  const [qrCodeData, setQrCodeData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGenerateQRCode = async () => {
    setIsLoading(true);
    try {
      const reclaim = new Reclaim();
      const hashedData = await reclaim.hash(JSON.stringify(employeeData));
      const txHash = await issueCredential(hashedData);
      const qrData = JSON.stringify({ hashedData, txHash });
      setQrCodeData(qrData);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="employee-verification-container">
      <h2>Employee Verification</h2>
      <form>
        {/* Add input fields for all employeeData properties */}
        {/* Example: */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add similar input fields for id, position, dateOfIssue, dateOfExpiry, and issuingAuthority */}
      </form>
      <button onClick={handleGenerateQRCode} className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate QR Code'}
      </button>
      {qrCodeData && (
        <div className="qr-code-container">
          <h3>Employee Verification QR Code:</h3>
          <QRCodeSVG value={qrCodeData} size={200} />
          <p>Scan this QR code to verify the employee's credentials.</p>
          <button onClick={() => {/* Implement download functionality */}} className="btn btn-secondary">
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeVerification;