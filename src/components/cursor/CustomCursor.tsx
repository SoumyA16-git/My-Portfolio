import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { getMotionTier } from '@/motion/tier';

export type CursorState = 'default' | 'link' | 'open' | 'view' | 'drag' | 'hide';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isPaperTheme, setIsPaperTheme] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (getMotionTier() !== 'full') return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // quickSetter for dot (exact follow, zero lag)
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    // quickTo for ring (smooth follow, 0.35s)
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
        document.documentElement.classList.add('custom-cursor-active');
      }

      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      // Check hovered elements for data-cursor or form controls
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if inside form input or select
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('input, textarea, select')
      ) {
        setCursorState('hide');
        return;
      }

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const state = cursorTarget.getAttribute('data-cursor') as CursorState;
        setCursorState(state || 'link');
      } else if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a, button')
      ) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }

      // Check paper theme
      const paperElement = target.closest('[data-theme="paper"], .theme-paper');
      setIsPaperTheme(!!paperElement);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      if (hasMoved) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (getMotionTier() !== 'full' || !isVisible || cursorState === 'hide') {
    return null;
  }

  // Visual sizes per state (PRD §27)
  const getRingStyles = () => {
    switch (cursorState) {
      case 'open':
        return 'w-[88px] h-[88px] bg-[var(--color-fg)] text-[var(--color-bg)] border-none';
      case 'view':
        return 'w-[72px] h-[72px] bg-[var(--color-fg)] text-[var(--color-bg)] border-none';
      case 'drag':
        return 'w-[72px] h-[72px] bg-[var(--color-fg)] text-[var(--color-bg)] border-none';
      case 'link':
        return 'w-[36px] h-[36px] border border-[var(--color-fg)] bg-transparent';
      default:
        return 'w-0 h-0 border-0 opacity-0 pointer-events-none';
    }
  };

  const getLabel = () => {
    switch (cursorState) {
      case 'open':
        return 'Open';
      case 'view':
        return 'View';
      case 'drag':
        return 'Drag';
      default:
        return null;
    }
  };

  const isDotHidden = cursorState !== 'default';

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1000] contain-layout contain-paint ${
        isPaperTheme ? 'theme-paper' : ''
      }`}
      aria-hidden="true"
    >
      {/* Exact Follow Dot (8px) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[var(--color-fg)] pointer-events-none transition-opacity duration-150 will-change-transform ${
          isDotHidden ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Damped Smooth Ring / Filled Disc */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-medium text-[12px] tracking-wide uppercase select-none transition-[width,height,background-color,border-color,opacity] duration-250 ease-out will-change-transform ${getRingStyles()}`}
      >
        {getLabel() && (
          <span className="leading-none transition-opacity duration-150">
            {getLabel()}
          </span>
        )}
      </div>
    </div>
  );
};
