import React, { useState } from 'react';
import Lottie from 'lottie-react';
import signInAnimation from '../assets/sign-in-animation.json';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('demo');
  const [password, setPassword] = useState('demo');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in with:', email, password);
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="animation-container">
          <Lottie animationData={signInAnimation} loop={true} />
        </div>
        <div className="form-container">
          <h2>Sign in to Credible</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;