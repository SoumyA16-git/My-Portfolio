import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BeforeAfterImage {
  src: string;
  alt: string;
  label?: string;
}

export interface BeforeAfterSliderProps {
  beforeImage: BeforeAfterImage;
  afterImage: BeforeAfterImage;
  initialPosition?: number; // 0 to 100
  className?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  initialPosition = 50,
  className,
  aspectRatio = 'aspect-[16/10]',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(Math.round(percentage));
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden rounded-2xl bg-neutral-950 select-none cursor-ew-resize isolate border border-white/10 shadow-2xl group',
        aspectRatio,
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchMove={handleTouchMove}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-valuenow={sliderPosition}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after transformation comparison slider"
    >
      {/* 1. Base / "After" (New Redesigned UI) Layer */}
      <img
        src={afterImage.src}
        alt={afterImage.alt}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        loading="lazy"
        draggable={false}
      />

      {/* Floating Badge: AFTER */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#FF4500]/90 text-white shadow-lg backdrop-blur-md border border-white/20">
          {afterImage.label || 'AFTER (Redesigned)'}
        </span>
      </div>

      {/* 2. Clipped / "Before" (Legacy UI) Layer */}
      <div
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage.src}
          alt={beforeImage.alt}
          className="absolute inset-0 w-full h-full object-cover object-center max-w-none filter grayscale-[30%] contrast-[95%]"
          style={{
            // Maintain exact 1:1 image positioning matching container width
            width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            height: '100%',
          }}
          loading="lazy"
          draggable={false}
        />

        {/* Subtle vintage tint overlay on Before layer for distinct contrast */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Floating Badge: BEFORE */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-neutral-900/90 text-neutral-300 shadow-lg backdrop-blur-md border border-white/15">
            {beforeImage.label || 'BEFORE (Legacy)'}
          </span>
        </div>
      </div>

      {/* 3. Divider Line & Glowing Handle */}
      <div
        className="absolute top-0 bottom-0 z-30 pointer-events-none transform -translate-x-1/2"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Glowing Vertical Line */}
        <div className="w-[2px] h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8),0_0_24px_rgba(255,69,0,0.6)]" />

        {/* Center Draggable Circular Knob */}
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-950/95 border-2 border-white text-white flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(255,69,0,0.5)] transition-transform duration-150',
            isDragging ? 'scale-110 ring-4 ring-[#FF4500]/40' : 'group-hover:scale-105'
          )}
        >
          <ChevronsLeftRight className="w-4 h-4 text-white stroke-[2.5]" />
        </div>
      </div>

      {/* 4. Bottom Hint on Hover */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10.5px] font-mono text-white/80 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
          ⇄ Drag slider or tap to compare
        </span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
