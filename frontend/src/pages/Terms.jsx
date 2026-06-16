import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Terms = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16">
    <div className="max-w-4xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Terms of Service</h1>
          <p className="text-gray-500 dark:text-gray-400">Last updated: January 2025</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">1. Acceptance</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">By using SEO Tools, you agree to these terms. If you disagree, do not use the service.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">2. Free Use</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">All tools are free. No payment, subscription, or account required.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">3. No Warranty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Tools are provided "as is" without guarantees. Data is generated client-side and may not be accurate.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">4. Liability</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">We are not liable for any damages from using these tools. Use at your own risk.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">5. External Links</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">We link to third-party sites (Google, GitHub, etc.). We are not responsible for their content.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">6. Changes</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">We may update these terms. Continued use = acceptance of new terms.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">7. Contact</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Questions? Email <a href="mailto:legal@seo-tools.com" className="text-blue-600 dark:text-blue-400 hover:underline">legal@seo-tools.com</a></p>
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

export default Terms;
