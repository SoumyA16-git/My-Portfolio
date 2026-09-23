import React from 'react';
import { Link } from 'react-router-dom';
import { Rule } from '@/components/primitives/Rule';
import { Project } from '@/content/types';
import siteData from '@/content/site.json';
import projectsData from '@/content/projects.json';

export const Capabilities: React.FC = () => {
  // Helper to find projects that carry a specific capability tag
  const getSeenInProjects = (tag: string) => {
    return (projectsData as Project[])
      .filter((p) => p.status === 'published' && p.capabilities?.includes(tag))
      .sort((a, b) => a.order - b.order);
  };

  return (
    <section id="capabilities" className="relative py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="w-full max-w-[1696px] mx-auto px-[var(--margin)] flex flex-col gap-16 md:gap-24">
        {siteData.capabilities.map((disciplineBlock) => (
          <div
            key={disciplineBlock.discipline}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
          >
            {/* Sticky Left Column: Discipline Title (cols 1-5) */}
            <div className="lg:col-span-5 lg:sticky lg:top-[100px] self-start">
              <h3 className="text-h1 text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] text-[var(--color-fg)] font-semibold tracking-[-0.035em] leading-[0.95]">
                {disciplineBlock.discipline}
              </h3>
            </div>

            {/* Right Column: Ruled Items List (cols 6-12) */}
            <div className="lg:col-span-7 flex flex-col">
              {disciplineBlock.items.map((item, idx) => {
                const seenIn = getSeenInProjects(item.tag);

                return (
                  <div key={item.name} className="group py-5 first:pt-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                      {/* Item Title */}
                      <h4 className="text-h3 text-[20px] md:text-[24px] text-[var(--color-fg)] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                        {item.name}
                      </h4>

                      {/* "Seen in" Cross-References (§15.2, §15.4) */}
                      {seenIn.length > 0 && (
                        <div className="flex items-center gap-1.5 text-meta shrink-0">
                          <span className="text-[var(--color-fg-muted)]">Seen in</span>
                          <div className="flex items-center gap-1">
                            {seenIn.map((proj, pIdx) => (
                              <React.Fragment key={proj.id}>
                                <Link
                                  to={`/work/${proj.slug}`}
                                  className="text-[var(--color-fg)] hover:text-[var(--color-accent)] draw-underline"
                                  data-cursor="link"
                                >
                                  {String(proj.order).padStart(2, '0')}
                                </Link>
                                {pIdx < seenIn.length - 1 && <span>,</span>}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-[15px] text-[var(--color-fg-secondary)] leading-relaxed max-w-[56ch]">
                      {item.description}
                    </p>

                    {idx < disciplineBlock.items.length - 1 && (
                      <Rule className="mt-5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
