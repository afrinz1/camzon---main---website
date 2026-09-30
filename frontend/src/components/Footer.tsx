import React, { useState } from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { ActivePage } from '../types';
import { submitInquiry } from '../api';
import karamanaMapImg from '../assets/images/karamana_map_1789788742106.jpg';

interface FooterProps {
  onNavigate: (page: ActivePage, category?: string) => void;
  showContactSection?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, showContactSection = true }) => {
  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formQuery, setFormQuery] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');
    try {
      await submitInquiry({
        inquiry_type: 'contact',
        name: formName.trim(),
        email: formEmail.trim(),
        message: formQuery.trim(),
      });
      setFormSubmitted(true);
      setFormName('');
      setFormEmail('');
      setFormQuery('');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to send your message. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <footer id="camzon-footer" className="overflow-hidden selection:bg-white selection:text-[#f26a1b]">
      {/* ========================================================================= */}
      {/* 1. GET IN TOUCH SECTION (Only on Home Page) */}
      {/* ========================================================================= */}
      {showContactSection && (
        <section
          id="contact-touch-section"
          className="bg-[#0c0d10] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80"
        >
        <div className="max-w-6xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Get in Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Authentic Karamana Map View */}
            <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[490px] relative rounded-2xl overflow-hidden shadow-2xl bg-[#e8edf1] group border border-stone-800/50">
              <img
                src={karamanaMapImg}
                alt="CAMZON Atelier Location - NSS Karayogam Hall, Karamana, Trivandrum"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Interactive Floating Location Pill */}
              <a
                href="https://maps.google.com/?q=NSS+Karayogam+Hall+Karamana+Trivandrum"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-white/10 flex items-center gap-2 hover:bg-black transition-colors"
                title="Open in Google Maps"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#f26a1b] animate-pulse" />
                <span className="text-xs font-semibold text-white">
                  CAMZON Atelier · Karamana, Trivandrum
                </span>
                <ExternalLink className="w-3 h-3 text-stone-400 ml-1" />
              </a>
            </div>

            {/* Right Column: Contact Form */}
            <div className="flex flex-col justify-between">
              {formSubmitted ? (
                <div className="my-auto text-center py-12 px-6 rounded-2xl bg-[#181a20] border border-stone-800 space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-[#f26a1b] mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-white">Thank You for Connecting</h3>
                  <p className="text-stone-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    Your message has been received. Our team will be in touch shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col justify-between h-full space-y-4">
                  <div>
                    {/* Row 1: Your name and Email side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-normal text-white mb-2"
                        >
                          Your name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="your full name"
                          required
                          className="w-full bg-[#52545c] text-white placeholder:text-stone-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26a1b] transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-normal text-white mb-2"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="your email address"
                          required
                          className="w-full bg-[#52545c] text-white placeholder:text-stone-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26a1b] transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Query (“if any”) */}
                    <div>
                      <label
                        htmlFor="contact-query"
                        className="block text-sm font-normal text-white mb-2"
                      >
                        Query (“if any”)
                      </label>
                      <textarea
                        id="contact-query"
                        rows={6}
                        value={formQuery}
                        onChange={(e) => setFormQuery(e.target.value)}
                        placeholder="write something......"
                        className="w-full bg-[#52545c] text-white placeholder:text-stone-300 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#f26a1b] transition-all resize-none h-48 sm:h-56"
                      />
                    </div>
                  </div>

                  {/* Row 3: Submit Button matching home-footer.png */}
                  <div className="pt-2">
                    {formError && <p className="text-sm text-rose-300" role="alert">{formError}</p>}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full bg-[#f26a1b] hover:bg-[#d9560f] disabled:opacity-60 text-white font-medium sm:font-semibold py-4 rounded-xl text-base tracking-normal transition-colors shadow-lg shadow-orange-950/30 cursor-pointer"
                    >
                      {formSubmitting ? 'Sending...' : 'Submit.'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ========================================================================= */}
      {/* 2. LOWER ORANGE BRAND FOOTER (matches home-footer.png) */}
      {/* ========================================================================= */}
      <section className="bg-[#f26a1b] pt-12 sm:pt-16 pb-0 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating Inner Card in deeper orange */}
          <div className="bg-[#eb6215] rounded-[28px] sm:rounded-[38px] p-8 sm:p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden border border-orange-400/20">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-8 sm:pb-10">
              {/* Left Brand Column */}
              <div className="lg:col-span-6 space-y-3">
                <div
                  className="text-2xl sm:text-3xl font-black tracking-wider uppercase cursor-pointer text-white hover:opacity-90 transition-opacity"
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  CAMZON
                </div>
                <p className="text-white text-xs sm:text-sm font-normal max-w-sm leading-relaxed">
                  Creating Beautiful Spaces Where Design, Innovation, and Daily Rituals Come Together.
                </p>
              </div>

              {/* Right 3 Link Columns */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-6 sm:gap-8">
                {/* Product */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-normal text-white tracking-normal">
                    Product
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/85">
                    <li>
                      <button
                        onClick={() => {
                          onNavigate('catalog');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Features
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onNavigate('catalog');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Pricing
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onNavigate('catalog');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Integrations
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onNavigate('catalog');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Updates
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Resouces (matching typo in original design) */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-normal text-white tracking-normal">
                    Resouces
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/85">
                    <li>
                      <span className="hover:text-white transition-colors cursor-pointer">Documentation</span>
                    </li>
                    <li>
                      <span className="hover:text-white transition-colors cursor-pointer">Guide</span>
                    </li>
                    <li>
                      <span className="hover:text-white transition-colors cursor-pointer">Support</span>
                    </li>
                    <li>
                      <span className="hover:text-white transition-colors cursor-pointer">Blog</span>
                    </li>
                  </ul>
                </div>

                {/* Company */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-normal text-white tracking-normal">
                    Company
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/85">
                    <li>
                      <button
                        onClick={() => {
                          onNavigate('home');
                          setTimeout(() => {
                            const el = document.getElementById('why-camzon-section');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        About
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          if (showContactSection) {
                            const el = document.getElementById('contact-touch-section');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            onNavigate('home');
                            setTimeout(() => {
                              const el = document.getElementById('contact-touch-section');
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }, 150);
                          }
                        }}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Contact
                      </button>
                    </li>
                    <li>
                      <span className="hover:text-white transition-colors cursor-pointer">Partners</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Thin Divider Line */}
            <div className="border-t border-white/30 pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white">
              <div>
                2026 camzon. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <span className="hover:underline cursor-pointer transition-all">Terms of service.</span>
                <span className="hover:underline cursor-pointer transition-all">Privacy policy.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Architectural Monolith Typography: CAMZON on Orange Background */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 pb-0 text-center select-none overflow-hidden leading-none -mb-3 sm:-mb-6 lg:-mb-8">
          <div className="text-[18vw] font-black tracking-tight text-white leading-[0.78] uppercase pointer-events-none drop-shadow-sm">
            CAMZON
          </div>
        </div>
      </section>
    </footer>
  );
};
