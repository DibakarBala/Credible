import React from 'react';
import { useOkto } from '../contexts/OktoContext';

const OktoLogin = () => {
  const { isLoggedIn, authenticate, logOut } = useOkto();

  const handleLogin = async () => {
    try {
      const result = await authenticate('mock-id-token');
      if (result.status === 'success') {
        console.log('Login successful:', result.data);
      } else {
        console.error('Login failed:', result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Okto Integration</h2>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login with Okto</button>
      ) : (
        <button onClick={logOut}>Log Out</button>
      )}
    </div>
  );
};

export default OktoLogin;