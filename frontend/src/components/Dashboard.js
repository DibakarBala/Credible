import React, { useState, useEffect, useRef } from 'react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import QRCode from 'react-qr-code';
import { saveIdentifierOnSolana } from '../utils/solana';
import './Dashboard.css';

const Dashboard = () => {
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [reclaimProofRequest, setReclaimProofRequest] = useState(null);
  const [requestUrl, setRequestUrl] = useState('');
  const [statusUrl, setStatusUrl] = useState('');
  const [proofs, setProofs] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const qrRef = useRef();

  const APP_ID = "0x336a0772E83d5a84F70779D4B5533766ca3C2D16";
  const APP_SECRET = "0x37b0bb8d34a1e73853b197f45969875a40e1c9c57bb34e9c8a6270cb4c11f05b";
  const GITHUB_PROVIDER_ID = "6d3f6753-7ee6-49ee-a545-62f1b1822ae5";

  useEffect(() => {
    const initializeReclaim = async () => {
      try {
        const proofRequest = await ReclaimProofRequest.init(
          APP_ID,
          APP_SECRET,
          GITHUB_PROVIDER_ID
        );
        setReclaimProofRequest(proofRequest);
      } catch (err) {
        console.error('Error initializing Reclaim:', err);
        setError(err.message);
      }
    };

    initializeReclaim();
  }, []);

  const handleCreateClaim = async (e) => {
    e.preventDefault();
    if (!reclaimProofRequest) {
      console.error('Reclaim Proof Request not initialized');
      setError('Reclaim Proof Request not initialized');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = await reclaimProofRequest.getRequestUrl();
      setRequestUrl(url);

      const status = reclaimProofRequest.getStatusUrl();
      setStatusUrl(status);
      console.log('Status URL:', status);

      await reclaimProofRequest.startSession({
        onSuccess: (receivedProofs) => {
          console.log('Verification success', receivedProofs);
          setProofs(receivedProofs);
        },
        onFailure: (error) => {
          console.error('Verification failed', error);
          setError(error.message);
        }
      });
    } catch (err) {
      console.error('Error creating claim:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateIdProof = async () => {
    console.log('Generate ID Proof button clicked');
    setIsTransactionLoading(true);
    try {
      const identifier = proofs?.identifier;
      if (identifier) {
        const transactionId = await saveIdentifierOnSolana(identifier);
        console.log('Transaction ID:', transactionId);
        setTransactionId(transactionId);
      } else {
        console.error('No identifier found in proofs');
      }
    } catch (error) {
      console.error('Error generating ID proof:', error);
    } finally {
      setIsTransactionLoading(false);
    }
  };

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'qr-code.png';
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="dashboard">
      <h2>Employer Dashboard</h2>
      <div className="dashboard-content">
        <div className="verification-form">
          <h3>Generate Employee Verification Request</h3>
          <form onSubmit={handleCreateClaim}>
            <div className="form-group">
              <label htmlFor="employeeName">Employee Name:</label>
              <input
                type="text"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeEmail">Employee Email:</label>
              <input
                type="email"
                id="employeeEmail"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="joiningDate">Joining Date:</label>
              <input
                type="date"
                id="joiningDate"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="idCardNumber">ID Card Number:</label>
              <input
                type="text"
                id="idCardNumber"
                value={idCardNumber}
                onChange={(e) => setIdCardNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Verification Request'}
            </button>
          </form>
          {error && <p className="error-message">Error: {error}</p>}
          {requestUrl && (
            <div className="qr-code-container">
              <h3>Employee Verification QR Code:</h3>
              <QRCode value={requestUrl} size={200} />
              <p>Scan this QR code or use the link below to verify:</p>
              <a href={requestUrl} target="_blank" rel="noopener noreferrer">{requestUrl}</a>
            </div>
          )}
        </div>
        <div className="verification-results">
          {proofs && (
            <div>
              <h3>Verification Successful!</h3>
              <pre>{JSON.stringify(proofs, null, 2)}</pre>
              <button className="btn-generate-id-proof" onClick={handleGenerateIdProof}>
                Generate ID Proof QR
              </button>
              <p className="generate-id-info">
                Clicking this button will upload the secret hash identifier of your employee to Solana. 
                You will receive a QR code which you can download and print on your employee ID card. 
                Anyone can scan and verify their employment with your organization.
              </p>
            </div>
          )}
        </div>
        <div className="transaction-results">
          {isTransactionLoading && <p>Transaction is being processed on the Solana Blockchain...</p>}
          {transactionId && (
            <div ref={qrRef} style={{ textAlign: 'center' }}>
              <h3>Transaction Details</h3>
              <p>Transaction was successful!</p>
              <p>Transaction ID: {transactionId}</p>
              <button onClick={() => window.open(`https://explorer.solana.com/tx/${transactionId}?cluster=devnet`, '_blank')} className="btn btn-primary">
                View Proof of Transaction
              </button>
              <QRCode value={`https://credible-hazel.vercel.app/verify/${transactionId}`} size={200} />
              <button onClick={downloadQRCode} className="btn btn-primary">Download QR Code</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;