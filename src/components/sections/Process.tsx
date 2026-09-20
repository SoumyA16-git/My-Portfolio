import React, { useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/motion/gsap';
import { getMotionTier } from '@/motion/tier';
import siteData from '@/content/site.json';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const steps = siteData.process;

  useEffect(() => {
    const tier = getMotionTier();
    if (tier !== 'full' || window.innerWidth < 1024) return;

    const pinSection = pinSectionRef.current;
    if (!pinSection) return;

    const totalSteps = steps.length;
    const trigger = ScrollTrigger.create({
      trigger: pinSection,
      start: 'top top',
      end: `+=${totalSteps * 450}`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.2,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentStep = Math.min(
          Math.floor(progress * totalSteps),
          totalSteps - 1
        );
        setActiveStep(currentStep);

        if (progressLineRef.current) {
          progressLineRef.current.style.transform = `scaleX(${progress})`;
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, [steps.length]);

  return (
    <section id="process" className="relative border-t border-[var(--color-border)]">
      {/* Desktop Pinned Implementation (>= 1024px) */}
      <div
        ref={pinSectionRef}
        className="hidden lg:flex h-[100svh] min-h-[600px] max-h-[900px] w-full max-w-[1696px] mx-auto px-[var(--margin)] py-12 flex-col justify-between"
      >
        {/* Top Header */}
        <div className="flex items-baseline justify-between">
          <h2 className="text-h2 text-[36px] xl:text-[44px] text-[var(--color-fg)] font-semibold tracking-[-0.03em]">
            Process
          </h2>
          <span className="text-meta text-[var(--color-fg-muted)]">
            Step {String(activeStep + 1).padStart(2, '0')} of 06
          </span>
        </div>

        {/* Center: Giant Numeral + Step Content */}
        <div className="grid grid-cols-12 gap-8 items-center my-auto">
          {/* Giant Numeral (30vw) */}
          <div className="col-span-6 overflow-hidden h-[260px] xl:h-[320px] flex items-center justify-start">
            <div
              key={activeStep}
              className="text-[22vw] xl:text-[28vw] font-semibold tracking-[-0.05em] leading-none text-[var(--color-fg)] select-none animate-in fade-in slide-in-from-bottom-6 duration-400 will-change-transform"
              aria-hidden="true"
            >
              {steps[activeStep].number}
            </div>
          </div>

          {/* Step Details */}
          <div className="col-span-6 flex flex-col justify-center max-w-[46ch]">
            <h3 className="text-h1 text-[36px] xl:text-[48px] text-[var(--color-fg)] font-semibold mb-4">
              {steps[activeStep].title}
            </h3>
            <p className="text-[16px] xl:text-[18px] text-[var(--color-fg-secondary)] leading-relaxed mb-6">
              {steps[activeStep].description}
            </p>
            <div className="pt-4 border-t border-[var(--color-border)] flex items-baseline gap-4">
              <span className="text-meta text-[var(--color-fg-muted)]">
                You get
              </span>
              <span className="text-[15px] text-[var(--color-fg)] font-medium">
                {steps[activeStep].youGet}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar & Step Ticks */}
        <div className="w-full">
          <div className="relative w-full h-[1px] bg-[var(--color-border)] overflow-hidden">
            <div
              ref={progressLineRef}
              className="absolute top-0 left-0 w-full h-full bg-[var(--color-accent)] origin-left transition-transform duration-100 ease-linear"
              style={{ transform: `scaleX(${(activeStep + 1) / steps.length})` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-meta text-[var(--color-fg-muted)]">
            {steps.map((step, idx) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`transition-colors py-1 ${
                  idx === activeStep
                    ? 'text-[var(--color-fg)] font-semibold'
                    : 'hover:text-[var(--color-fg)]'
                }`}
                data-cursor="link"
              >
                {step.number} {step.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Stacked Implementation (< 1024px) */}
      <div className="lg:hidden w-full max-w-[1696px] mx-auto px-[var(--margin)] py-16">
        <h2 className="text-h2 text-[28px] sm:text-[38px] text-[var(--color-fg)] font-semibold tracking-[-0.03em] mb-8">
          Process
        </h2>

        <ol className="flex flex-col gap-10 list-none">
          {steps.map((step) => (
            <li
              key={step.number}
              className="pt-6 border-t border-[var(--color-border)] flex flex-col gap-3"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[36px] sm:text-[48px] font-semibold text-[var(--color-fg)] tracking-[-0.04em] leading-none">
                  {step.number}
                </span>
                <span className="text-meta text-[var(--color-fg-muted)]">
                  Step {step.number}
                </span>
              </div>

              <h3 className="text-[22px] sm:text-[28px] text-[var(--color-fg)] font-semibold">
                {step.title}
              </h3>

              <p className="text-[15px] text-[var(--color-fg-secondary)] leading-relaxed">
                {step.description}
              </p>

              <div className="mt-2 pt-3 border-t border-[var(--color-border)]/50 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm">
                <span className="text-meta text-[var(--color-fg-muted)]">
                  You get
                </span>
                <span className="text-[var(--color-fg)] font-medium">
                  {step.youGet}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
