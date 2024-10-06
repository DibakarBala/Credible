import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import './VerifyTransaction.css';

function VerifyTransaction() {
  const [txSignature, setTxSignature] = useState('');
  const [professionalData, setProfessionalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/verify/');
    const signatureFromUrl = pathParts.length > 1 ? pathParts[1] : '';
    setTxSignature(signatureFromUrl);
  }, [location]);

  const verifyTransaction = async () => {
    setLoading(true);
    setError(null);
    setProfessionalData(null);
    setVerified(null);

    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const transaction = await connection.getTransaction(txSignature, {
        commitment: 'confirmed',
      });

      if (!transaction) {
        setError('Professional not found or invalid QR code');
        setVerified(false);
      } else {
        // Here you would decode the transaction data to get professional details
        // This is a placeholder. Replace with actual data extraction logic
        const decodedData = {
          name: "John Doe",
          designation: "Software Engineer",
          organization: "Solana Inc.",
          idNumber: "SOL123456",
          issuedDate: new Date().toLocaleDateString(),
        };
        setProfessionalData(decodedData);
        setVerified(true);
      }
    } catch (err) {
      console.error("Error verifying professional:", err);
      setError('Failed to verify professional. Please try again.');
      setVerified(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h1>Professional Verification</h1>
      <div className="input-group">
        <input
          type="text"
          value={txSignature}
          onChange={(e) => setTxSignature(e.target.value)}
          placeholder="Enter transaction signature"
        />
        <button onClick={verifyTransaction} disabled={loading || !txSignature}>
          {loading ? 'Verifying...' : 'Verify Transaction'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {verified !== null && (
        <div className={`verification-card ${verified ? 'verified' : 'unverified'}`}>
          <div className="card-header">
            <span className="status-icon">{verified ? '✅' : '⚠️'}</span>
            <h2>{verified ? 'Verified Professional' : 'Unverified Individual'}</h2>
          </div>
          <div className="card-body">
            {verified ? (
              <div className="professional-details">
                <div className="detail-item">
                  <span className="label">Name:</span>
                  <span className="value">{professionalData.name}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Designation:</span>
                  <span className="value">{professionalData.designation}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Organization:</span>
                  <span className="value">{professionalData.organization}</span>
                </div>
                <div className="detail-item">
                  <span className="label">ID Number:</span>
                  <span className="value">{professionalData.idNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Issued Date:</span>
                  <span className="value">{professionalData.issuedDate}</span>
                </div>
              </div>
            ) : (
              <div className="warning-details">
                <p className="warning-message">
                  WARNING: The person in front of you could be a scammer. 
                  They are not a verified professional. Please be extremely cautious!
                </p>
                <ul className="caution-list">
                  <li>Do not share any personal information</li>
                  <li>Do not make any payments or financial transactions</li>
                  <li>Contact the official organization directly to verify their identity</li>
                  <li>If you feel threatened or suspicious, contact local authorities immediately</li>
                </ul>
              </div>
            )}
          </div>
          <div className="blockchain-verification">
            Verification powered by Solana Blockchain: Immutable, Secure, and Transparent
          </div>
          <div className="credible-footer">
            Built with Credible, for the greater good
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyTransaction;