import React from 'react';

export interface SectionSeamProps {
  className?: string;
  height?: number; // Height in px (default: 260)
}

/**
 * SectionSeam - Non-destructive optical transition layer at section boundaries.
 * Causes zero layout shift (h-0 in normal document flow) and overlays an ultra-smooth
 * feathered cubic transition across the seam line for an organic atmospheric blend.
 */
export const SectionSeam: React.FC<SectionSeamProps> = ({
  className = '',
  height = 260,
}) => {
  return (
    <div
      className={`relative w-full h-0 overflow-visible pointer-events-none select-none z-30 ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute left-0 right-0 -translate-y-1/2 w-full"
        style={{
          height: `${height}px`,
          background:
            'linear-gradient(to bottom, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.04) 12%, rgba(10, 10, 10, 0.18) 25%, rgba(10, 10, 10, 0.52) 38%, rgba(10, 10, 10, 0.85) 46%, rgba(10, 10, 10, 0.95) 50%, rgba(10, 10, 10, 0.85) 54%, rgba(10, 10, 10, 0.52) 62%, rgba(10, 10, 10, 0.18) 75%, rgba(10, 10, 10, 0.04) 88%, rgba(10, 10, 10, 0) 100%)',
        }}
      />
    </div>
  );
};

export default SectionSeam;
