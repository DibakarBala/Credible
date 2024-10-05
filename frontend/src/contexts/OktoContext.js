import React, { createContext, useContext, useState, useCallback } from 'react';

const OktoContext = createContext(null);

// Mock implementation of Okto SDK functions
const mockAuthenticate = async (idToken) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { userId: 'mock-user-id', token: 'mock-token' };
};

const mockLogout = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export const OktoProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authDetails, setAuthDetails] = useState(null);

  const authenticate = useCallback(async (idToken) => {
    try {
      const result = await mockAuthenticate(idToken);
      setIsLoggedIn(true);
      setAuthDetails(result);
      return { status: 'success', data: result };
    } catch (error) {
      console.error('Authentication failed:', error);
      return { status: 'error', error };
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      await mockLogout();
      setIsLoggedIn(false);
      setAuthDetails(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const value = {
    isLoggedIn,
    authenticate,
    logOut,
    authDetails,
  };

  return <OktoContext.Provider value={value}>{children}</OktoContext.Provider>;
};

export const useOkto = () => {
  const context = useContext(OktoContext);
  if (!context) {
    throw new Error('useOkto must be used within an OktoProvider');
  }
  return context;
};