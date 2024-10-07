import React, { useState, useEffect, useRef } from 'react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import QRCode from 'react-qr-code';
import { saveIdentifierOnSolana } from '../utils/solana'; // Ensure this function interacts with the real Solana network
import './Dashboard.css';

// Mock functions for development
const mockSaveIdentifierOnSolana = async (identifier) => {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'mock-transaction-id-' + Math.random().toString(36).substring(7);
};

const mockCompress = (data) => {
  return btoa(data); // Use base64 encoding as a simple "compression" for demonstration
};

const mockDecompress = (data) => {
  return atob(data); // Use base64 decoding as a simple "decompression" for demonstration
};

const Dashboard = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [organization, setOrganization] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [email, setEmail] = useState(''); // New state for Email ID
  const [reclaimProofRequest, setReclaimProofRequest] = useState(null);
  const [requestUrl, setRequestUrl] = useState('');
  const [statusUrl, setStatusUrl] = useState('');
  const [proofs, setProofs] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const qrRef = useRef();
  const [compressedIdentifier, setCompressedIdentifier] = useState('');
  const [compressionStatus, setCompressionStatus] = useState('');

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
    setCompressionStatus('');
    try {
      const identifier = proofs?.identifier;
      if (identifier) {
        setCompressionStatus('Initializing ZK compression...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCompressionStatus('Compressing data...');
        // Here, you would use actual ZK compression instead of mock compression
        // const compressed = await realZKCompress(identifier);
        const compressed = btoa(identifier); // Temporary placeholder
        setCompressedIdentifier(compressed);
        
        setCompressionStatus('ZK compression complete. Preparing for upload...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        setCompressionStatus('Uploading compressed data to Solana blockchain...');
        // Use the real Solana function here
        const transactionId = await saveIdentifierOnSolana(compressed);
        console.log('Transaction ID:', transactionId);
        setTransactionId(transactionId);
        
        setCompressionStatus('Upload complete!');
      } else {
        console.error('No identifier found in proofs');
        setCompressionStatus('Error: No identifier found');
      }
    } catch (error) {
      console.error('Error generating ID proof:', error);
      setCompressionStatus('Error occurred during the process');
    } finally {
      setIsTransactionLoading(false);
    }
  };

  // New function to handle verification
  const handleVerify = async (transactionId) => {
    try {
      // In a real implementation, you would fetch the compressed data from Solana here
      // For now, we'll just use the compressedIdentifier state
      const compressedData = compressedIdentifier;

      // Use mock decompression
      const decompressedIdentifier = mockDecompress(compressedData);

      console.log('Decompressed Identifier:', decompressedIdentifier);
      // TODO: Implement the logic to display the decompressed identifier details
    } catch (error) {
      console.error('Error verifying identifier:', error);
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

  // In the JSX, replace the verify button with a mock verification
  const handleMockVerify = () => {
    const decompressed = mockDecompress(compressedIdentifier);
    alert(`Mock Verification Result: ${decompressed}`);
  };

  const renderVerificationData = (proofs) => {
    if (!proofs) return null;

    const { claimData } = proofs;
    const { provider, parameters } = claimData;
    const parsedParameters = JSON.parse(parameters);
    const username = parsedParameters.paramValues.username;

    // Map provider to a user-friendly name
    const providerName = provider === 'http' ? 'GitHub' : provider;

    return (
      <table className="verification-table">
        <tbody>
          <tr>
            <td>Provider</td>
            <td>{providerName}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{username}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>Verified</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="dashboard">
      <h2>Employer Dashboard</h2>
      <a href="/employee-verification" className="employee-verification-link">
        Check Employee Verification Status
      </a>
      <div className="dashboard-content">
        <div className="verification-form">
          <div className="bulk-upload">
            <input type="file" id="fileInput" className="file-input" />
            <button className="upload-button" onClick={() => alert('This is a dummy upload button.')}>
              Upload Employee Data in Bulk
            </button>
          </div>
          <h3>Generate Employee Verification Request</h3>
          <form onSubmit={handleCreateClaim}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="designation">Designation:</label>
              <input
                type="text"
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organization:</label>
              <input
                type="text"
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="idNumber">ID Number:</label>
              <input
                type="text"
                id="idNumber"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="issuedDate">Issued Date:</label>
              <input
                type="date"
                id="issuedDate"
                value={issuedDate}
                onChange={(e) => setIssuedDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group"> {/* New Email ID field */}
              <label htmlFor="email">Email ID:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {renderVerificationData(proofs)}
              <button className="btn-generate-id-proof" onClick={handleGenerateIdProof} disabled={isTransactionLoading}>
                Generate ID Proof QR
              </button>
              {compressionStatus && (
                <div className="compression-status">
                  <p>{compressionStatus}</p>
                  {isTransactionLoading && <div className="loader"></div>}
                </div>
              )}
              <p className="generate-id-info">
                Clicking this button will compress your employee's identifier using ZK compression
                and upload it to the Solana blockchain. You will receive a QR code which you can
                download and print on your employee ID card. Anyone can scan and verify their
                employment with your organization.
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
              <button onClick={() => window.open(`https://credible-hazel.vercel.app/verify/${transactionId}`, '_blank')} className="btn btn-primary">
                Verify Transaction
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