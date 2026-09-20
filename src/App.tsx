import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Home } from '@/pages/Home';
import { initGSAP } from '@/motion/gsap';
import { applyMotionTier } from '@/motion/tier';

const WorkArchive = lazy(() => import('@/pages/WorkArchive').then(m => ({ default: m.WorkArchive })));
const CaseStudy = lazy(() => import('@/pages/CaseStudy').then(m => ({ default: m.CaseStudy })));
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  useEffect(() => {
    initGSAP();
    applyMotionTier();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <div className="relative w-full max-w-full overflow-x-hidden min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] selection:bg-[var(--color-selection-bg)] selection:text-[var(--color-selection-fg)]">
          {/* Skip link for accessibility (WCAG 2.4.1) */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1100] focus:px-4 focus:py-2 focus:bg-[var(--color-fg)] focus:text-[var(--color-bg)] focus:rounded-md focus:outline-none"
          >
            Skip to content
          </a>

          <CustomCursor />
          <Header />

          <Suspense fallback={<div className="min-h-[60svh]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<WorkArchive />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
};
