import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import './ToolPage.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

const LinkChecker = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.checkLinks(url);
      if (response.success) {
        setResult(response.output);
      } else {
        setError(response.error || 'Failed to check links');
      }
    } catch (err) {
      setError('Connection error. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="tool-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="tool-header">
        <div className="tool-header-icon">
          <svg viewBox="0 0 24 24" width="72" height="72">
            <defs>
              <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea4335" />
                <stop offset="100%" stopColor="#fbbc04" />
              </linearGradient>
            </defs>
            <path fill="url(#linkGrad)" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
          </svg>
        </div>
        <h1>Broken Link Checker</h1>
        <p>Find and identify broken links on any webpage.</p>
      </div>

      <div className="tool-content">
        <form onSubmit={handleSubmit} className="tool-form">
          <div className="form-group">
            <label htmlFor="url">Website URL</label>
            <input
              type="url"
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Scanning Links...
              </>
            ) : (
              'Check Links'
            )}
          </button>
        </form>

        {error && (
          <motion.div className="result-box error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Error</h3>
            <p>{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div className="result-box success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Link Report</h3>
            <pre>{result}</pre>
          </motion.div>
        )}

        <div className="tool-info">
          <h3>What Gets Checked</h3>
          <ul>
            <li>All internal page links</li>
            <li>All external hyperlinks</li>
            <li>HTTP status codes (200, 301, 404, 500)</li>
            <li>Connection failures and timeouts</li>
            <li>Anchor text context for broken links</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default LinkChecker;
