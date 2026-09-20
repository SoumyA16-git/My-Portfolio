import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MenuOverlay } from './MenuOverlay';
import siteData from '@/content/site.json';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full max-w-full z-[800] py-4 sm:py-6 bg-transparent pointer-events-none">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between pointer-events-auto">
          {/* Left: Wordmark */}
          <Link
            to="/"
            className="font-haas font-bold text-[16px] sm:text-[18px] tracking-tight hover:opacity-80 transition-opacity select-none text-white flex items-center gap-2 shrink-0"
            data-cursor="link"
          >
            <span>{siteData.name}</span>
          </Link>

          {/* Center / Right: Floating Glass Pill Navigation Bar */}
          <nav className="flex items-center gap-4" aria-label="Primary">
            {/* Desktop Links (>= 1024px) */}
            <div className="hidden lg:flex items-center gap-1 rounded-full bg-white/5 px-1.5 py-1.5 ring-1 ring-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="px-4 py-1.5 text-sm font-medium hover:text-white text-white/80 transition-colors rounded-full"
                data-cursor="link"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('certifications')}
                className="px-4 py-1.5 text-sm font-medium hover:text-white text-white/80 transition-colors rounded-full"
                data-cursor="link"
              >
                Certifications
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('work')}
                className="px-4 py-1.5 text-sm font-medium hover:text-white text-white/80 transition-colors rounded-full"
                data-cursor="link"
              >
                Work
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('redesigns')}
                className="px-4 py-1.5 text-sm font-medium hover:text-white text-white/80 transition-colors rounded-full"
                data-cursor="link"
              >
                Redesigns
              </button>
              <Link
                to="/work"
                className="px-4 py-1.5 text-sm font-medium hover:text-white text-white/80 transition-colors rounded-full"
                data-cursor="link"
              >
                Archive
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-950 hover:bg-white/90 transition-colors shadow-sm"
                data-cursor="link"
              >
                <span>Contact</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
            </div>

            {/* Tablet & Mobile Menu Button (< 1024px) */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="h-8.5 sm:h-9 px-3.5 sm:px-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-white flex items-center justify-center active:scale-95 transition-all shadow-sm shrink-0"
                aria-label="Open Navigation Menu"
                data-cursor="link"
              >
                Menu
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
