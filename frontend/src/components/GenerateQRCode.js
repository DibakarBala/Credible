import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './GenerateQRCode.css';

function GenerateQRCode() {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    licenseNumber: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    issuingAuthority: ''
  });
  const [qrCodeData, setQrCodeData] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGenerateQRCode = () => {
    // For now, just use a simple hash function
    const hash = btoa(JSON.stringify(employeeData));
    const qrData = `http://localhost:3000/verify/${hash}`;
    setQrCodeData(qrData);
  };

  return (
    <div className="generate-qr-container">
      <h2>Generate QR Code</h2>
      <div className="form-group">
        <label htmlFor="name">Name of Employee:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={employeeData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="licenseNumber">License Number:</label>
        <input
          type="text"
          id="licenseNumber"
          name="licenseNumber"
          value={employeeData.licenseNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfIssue">Date of Issue:</label>
        <input
          type="date"
          id="dateOfIssue"
          name="dateOfIssue"
          value={employeeData.dateOfIssue}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfExpiry">Date of Expiry:</label>
        <input
          type="date"
          id="dateOfExpiry"
          name="dateOfExpiry"
          value={employeeData.dateOfExpiry}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="issuingAuthority">Issuing Authority:</label>
        <input
          type="text"
          id="issuingAuthority"
          name="issuingAuthority"
          value={employeeData.issuingAuthority}
          onChange={handleInputChange}
          required
        />
      </div>
      <button onClick={handleGenerateQRCode} className="btn btn-primary">
        Generate QR Code
      </button>
      {qrCodeData && (
        <div className="result-container">
          <h3>QR Code:</h3>
          <QRCodeSVG value={qrCodeData} size={200} />
          <p>Scan this QR code to verify the employee.</p>
        </div>
      )}
    </div>
  );
}

export default GenerateQRCode;