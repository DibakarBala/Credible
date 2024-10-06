import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import heroAnimation from '../assets/hero-animation.json';
import scanningQRAnimation from '../assets/scanning-qr-animation.json';
import solanaLogo from '../assets/solana-logo.png'; // Make sure to add this file to your assets folder
import './LandingPage.css';

// Import logos
import reclaimLogo from '../assets/reclaim-logo.png';
import zkCompressionLogo from '../assets/zk-compression-logo.png';
import mercuryoLogo from '../assets/mercuryo-logo.png';
import oktoLogo from '../assets/okto-logo.png';

const LandingPage = () => {
  const ftcNumberRef = useRef(null);
  const globalLossRef = useRef(null);
  const ukFraudRef = useRef(null);

  useEffect(() => {
    const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = (progress * (end - start) + start).toFixed(1);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "ftc-number") {
              animateValue(entry.target, 0, 36, 2000);
            } else if (entry.target.id === "global-loss-number") {
              animateValue(entry.target, 0, 2.6, 2000);
            } else if (entry.target.id === "uk-fraud-number") {
              animateValue(entry.target, 0, 1.3, 2000);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ftcNumberRef.current) observer.observe(ftcNumberRef.current);
    if (globalLossRef.current) observer.observe(globalLossRef.current);
    if (ukFraudRef.current) observer.observe(ukFraudRef.current);

    return () => {
      if (ftcNumberRef.current) observer.unobserve(ftcNumberRef.current);
      if (globalLossRef.current) observer.unobserve(globalLossRef.current);
      if (ukFraudRef.current) observer.unobserve(ukFraudRef.current);
    };
  }, []);

  return (
    <div className="landing-page">
      <header>
        <div className="logo">Credible</div>
        <div className="built-with-solana">
          <span>Built with</span>
          <img src={solanaLogo} alt="Solana Logo" className="solana-logo" />
          <span>Solana</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Protecting Citizens Worldwide from Imposter Scams</h1>
          <p>Instantly verify the legitimacy of professionals using blockchain-based ID verification</p>
          <div className="cta-buttons">
            <Link to="/signin" className="btn btn-primary">Get Started</Link>
            {/* Removed the Learn More button */}
          </div>
        </div>
        <div className="hero-animation">
          <Lottie animationData={heroAnimation} loop={true} />
        </div>
      </section>

      <section id="learn-more" className="problem-solution">
        <h2>The Global Threat of Imposter Scams</h2>
        <p>Imposter scams, where criminals pose as legitimate professionals or organizations, are a growing worldwide problem affecting millions of people annually.</p>
        
        <div className="data-visualization">
          <div className="data-item">
            <div className="data-counter">
              <span className="highlight-number" id="ftc-number" ref={ftcNumberRef}>0</span>%
            </div>
            <p>of all fraud reports to the FTC in the USA were imposter scams in 2022.</p>
          </div>
          
          <div className="data-item">
            <div className="data-counter">
              $<span className="highlight-number" id="global-loss-number" ref={globalLossRef}>0</span> billion
            </div>
            <p>Lost to imposter scams globally in 2022.</p>
          </div>
          
          <div className="data-item">
            <div className="data-counter">
              £<span className="highlight-number" id="uk-fraud-number" ref={ukFraudRef}>0</span> billion
            </div>
            <p>Lost to fraud in the UK in 2022.</p>
          </div>
        </div>
        
        <h3>The Credible Solution</h3>
        <p className="solution-text">
          Credible empowers citizens worldwide to instantly verify the authenticity of professionals, protecting them from fraud and financial loss.
        </p>
      </section>

      <section className="features">
        <h2>Why Choose Credible?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Simple and Accessible</h3>
            <p>Scan a QR code on a professional's ID card to instantly view verified information stored on the Solana blockchain.</p>
          </div>
          <div className="feature">
            <h3>Immutable and Secure</h3>
            <p>Blockchain technology ensures tamper-proof and trustworthy data storage.</p>
          </div>
          <div className="feature">
            <h3>Free for Citizens</h3>
            <p>Basic ID verification (1-2 checks daily) is always free, ensuring accessibility for all.</p>
          </div>
          <div className="feature">
            <h3>Real-Time Verification</h3>
            <p>Instantly verify credentials to protect yourself from potential scams.</p>
          </div>
        </div>
      </section>

      <section className="technologies">
        <h2>Our Technology Stack</h2>
        <div className="tech-grid">
          <div className="tech">
            <img src={reclaimLogo} alt="Reclaim Protocol Logo" className="tech-logo" />
            <h3>Reclaim Protocol</h3>
            <p>Ensures secure hashing of employee data, maintaining privacy and integrity.</p>
          </div>
          <div className="tech">
            <img src={zkCompressionLogo} alt="ZK Compression Logo" className="tech-logo" />
            <h3>ZK Compression</h3>
            <p>Enables efficient storage of hashed data on the Solana blockchain.</p>
          </div>
          <div className="tech">
            <img src={mercuryoLogo} alt="Mercuryo Logo" className="tech-logo" />
            <h3>Mercuryo</h3>
            <p>Handles payments seamlessly in both fiat and cryptocurrency.</p>
          </div>
          <div className="tech">
            <img src={oktoLogo} alt="Okto Logo" className="tech-logo" />
            <h3>Okto</h3>
            <p>Provides user-friendly wallet integration and social login capabilities.</p>
          </div>
        </div>
      </section>

      <section className="user-journey">
        <h2>How Credible Works</h2>
        <div className="user-journey-content">
          <div className="journey-animation">
            <Lottie animationData={scanningQRAnimation} loop={true} />
          </div>
          <div className="journey-steps">
            <ol>
              <li>Scan the QR Code on the professional's ID card with your phone.</li>
              <li>Access verification details retrieved from the blockchain instantly.</li>
              <li>Verify key data (e.g., employer name, designation) to ensure the individual is legitimate.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="use-cases">
        <h2>Real-World Use Cases</h2>
        <ul>
          <li>Spotting Fake Government Officials: Instantly verify the credentials of someone claiming to be a public servant.</li>
          <li>Job Recruitment Scams: Check if "job recruiters" are legitimate before sharing sensitive information.</li>
          <li>Financial Fraud Prevention: Verify the authenticity of "bank officers" before handing over documents.</li>
        </ul>
      </section>

      <section className="why-now">
        <h2>Why Credible, Why Now?</h2>
        <ul>
          <li>Rising Global Fraud Incidents: Citizens worldwide urgently need a simple way to verify professionals in real-time.</li>
          <li>Blockchain Adoption: Growing acceptance of blockchain technology makes this solution more viable than ever.</li>
          <li>International Support: Governments and organizations globally are advocating for stronger fraud prevention measures.</li>
        </ul>
      </section>

      <footer>
        <p>&copy; 2024 Credible. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;