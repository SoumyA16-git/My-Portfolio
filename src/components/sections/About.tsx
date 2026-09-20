import React from 'react';
import { FileText, Plus, MapPin } from 'lucide-react';
import siteData from '@/content/site.json';
import TextPressure from '@/components/ui/TextPressure';

export const About: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featurePoints = [
    'User-Centered Design & Systems',
    'Pixel-Perfect React & TypeScript',
    'Creative 60fps GSAP Motion',
    'Sub-1.5s Core Web Vitals'
  ];

  return (
    <section
      id="about"
      className="relative w-full max-w-full bg-[#0A0A0A] text-white border-none isolate pt-16 sm:pt-20 lg:pt-24 pb-0 overflow-hidden"
    >
      {/* Orange-Red Ambient Glow matching Hero & Certifications tone */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] lg:w-[1150px] h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-r from-[#FF4500]/12 via-[#FF3E1D]/08 to-[#FF4500]/10 blur-[130px] pointer-events-none -z-10 rounded-full"
      />

      {/* Monumental Orange-Red Background Typography Watermark with TextPressure React Bits Effect */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden w-full max-w-full"
      >
        <div className="w-full max-w-full h-[320px] sm:h-[420px] lg:h-[480px] flex items-center justify-center pointer-events-auto px-4">
          <TextPressure
            text="PORTFOLIO"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="rgba(255, 62, 29, 0.28)"
            minFontSize={20}
          />
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 relative z-10 pb-8 sm:pb-12 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center lg:items-end">

          {/* Left Column: Greeting, Name, Title, Bio & Buttons (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 z-20 space-y-6 lg:pb-16">

            {/* Status Badge matching Hero */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/10 p-1 pr-3.5 sm:pr-4 ring-1 ring-white/15 backdrop-blur-md w-fit max-w-full shadow-sm">
              <span className="inline-flex items-center text-xs font-semibold text-neutral-950 bg-white rounded-full py-1 px-3 shrink-0 shadow-sm leading-none">
                About
              </span>
              <span className="text-xs sm:text-sm font-medium text-white/90 truncate leading-none">
                Independent Craft
              </span>
            </div>

            <div className="space-y-1">
              {/* Script Cursive Greeting */}
              <span
                className="block text-white/80 text-2xl sm:text-4xl font-normal tracking-wide italic mb-2 select-none"
                style={{ fontFamily: "'Alex Brush', 'Caveat', cursive" }}
              >
                Hello, I'm
              </span>

              {/* Monumental Name & Title in Haas Bold matching Hero */}
              <h2 className="font-haas font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.94]">
                {siteData.name}
              </h2>
              <div className="font-haas font-bold text-lg sm:text-2xl lg:text-3xl text-white/90 tracking-tight uppercase leading-snug pt-1">
                WEB DESIGNER &amp; DEVELOPER
              </div>
            </div>

            {/* Bio Paragraph matching Hero description size */}
            <p className="text-[16px] sm:text-[18px] md:text-[19px] text-white/75 leading-relaxed font-normal max-w-lg">
              {siteData.about.lead} {siteData.about.paragraphs[0]}
            </p>

            {/* Location Tag */}
            <div className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-white/85 pt-1">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Based in {siteData.location.country || 'India'} · Remote Worldwide
              </span>
            </div>

            {/* Action Buttons strictly matching Hero Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-neutral-950 bg-white hover:bg-white/90 rounded-full py-3.5 px-6 transition-all shadow-lg hover:scale-105 active:scale-95"
                data-cursor="link"
              >
                <span>Start A Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>

              {siteData.resume.url && (
                <a
                  href={siteData.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 ring-1 ring-white/15 px-6 py-3.5 text-sm font-medium text-white transition-colors"
                  data-cursor="link"
                >
                  <FileText className="w-4 h-4 text-white/80" />
                  <span>Download CV</span>
                </a>
              )}
            </div>
          </div>

          {/* Center Column: Clean Cutout Portrait Image (Bottom-Anchored with Slight Down-Edge Fade) */}
          <div className="lg:col-span-5 flex items-end justify-center self-end order-1 lg:order-2 z-10 relative">
            <div className="relative w-full max-w-[460px] sm:max-w-[540px] lg:max-w-[620px] flex items-end justify-center">
              {/* Clean Frameless Cutout Image with slight bottom fade */}
              <img
                src="/its_me.png"
                alt={`${siteData.name} — studio portrait`}
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.65) 93%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.65) 93%, rgba(0,0,0,0) 100%)'
                }}
                className="w-full h-auto max-h-[740px] lg:max-h-[850px] object-contain object-bottom scale-[1.12] sm:scale-[1.18] lg:scale-[1.24] origin-bottom block select-none pointer-events-none transform-gpu drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
              />
            </div>
          </div>

          {/* Right Column: Experience Tagline & Plus Bullet List (Cols 9-12 / 3 cols - Shifted Up) */}
          <div className="lg:col-span-3 flex flex-col justify-center order-3 z-20 space-y-6 lg:self-center lg:pb-10">

            {/* Circular Plus Icon & Tagline */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white shrink-0">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <p className="text-[15px] sm:text-[16px] font-medium text-white/95 leading-snug">
                Turning ideas into powerful digital experiences.
              </p>
            </div>

            {/* List with White Plus Bullets */}
            <div className="space-y-4">
              {featurePoints.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-[15px] sm:text-[16px] font-medium text-white/90 group">
                  <span className="text-white/70 text-xl font-bold shrink-0 transition-transform group-hover:scale-125 group-hover:text-white">
                    +
                  </span>
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>

            {/* Micro Metrics Strip */}
            <div className="pt-5 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="font-haas font-bold text-2xl text-white">30+</div>
                <div className="text-[11px] font-medium text-white/60 mt-0.5">Delivered</div>
              </div>
              <div className="border-x border-white/10 px-1">
                <div className="font-haas font-bold text-2xl text-white">&lt;1.5s</div>
                <div className="text-[11px] font-medium text-white/60 mt-0.5">Load Speed</div>
              </div>
              <div>
                <div className="font-haas font-bold text-2xl text-white">100%</div>
                <div className="text-[11px] font-medium text-white/60 mt-0.5">Direct</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;








