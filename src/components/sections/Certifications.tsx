import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import certificationsData from '@/content/certifications.json';

export const Certifications: React.FC = () => {
  const getCompanyLogo = (issuer: string, title: string) => {
    const text = `${issuer} ${title}`.toLowerCase();

    if (text.includes('aws') || text.includes('amazon')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M18.8 17.5c-2.3 1.7-5.5 2.5-8.5 2.5-4.2 0-8-1.5-10.3-4.1-.2-.2 0-.5.2-.4 3.2 1.8 7 2.8 11 2.8 2.6 0 5.4-.5 7.9-1.6.4-.2.7.2.4.5l-.7.3z" fill="#FF9900" />
          <path d="M19.9 16.3c-.3-.4-1.9-.2-2.7-.1-.2 0-.3-.2-.1-.3 1.1-.9 2.9-.6 3.2-.2.3.4-.1 2.2-1.2 3.1-.2.1-.3 0-.3-.2.2-.7.7-2.3.4-2.3z" fill="#FF9900" />
          <path d="M7.7 9.8c0 1.2-.5 2.2-1.8 2.2-1.1 0-1.7-.8-1.7-2 0-1.3.7-2.2 1.8-2.2 1.1 0 1.7.8 1.7 2zm-4.8 3.5c.3.4.9.4 1.2.1l.8-.7c.9.8 1.8 1 2.7 1 2 0 3.2-1.2 3.2-3.4V6.7c0-.4-.3-.7-.7-.7h-.9c-.3 0-.6.2-.6.5v.7c-.7-.8-1.6-1-2.6-1-2.1 0-3.6 1.7-3.6 4.1 0 2.3 1.3 3.9 3.2 3.9.9 0 1.8-.3 2.5-.9v.3c0 .8-.5 1.3-1.4 1.3-.8 0-1.4-.3-1.9-.9-.2-.3-.5-.4-.8-.2l-.9.6c-.3.2-.3.6-.2.8zm11.3-6.6h-1.2c-.3 0-.6.3-.7.6l-1.9 6c-.1.3.1.6.4.6h1.1c.3 0 .6-.2.7-.5l.8-3 .8 3c.1.3.3.5.7.5h1c.3 0 .6-.2.7-.5l1.9-6c.1-.3-.1-.6-.4-.6h-1.2c-.3 0-.6.2-.7.5l-.9 3.4-.9-3.4c-.1-.3-.4-.5-.8-.5zm7.3 4c-.7-.3-1.4-.5-1.9-.8-.4-.2-.5-.5-.5-.8 0-.4.3-.8.9-.8.6 0 1.2.2 1.6.5.2.2.5.2.7 0l.7-.6c.2-.2.2-.5 0-.7-.7-.6-1.8-.9-3-.9-1.6 0-2.6.9-2.6 2.3 0 1.1.7 1.8 1.8 2.2.7.3 1.5.5 2 .8.4.2.6.5.6.9 0 .5-.4.9-1.1.9-.8 0-1.5-.3-2.1-.8-.2-.2-.5-.2-.7 0l-.7.7c-.2.2-.2.5 0 .7.8.8 2.1 1.2 3.5 1.2 1.8 0 2.8-1 2.8-2.4 0-1.2-.7-1.9-1.8-2.3z" fill="#FFFFFF" />
        </svg>
      );
    }

    if (text.includes('meta')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M16.7 5.5c-2 0-3.5 1.2-4.7 2.8C10.8 6.7 9.3 5.5 7.3 5.5 3.8 5.5 1 8.5 1 12.3c0 4.1 3.1 7.2 6.8 7.2 2.3 0 4-1.3 5.2-3.1 1.2 1.8 2.9 3.1 5.2 3.1 3.7 0 6.8-3.1 6.8-7.2 0-3.8-2.8-6.8-6.3-6.8zm-9.4 12c-2.6 0-4.7-2.3-4.7-5.2 0-2.8 2-5.1 4.7-5.1 1.7 0 3 1.1 4 2.7l.8 1.3-.8 1.4c-1 1.6-2.3 2.7-4 2.7zm9.4 0c-1.7 0-3-1.1-4-2.7l-.8-1.4.8-1.3c1-1.6 2.3-2.7 4-2.7 2.6 0 4.6 2.3 4.6 5.1 0 2.9-2.1 5.2-4.6 5.2z" fill="#0081FB" />
        </svg>
      );
    }

    if (text.includes('google')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      );
    }

    if (text.includes('microsoft') || text.includes('azure')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <path d="M1 1h10v10H1z" fill="#F25022" />
          <path d="M13 1h10v10H13z" fill="#7FBA00" />
          <path d="M1 13h10v10H1z" fill="#00A4EF" />
          <path d="M13 13h10v10H13z" fill="#FFB900" />
        </svg>
      );
    }

    if (text.includes('github')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    }

    if (text.includes('figma')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
          <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
          <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E" />
          <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
          <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE" />
        </svg>
      );
    }

    if (text.includes('vercel') || text.includes('next.js')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L24 22H0L12 1Z" />
        </svg>
      );
    }

    if (text.includes('docker')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m21.722 1.347c-.55-1.04-1.745-1.577-3.056-1.577a5.53 5.53 0 00-1.85.31c-.347-.847-1.125-1.463-2.072-1.636-.205-.038-.415-.057-.629-.057h-1.05v3.47h8.657zM0 13.784c0 3.86 3.14 7 7 7 4.97 0 9.07-2.9 10.74-6.91H0v-.09z" />
        </svg>
      );
    }

    if (text.includes('kubernetes') || text.includes('ckad') || text.includes('linux')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#326CE5">
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.3L5.34 8.15v7.7L12 19.7l6.66-3.85v-7.7L12 4.3z" />
        </svg>
      );
    }

    if (text.includes('stripe')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#635BFF">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.427.5 7.625.5 4.3 3.01 4.3 7.02c0 5.494 7.568 5.753 7.568 8.694 0 .977-.852 1.401-2.071 1.401-2.529 0-5.321-1.094-7.073-2.187l-.907 5.59C3.606 21.46 6.74 22 9.873 22c5.034 0 8.427-2.43 8.427-6.52 0-5.69-7.568-5.918-7.568-8.83z" />
        </svg>
      );
    }

    if (text.includes('mongodb')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
          <path d="M12.4 1.4c-.2-.4-.7-.4-.9 0C9.6 4.9 6 10.3 6 15.1c0 4.4 3.1 7.6 6 7.6s6-3.2 6-7.6c0-4.8-3.6-10.2-5.6-13.7zm-.4 19.6v-7.5c0-.6.4-1 1-1s1 .4 1 1v7.5c-1 0-2 0-2 0z" fill="#47A248" />
        </svg>
      );
    }

    if (text.includes('typescript')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#3178C6">
          <rect width="24" height="24" rx="4" />
          <path d="M4 8h8v2.5H9.5V18h-3v-7.5H4V8zm12.8 5.2c-.8-.4-1.3-.7-1.3-1.2 0-.4.3-.7.9-.7.7 0 1.5.3 2.1.8l1.3-1.8c-.9-.8-2.1-1.2-3.4-1.2-2.3 0-3.7 1.3-3.7 3.1 0 1.9 1.4 2.7 3 3.3.9.4 1.4.8 1.4 1.3 0 .6-.5.9-1.2.9-.9 0-2-.5-2.7-1.2l-1.4 1.8c1.1 1.2 2.6 1.7 4.1 1.7 2.6 0 4.2-1.4 4.2-3.4 0-2-1.4-2.8-3-3.3z" fill="#FFFFFF" />
        </svg>
      );
    }

    if (text.includes('adobe')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M15.1 2H24v20L15.1 2zM8.9 2H0v20L8.9 2zM12 9.4L16.6 20h-3.1l-1.5-3.8H9.3L12 9.4z" />
        </svg>
      );
    }

    if (text.includes('ibm')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#0F62FE">
          <path d="M2 5h20v2H2zm0 4h20v2H2zm0 4h20v2H2zm0 4h20v2H2z" />
        </svg>
      );
    }

    if (text.includes('hashicorp') || text.includes('terraform')) {
      return (
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#7B42BC">
          <path d="M14.7 1.1L8.9 4.4v6.7l5.8-3.3V1.1zm6.1 3.5l-5.8 3.3v6.7l5.8-3.3V4.6zm-12 0L3 7.9v6.7l5.8-3.3V4.6zm6 7l-5.8 3.3v6.7l5.8-3.3v-6.7z" />
        </svg>
      );
    }

    return (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#002F49" stroke="#0093D8" strokeWidth="1.5" />
        <path d="M8 12a4 4 0 1 1 7.2 2.4l1.4 1.4A6 6 0 1 0 8 12z" fill="#0093D8" />
        <path d="M16 12a4 4 0 1 1-7.2-2.4L7.4 8.2A6 6 0 1 0 16 12z" fill="#00C49F" />
        <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
      </svg>
    );
  };

  return (
    <section
      id="certifications"
      className="relative w-full max-w-full bg-[#0A0A0A] text-white border-none isolate py-[clamp(3.5rem,5.5vw,6.5rem)] overflow-hidden"
    >
      {/* Balanced Orange-Red Ambient Glow with Expanded Spread for 16-card layout */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] sm:w-[1350px] lg:w-[1650px] h-[750px] sm:h-[950px] lg:h-[1150px] bg-gradient-to-r from-[#FF4500]/14 via-[#FF3E1D]/09 to-[#FF4500]/11 blur-[170px] pointer-events-none -z-10 rounded-full"
      />

      {/* Scaled-Up Graduate Silhouette Watermark in Background with Smooth Long Gradient Fade */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0) 97%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0) 97%)'
        }}
      >
        <img
          src="/graduate.png"
          alt="Graduate Accreditation Silhouette"
          className="w-full max-w-[clamp(480px,50vw,1100px)] h-auto object-contain opacity-25 sm:opacity-30 transform-gpu brightness-[0.72] contrast-[1.3] drop-shadow-[0_0_95px_rgba(255,69,0,0.32)] translate-y-4"
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">

        {/* Prominent Section Header matching Hero & About Me */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/10 p-1 pr-3.5 sm:pr-4 ring-1 ring-white/15 backdrop-blur-md w-fit max-w-full shadow-sm">
              <span className="inline-flex items-center text-xs font-semibold text-neutral-950 bg-white rounded-full py-1 px-3 shrink-0 shadow-sm leading-none">
                Accreditations
              </span>
              <span className="text-xs sm:text-sm font-medium text-white/90 truncate leading-none">
                Verified Credentials
              </span>
            </div>

            {/* Monumental Headline in Haas Bold matching Hero & About */}
            <h2 className="font-haas font-bold text-3xl sm:text-5xl lg:text-[clamp(2.5rem,3.8vw,3.75rem)] text-white tracking-tight leading-[0.96]">
              Verified Credentials.
            </h2>

            {/* Description Subtext matching Hero size */}
            <p className="text-[15px] sm:text-[17px] lg:text-[clamp(15px,1.1vw,18px)] text-white/75 leading-relaxed font-normal max-w-xl">
              Industry-recognized certifications in cloud infrastructure, frontend performance, and UX systems.
            </p>
          </div>

          {/* Counter Badge */}
          <div className="hidden md:inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono text-white/70 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full self-end backdrop-blur-sm">
            <Award className="w-4 h-4 text-white/70" />
            <span>ACCREDITATIONS</span>
            <span className="text-white font-bold">({certificationsData.length})</span>
          </div>
        </div>

        {/* Clean 4-in-a-Row Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-[clamp(0.875rem,1.1vw,1.125rem)]">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="relative rounded-2xl bg-white/[0.03] border border-white/10 ring-1 ring-white/5 backdrop-blur-md p-4 sm:p-[clamp(1rem,1.1vw,1.25rem)] flex flex-col justify-between shadow-lg overflow-hidden h-full"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Top Row: Official Logo + Issuer / Category + Hero-Styled Solid White Verify Button */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Official Company Logo in a Sleek Glass Badge */}
                      <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center p-1.5 shadow-sm shrink-0">
                        {getCompanyLogo(cert.issuer, cert.title)}
                      </div>

                      <div className="min-w-0">
                        {/* Issuer Name */}
                        <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider truncate">
                          {cert.issuer}
                        </div>
                        {/* Category Label */}
                        <div className="text-[11px] sm:text-xs font-medium text-white/80 truncate">
                          {cert.category}
                        </div>
                      </div>
                    </div>

                    {/* Solid White Verify Action Button matching Hero & About Me CTAs */}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 text-[11px] font-medium text-neutral-950 bg-white hover:bg-white/90 rounded-full py-1.5 px-2.5 sm:px-3 transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
                        data-cursor="link"
                        title="Verify Certificate"
                      >
                        <span>Verify</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-950 stroke-[2.5]" />
                      </a>
                    )}
                  </div>

                  {/* Certificate Title in Haas Grotesk Bold */}
                  <h3 className="font-haas font-bold text-[14.5px] sm:text-[15px] xl:text-[16px] text-white tracking-tight leading-snug pt-3 sm:pt-3.5">
                    {cert.title}
                  </h3>

                  {/* Clean Description Text */}
                  <p className="text-[12px] sm:text-[12.5px] xl:text-[13px] text-white/60 leading-relaxed font-normal pt-1.5 sm:pt-2">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;



