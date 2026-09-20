import React, { useState } from 'react';
import { Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import siteData from '@/content/site.json';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please enter your message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const whatsappNumber = siteData.whatsapp || '919876543210';
    const textMessage = `*New Project Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'Not provided'}\n*Company/Project:* ${formData.company || 'Not specified'}\n\n*Message:*\n${formData.message}`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 500);
  };

  return (
    <section
      id="contact"
      className="relative w-full max-w-full bg-[#0A0A0A] text-white overflow-hidden isolate py-16 sm:py-24 lg:py-28"
    >
      {/* Signature Orange-Red Ambient Atmospheric Glow matching Hero, About & RedesignArchive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1200px] lg:w-[1450px] h-[500px] sm:h-[680px] lg:h-[750px] bg-gradient-to-r from-[#FF4500]/10 via-[#FF3E1D]/05 to-[#FF4500]/08 blur-[180px] pointer-events-none -z-10 rounded-full" />
      
      {/* Creative Subtle Angular Accent Ray */}
      <div className="absolute -top-24 right-1/4 w-[400px] h-[400px] bg-[#FF4500]/05 blur-[140px] pointer-events-none -z-10 rounded-full" />

      {/* Seamless bottom fade feathering */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none z-0" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Info & Frameless 3D World Map (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-7">
            
            {/* Status Badge matching Hero, About & Certifications */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/10 p-1 pr-3.5 sm:pr-4 ring-1 ring-white/15 backdrop-blur-md w-fit max-w-full shadow-sm">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-950 bg-white rounded-full py-1 px-3 shrink-0 shadow-sm leading-none">
                <Mail className="w-3 h-3 text-neutral-950" />
                Contact
              </span>
              <span className="text-xs sm:text-sm font-medium text-white/90 truncate leading-none">
                Start A Conversation
              </span>
            </div>

            {/* Title & Subtitle matching Monumental Section Typography */}
            <div className="space-y-4">
              <h2 className="font-haas font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.96]">
                Let's Connect.
              </h2>

              <p className="text-[15px] sm:text-[18px] text-white/75 leading-relaxed font-normal max-w-xl font-sans">
                Have a project in mind, need design direction, or want to explore collaboration? Reach out directly and let's craft something exceptional.
              </p>

              {/* Direct Contact Links */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-white/70 pt-1 font-sans font-medium">
                <a
                  href={`mailto:${siteData.email}`}
                  className="text-white hover:text-[#FF4500] transition-colors underline-offset-4 hover:underline"
                >
                  {siteData.email}
                </a>
                <span className="text-white/30">•</span>
                <a
                  href={`tel:${siteData.phone || '+919876543210'}`}
                  className="text-white hover:text-[#FF4500] transition-colors underline-offset-4 hover:underline"
                >
                  {siteData.phone || '+91 98765 43210'}
                </a>
                <span className="text-white/30">•</span>
                <span className="text-white/50">Replies within 2 days</span>
              </div>
            </div>

            {/* World Map: Open & Frameless in 3D Perspective with Orange-Red Beacon */}
            <div className="relative w-full h-[240px] sm:h-[290px] lg:h-[320px] pt-1 flex items-center justify-center select-none">
              
              {/* 3D Perspective Map Layer */}
              <div 
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transform: 'perspective(1000px) rotateX(24deg) scale(1.12)',
                  transformStyle: 'preserve-3d',
                  maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 45%, transparent 88%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 45%, transparent 88%)'
                }}
              >
                {/* Dark Matte World SVG */}
                <img
                  src="/world.svg"
                  alt="World Map"
                  className="w-full h-full object-contain pointer-events-none opacity-80"
                />
              </div>

              {/* India Beacon Overlay: Creative Holographic Orange-Red Laser Pulse */}
              <div 
                className="absolute pointer-events-none z-20"
                style={{ left: '72.2%', top: '48.5%' }}
              >
                {/* Ground Glow Puddle */}
                <div className="absolute -left-12 -top-4 w-24 h-8 rounded-full bg-[#FF4500]/30 blur-md pointer-events-none" />

                {/* Concentric Pulsing Radar Rings */}
                <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full border border-[#FF4500]/80 animate-ping pointer-events-none" />
                <div className="absolute -left-9 -top-9 w-18 h-18 rounded-full border border-[#FF4500]/40 pointer-events-none" />

                {/* Glowing Core Dot (Center is precisely at 0, 0) */}
                <div className="absolute -left-[7px] -top-[7px] w-3.5 h-3.5 rounded-full bg-[#FF4500] shadow-[0_0_20px_#FF4500] z-10" />

                {/* Pure Vertical SVG Laser Beam (Originates at dot center, shoots straight UP) */}
                <svg 
                  className="absolute -left-3 -top-24 w-6 h-24 overflow-visible pointer-events-none"
                  viewBox="0 0 24 96"
                >
                  <defs>
                    <linearGradient id="laserBeamGradOrange" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#FF4500" stopOpacity="1" />
                      <stop offset="70%" stopColor="#FF3E1D" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
                    </linearGradient>
                    <filter id="laserGlowOrange" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#FF4500" floodOpacity="0.95" />
                    </filter>
                  </defs>
                  <line 
                    x1="12" 
                    y1="96" 
                    x2="12" 
                    y2="0" 
                    stroke="url(#laserBeamGradOrange)" 
                    strokeWidth="2" 
                    filter="url(#laserGlowOrange)" 
                  />
                </svg>

                {/* Floating Glass Pill: "We are here" */}
                <div className="absolute -top-28 -translate-x-1/2 left-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/90 border border-[#FF4500]/50 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white shadow-[0_0_25px_rgba(255,69,0,0.4)] whitespace-nowrap z-30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] shadow-[0_0_8px_#FF4500] animate-pulse" />
                  <span>We are here</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Sleek & Compact Form Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 ring-1 ring-white/5 backdrop-blur-md p-6 sm:p-8 shadow-xl overflow-hidden max-w-lg lg:max-w-none mx-auto">
              
              {/* Subtle Ambient Grid Texture */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {submitted ? (
                <div className="py-10 text-center space-y-4 relative z-10" role="status">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-haas font-bold text-xl sm:text-2xl text-white">
                    Inquiry Created!
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Thank you {formData.name}. We have opened WhatsApp to connect with you directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
                    }}
                    className="mt-3 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs sm:text-sm font-medium text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4" noValidate>
                  
                  {/* Full Name & Phone Row on sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs sm:text-[13px] font-medium text-white/80 font-sans">
                        Full name <span className="text-[#FF4500]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Soumya Ranjan Das"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-4 bg-white/[0.04] border border-white/10 focus:border-white/40 focus:bg-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-all focus:ring-1 focus:ring-white/40 font-sans"
                      />
                      {errors.name && (
                        <span className="text-[11px] text-rose-400 block pt-0.5">{errors.name}</span>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-xs sm:text-[13px] font-medium text-white/80 font-sans">
                        Mobile number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 px-4 bg-white/[0.04] border border-white/10 focus:border-white/40 focus:bg-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-all focus:ring-1 focus:ring-white/40 font-sans"
                      />
                    </div>
                  </div>

                  {/* Email Address & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs sm:text-[13px] font-medium text-white/80 font-sans">
                        Email Address <span className="text-[#FF4500]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="hello@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 px-4 bg-white/[0.04] border border-white/10 focus:border-white/40 focus:bg-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-all focus:ring-1 focus:ring-white/40 font-sans"
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-400 block pt-0.5">{errors.email}</span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="block text-xs sm:text-[13px] font-medium text-white/80 font-sans">
                        Company / Project
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Studio / Brand"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full h-11 px-4 bg-white/[0.04] border border-white/10 focus:border-white/40 focus:bg-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-all focus:ring-1 focus:ring-white/40 font-sans"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs sm:text-[13px] font-medium text-white/80 font-sans">
                      Message <span className="text-[#FF4500]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Tell me about your project scope, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-white/[0.04] border border-white/10 focus:border-white/40 focus:bg-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-all resize-none focus:ring-1 focus:ring-white/40 font-sans"
                    />
                    {errors.message && (
                      <span className="text-[11px] text-rose-400 block pt-0.5">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button matching Hero & About Me CTAs */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium text-neutral-950 bg-white hover:bg-white/90 rounded-full py-3.5 px-8 transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 font-sans"
                      data-cursor="link"
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
