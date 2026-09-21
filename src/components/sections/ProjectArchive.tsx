import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FolderGit2, Layers, LayoutGrid } from 'lucide-react';
import { Project } from '@/content/types';
import projectsData from '@/content/projects.json';
import { CardStack, CardStackItem } from '@/components/ui/card-stack';

export const ProjectArchive: React.FC = () => {
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');

  const projects = (projectsData as Project[])
    .filter((p) => p.status === 'published')
    .sort((a, b) => a.order - b.order);

  // Transform projects into CardStackItem format
  const stackItems: CardStackItem[] = projects.map((project, idx) => ({
    id: project.id,
    title: project.title,
    description: project.summary,
    imageSrc: project.images.thumbnail.src,
    href: `/work/${project.slug}`,
    liveUrl: project.links?.live || undefined,
    category: project.category,
    year: project.year,
    tools: project.tools,
    ctaLabel: 'Case Study',
    tag: `#${String(idx + 1).padStart(2, '0')}`,
  }));

  return (
    <section
      id="work"
      className="relative w-full max-w-full bg-[#0A0A0A] text-white border-none isolate py-[clamp(3.5rem,5.5vw,6.5rem)] overflow-hidden"
    >
      {/* Balanced Orange-Red Ambient Glow exactly matching Certifications section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] sm:w-[1350px] lg:w-[1650px] h-[750px] sm:h-[950px] lg:h-[1150px] bg-gradient-to-r from-[#FF4500]/14 via-[#FF3E1D]/09 to-[#FF4500]/11 blur-[170px] pointer-events-none -z-10 rounded-full"
      />

      {/* Worker Silhouette Watermark in Right Background matching Certifications effect */}
      <div
        className="absolute inset-y-0 right-[1%] sm:right-[3%] lg:right-[5%] xl:right-[6%] w-full max-w-[clamp(360px,44vw,760px)] flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0) 97%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0) 97%)'
        }}
        aria-hidden="true"
      >
        <img
          src="/worker.webp"
          alt=""
          className="w-full h-auto max-h-[85%] object-contain opacity-20 sm:opacity-25 lg:opacity-30 transform-gpu brightness-[0.72] contrast-[1.3] drop-shadow-[0_0_95px_rgba(255,69,0,0.32)] translate-y-2"
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">

        {/* Section Header matching Monumental Typography across Hero, About & Certifications */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/10 p-1 pr-3.5 sm:pr-4 ring-1 ring-white/15 backdrop-blur-md w-fit max-w-full shadow-sm">
              <span className="inline-flex items-center text-xs font-semibold text-neutral-950 bg-white rounded-full py-1 px-3 shrink-0 shadow-sm leading-none">
                Work Archive
              </span>
              <span className="text-xs sm:text-sm font-medium text-white/90 truncate leading-none">
                Selected &amp; Case Studies
              </span>
            </div>

            {/* Monumental Headline in Haas Bold matching Hero & About */}
            <h2 className="font-haas font-bold text-3xl sm:text-5xl lg:text-[clamp(2.5rem,3.8vw,3.75rem)] text-white tracking-tight leading-[0.96]">
              Project Archive.
            </h2>

            {/* Description Subtext matching Hero size */}
            <p className="text-[15px] sm:text-[17px] lg:text-[clamp(15px,1.1vw,18px)] text-white/75 leading-relaxed font-normal max-w-xl">
              A curated portfolio of commercial web applications, bespoke design systems, and digital storefronts.
            </p>
          </div>

          {/* Right Controls: View Switcher & Published Counter */}
          <div className="flex items-center gap-3 self-start md:self-end">
            {/* View Mode Toggle */}
            <div className="inline-flex items-center bg-white/[0.05] border border-white/10 rounded-full p-1 backdrop-blur-md">
              <button
                onClick={() => setViewMode('stack')}
                className={`inline-flex items-center gap-1.5 text-xs font-medium py-1.5 px-3.5 rounded-full transition-all ${
                  viewMode === 'stack'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-label="3D Deck View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Deck</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 text-xs font-medium py-1.5 px-3.5 rounded-full transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-label="Grid Archive View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {/* Counter Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-white/70 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <FolderGit2 className="w-4 h-4 text-white/70" />
              <span>WORKS</span>
              <span className="text-white font-bold">({projects.length})</span>
            </div>
          </div>
        </div>

        {/* Dynamic View Rendering: 3D Card Stack or Grid */}
        {viewMode === 'stack' ? (
          <div className="w-full py-2 sm:py-4">
            <CardStack
              items={stackItems}
              initialIndex={0}
              cardWidth={480}
              cardHeight={310}
              maxVisible={9}
              spreadDeg={32}
              overlap={0.65}
              depthPx={70}
              tiltXDeg={5}
              perspectivePx={1200}
              autoAdvance={false}
              intervalMs={3500}
              pauseOnHover={true}
              showDots={true}
              className="w-full"
            />
          </div>
        ) : (
          /* High-Impact 2-Column Visual Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 animate-fade-in">
            {projects.map((project, index) => {
              const indexStr = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={project.id}
                  className="group relative rounded-3xl bg-white/[0.03] border border-white/10 ring-1 ring-white/5 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.045]"
                >
                  {/* Visual Image Plate with Smooth Hover Zoom */}
                  <Link
                    to={`/work/${project.slug}`}
                    className="relative aspect-[16/10] w-full overflow-hidden block bg-neutral-900 select-none"
                    data-cursor="view"
                  >
                    <img
                      src={project.images.thumbnail.src}
                      alt={project.images.thumbnail.alt || project.title}
                      className="w-full h-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Subtle Image Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/25 pointer-events-none" />

                    {/* Top Floating Badge Strip */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      <span className="font-mono text-xs text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        #{indexStr}
                      </span>
                      <span className="text-xs font-medium text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15">
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom Year Indicator */}
                    <div className="absolute bottom-4 left-4 pointer-events-none z-10">
                      <span className="font-mono text-xs text-white/70 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-white/10">
                        {project.year}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content & Metadata */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                    <div className="space-y-3">
                      {/* Project Title with Link */}
                      <Link
                        to={`/work/${project.slug}`}
                        className="block group/title"
                        data-cursor="view"
                      >
                        <h3 className="font-haas font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug group-hover/title:text-white transition-colors flex items-center justify-between">
                          <span>{project.title}</span>
                        </h3>
                      </Link>

                      {/* Summary Description */}
                      <p className="text-[14.5px] sm:text-[15.5px] text-white/65 leading-relaxed font-normal">
                        {project.summary}
                      </p>

                      {/* Tech Stack Badges */}
                      {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tools.slice(0, 4).map((tool, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-xs font-mono text-white/60 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-lg"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action CTA Buttons Row */}
                    {(project.links?.live || project.slug) && (
                      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <a
                          href={project.links?.live || `/work/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-950 bg-white hover:bg-white/90 rounded-full py-2.5 px-5 transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
                          data-cursor="link"
                          title="View Live Website"
                        >
                          <span>Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950 stroke-[2.5]" />
                        </a>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectArchive;

