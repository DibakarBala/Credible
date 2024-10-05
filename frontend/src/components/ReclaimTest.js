import React, { useState, useEffect } from 'react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

function ReclaimTest() {
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initializeReclaim() {
      const APP_ID = "0x336a0772E83d5a84F70779D4B5533766ca3C2D16";
      const APP_SECRET = "0x37b0bb8d34a1e73853b197f45969875a40e1c9c57bb34e9c8a6270cb4c11f05b";
      const GOOGLE_PROVIDER_ID = "f9f383fd-32d9-4c54-942f-5e9fda349762";

      try {
        const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, GOOGLE_PROVIDER_ID);
        
        const url = await reclaimProofRequest.getRequestUrl();
        setRequestUrl(url);

        await reclaimProofRequest.startSession({
          onSuccessCallback: (proofs) => {
            console.log('Verification success', proofs);
            setProofs(proofs);
          },
          onFailureCallback: (error) => {
            console.error('Verification failed', error);
            setError(error.message);
          }
        });
      } catch (err) {
        console.error('Error initializing Reclaim:', err);
        setError(err.message);
      }
    }

    initializeReclaim();
  }, []);

  return (
    <div className="reclaim-test">
      <h2>Reclaim Protocol Test</h2>
      {requestUrl && (
        <div>
          <h3>Verification URL:</h3>
          <a href={requestUrl} target="_blank" rel="noopener noreferrer">{requestUrl}</a>
        </div>
      )}
      {proofs && (
        <div>
          <h3>Verification Successful!</h3>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default ReclaimTest;