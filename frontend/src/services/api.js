// API Configuration
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Health check
  async healthCheck() {
    const res = await fetch('/health');
    return res.json();
  },

  // Keyword Rank Tracker
  async trackRank(keyword, domain, maxPages = 3) {
    const res = await fetch(`${API_BASE}/seo/rank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword, domain, maxPages })
    });
    return res.json();
  },

  // On-Page SEO Audit
  async auditPage(url) {
    const res = await fetch(`${API_BASE}/seo/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    return res.json();
  },

  // Broken Link Checker
  async checkLinks(url) {
    const res = await fetch(`${API_BASE}/seo/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    return res.json();
  },

  // Meta Tags Generator
  async generateMeta({ title, description, keywords, url }) {
    const res = await fetch(`${API_BASE}/seo/meta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, keywords, url })
    });
    return res.json();
  },

  // Robots.txt Generator
  async generateRobots({ sitemap, disallow, allow }) {
    const res = await fetch(`${API_BASE}/seo/robots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sitemap, disallow, allow })
    });
    return res.json();
  },

  // Sitemap Generator
  async generateSitemap({ urls, changefreq, priority }) {
    const res = await fetch(`${API_BASE}/seo/sitemap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls, changefreq, priority })
    });
    return res.json();
  }
};
