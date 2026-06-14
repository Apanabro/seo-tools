import { useState } from 'react';
import { motion } from 'framer-motion';
import './ToolPage.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20 }
};

function esc(s) { return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : ''; }

function generateMeta({ title, description, keywords, url }) {
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    keywords && `<meta name="keywords" content="${esc(keywords)}" />`,
    `<meta name="robots" content="index, follow" />`,
    url && `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:type" content="website" />`,
    url && `<meta property="og:url" content="${esc(url)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`
  ].filter(Boolean);
  return {
    html: tags.join('\n    '), count: tags.length,
    titleLength: title.length, descriptionLength: description.length,
    warnings: [
      title.length > 60 && 'Title too long (recommended: 50-60)',
      title.length < 30 && 'Title too short (recommended: 50-60)',
      description.length > 160 && 'Description too long (recommended: 150-160)',
      description.length < 120 && 'Description too short (recommended: 150-160)'
    ].filter(Boolean)
  };
}

const MetaGenerator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(generateMeta({ title, description, keywords, url }));
  };

  const copyToClipboard = () => { navigator.clipboard.writeText(result.html); };

  return (
    <motion.div className="tool-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="tool-header">
        <div className="tool-header-icon">
          <svg viewBox="0 0 24 24" width="72" height="72">
            <defs><linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9c27b0" /><stop offset="100%" stopColor="#e91e63" /></linearGradient></defs>
            <path fill="url(#metaGrad)" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <h1>Meta Tags Generator</h1>
        <p>Generate optimized HTML meta tags for better SEO and social sharing.</p>
      </div>
      <div className="tool-content">
        <form onSubmit={handleSubmit} className="tool-form">
          <div className="form-group">
            <label htmlFor="title">Page Title</label>
            <input type="text" id="title" placeholder="e.g., Best SEO Tools - Free Online Analysis" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={70} />
            <small style={{ color: title.length > 60 ? 'var(--google-red)' : 'var(--gray-500)' }}>{title.length}/60 characters</small>
          </div>
          <div className="form-group">
            <label htmlFor="description">Meta Description</label>
            <textarea id="description" placeholder="e.g., Professional SEO tools to analyze, audit, and optimize your website..." value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} maxLength={170} />
            <small style={{ color: description.length > 160 ? 'var(--google-red)' : 'var(--gray-500)' }}>{description.length}/160 characters</small>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="keywords">Keywords (optional)</label>
              <input type="text" id="keywords" placeholder="seo, tools, analysis, audit" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="url">Canonical URL (optional)</label>
              <input type="url" id="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="submit-btn">Generate Meta Tags</button>
        </form>

        {result && (
          <motion.div className="result-box success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3>Generated Meta Tags</h3>
              <button onClick={copyToClipboard} style={{ padding: '8px 16px', background: 'var(--google-blue)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>Copy HTML</button>
            </div>
            {result.warnings.length > 0 && (
              <div style={{ marginBottom: '16px', padding: '12px', background: '#fff3cd', borderRadius: 'var(--radius-sm)' }}>
                {result.warnings.map((w, i) => (<p key={i} style={{ color: '#856404', fontSize: '13px', margin: '4px 0' }}>Warning: {w}</p>))}
              </div>
            )}
            <pre>{result.html}</pre>
          </motion.div>
        )}

        <div className="tool-info">
          <h3>What Gets Generated</h3>
          <ul>
            <li>Title tag with optimal length</li>
            <li>Meta description for search results</li>
            <li>Open Graph tags for Facebook/LinkedIn</li>
            <li>Twitter Card tags</li>
            <li>Canonical URL tag</li>
            <li>Robots directive</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default MetaGenerator;
