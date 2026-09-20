import React from 'react';
import { FeatureBlock } from './FeatureBlock';
import { TextLink } from '@/components/primitives/TextLink';
import { Project } from '@/content/types';
import projectsData from '@/content/projects.json';

export const SelectedWork: React.FC = () => {
  const featuredProjects = (projectsData as Project[])
    .filter((p) => p.featured && p.status === 'published')
    .sort((a, b) => a.order - b.order);

  return (
    <section id="work" className="relative py-16 md:py-24 border-none">
      <div className="w-full max-w-[1696px] mx-auto px-[var(--margin)] mb-8 md:mb-12 flex items-baseline justify-between">
        <h2 className="text-h2 text-[28px] sm:text-[38px] md:text-[48px] text-[var(--color-fg)] font-semibold tracking-[-0.03em]">
          Selected work
        </h2>
        <TextLink to="/work" className="text-meta">
          All work ({projectsData.length})
        </TextLink>
      </div>

      {/* Feature Blocks Sequence */}
      <div className="flex flex-col gap-12 md:gap-20">
        {featuredProjects.map((project, index) => (
          <FeatureBlock key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Bottom Archive Callout */}
      <div className="w-full max-w-[1696px] mx-auto px-[var(--margin)] mt-16 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
        <span className="text-[15px] text-[var(--color-fg-secondary)]">
          Explore complete catalogue of web designs & applications
        </span>
        <TextLink to="/work" className="text-[15px]">
          View archive ↗
        </TextLink>
      </div>
    </section>
  );
};
