import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Connection, PublicKey } from '@solana/web3.js';

function VerifyEmployee() {
  const { transactionId } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    verifyEmployee();
  }, [transactionId]);

  const verifyEmployee = async () => {
    try {
      const connection = new Connection('http://localhost:8899', 'confirmed');
      const transaction = await connection.getTransaction(transactionId);

      if (transaction) {
        // Check if the transaction contains the expected data
        // This is a simplified check. You should implement a more robust verification
        if (transaction.meta && transaction.meta.logMessages) {
          setVerificationStatus('Valid Employee');
        } else {
          setVerificationStatus('Invalid Employee');
        }
      } else {
        setVerificationStatus('Transaction not found');
      }
    } catch (error) {
      console.error('Error verifying employee:', error);
      setVerificationStatus('Verification failed');
    }
  };

  return (
    <div className="verify-employee">
      <h2>Employee Verification</h2>
      <p>Status: {verificationStatus}</p>
    </div>
  );
}

export default VerifyEmployee;