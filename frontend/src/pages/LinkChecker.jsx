import { useState } from 'react';
import { motion } from 'framer-motion';
import './ToolPage.css';

const PROXY = 'https://api.allorigins.win/raw?url=';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

async function extractLinks(pageUrl) {
  const res = await fetch(PROXY + encodeURIComponent(pageUrl));
  const html = await res.text();
  const regex = /<a[^>]+href=["']([^"'#]+)["'][^>]*>/gi;
  const seen = new Set();
  const links = [];
  let match;
  const base = new URL(pageUrl);

  while ((match = regex.exec(html)) !== null) {
    let link = match[1];
    if (link.startsWith('//')) link = 'https:' + link;
    else if (link.startsWith('/')) link = base.origin + link;
    else if (!link.startsWith('http')) continue;
    if (seen.has(link)) continue;
    seen.add(link);
    links.push({ url: link, status: null, statusText: '', ok: false });
  }
  return links;
}

async function checkLink(link) {
  try {
    const res = await fetch(PROXY + encodeURIComponent(link.url), { method: 'GET' });
    link.status = res.status;
    link.statusText = res.statusText || (res.ok ? 'OK' : 'Error');
    link.ok = res.ok;
  } catch (e) {
    link.status = 0;
    link.statusText = 'Failed';
    link.ok = false;
  }
  return link;
}

const LinkChecker = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    setProgress('Fetching page...');
    try {
      const links = await extractLinks(url);
      setProgress(`Checking ${Math.min(links.length, 30)} links...`);
      const toCheck = links.slice(0, 30);
      const checked = await Promise.all(toCheck.map(checkLink));
      const broken = checked.filter(l => !l.ok);
      setResult({ url, totalLinks: links.length, checkedLinks: checked.length, brokenLinks: broken.length, workingLinks: checked.length - broken.length, links: checked });
    } catch (err) {
      setError('Failed to check links. Check the URL and try again.');
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  return (
    <motion.div className="tool-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="tool-header">
        <div className="tool-header-icon">
          <svg viewBox="0 0 24 24" width="72" height="72">
            <defs><linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ea4335" /><stop offset="100%" stopColor="#fbbc04" /></linearGradient></defs>
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
            <input type="url" id="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} required />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <><span className="spinner"></span>{progress || 'Scanning...'}</> : 'Check Links'}
          </button>
        </form>

        {error && (
          <motion.div className="result-box error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Error</h3><p>{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div className="result-box success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Link Report</h3>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 14 }}>
              <span>Total: <strong>{result.totalLinks}</strong></span>
              <span style={{ color: 'var(--google-green)' }}>Working: <strong>{result.workingLinks}</strong></span>
              <span style={{ color: 'var(--google-red)' }}>Broken: <strong>{result.brokenLinks}</strong></span>
            </div>
            {result.brokenLinks > 0 && (
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ color: 'var(--google-red)', marginBottom: 8 }}>Broken Links</h4>
                {result.links.filter(l => !l.ok).map((l, i) => (
                  <div key={i} style={{ padding: '6px 10px', marginBottom: 4, borderRadius: 4, fontSize: 13, background: 'rgba(234,67,53,0.1)', color: 'var(--google-red)' }}>
                    [{l.status || 'FAIL'}] {l.url}
                  </div>
                ))}
              </div>
            )}
            {result.brokenLinks === 0 && (
              <p style={{ color: 'var(--google-green)', fontWeight: 500 }}>All checked links are working!</p>
            )}
          </motion.div>
        )}

        <div className="tool-info">
          <h3>What Gets Checked</h3>
          <ul>
            <li>All internal page links</li>
            <li>All external hyperlinks</li>
            <li>HTTP status codes (200, 301, 404, 500)</li>
            <li>Connection failures and timeouts</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default LinkChecker;
