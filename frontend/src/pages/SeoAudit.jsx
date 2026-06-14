import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import './ToolPage.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

const SeoAudit = () => {
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
      const response = await api.auditPage(url);
      if (response.success) {
        setResult(response.output);
      } else {
        setError(response.error || 'Failed to audit page');
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
              <linearGradient id="auditGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34a853" />
                <stop offset="100%" stopColor="#fbbc04" />
              </linearGradient>
            </defs>
            <path fill="url(#auditGrad)" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
        </div>
        <h1>On-Page SEO Audit</h1>
        <p>Comprehensive audit of on-page SEO factors for any URL.</p>
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
                Auditing...
              </>
            ) : (
              'Run SEO Audit'
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
            <h3>Audit Results</h3>
            <pre>{result}</pre>
          </motion.div>
        )}

        <div className="tool-info">
          <h3>What Gets Audited</h3>
          <ul>
            <li>Page load time</li>
            <li>Title tag length and content</li>
            <li>Meta description optimization</li>
            <li>Heading structure (H1-H6)</li>
            <li>Image alt attributes</li>
            <li>Canonical tags</li>
            <li>Robots meta tag</li>
            <li>OpenGraph social tags</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default SeoAudit;
