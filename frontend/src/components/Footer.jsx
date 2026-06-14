import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const toolLinks = [
    { path: '/rank-tracker', label: 'Rank Tracker' },
    { path: '/seo-audit', label: 'SEO Audit' },
    { path: '/link-checker', label: 'Link Checker' },
    { path: '/meta-generator', label: 'Meta Tags' },
    { path: '/robots-generator', label: 'Robots.txt' },
    { path: '/sitemap-generator', label: 'Sitemap' },
  ];

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H0V50Z" fill="white"/>
        </svg>
      </div>
      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
                <defs>
                  <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4285f4" />
                    <stop offset="50%" stopColor="#34a853" />
                    <stop offset="100%" stopColor="#fbbc04" />
                  </linearGradient>
                </defs>
                <rect width="48" height="48" rx="10" fill="url(#footerGrad)"/>
                <circle cx="21" cy="21" r="9" stroke="white" strokeWidth="3" fill="none"/>
                <line x1="27.5" y1="27.5" x2="36" y2="36" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
              <span>SEO Tools</span>
            </div>
            <p>Professional SEO tools powered by browser automation. Analyze, audit, and optimize your website for better search rankings.</p>
          </div>

          <div className="footer-section">
            <h4>Tools</h4>
            <ul>
              {toolLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">Google Search Console</a></li>
              <li><a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer">PageSpeed Insights</a></li>
              <li><a href="https://schema.org/" target="_blank" rel="noopener noreferrer">Schema.org</a></li>
              <li><a href="https://www.sitemaps.org/" target="_blank" rel="noopener noreferrer">Sitemaps.org</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="mailto:support@seo-tools.com">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} SEO Tools. All rights reserved.</p>
          <div className="footer-badges">
            <span className="badge">100% Free</span>
            <span className="badge">No Signup</span>
            <span className="badge">Privacy First</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
