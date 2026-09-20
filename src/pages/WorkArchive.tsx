import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Rule } from '@/components/primitives/Rule';
import { Project } from '@/content/types';
import { getMotionTier } from '@/motion/tier';
import projectsData from '@/content/projects.json';
import { useSEO } from '@/hooks/useSEO';
import { JsonLd, projectListSchema } from '@/components/seo/JsonLd';

export const WorkArchive: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  const projects = (projectsData as Project[])
    .filter((p) => p.status === 'published')
    .sort((a, b) => a.order - b.order);

  useSEO({
    title: 'Project Archive',
    description:
      'Browse selected web design and development projects by Soumya Ranjan Das — business websites, e-commerce, landing pages, and custom web applications.',
    canonical: 'https://soumyadas.dev/work',
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const tier = getMotionTier();
    if (tier !== 'full') return;

    const preview = previewRef.current;
    if (!preview) return;

    const xTo = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset so preview doesn't block cursor
      xTo(e.clientX + 24);
      yTo(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main id="main" className="relative min-h-[100svh] pt-32 pb-24">
      <JsonLd schema={projectListSchema(projects.map(p => ({ title: p.title, slug: p.slug, summary: p.summary })))} id="jsonld-archive" />

      <div className="w-full max-w-[1696px] mx-auto px-[var(--margin)]">
        {/* Page Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h1 className="text-display text-[48px] sm:text-[64px] md:text-[88px] text-[var(--color-fg)] font-semibold tracking-[-0.035em]">
            Archive
          </h1>
          <span className="text-meta text-[var(--color-fg-muted)]">
            {projects.length} Published Projects (2026)
          </span>
        </div>

        {/* Typographic Index List (PRD Â§12.5) */}
        <div className="flex flex-col">
          <Rule strong />

          {projects.map((project, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            const isHovered = hoveredProject?.id === project.id;
            const isDimmed = hoveredProject !== null && !isHovered;

            return (
              <div key={project.id}>
                <Link
                  to={`/work/${project.slug}`}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`group relative flex items-center justify-between py-8 md:py-10 transition-opacity duration-250 ${
                    isDimmed ? 'opacity-35' : 'opacity-100'
                  }`}
                  data-cursor="view"
                >
                  <div className="flex items-baseline gap-6 md:gap-12">
                    {/* Index */}
                    <span className="text-meta text-[var(--color-fg-muted)] w-6 shrink-0">
                      {indexStr}
                    </span>

                    {/* Title with 16px right shift on hover */}
                    <h2 className="text-h1 text-[28px] sm:text-[40px] md:text-[56px] text-[var(--color-fg)] font-semibold tracking-[-0.03em] transition-transform duration-350 ease-out group-hover:translate-x-4">
                      {project.title}
                    </h2>
                  </div>

                  {/* Right Meta & Touch Thumbnail */}
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-4 text-meta text-[var(--color-fg-muted)]">
                      <span>{project.category}</span>
                      <span>Â·</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Touch device inline thumbnail (PRD Â§12.5) */}
                    <div className="lg:hidden w-20 h-24 rounded-[var(--radius-plate)] overflow-hidden shrink-0 border border-[var(--color-border)]">
                      <img
                        src={project.images.thumbnail.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
                <Rule />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cursor Preview Plate for Desktop (PRD Â§12.5) */}
      {hoveredProject && (
        <div
          ref={previewRef}
          className="hidden lg:block fixed top-0 left-0 w-[320px] h-[400px] rounded-[var(--radius-plate)] overflow-hidden pointer-events-none z-[850] shadow-2xl plate-outline will-change-transform"
          aria-hidden="true"
        >
          <img
            ref={previewImgRef}
            src={hoveredProject.images.thumbnail.src}
            alt=""
            className="w-full h-full object-cover animate-in fade-in duration-300"
          />
        </div>
      )}
    </main>
  );
};

