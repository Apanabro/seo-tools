import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Privacy = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-4xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: January 2025</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-4">We do not collect personal data. Our tools run entirely in your browser — no data is sent to our servers.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Local Storage</h2>
          <p className="text-gray-600 mb-4">Some tools may save preferences (theme, history) in your browser's localStorage. This never leaves your device.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Third-Party Services</h2>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
            <li>Google OAuth (optional login) — see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google's Privacy Policy</a></li>
            <li>GitHub Pages (hosting) — see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub's Privacy</a></li>
            <li>Railway (backend API) — see <a href="https://railway.app/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Railway's Privacy</a></li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Analytics</h2>
          <p className="text-gray-600 mb-4">No analytics, tracking cookies, or fingerprinting scripts are used.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Contact</h2>
          <p className="text-gray-600 mb-4">Questions? Email <a href="mailto:privacy@seo-tools.com" className="text-blue-600 hover:underline">privacy@seo-tools.com</a></p>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors no-underline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Privacy;