import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { getMotionTier } from '@/motion/tier';

export const lenisInstance: { current: Lenis | null } = { current: null };

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || typeof window === 'undefined') return;

    const tier = getMotionTier();
    if (tier !== 'full') return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    lenisInstance.current = lenis;
    isInitialized.current = true;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisInstance.current = null;
      isInitialized.current = false;
    };
  }, []);

  return <>{children}</>;
};
