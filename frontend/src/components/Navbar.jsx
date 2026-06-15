import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const userMenuRef = useRef(null);
  const toolsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); setToolsOpen(false); }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
      if (toolsRef.current && !toolsRef.current.contains(e.target)) setToolsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => { logout(); setUserMenuOpen(false); navigate('/'); };

  const mainLinks = [
    { path: '/keyword-research', label: 'Keywords' },
    { path: '/seo-audit', label: 'Audit' },
    { path: '/page-speed', label: 'Speed' },
    { path: '/backlink-checker', label: 'Backlinks' },
    { path: '/content-analyzer', label: 'Content' },
  ];

  const moreTools = [
    { section: 'SEO', items: [
      { path: '/rank-tracker', label: 'Rank Tracker' },
      { path: '/link-checker', label: 'Link Checker' },
      { path: '/keyword-density', label: 'Keyword Density' },
      { path: '/redirect-checker', label: 'Redirect Checker' },
      { path: '/sitemap-viewer', label: 'Sitemap Viewer' },
      { path: '/robots-txt-viewer', label: 'Robots.txt Viewer' },
    ]},
    { section: 'Technical', items: [
      { path: '/meta-generator', label: 'Meta Tags' },
      { path: '/robots-generator', label: 'Robots.txt' },
      { path: '/sitemap-generator', label: 'Sitemap' },
      { path: '/schema-generator', label: 'Schema Markup' },
      { path: '/header-checker', label: 'Header Checker' },
      { path: '/ip-lookup', label: 'IP Lookup' },
      { path: '/mobile-test', label: 'Mobile Test' },
    ]},
    { section: 'Developers', items: [
      { path: '/regex-tester', label: 'Regex Tester' },
      { path: '/json-formatter', label: 'JSON Formatter' },
      { path: '/encoder-decoder', label: 'Encoder/Decoder' },
      { path: '/hash-generator', label: 'Hash Generator' },
      { path: '/uuid-generator', label: 'UUID Generator' },
      { path: '/timestamp-converter', label: 'Timestamp' },
      { path: '/cron-generator', label: 'Cron Generator' },
      { path: '/text-diff', label: 'Text Diff' },
      { path: '/markdown-preview', label: 'Markdown' },
    ]},
    { section: 'Design', items: [
      { path: '/color-picker', label: 'Color Picker' },
      { path: '/gradient-generator', label: 'Gradient' },
      { path: '/box-shadow-generator', label: 'Box Shadow' },
      { path: '/flexbox-playground', label: 'Flexbox' },
      { path: '/css-grid-generator', label: 'CSS Grid' },
      { path: '/contrast-checker', label: 'Contrast Checker' },
    ]},
    { section: 'Utilities', items: [
      { path: '/password-generator', label: 'Password Gen' },
      { path: '/qr-generator', label: 'QR Code' },
      { path: '/lorem-generator', label: 'Lorem Ipsum' },
    ]},
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-white/80 backdrop-blur-md'} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="16" y1="16" x2="21" y2="21"/></svg>
            </div>
            <span className="text-lg font-semibold text-gray-900 hidden sm:block">SEO Tools</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map(link => (
              <Link key={link.path} to={link.path} className={`px-3 py-2 rounded-full text-sm font-medium transition-colors no-underline ${location.pathname === link.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                {link.label}
              </Link>
            ))}
            <div className="relative" ref={toolsRef}>
              <button onClick={() => setToolsOpen(!toolsOpen)} className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${toolsOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                More
                <svg className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.15 }} className="absolute right-0 top-full mt-2 w-[680px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 grid grid-cols-5 gap-6">
                    {moreTools.map(group => (
                      <div key={group.section}>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{group.section}</h4>
                        <div className="space-y-1">
                          {group.items.map(tool => (
                            <Link key={tool.path} to={tool.path} onClick={() => setToolsOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg no-underline transition-colors">
                              {tool.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500" aria-label="Toggle theme">
              {dark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
              )}
            </button>
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors">
                  {user.picture ? <img src={user.picture} alt={user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">{user.name?.charAt(0)?.toUpperCase()}</div>}
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                      </div>
                      <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 no-underline">Sign In</Link>
                <Link to="/signup" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full no-underline shadow-sm hover:shadow-md transition-all">Sign Up</Link>
              </div>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-full hover:bg-gray-100" aria-label="Menu">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              <Link to="/" className="block px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 rounded-xl no-underline">Home</Link>
              {mainLinks.map(link => (
                <Link key={link.path} to={link.path} className={`block px-4 py-3 text-sm font-medium rounded-xl no-underline ${location.pathname === link.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">All Tools</p>
                {moreTools.map(group => (
                  <div key={group.section}>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-3">{group.section}</p>
                    {group.items.map(tool => (
                      <Link key={tool.path} to={tool.path} className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-xl no-underline">
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3 flex gap-2">
                {!user && (<>
                  <Link to="/login" className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-full text-center no-underline">Sign In</Link>
                  <Link to="/signup" className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full text-center no-underline">Sign Up</Link>
                </>)}
                {user && (
                  <button onClick={handleLogout} className="w-full px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-full">Sign Out</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
