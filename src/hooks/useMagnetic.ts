import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { getMotionTier } from '@/motion/tier';

interface MagneticOptions {
  radius?: number;
  strength?: number;
  maxDisplacement?: number;
  labelParallax?: number;
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const elementRef = useRef<T>(null);
  const labelRef = useRef<HTMLElement>(null);

  const {
    radius = 120,
    strength = 0.3,
    maxDisplacement = 10,
    labelParallax = 1.4
  } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (getMotionTier() !== 'full') return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    let labelXTo: ((value: number) => void) | null = null;
    let labelYTo: ((value: number) => void) | null = null;

    if (labelRef.current) {
      labelXTo = gsap.quickTo(labelRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
      labelYTo = gsap.quickTo(labelRef.current, 'y', { duration: 0.4, ease: 'power3.out' });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        const pullX = Math.max(Math.min(distX * strength, maxDisplacement), -maxDisplacement);
        const pullY = Math.max(Math.min(distY * strength, maxDisplacement), -maxDisplacement);

        xTo(pullX);
        yTo(pullY);

        if (labelXTo && labelYTo) {
          labelXTo(pullX * labelParallax);
          labelYTo(pullY * labelParallax);
        }
      } else {
        xTo(0);
        yTo(0);
        if (labelXTo && labelYTo) {
          labelXTo(0);
          labelYTo(0);
        }
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if (labelXTo && labelYTo) {
        labelXTo(0);
        labelYTo(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [radius, strength, maxDisplacement, labelParallax]);

  return { elementRef, labelRef };
}
