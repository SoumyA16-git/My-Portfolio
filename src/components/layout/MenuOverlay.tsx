import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { lenisInstance } from './SmoothScroll';
import { TextLink } from '@/components/primitives/TextLink';
import siteData from '@/content/site.json';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      lenisInstance.current?.stop();
      if (contentRef.current && linksRef.current) {
        gsap.fromTo(
          contentRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.6,
            ease: 'power3.inOut'
          }
        );

        const links = linksRef.current.querySelectorAll('.menu-item');
        gsap.fromTo(
          links,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.5,
            delay: 0.2,
            ease: 'power2.out'
          }
        );
      }
    } else {
      lenisInstance.current?.start();
    }
  }, [isOpen]);

  const handleNav = (path: string, hash?: string) => {
    onClose();
    if (path === '/') {
      navigate('/');
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            const w = window.innerWidth;
            const offset = w < 640 ? 35 : w < 1024 ? 45 : 60;
            if (lenisInstance.current) {
              lenisInstance.current.scrollTo(el, { offset, duration: 1.2 });
            } else {
              window.scrollTo({ top: el.offsetTop + offset, behavior: 'smooth' });
            }
          }
        }, 150);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[900] bg-[rgba(10,10,10,0.72)]" />
        <Dialog.Content
          ref={contentRef}
          className="fixed inset-0 z-[901] flex flex-col justify-between bg-[#0A0A0A]/95 backdrop-blur-2xl text-white p-6 sm:p-10 pt-20 sm:pt-24 overflow-y-auto"
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Navigation Menu</Dialog.Title>
            <Dialog.Description>Site navigation options</Dialog.Description>
          </VisuallyHidden.Root>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 sm:top-6 right-5 sm:right-10 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-neutral-950 transition-colors duration-200"
            aria-label="Close menu"
            data-cursor="link"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Nav Links */}
          <div ref={linksRef} className="flex flex-col gap-3.5 sm:gap-5 my-auto py-4">
            <button
              onClick={() => handleNav('/', 'about')}
              className="menu-item text-left font-haas font-bold text-[28px] sm:text-[38px] md:text-[44px] leading-tight tracking-tight text-white/90 hover:text-white transition-colors"
              data-cursor="link"
            >
              About
            </button>
            <button
              onClick={() => handleNav('/', 'certifications')}
              className="menu-item text-left font-haas font-bold text-[28px] sm:text-[38px] md:text-[44px] leading-tight tracking-tight text-white/90 hover:text-white transition-colors"
              data-cursor="link"
            >
              Certifications
            </button>
            <button
              onClick={() => handleNav('/', 'work')}
              className="menu-item text-left font-haas font-bold text-[28px] sm:text-[38px] md:text-[44px] leading-tight tracking-tight text-white/90 hover:text-white transition-colors"
              data-cursor="link"
            >
              Work
            </button>
            <button
              onClick={() => handleNav('/', 'redesigns')}
              className="menu-item text-left font-haas font-bold text-[28px] sm:text-[38px] md:text-[44px] leading-tight tracking-tight text-white/90 hover:text-white transition-colors"
              data-cursor="link"
            >
              Redesigns
            </button>
            <button
              onClick={() => handleNav('/', 'faq')}
              className="menu-item text-left font-haas font-bold text-[28px] sm:text-[38px] md:text-[44px] leading-tight tracking-tight text-white/90 hover:text-white transition-colors"
              data-cursor="link"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNav('/', 'contact')}
              className="menu-item text-left font-haas font-bold text-[28px] sm:text-[38px] md:text-[44px] leading-tight tracking-tight text-white/90 hover:text-white transition-colors"
              data-cursor="link"
            >
              Contact
            </button>
          </div>

          {/* Footer Info */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4500]" />
              <span className="text-[12px] sm:text-[13px] text-neutral-300">{siteData.availability.label}</span>
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              {siteData.socials.map((social) => (
                <TextLink key={social.network} href={social.url} external className="text-neutral-400 hover:text-white text-xs sm:text-sm">
                  {social.network}
                </TextLink>
              ))}
            </div>
            <p className="text-[11px] sm:text-[12px] text-neutral-500">
              {siteData.email}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

