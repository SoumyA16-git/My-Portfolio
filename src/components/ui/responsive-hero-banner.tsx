import React from 'react';
import { ToolDock, ToolDockItem, portfolioToolDockItems } from '@/components/ui/tool-dock';
import { AvatarCircles, defaultClientAvatars, type AvatarCircleItem } from '@/components/ui/avatar-circles';
import { lenisInstance } from '@/components/layout/SmoothScroll';
import WarpText from '@/components/ui/WarpText';
import BlurText from '@/components/ui/BlurText';

export interface Partner {
  logoUrl?: string;
  name?: string;
  href: string;
}

export interface ResponsiveHeroBannerProps {
  backgroundImageUrl?: string;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partnersTitle?: string;
  partners?: Partner[];
  toolDockItems?: ToolDockItem[];
  showToolDock?: boolean;
  trustedClientsText?: string;
  clientAvatars?: (string | AvatarCircleItem)[];
  numClients?: number;
  showTrustedClients?: boolean;
}

export const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  backgroundImageUrl = "https://cdn.21st.dev/assets/mirror/a8/a8cf38f65f7315f95eba8c803c4a80a9d78cb2ea36fbfee49828396e4a0b9737.jpg",
  badgeLabel = "Available",
  badgeText = "For select projects · 2026",
  title = "Websites With A",
  titleLine2 = "Point Of View.",
  description = "Independent web designer and developer. I design and build websites for businesses, brands and creatives.",
  primaryButtonText = "Explore Selected Work",
  primaryButtonHref = "#work",
  secondaryButtonText = "Start A Project",
  secondaryButtonHref = "#contact",
  partnersTitle = "Core Stack & Technologies",
  partners = [
    { name: "Design & Art Direction", href: "#capabilities" },
    { name: "React 19 & TypeScript", href: "#capabilities" },
    { name: "GSAP Creative Motion", href: "#capabilities" },
    { name: "Tailwind CSS v4", href: "#capabilities" },
    { name: "Performance & A11y", href: "#capabilities" }
  ],
  toolDockItems = portfolioToolDockItems,
  showToolDock = true,
  trustedClientsText = "Trusted by 30+ founders & global brands",
  clientAvatars = defaultClientAvatars,
  numClients = 30,
  showTrustedClients = true
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [dockSize, setDockSize] = React.useState(48);

  React.useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < 640);
      if (w < 640) {
        setDockSize(32);
      } else if (w < 1440 || h < 820) {
        setDockSize(42);
      } else {
        setDockSize(48);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        const w = window.innerWidth;
        const offset = w < 640 ? 35 : w < 1024 ? 45 : 60;
        if (lenisInstance.current) {
          lenisInstance.current.scrollTo(el, { offset, duration: 1.2 });
        } else {
          window.scrollTo({ top: el.offsetTop + offset, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className="w-full max-w-full isolate min-h-[100svh] overflow-hidden relative flex flex-col justify-between pt-[clamp(4.5rem,7.5vh,6.5rem)] pb-10 sm:pb-14 lg:pb-16 bg-[#0A0A0A]">
      {/* Background Image with Cinematic Grading and Faded Down Edge */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0) 100%)'
        }}
      >
        <img
          src={backgroundImageUrl}
          alt=""
          className="w-full h-full object-cover object-center scale-[1.02] transform-gpu brightness-[0.75] contrast-[1.1]"
        />
        {/* Subtle dark ambient tone and vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0A0A0A]/85" />
      </div>

      {/* Top Header Scrim */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Bottom Soft Edge Dissolve into Next Section */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-28 sm:h-44 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-transparent" />

      {/* Main Center Content */}
      <div className="z-10 relative my-auto py-[clamp(0.5rem,1.5vh,1.75rem)] px-4 sm:px-6 w-full max-w-5xl mx-auto text-center">
        {/* Status Badge */}
        <div className="mb-[clamp(0.75rem,1.8vh,1.5rem)] inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/10 p-1 pr-3.5 sm:pr-4 ring-1 ring-white/15 backdrop-blur-md animate-fade-slide-in-1 max-w-full shadow-sm">
          <span className="inline-flex items-center text-xs font-semibold text-neutral-950 bg-white rounded-full py-1 px-3 shrink-0 shadow-sm leading-none">
            {badgeLabel}
          </span>
          <span className="text-xs sm:text-sm font-medium text-white/90 truncate leading-none">
            {badgeText}
          </span>
        </div>

        {/* Monumental Headline with WarpText WebGL Shader Animation */}
        <div className="animate-fade-slide-in-2 w-full max-w-5xl mx-auto flex items-center justify-center">
          <WarpText
            text={`${title}\n${titleLine2}`}
            color="#ffffff"
            warpStrength={0.08}
            warpScale={1.7}
            speed={0.55}
            pointerInfluence={0.42}
            pointerStrength={0.38}
            refraction={0.018}
            ripple
            fontSize="clamp(2.75rem, min(9.5vw, 13vh), 8.5rem)"
            fontWeight={700}
            fontFamily="'Haas Grot Text R Web', 'Haas Grot Text R', 'Neue Haas Grotesk Text Pro', 'Helvetica Neue', Arial, sans-serif"
            letterSpacing="-0.035em"
            lineHeight={0.93}
            style={{ height: 'clamp(110px, min(18vw, 25vh), 235px)' }}
            className="w-full"
          />
        </div>

        {/* Subtext Description with React Bits BlurText Animation */}
        <BlurText
          text={description}
          delay={60}
          animateBy="words"
          direction="top"
          className="text-[clamp(14px,1.2vw,19px)] text-white/75 max-w-2xl mt-[clamp(0.5rem,1.2vh,1rem)] mx-auto leading-relaxed text-center"
        />

        {/* Trusted Clients Social Proof (Above CTAs without any blur background) */}
        {showTrustedClients && (
          <div className="mt-[clamp(0.6rem,1.6vh,1.5rem)] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 animate-fade-slide-in-3 text-center px-4 w-full">
            <AvatarCircles numPeople={numClients} avatarUrls={clientAvatars} className="justify-center shrink-0" />
            <span className="text-[12px] sm:text-sm font-medium text-white/85 text-center leading-tight">
              {trustedClientsText}
            </span>
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row sm:gap-4 mt-[clamp(0.85rem,2vh,1.75rem)] gap-2.5 items-center justify-center animate-fade-slide-in-4 w-full max-w-md sm:max-w-none mx-auto px-4">
          <a
            href={primaryButtonHref}
            onClick={(e) => {
              if (primaryButtonHref.startsWith('#')) {
                e.preventDefault();
                handleScrollClick(primaryButtonHref);
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium text-neutral-950 bg-white hover:bg-white/90 rounded-full py-[clamp(0.65rem,1.2vh,0.875rem)] px-[clamp(1.25rem,1.6vw,1.5rem)] transition-all shadow-lg hover:scale-105 active:scale-95"
            data-cursor="link"
          >
            {primaryButtonText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            href={secondaryButtonHref}
            onClick={(e) => {
              if (secondaryButtonHref.startsWith('#')) {
                e.preventDefault();
                handleScrollClick(secondaryButtonHref);
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 ring-1 ring-white/15 px-[clamp(1.25rem,1.6vw,1.5rem)] py-[clamp(0.65rem,1.2vh,0.875rem)] text-sm font-medium text-white transition-colors"
            data-cursor="link"
          >
            {secondaryButtonText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Credibility / Interactive Tool Dock Strip */}
      <div className="z-10 relative px-4 sm:px-6 max-w-5xl mx-auto w-full pb-3 sm:pb-4 overflow-hidden">
        <p className="animate-fade-slide-in-1 text-[11px] sm:text-xs text-white/50 text-center uppercase tracking-widest font-medium">
          {partnersTitle}
        </p>
        {showToolDock && toolDockItems && toolDockItems.length > 0 ? (
          <div className="animate-fade-slide-in-2 mt-1 w-full flex justify-center overflow-hidden">
            <ToolDock
              items={toolDockItems}
              size={dockSize}
              magnification={isMobile ? 0.2 : 0.35}
              overlap={isMobile ? 0.2 : 0.15}
            />
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-2 sm:mt-3 animate-fade-slide-in-2">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.href}
                onClick={(e) => {
                  if (partner.href.startsWith('#')) {
                    e.preventDefault();
                    handleScrollClick(partner.href);
                  }
                }}
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/75 backdrop-blur hover:bg-white/10 hover:text-white transition-colors"
                data-cursor="link"
              >
                {partner.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
