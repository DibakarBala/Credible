import { useState } from 'react';

export const useOkto = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginWithOkto = async () => {
    // Mock login
    setIsLoggedIn(true);
    console.log('Logged in with Okto (mock)');
  };

  const openWallet = async () => {
    console.log('Opening Okto wallet (mock)');
  };

  const logOut = async () => {
    setIsLoggedIn(false);
    console.log('Logged out from Okto (mock)');
  };

  return { loginWithOkto, openWallet, logOut, isLoggedIn };
};