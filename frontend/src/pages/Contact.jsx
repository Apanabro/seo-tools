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

        <div className="bg-gray-100 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Connect With Me</h3>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/Apanabro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium no-underline">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.42-4.04-1.42-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46.98.1-.76.42-1.3.76-1.6-2.66-.3-5.46-1.32-5.46-5.88 0-1.3.46-2.36 1.22-3.2-.12-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.22.96-.26 1.98-.4 3-.4s2.04.14 3 .4c2.3-1.54 3.3-1.22 3.3-1.22.66 1.64.24 2.86.12 3.16.76.84 1.22 1.9 1.22 3.2 0 4.56-2.8 5.58-5.46 5.88.44.38.82 1.12.82 2.26v3.34c0 .32.22.68.84.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/jitendra-yadav-52298836b/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors font-medium no-underline">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
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