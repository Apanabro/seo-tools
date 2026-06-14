import { useState } from 'react';
import { motion } from 'framer-motion';
import './ToolPage.css';

const PROXY = 'https://api.allorigins.win/raw?url=';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

async function trackRank(keyword, domain, maxPages) {
  const results = [];
  for (let page = 1; page <= maxPages; page++) {
    try {
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&start=${(page - 1) * 10}`;
      const res = await fetch(PROXY + encodeURIComponent(googleUrl));
      const html = await res.text();
      const regex = /<a[^>]+href="\/url\?q=([^&"]+)/g;
      let match;
      let position = (page - 1) * 10;
      while ((match = regex.exec(html)) !== null) {
        position++;
        const resultUrl = decodeURIComponent(match[1]);
        if (resultUrl.includes(domain)) {
          results.push({ position, url: resultUrl, page });
        }
      }
    } catch (e) { /* skip */ }
  }
  return { keyword, domain, found: results.length > 0, positions: results, totalPagesSearched: maxPages };
}

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
      const data = await trackRank(keyword, domain, maxPages);
      setResult(data);
    } catch (err) {
      setError('Failed to track rank. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="tool-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="tool-header">
        <div className="tool-header-icon">
          <svg viewBox="0 0 24 24" width="72" height="72">
            <defs><linearGradient id="rankGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4285f4" /><stop offset="100%" stopColor="#34a853" /></linearGradient></defs>
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
              <input type="text" id="keyword" placeholder="e.g., age calculator" value={keyword} onChange={(e) => setKeyword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="domain">Target Domain</label>
              <input type="text" id="domain" placeholder="e.g., example.com" value={domain} onChange={(e) => setDomain(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="maxPages">Max Pages to Search</label>
            <select id="maxPages" value={maxPages} onChange={(e) => setMaxPages(parseInt(e.target.value))}>
              <option value={1}>1 page (Top 10)</option>
              <option value={2}>2 pages (Top 20)</option>
              <option value={3}>3 pages (Top 30)</option>
              <option value={5}>5 pages (Top 50)</option>
            </select>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <><span className="spinner"></span>Analyzing...</> : 'Track Rank'}
          </button>
        </form>

        {error && (
          <motion.div className="result-box error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Error</h3><p>{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div className="result-box success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Results for "{result.keyword}"</h3>
            {result.found ? (
              <div>
                <p style={{ color: 'var(--google-green)', fontWeight: 500, marginBottom: 12 }}>
                  Found {result.positions.length} ranking position(s) for {result.domain}
                </p>
                {result.positions.map((p, i) => (
                  <div key={i} style={{ padding: '8px 12px', background: 'rgba(66,133,244,0.1)', borderRadius: 6, marginBottom: 8 }}>
                    <strong>Position #{p.position}</strong> (Page {p.page})
                    <br /><span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{p.url}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--google-red)' }}>
                {result.domain} was NOT found in the top {result.totalPagesSearched * 10} results for "{result.keyword}".
              </p>
            )}
          </motion.div>
        )}

        <div className="tool-info">
          <h3>How It Works</h3>
          <ul>
            <li>Searches Google for your target keyword</li>
            <li>Scans organic search results (excludes ads)</li>
            <li>Identifies your domain's ranking position</li>
            <li>Real-time results via CORS proxy</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default RankTracker;
