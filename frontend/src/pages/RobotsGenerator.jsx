import { useState } from 'react';
import { motion } from 'framer-motion';
import './ToolPage.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

function generateRobotsTxt({ sitemap, disallow = [], allow = [] }) {
  const lines = ['User-agent: *', ...allow.map(p => `Allow: ${p}`), ...disallow.map(p => `Disallow: ${p}`), sitemap && `Sitemap: ${sitemap}`].filter(Boolean);
  return { content: lines.join('\n'), lines: lines.length };
}

const RobotsGenerator = () => {
  const [sitemap, setSitemap] = useState('');
  const [disallow, setDisallow] = useState('/admin/\n/private/\n/cgi-bin/');
  const [allow, setAllow] = useState('/');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const disallowArr = disallow.split('\n').filter(l => l.trim());
    const allowArr = allow.split('\n').filter(l => l.trim());
    setResult(generateRobotsTxt({ sitemap: sitemap || undefined, disallow: disallowArr, allow: allowArr }));
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(result.content); };

  return (
    <motion.div className="tool-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="tool-header">
        <div className="tool-header-icon">
          <svg viewBox="0 0 24 24" width="72" height="72">
            <defs><linearGradient id="robotsGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff9800" /><stop offset="100%" stopColor="#ff5722" /></linearGradient></defs>
            <path fill="url(#robotsGrad)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h1>Robots.txt Generator</h1>
        <p>Create a robots.txt file to control search engine crawling behavior.</p>
      </div>
      <div className="tool-content">
        <form onSubmit={handleSubmit} className="tool-form">
          <div className="form-group">
            <label htmlFor="sitemap">Sitemap URL (optional)</label>
            <input type="url" id="sitemap" placeholder="https://example.com/sitemap.xml" value={sitemap} onChange={(e) => setSitemap(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="disallow">Disallow Paths (one per line)</label>
            <textarea id="disallow" value={disallow} onChange={(e) => setDisallow(e.target.value)} rows={4} placeholder="/admin/&#10;/private/&#10;/cgi-bin/" />
          </div>
          <div className="form-group">
            <label htmlFor="allow">Allow Paths (one per line)</label>
            <textarea id="allow" value={allow} onChange={(e) => setAllow(e.target.value)} rows={2} placeholder="/" />
          </div>
          <button type="submit" className="submit-btn">Generate Robots.txt</button>
        </form>

        {result && (
          <motion.div className="result-box success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3>Generated Robots.txt</h3>
              <button onClick={copyToClipboard} style={{ padding: '8px 16px', background: 'var(--google-blue)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Copy</button>
            </div>
            <pre>{result.content}</pre>
          </motion.div>
        )}

        <div className="tool-info">
          <h3>What Gets Generated</h3>
          <ul>
            <li>User-agent directive for all crawlers</li>
            <li>Allow and Disallow rules</li>
            <li>Sitemap reference</li>
            <li>Proper formatting for all major search engines</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default RobotsGenerator;
