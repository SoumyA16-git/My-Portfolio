export const MOTION_EASE = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inout: 'cubic-bezier(0.76, 0, 0.24, 1)',
  standard: 'cubic-bezier(0.25, 1, 0.5, 1)',
  linear: 'none'
} as const;

export const MOTION_DUR = {
  instant: 0.12, // 120ms
  fast: 0.22,    // 220ms
  base: 0.40,    // 400ms
  slow: 0.70,    // 700ms
  scene: 1.10    // 1100ms
} as const;

export const GSAP_EASE = {
  out: 'studioOut',
  inout: 'studioInOut',
  standard: 'studioHover',
  linear: 'none'
} as const;
