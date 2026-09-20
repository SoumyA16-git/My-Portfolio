import React, { useState, useMemo } from 'react';
import { RefreshCw, Layers } from 'lucide-react';
import { GalleryModalAccordion, GalleryAccordionItem } from '@/components/ui/gallery-modal-accordion';
import redesignsData from '@/content/redesigns.json';

export const RedesignArchive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(redesignsData.map((p) => p.category)));
    return ['All', ...cats];
  }, []);

  const accordionItems: GalleryAccordionItem[] = useMemo(() => {
    const filtered =
      selectedCategory === 'All'
        ? redesignsData
        : redesignsData.filter((p) => p.category === selectedCategory);

    return filtered.map((p, idx) => ({
      id: p.id || idx + 1,
      url: p.afterImage.src,
      beforeUrl: p.beforeImage.src,
      beforeLabel: p.beforeImage.label,
      afterLabel: p.afterImage.label,
      title: p.title,
      client: p.client,
      category: p.category,
      year: p.year,
      description: p.summary,
      tags: p.tools,
      metrics: p.metrics,
      caseStudyUrl: p.links?.caseStudy,
      liveUrl: p.links?.live,
    }));
  }, [selectedCategory]);

  return (
    <section
      id="redesigns"
      className="relative w-full max-w-full bg-[#0A0A0A] text-white border-none isolate py-[clamp(3.5rem,5.5vw,6.5rem)] overflow-hidden"
    >
      {/* Orange-Red Ambient Glow matching Hero, About, Certifications & ProjectArchive tone */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] sm:w-[1350px] lg:w-[1650px] h-[650px] sm:h-[850px] lg:h-[1050px] bg-gradient-to-r from-[#FF4500]/10 via-[#FF3E1D]/06 to-[#FF4500]/08 blur-[180px] pointer-events-none -z-10 rounded-full" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/10 p-1 pr-3.5 sm:pr-4 ring-1 ring-white/15 backdrop-blur-md w-fit max-w-full shadow-sm">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-950 bg-white rounded-full py-1 px-3 shrink-0 shadow-sm leading-none">
                <RefreshCw className="w-3 h-3 text-neutral-950 animate-spin-slow" />
                Redesign Archive
              </span>
              <span className="text-xs sm:text-sm font-medium text-white/90 truncate leading-none">
                Expanding Gallery &amp; Transformations
              </span>
            </div>

            {/* Monumental Headline in Haas Bold matching Hero & About */}
            <h2 className="font-haas font-bold text-3xl sm:text-5xl lg:text-[clamp(2.5rem,3.8vw,3.75rem)] text-white tracking-tight leading-[0.96]">
              Redesign Archive.
            </h2>

            {/* Description Subtext matching Hero size */}
            <p className="text-[15px] sm:text-[17px] lg:text-[clamp(15px,1.1vw,18px)] text-white/75 leading-relaxed font-normal max-w-xl">
              Strategic interface overhauls turning complex, legacy applications into high-speed, high-converting digital products.
            </p>
          </div>

          {/* Right Controls: Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start md:self-end">
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs sm:text-sm font-medium py-1.5 px-3.5 sm:px-4 rounded-full transition-all duration-200 border ${
                    active
                      ? 'bg-white text-neutral-950 border-white shadow-md'
                      : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Expanding Gallery Accordion Tiles */}
        <div className="w-full">
          <GalleryModalAccordion
            key={selectedCategory}
            items={accordionItems}
            defaultIndex={0}
            className="w-full"
          />
        </div>

        {/* Bottom Interaction Hint */}
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-[13px] font-medium text-white/60 text-center px-4">
          <Layers className="w-3.5 h-3.5 text-[#FF4500] shrink-0" />
          <span className="hidden md:inline">Hover active tile to reveal legacy Before UI · Click Live Site to explore</span>
          <span className="md:hidden">Tap 'View Before' to reveal legacy UI · Swipe to explore</span>
        </div>

      </div>
    </section>
  );
};

export default RedesignArchive;

