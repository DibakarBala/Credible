import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <div className="button-container">
        <Link to="/signin" className="btn btn-primary">Sign In</Link>
        <button className="btn btn-secondary">Request Demo</button>
      </div>
      <div className="content-container">
        <section className="intro">
          <h2>What is Credible?</h2>
          <p>Credible is a platform that enables anyone to instantly verify the legitimacy of professionals using blockchain-based ID verification.</p>
        </section>
        <section className="problem">
          <h2>The Problem We're Solving</h2>
          <ul>
            <li>Growing fraud involving individuals impersonating professionals</li>
            <li>Citizens unable to distinguish between real and fake professionals</li>
            <li>Significant financial and emotional toll on victims</li>
          </ul>
        </section>
        <section className="solution">
          <h2>Our Solution</h2>
          <p>Credible offers a simple, accessible way to verify professionals in real-time:</p>
          <ol>
            <li>Scan the QR code on a professional's ID card</li>
            <li>Access verification details stored on the Solana blockchain</li>
            <li>Instantly verify key data like employer name and designation</li>
          </ol>
        </section>
        <section className="benefits">
          <h2>Why Choose Credible?</h2>
          <ul>
            <li>Designed for everyday citizen use, not just corporations</li>
            <li>Utilizes blockchain security for immutable, transparent data</li>
            <li>Free basic access for all citizens</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default HomePage;