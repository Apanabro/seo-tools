require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Health check endpoint (for UptimeRobot)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'seo-tools-api'
  });
});

// API: Keyword Rank Tracker
app.post('/api/seo/rank', async (req, res) => {
  const { keyword, domain, maxPages = 3 } = req.body;

  if (!keyword || !domain) {
    return res.status(400).json({ error: 'Keyword and domain are required' });
  }

  try {
    const result = await runScript('seo-rank-tracker.js', [keyword, domain, String(maxPages)]);
    res.json({ success: true, output: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: On-Page SEO Audit
app.post('/api/seo/audit', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const result = await runScript('seo-audit.js', [url]);
    res.json({ success: true, output: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Broken Link Checker
app.post('/api/seo/links', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const result = await runScript('seo-links.js', [url]);
    res.json({ success: true, output: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Meta Tags Generator
app.post('/api/seo/meta', (req, res) => {
  const { title, description, keywords, url } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const meta = generateMetaTags({ title, description, keywords, url });
  res.json({ success: true, data: meta });
});

// API: Robots.txt Generator
app.post('/api/seo/robots', (req, res) => {
  const { sitemap, disallow, allow } = req.body;

  const robots = generateRobotsTxt({ sitemap, disallow, allow });
  res.json({ success: true, data: robots });
});

// API: Sitemap Generator
app.post('/api/seo/sitemap', (req, res) => {
  const { urls, changefreq, priority } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'URLs array is required' });
  }

  const sitemap = generateSitemap({ urls, changefreq, priority });
  res.json({ success: true, data: sitemap });
});

// Helper: Run SEO scripts
function runScript(scriptName, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptName, ...args], {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 60000
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => { output += data.toString(); });
    child.stderr.on('data', (data) => { errorOutput += data.toString(); });

    child.on('close', (code) => {
      if (code !== 0 && errorOutput) {
        reject(new Error(errorOutput));
      } else {
        resolve(output);
      }
    });

    child.on('error', reject);
  });
}

// Helper: Generate Meta Tags
function generateMetaTags({ title, description, keywords, url }) {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    keywords && `<meta name="keywords" content="${escapeHtml(keywords)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${escapeHtml(url || '')}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="website" />`,
    url && `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  ].filter(Boolean);

  return {
    html: tags.join('\n    '),
    count: tags.length,
    titleLength: title.length,
    descriptionLength: description.length,
    warnings: [
      title.length > 60 && 'Title is too long (recommended: 50-60 characters)',
      title.length < 30 && 'Title is too short (recommended: 50-60 characters)',
      description.length > 160 && 'Description is too long (recommended: 150-160 characters)',
      description.length < 120 && 'Description is too short (recommended: 150-160 characters)'
    ].filter(Boolean)
  };
}

// Helper: Generate Robots.txt
function generateRobotsTxt({ sitemap, disallow = [], allow = [] }) {
  const lines = [
    'User-agent: *',
    ...allow.map(path => `Allow: ${path}`),
    ...disallow.map(path => `Disallow: ${path}`),
    sitemap && `Sitemap: ${sitemap}`
  ].filter(Boolean);

  return {
    content: lines.join('\n'),
    lines: lines.length
  };
}

// Helper: Generate Sitemap
function generateSitemap({ urls, changefreq = 'weekly', priority = 0.8 }) {
  const urlEntries = urls.map(url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq || changefreq}</changefreq>
    <priority>${url.priority || priority}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return {
    content: sitemap,
    urlCount: urls.length,
    size: new Blob([sitemap]).size
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SEO Tools API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
