export type MotionTier = 'full' | 'lite' | 'none';

export function getMotionTier(): MotionTier {
  if (typeof window === 'undefined') return 'none';

  const params = new URLSearchParams(window.location.search);
  if (params.get('motion') === 'off') return 'none';
  if (params.get('motion') === 'lite') return 'lite';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return 'none';

  // Check connection / saveData
  const nav = navigator as any;
  if (nav?.connection?.saveData) return 'lite';

  // Check device memory
  if (nav?.deviceMemory && nav.deviceMemory <= 2) return 'lite';

  // Check touch / fine pointer
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return 'lite';

  return 'full';
}

export function applyMotionTier(): MotionTier {
  const tier = getMotionTier();
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-motion', tier);
  }
  return tier;
}
