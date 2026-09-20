import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plate } from '@/components/primitives/Plate';
import { Rule } from '@/components/primitives/Rule';
import { Button } from '@/components/primitives/Button';
import { TextLink } from '@/components/primitives/TextLink';
import { Metadata } from '@/components/primitives/Metadata';
import { Project } from '@/content/types';
import projectsData from '@/content/projects.json';
import { useSEO } from '@/hooks/useSEO';
import { JsonLd, projectSchema } from '@/components/seo/JsonLd';

export const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);

  const projects = projectsData as Project[];
  const project = projects.find((p) => p.slug === slug && p.status === 'published');

  // Dynamic SEO per project
  useSEO({
    title: project ? project.title : 'Project Not Found',
    description: project ? project.summary : 'Project not found.',
    canonical: project ? `https://soumyadas.dev/work/${project.slug}` : undefined,
    ogImage: project ? project.images.thumbnail.src : undefined,
    ogType: 'article',
    noIndex: !project,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-[80svh] flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-h1 text-[48px] text-[var(--color-fg)] mb-4">Project Not Found</h1>
        <p className="text-[17px] text-[var(--color-fg-secondary)] mb-8">
          The project you are looking for does not exist or has been relocated.
        </p>
        <Button onClick={() => navigate('/#work')}>Back to Projects</Button>
      </div>
    );
  }

  // Find next project in circular order
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <JsonLd
        schema={projectSchema({
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          year: project.year,
          category: project.category,
          client: project.client || '',
          role: project.role,
          tools: project.tools,
          thumbnail: project.images.thumbnail.src,
        })}
        id="jsonld-project"
      />
      <article className="relative min-h-[100svh] pt-[clamp(5rem,7.5vh,7rem)] pb-[clamp(3.5rem,5vw,6rem)]">
        {/* 1. Case Hero */}
        <section className="w-full max-w-[1696px] mx-auto px-[var(--margin)] mb-[clamp(2.5rem,4vw,5rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-[clamp(1.75rem,2.5vw,3rem)]">
            {/* Title (cols 1-9) */}
            <div className="lg:col-span-8">
              <Metadata className="mb-4">
                Project {String(project.order).padStart(2, '0')} · {project.year}
              </Metadata>
              <h1 className="text-display text-[clamp(2.5rem,5vw,6rem)] text-[var(--color-fg)] font-semibold tracking-[-0.035em] leading-[0.95]">
                {project.title}
              </h1>
            </div>

            {/* Facts Table (cols 10-12) */}
            <div className="lg:col-span-4 lg:pl-6 border-l border-[var(--color-border)] flex flex-col gap-4 text-sm">
              <div>
                <span className="text-meta text-[var(--color-fg-muted)] block mb-1">Category</span>
                <span className="text-[var(--color-fg)] font-medium">{project.category}</span>
              </div>
              <div>
                <span className="text-meta text-[var(--color-fg-muted)] block mb-1">Role</span>
                <span className="text-[var(--color-fg)] font-medium">{project.role.join(', ')}</span>
              </div>
              <div>
                <span className="text-meta text-[var(--color-fg-muted)] block mb-1">Tools</span>
                <span className="text-[var(--color-fg)] font-medium">{project.tools.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Hero Plate 16:9 */}
          <div className="w-full">
            <Plate
              image={project.images.hero}
              aspect="16:9"
              priority={true}
              className="w-full shadow-2xl"
              flipId={`project-plate-${project.slug}`}
            />
          </div>
        </section>

        {/* Main Case Content with Sticky Facts Column */}
        <div className="w-full max-w-[1696px] mx-auto px-[var(--margin)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* 3. Sticky Facts (cols 1-3 Desktop) */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-[120px] self-start space-y-6 text-sm">
              <div>
                <span className="text-meta text-[var(--color-fg-muted)] block mb-1">Project</span>
                <span className="text-[var(--color-fg)] font-medium text-[16px]">{project.title}</span>
              </div>
              <div>
                <span className="text-meta text-[var(--color-fg-muted)] block mb-1">Year</span>
                <span className="text-[var(--color-fg-secondary)]">{project.year}</span>
              </div>
              <div>
                <span className="text-meta text-[var(--color-fg-muted)] block mb-1">Disciplines</span>
                <span className="text-[var(--color-fg-secondary)]">{project.capabilities.join(', ')}</span>
              </div>
              {project.links.live && (
                <div className="pt-4">
                  <TextLink href={project.links.live} external>
                    Visit live site
                  </TextLink>
                </div>
              )}
            </aside>

            {/* Dynamic Content Sections (cols 5-12) */}
            <div className="lg:col-span-8 lg:col-start-5 flex flex-col gap-[clamp(3.5rem,5vw,7rem)]">
              {/* 2. Overview */}
              <section>
                <h2 className="text-meta text-[var(--color-fg-muted)] mb-4">Overview</h2>
                <p className="text-[20px] sm:text-[24px] md:text-[28px] text-[var(--color-fg)] leading-[1.35] tracking-tight font-medium max-w-[38ch]">
                  {project.overview}
                </p>
                {project.links.live && (
                  <div className="mt-8 lg:hidden">
                    <TextLink href={project.links.live} external>
                      Visit live site
                    </TextLink>
                  </div>
                )}
              </section>

              <Rule />

              {/* Custom Sections from projects.json */}
              {project.sections.map((section, sIdx) => {
                if (section.type === 'text') {
                  return (
                    <section key={sIdx} className="flex flex-col gap-4">
                      <h3 className="text-h3 text-[24px] md:text-[28px] text-[var(--color-fg)] font-medium">
                        {section.heading}
                      </h3>
                      <p className="text-[17px] text-[var(--color-fg-secondary)] leading-relaxed max-w-[62ch]">
                        {section.body}
                      </p>
                    </section>
                  );
                }

                if (section.type === 'plate') {
                  return (
                    <section key={sIdx} className="w-full">
                      <Plate
                        image={section.image}
                        aspect={section.layout === 'full' ? '21:9' : '16:10'}
                        caption={section.caption}
                      />
                      {section.secondaryImage && (
                        <div className="mt-6">
                          <Plate image={section.secondaryImage} aspect="16:10" />
                        </div>
                      )}
                    </section>
                  );
                }

                if (section.type === 'gallery') {
                  return (
                    <section key={sIdx} className="flex flex-col gap-4">
                      <h3 className="text-h3 text-[22px] text-[var(--color-fg)] font-medium mb-4">
                        Interface Screens
                      </h3>
                      <div
                        ref={galleryRef}
                        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
                        data-cursor="drag"
                      >
                        {section.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="w-[300px] sm:w-[420px] shrink-0 snap-start">
                            <Plate image={img} aspect="16:10" />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }

                if (section.type === 'responsive') {
                  return (
                    <section key={sIdx} className="flex flex-col gap-4">
                      <h3 className="text-h3 text-[22px] text-[var(--color-fg)] font-medium mb-2">
                        Responsive Views
                      </h3>
                      <Plate image={section.desktop} aspect="16:10" />
                    </section>
                  );
                }

                if (section.type === 'list') {
                  return (
                    <section key={sIdx} className="flex flex-col gap-6">
                      <h3 className="text-h3 text-[24px] md:text-[28px] text-[var(--color-fg)] font-medium">
                        {section.heading}
                      </h3>
                      <div className="flex flex-col">
                        {section.items.map((item, iIdx) => (
                          <div key={iIdx} className="py-4 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                            <span className="font-medium text-[var(--color-fg)]">{item.name}</span>
                            <span className="text-sm text-[var(--color-fg-secondary)] max-w-[40ch]">{item.note}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }

                if (section.type === 'challenges') {
                  return (
                    <section key={sIdx} className="flex flex-col gap-6">
                      <h3 className="text-h3 text-[24px] md:text-[28px] text-[var(--color-fg)] font-medium">
                        Challenges & Solutions
                      </h3>
                      <div className="flex flex-col gap-6">
                        {section.items.map((item, cIdx) => (
                          <div key={cIdx} className="p-6 rounded-[var(--radius-plate)] bg-[var(--color-surface)] border border-[var(--color-border)]">
                            <p className="font-medium text-[var(--color-fg)] mb-2">
                              Challenge: {item.challenge}
                            </p>
                            <p className="text-sm text-[var(--color-fg-secondary)] leading-relaxed">
                              Response: {item.response}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }

                if (section.type === 'result') {
                  return (
                    <section key={sIdx} className="p-8 rounded-[var(--radius-plate)] bg-[var(--color-surface)] border border-[var(--color-border)]">
                      <h3 className="text-meta text-[var(--color-fg-muted)] mb-3">Project Results</h3>
                      <p className="text-[18px] md:text-[20px] text-[var(--color-fg)] font-medium leading-relaxed">
                        {section.body}
                      </p>
                    </section>
                  );
                }

                return null;
              })}

              {/* 12. Live Website Direct Banner */}
              {project.links.live && (
                <div className="pt-12 border-t border-[var(--color-border)]">
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-h2 text-[32px] sm:text-[44px] md:text-[56px] text-[var(--color-fg)] font-semibold tracking-tight hover:text-[var(--color-accent)] transition-colors"
                    data-cursor="link"
                  >
                    Visit live website ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 13. Next Project Footer Banner */}
        <section className="mt-32 pt-20 border-t border-[var(--color-border)]">
          <div className="w-full max-w-[1696px] mx-auto px-[var(--margin)]">
            <div className="flex items-baseline justify-between mb-8">
              <span className="text-meta text-[var(--color-fg-muted)]">Next Project</span>
              <a href="/#work" className="text-meta draw-underline">Back to Projects</a>
            </div>

            <Link
              to={`/work/${nextProject.slug}`}
              className="group block w-full"
              data-cursor="open"
            >
              <div className="relative overflow-hidden rounded-[var(--radius-plate)] plate-outline">
                <Plate
                  image={nextProject.images.hero}
                  aspect="21:9"
                  className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-12">
                  <div>
                    <span className="text-meta text-white/70 block mb-2">
                      0{nextProject.order} · {nextProject.category}
                    </span>
                    <h3 className="text-h1 text-[32px] sm:text-[48px] md:text-[64px] text-white font-semibold">
                      {nextProject.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};



