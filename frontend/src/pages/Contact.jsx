import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Contact = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-4xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-500">We would love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">General Support</h3>
            <p className="text-gray-600 mb-4">Questions about tools, bugs, or feature requests:</p>
            <a href="mailto:support@seo-tools.com" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              support@seo-tools.com
            </a>
          </div>
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Privacy &amp; Legal</h3>
            <p className="text-gray-600 mb-4">Data protection, privacy, legal inquiries:</p>
            <a href="mailto:privacy@seo-tools.com" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              privacy@seo-tools.com
            </a>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-100 no-underline">Privacy Policy</Link>
            <Link to="/terms" className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-100 no-underline">Terms of Service</Link>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors no-underline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Contact;