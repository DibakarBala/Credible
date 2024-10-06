import React from 'react';
import { useParams } from 'react-router-dom';
import './VerifyTransaction.css'; // Import a separate CSS file for styling

const VerifyTransaction = () => {
  const { transactionId } = useParams();

  return (
    <div className="verification-page">
      <div className="verification-container">
        <h2 className="verification-title">Employer Verification</h2>
        <p className="verification-message">This employer is verified and trustworthy.</p>
        <div className="transaction-details">
          <p className="transaction-id-label">Transaction ID:</p>
          <p className="transaction-id">{transactionId}</p>
        </div>
        <p className="verification-info">
          This transaction confirms that the individual presenting this ID is a legitimate employee of the organization.
        </p>
        <a href={`https://explorer.solana.com/tx/${transactionId}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="explorer-link">
          View on Solana Explorer
        </a>
      </div>
    </div>
  );
};

export default VerifyTransaction;