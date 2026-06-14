import { useState } from 'react';
import { motion } from 'framer-motion';
import './ToolPage.css';

const PROXY = 'https://api.allorigins.win/raw?url=';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

function analyze(html, url) {
  const issues = [];
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;
  if (!title) issues.push({ type: 'error', msg: 'Missing <title> tag' });
  else if (title.length < 30) issues.push({ type: 'warning', msg: `Title too short (${title.length} chars, recommended 50-60)` });
  else if (title.length > 60) issues.push({ type: 'warning', msg: `Title too long (${title.length} chars, recommended 50-60)` });
  else issues.push({ type: 'success', msg: `Title length OK (${title.length} chars)` });

  const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
  const description = descMatch ? descMatch[1].trim() : null;
  if (!description) issues.push({ type: 'error', msg: 'Missing meta description' });
  else if (description.length < 120) issues.push({ type: 'warning', msg: `Description too short (${description.length} chars, recommended 150-160)` });
  else if (description.length > 160) issues.push({ type: 'warning', msg: `Description too long (${description.length} chars, recommended 150-160)` });
  else issues.push({ type: 'success', msg: `Description length OK (${description.length} chars)` });

  if (!html.match(/<meta[^>]+name="viewport"/i)) issues.push({ type: 'error', msg: 'Missing viewport meta tag (not mobile-friendly)' });
  else issues.push({ type: 'success', msg: 'Viewport meta tag present' });

  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  if (h1Count === 0) issues.push({ type: 'error', msg: 'No <h1> tag found' });
  else if (h1Count > 1) issues.push({ type: 'warning', msg: `Multiple <h1> tags (${h1Count})` });
  else issues.push({ type: 'success', msg: 'Single <h1> tag present' });

  if (!html.match(/<meta[^>]+property="og:/i)) issues.push({ type: 'warning', msg: 'Missing Open Graph tags' });
  else issues.push({ type: 'success', msg: 'Open Graph tags present' });

  if (!html.match(/<link[^>]+rel="canonical"/i)) issues.push({ type: 'warning', msg: 'Missing canonical URL' });
  else issues.push({ type: 'success', msg: 'Canonical URL present' });

  if (!html.match(/<meta[^>]+name="twitter:/i)) issues.push({ type: 'warning', msg: 'Missing Twitter Card tags' });
  else issues.push({ type: 'success', msg: 'Twitter Card tags present' });

  const images = html.match(/<img[^>]+>/gi) || [];
  const noAlt = images.filter(img => !img.match(/alt=["'][^"']+["']/i));
  if (noAlt.length > 0) issues.push({ type: 'warning', msg: `${noAlt.length} of ${images.length} images missing alt text` });
  else if (images.length > 0) issues.push({ type: 'success', msg: `All ${images.length} images have alt text` });

  const score = Math.max(0, 100 - issues.filter(i => i.type === 'error').length * 15 - issues.filter(i => i.type === 'warning').length * 5);
  return { url, title, description, score, issues, imageCount: images.length, h1Count };
}

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
      const res = await fetch(PROXY + encodeURIComponent(url));
      const html = await res.text();
      setResult(analyze(html, url));
    } catch (err) {
      setError('Failed to fetch page. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="tool-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="tool-header">
        <div className="tool-header-icon">
          <svg viewBox="0 0 24 24" width="72" height="72">
            <defs><linearGradient id="auditGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#34a853" /><stop offset="100%" stopColor="#fbbc04" /></linearGradient></defs>
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
            <input type="url" id="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} required />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <><span className="spinner"></span>Auditing...</> : 'Run SEO Audit'}
          </button>
        </form>

        {error && (
          <motion.div className="result-box error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>Error</h3><p>{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div className="result-box success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3>Audit Results</h3>
              <div style={{ fontSize: 32, fontWeight: 700, color: result.score >= 80 ? 'var(--google-green)' : result.score >= 50 ? 'var(--google-yellow)' : 'var(--google-red)' }}>
                {result.score}/100
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 13 }}>
              <span>Title: {result.title ? `"${result.title.substring(0, 40)}..."` : 'Missing'}</span>
            </div>
            {result.issues.map((issue, i) => (
              <div key={i} style={{ padding: '6px 10px', marginBottom: 4, borderRadius: 4, fontSize: 13, background: issue.type === 'error' ? 'rgba(234,67,53,0.1)' : issue.type === 'warning' ? 'rgba(251,188,4,0.1)' : 'rgba(52,168,83,0.1)', color: issue.type === 'error' ? 'var(--google-red)' : issue.type === 'warning' ? 'var(--google-yellow)' : 'var(--google-green)' }}>
                {issue.type === 'error' ? 'X' : issue.type === 'warning' ? '!' : 'OK'} {issue.msg}
              </div>
            ))}
          </motion.div>
        )}

        <div className="tool-info">
          <h3>What Gets Audited</h3>
          <ul>
            <li>Title tag length and content</li>
            <li>Meta description optimization</li>
            <li>Heading structure (H1-H6)</li>
            <li>Image alt attributes</li>
            <li>Canonical tags</li>
            <li>OpenGraph social tags</li>
            <li>Mobile viewport</li>
            <li>Twitter Card tags</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default SeoAudit;
