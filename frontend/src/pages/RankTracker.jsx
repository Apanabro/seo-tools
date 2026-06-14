import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import './ToolPage.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

const RankTracker = () => {
  const [keyword, setKeyword] = useState('');
  const [domain, setDomain] = useState('');
  const [maxPages, setMaxPages] = useState(3);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.trackRank(keyword, domain, maxPages);
      if (response.success) {
        setResult(response.output);
      } else {
        setError(response.error || 'Failed to track rank');
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
              <linearGradient id="rankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285f4" />
                <stop offset="100%" stopColor="#34a853" />
              </linearGradient>
            </defs>
            <path fill="url(#rankGrad)" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
          </svg>
        </div>
        <h1>Keyword Rank Tracker</h1>
        <p>Track your website's position on Google search results for any keyword.</p>
      </div>

      <div className="tool-content">
        <form onSubmit={handleSubmit} className="tool-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="keyword">Target Keyword</label>
              <input
                type="text"
                id="keyword"
                placeholder="e.g., best browser automation"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="domain">Target Domain</label>
              <input
                type="text"
                id="domain"
                placeholder="e.g., example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="maxPages">Max Pages to Search</label>
            <select
              id="maxPages"
              value={maxPages}
              onChange={(e) => setMaxPages(parseInt(e.target.value))}
            >
              <option value={1}>1 page (Top 10)</option>
              <option value={2}>2 pages (Top 20)</option>
              <option value={3}>3 pages (Top 30)</option>
              <option value={5}>5 pages (Top 50)</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              'Track Rank'
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
            <h3>Results</h3>
            <pre>{result}</pre>
          </motion.div>
        )}

        <div className="tool-info">
          <h3>How It Works</h3>
          <ul>
            <li>Searches Google for your target keyword</li>
            <li>Scans organic search results (excludes ads)</li>
            <li>Identifies your domain's ranking position</li>
            <li>Uses real browser user-agent to avoid detection</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default RankTracker;
