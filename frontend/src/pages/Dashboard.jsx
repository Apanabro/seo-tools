import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Dashboard.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const tools = [
  {
    id: 1,
    title: 'Keyword Rank Tracker',
    description: 'Track your website position on Google search results for any keyword.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32">
        <defs>
          <linearGradient id="rankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285f4" />
            <stop offset="100%" stopColor="#34a853" />
          </linearGradient>
        </defs>
        <path fill="url(#rankGrad)" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    path: '/rank-tracker',
    features: ['Google rankings', 'Multi-page analysis', 'Real browser data'],
    color: '#4285f4'
  },
  {
    id: 2,
    title: 'On-Page SEO Audit',
    description: 'Comprehensive audit of on-page SEO factors including meta tags, headings, and images.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32">
        <defs>
          <linearGradient id="auditGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34a853" />
            <stop offset="100%" stopColor="#fbbc04" />
          </linearGradient>
        </defs>
        <path fill="url(#auditGrad)" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
    ),
    path: '/seo-audit',
    features: ['Title & meta analysis', 'Heading structure', 'Image alt checker'],
    color: '#34a853'
  },
  {
    id: 3,
    title: 'Broken Link Checker',
    description: 'Find and identify broken links on any webpage to improve user experience.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32">
        <defs>
          <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea4335" />
            <stop offset="100%" stopColor="#fbbc04" />
          </linearGradient>
        </defs>
        <path fill="url(#linkGrad)" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
      </svg>
    ),
    path: '/link-checker',
    features: ['Internal & external links', 'HTTP status codes', 'Timeout detection'],
    color: '#ea4335'
  },
  {
    id: 4,
    title: 'Meta Tags Generator',
    description: 'Generate optimized HTML meta tags for better SEO and social sharing.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32">
        <defs>
          <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9c27b0" />
            <stop offset="100%" stopColor="#e91e63" />
          </linearGradient>
        </defs>
        <path fill="url(#metaGrad)" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
      </svg>
    ),
    path: '/meta-generator',
    features: ['Open Graph tags', 'Twitter cards', 'SEO optimized'],
    color: '#9c27b0'
  },
  {
    id: 5,
    title: 'Robots.txt Generator',
    description: 'Create a robots.txt file to control search engine crawling behavior.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32">
        <defs>
          <linearGradient id="robotsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9800" />
            <stop offset="100%" stopColor="#ff5722" />
          </linearGradient>
        </defs>
        <path fill="url(#robotsGrad)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    path: '/robots-generator',
    features: ['Allow/Disallow rules', 'Sitemap directive', 'Crawl delay'],
    color: '#ff9800'
  },
  {
    id: 6,
    title: 'Sitemap Generator',
    description: 'Generate an XML sitemap to help search engines index your website.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32">
        <defs>
          <linearGradient id="sitemapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00bcd4" />
            <stop offset="100%" stopColor="#2196f3" />
          </linearGradient>
        </defs>
        <path fill="url(#sitemapGrad)" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 15h8v2H8v-2zm0-4h8v2H8v-2z"/>
      </svg>
    ),
    path: '/sitemap-generator',
    features: ['XML format', 'Custom priorities', 'Change frequency'],
    color: '#00bcd4'
  }
];

const steps = [
  {
    number: '01',
    title: 'Enter Details',
    description: 'Provide the keyword or URL you want to analyze.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#4285f4">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    )
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'Our browser automation scans the page with a real browser engine.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#34a853">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    )
  },
  {
    number: '03',
    title: 'Results',
    description: 'Get actionable SEO insights with detailed reports.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#fbbc04">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    )
  }
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-dots"></div>
        </div>
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <span className="badge-dot"></span>
            Free & Open Source
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Professional SEO Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Analyze, audit, and optimize your website with powerful browser automation tools. No signup required.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/rank-tracker" className="btn-primary ripple">
              Start Analyzing
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </Link>
            <a href="#tools" className="btn-secondary">
              Explore Tools
            </a>
          </motion.div>
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Tools</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Signups</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Tools Grid */}
      <section className="tools-section" id="tools">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Powerful SEO Tools</h2>
          <p>Everything you need to analyze and optimize your website</p>
        </motion.div>

        <motion.div
          className="tools-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={item}>
              <Link to={tool.path} className="tool-card">
                <div className="tool-icon" style={{ background: `${tool.color}15` }}>
                  {tool.icon}
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <ul className="tool-features">
                  {tool.features.map((feature, index) => (
                    <li key={index}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill={tool.color}>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="tool-cta" style={{ background: tool.color }}>
                  Open Tool
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>How It Works</h2>
          <p>Simple three-step process to get insights</p>
        </motion.div>

        <motion.div
          className="steps-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              variants={item}
              whileHover={{ y: -8 }}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gray-400)">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Improve Your SEO?</h2>
          <p>Start analyzing your website now. No credit card required.</p>
          <Link to="/rank-tracker" className="btn-primary ripple">
            Get Started Free
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
