import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import './Dashboard.css';

const Dashboard = () => {
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedEmployees, setVerifiedEmployees] = useState([]);
  const [error, setError] = useState(null);

  const APP_ID = "0x336a0772E83d5a84F70779D4B5533766ca3C2D16";
  const APP_SECRET = "0x37b0bb8d34a1e73853b197f45969875a40e1c9c57bb34e9c8a6270cb4c11f05b";
  const GOOGLE_PROVIDER_ID = "f9f383fd-32d9-4c54-942f-5e9fda349762";

  const handleEmailChange = (e) => {
    setEmployeeEmail(e.target.value);
  };

  const generateVerificationRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, GOOGLE_PROVIDER_ID);
      
      const url = await reclaimProofRequest.getRequestUrl();
      setVerificationUrl(url);
      setQrCodeData(url);

      reclaimProofRequest.startSession({
        onSuccessCallback: (proofs) => {
          console.log('Verification success', proofs);
          setVerifiedEmployees(prev => [...prev, { email: employeeEmail, status: 'Verified' }]);
          setIsLoading(false);
        },
        onFailureCallback: (error) => {
          console.error('Verification failed', error);
          setError(error.message);
          setIsLoading(false);
        }
      });
    } catch (err) {
      console.error('Error initializing Reclaim:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Employer Dashboard</h2>
      <div className="dashboard-content">
        <div className="verification-form">
          <h3>Generate Employee Verification Request</h3>
          <form onSubmit={generateVerificationRequest}>
            <div className="form-group">
              <label htmlFor="employeeEmail">Employee Email:</label>
              <input
                type="email"
                id="employeeEmail"
                value={employeeEmail}
                onChange={handleEmailChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Verification Request'}
            </button>
          </form>
          {error && <p className="error-message">Error: {error}</p>}
          {verificationUrl && (
            <div className="qr-code-container">
              <h3>Employee Verification QR Code:</h3>
              <QRCodeSVG value={qrCodeData} size={200} />
              <p>Scan this QR code or use the link below to verify:</p>
              <a href={verificationUrl} target="_blank" rel="noopener noreferrer">{verificationUrl}</a>
            </div>
          )}
        </div>
        <div className="verification-results">
          <div className="verified-employees">
            <h3>Verified Employees</h3>
            {verifiedEmployees.length > 0 ? (
              <ul>
                {verifiedEmployees.map((employee, index) => (
                  <li key={index}>{employee.email} - {employee.status}</li>
                ))}
              </ul>
            ) : (
              <p>No employees verified yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;