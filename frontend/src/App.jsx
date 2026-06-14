import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import RankTracker from './pages/RankTracker';
import SeoAudit from './pages/SeoAudit';
import LinkChecker from './pages/LinkChecker';
import MetaGenerator from './pages/MetaGenerator';
import RobotsGenerator from './pages/RobotsGenerator';
import SitemapGenerator from './pages/SitemapGenerator';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rank-tracker" element={<RankTracker />} />
        <Route path="/seo-audit" element={<SeoAudit />} />
        <Route path="/link-checker" element={<LinkChecker />} />
        <Route path="/meta-generator" element={<MetaGenerator />} />
        <Route path="/robots-generator" element={<RobotsGenerator />} />
        <Route path="/sitemap-generator" element={<SitemapGenerator />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
