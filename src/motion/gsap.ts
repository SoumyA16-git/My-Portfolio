import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

let isRegistered = false;

export function initGSAP() {
  if (typeof window === 'undefined' || isRegistered) return;

  gsap.registerPlugin(ScrollTrigger, Flip);

  // Configure ScrollTrigger per PRD §36.5
  ScrollTrigger.config({
    ignoreMobileResize: true
  });

  isRegistered = true;
}

if (typeof window !== 'undefined') {
  initGSAP();
}

export { gsap, ScrollTrigger, Flip };
