import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import './ToolPage.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

const SitemapGenerator = () => {
  const [urlsText, setUrlsText] = useState('');
  const [changefreq, setChangefreq] = useState('weekly');
  const [priority, setPriority] = useState(0.8);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const urlLines = urlsText.split('\n').filter(l => l.trim());
      const urls = urlLines.map(loc => ({ loc: loc.trim(), changefreq, priority }));

      const response = await api.generateSitemap({ urls, changefreq, priority });
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error || 'Failed to generate sitemap');
      }
    } catch (err) {
      setError('Connection error. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.content);
  };

  return (
    <motion.div className="tool-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="tool-header">
        <div className="tool-header-icon">
          <svg viewBox="0 0 24 24" width="72" height="72">
            <defs>
              <linearGradient id="sitemapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00bcd4" />
                <stop offset="100%" stopColor="#2196f3" />
              </linearGradient>
            </defs>
            <path fill="url(#sitemapGrad)" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 15h8v2H8v-2zm0-4h8v2H8v-2z"/>
          </svg>
        </div>
        <h1>Sitemap Generator</h1>
        <p>Generate an XML sitemap to help search engines index your website.</p>
      </div>

      <div className="tool-content">
        <form onSubmit={handleSubmit} className="tool-form">
          <div className="form-group">
            <label htmlFor="urls">URLs (one per line)</label>
            <textarea
              id="urls"
              value={urlsText}
              onChange={(e) => setUrlsText(e.target.value)}
              rows={6}
              placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/contact"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="changefreq">Change Frequency</label>
              <select
                id="changefreq"
                value={changefreq}
                onChange={(e) => setChangefreq(e.target.value)}
              >
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority (0.0 - 1.0)</label>
              <input
                type="number"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(parseFloat(e.target.value))}
                min={0}
                max={1}
                step={0.1}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              'Generate Sitemap'
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3>Generated Sitemap ({result.urlCount} URLs)</h3>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '8px 16px',
                  background: 'var(--google-blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                Copy XML
              </button>
            </div>
            <pre>{result.content}</pre>
          </motion.div>
        )}

        <div className="tool-info">
          <h3>What Gets Generated</h3>
          <ul>
            <li>Valid XML sitemap format</li>
            <li>Custom change frequency per URL</li>
            <li>Priority settings for each page</li>
            <li>Last modified dates</li>
            <li>Ready to submit to Google Search Console</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default SitemapGenerator;
