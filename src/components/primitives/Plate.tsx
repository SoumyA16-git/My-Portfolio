import React, { useRef, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { ProjectImage } from '@/content/types';
import { getMotionTier } from '@/motion/tier';

export type PlateAspect = '4:5' | '1:1' | '16:10' | '16:9' | '21:9';

interface PlateProps {
  image: ProjectImage;
  aspect?: PlateAspect;
  treatment?: 'color' | 'mono';
  tilt?: boolean; // Hero plate pointer tilt (§11.5)
  counterParallax?: boolean; // Feature plate hover response (§12.3)
  reveal?: boolean; // Scroll entrance clip-path reveal (§12.3)
  caption?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  cursorState?: 'open' | 'view' | 'drag';
  priority?: boolean;
  flipId?: string;
}

const aspectClasses: Record<PlateAspect, string> = {
  '4:5': 'aspect-[4/5]',
  '1:1': 'aspect-square',
  '16:10': 'aspect-[16/10]',
  '16:9': 'aspect-[16/9]',
  '21:9': 'aspect-[21/9]'
};

export const Plate: React.FC<PlateProps> = ({
  image,
  aspect = '16:9',
  treatment = 'color',
  tilt = false,
  counterParallax = false,
  reveal = true,
  caption,
  className = '',
  onClick,
  cursorState,
  priority = false,
  flipId
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const img = imageRef.current;
    if (!el || !img) return;

    const tier = getMotionTier();

    // Scroll reveal with clip-path (PRD §19.2, §12.3)
    if (reveal && tier !== 'none') {
      gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(img, { scale: tier === 'full' ? 1.15 : 1.0 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: tier === 'full' ? 0.9 : 0.6,
            ease: 'power3.inOut'
          });
          if (tier === 'full') {
            gsap.to(img, {
              scale: 1.0,
              duration: 1.2,
              ease: 'power2.out'
            });
          }
        }
      });

      return () => trigger.kill();
    } else {
      gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(img, { scale: 1.0 });
    }
  }, [reveal]);

  // Pointer Tilt for Hero Plate (PRD §11.5)
  useEffect(() => {
    if (!tilt || getMotionTier() !== 'full') return;
    const el = containerRef.current;
    if (!el) return;

    const rotateXTo = gsap.quickTo(el, 'rotateX', { duration: 0.6, ease: 'power2.out' });
    const rotateYTo = gsap.quickTo(el, 'rotateY', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Max ±4 deg
      rotateXTo(-y * 4);
      rotateYTo(x * 4);
    };

    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [tilt]);

  // Counter-parallax on hover (PRD §12.3)
  useEffect(() => {
    if (!counterParallax || getMotionTier() !== 'full') return;
    const el = containerRef.current;
    const img = imageRef.current;
    if (!el || !img) return;

    const xTo = gsap.quickTo(img, 'x', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(img, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Translate opposite pointer up to 8px
      xTo(-x * 8);
      yTo(-y * 8);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [counterParallax]);

  const monoClass =
    treatment === 'mono'
      ? 'grayscale contrast-[1.05] hover:grayscale-0 transition-[filter] duration-500'
      : '';

  return (
    <figure className={`relative w-full ${className}`}>
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-[var(--radius-plate)] plate-outline transition-transform duration-300 ${
          aspectClasses[aspect]
        }`}
        style={{
          backgroundColor: image.placeholderColor || '#141412',
          perspective: tilt ? '1200px' : undefined
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor={cursorState}
        data-flip-id={flipId}
      >
        <img
          ref={imageRef}
          src={image.src}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover select-none transition-transform duration-600 ease-out will-change-transform ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${monoClass} ${isHovered && counterParallax ? 'scale-[1.03]' : 'scale-100'}`}
          style={{
            objectPosition: `${image.focal?.desktop?.[0] ?? 50}% ${image.focal?.desktop?.[1] ?? 50}%`
          }}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[14px] text-[var(--color-fg-secondary)] leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
