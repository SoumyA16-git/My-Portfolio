import React from 'react';
import { Rule } from '@/components/primitives/Rule';
import siteData from '@/content/site.json';

export const Philosophy: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="w-full max-w-[1696px] mx-auto px-[var(--margin)]">
        {/* Large Serif Statement (Newsreader 38px, PRD §20.1, §20.2) */}
        <div className="max-w-[24em] mb-12 md:mb-16">
          <blockquote className="font-serif text-[24px] sm:text-[30px] md:text-[36px] text-[var(--color-fg)] leading-[1.22] tracking-[-0.01em]">
            "{siteData.philosophy.statement}"
          </blockquote>
        </div>

        <Rule className="mb-10" />

        {/* Two Columns: Design Principles & Code Principles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Design */}
          <div className="md:col-span-6 flex flex-col">
            <h3 className="text-h3 text-[20px] md:text-[24px] text-[var(--color-fg)] font-medium mb-6">
              Design
            </h3>
            <ul className="flex flex-col gap-5 text-[15px] md:text-[16px] text-[var(--color-fg-secondary)] leading-relaxed list-none">
              {siteData.philosophy.design.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-meta text-[var(--color-fg-muted)] pt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code */}
          <div className="md:col-span-6 flex flex-col">
            <h3 className="text-h3 text-[20px] md:text-[24px] text-[var(--color-fg)] font-medium mb-6">
              Code
            </h3>
            <ul className="flex flex-col gap-5 text-[15px] md:text-[16px] text-[var(--color-fg-secondary)] leading-relaxed list-none">
              {siteData.philosophy.code.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-meta text-[var(--color-fg-muted)] pt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
