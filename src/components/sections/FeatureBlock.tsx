import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/content/types';
import { Plate } from '@/components/primitives/Plate';
import { TextLink } from '@/components/primitives/TextLink';
import { Metadata } from '@/components/primitives/Metadata';

interface FeatureBlockProps {
  project: Project;
  index: number;
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({ project, index }) => {
  const indexStr = String(index + 1).padStart(2, '0');
  const variant = project.featureLayout || (index % 4 === 0 ? 'v2' : index % 4 === 1 ? 'v1' : index % 4 === 2 ? 'v4' : 'v5');

  const projectUrl = `/work/${project.slug}`;

  // V2: Asymmetric Split (Plate cols 1-7, 4:5; Text stack cols 9-12)
  if (variant === 'v2') {
    return (
      <div className="group w-full max-w-[1696px] mx-auto px-[var(--margin)] py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          {/* Plate cols 1-7 */}
          <div className="lg:col-span-7">
            <Link to={projectUrl} className="block w-full max-h-[58vh] overflow-hidden" data-cursor="open" tabIndex={-1} aria-hidden="true">
              <Plate
                image={project.images.thumbnail}
                aspect="4:5"
                counterParallax={true}
                cursorState="open"
                className="w-full max-h-[58vh]"
                flipId={`project-plate-${project.slug}`}
              />
            </Link>
          </div>

          {/* Text stack cols 9-12 */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end pb-2">
            <Metadata className="mb-2">
              {indexStr} · {project.category}, {project.year}
            </Metadata>

            <Link
              to={projectUrl}
              className="text-h1 text-[36px] sm:text-[48px] md:text-[64px] lg:text-[76px] text-[var(--color-fg)] font-semibold tracking-[-0.035em] leading-[0.95] hover:text-[var(--color-fg-secondary)] transition-colors"
              data-cursor="open"
            >
              <h2>{project.title}</h2>
            </Link>

            <p className="mt-4 text-[15px] md:text-[16px] text-[var(--color-fg-secondary)] leading-relaxed max-w-[34ch]">
              {project.summary}
            </p>

            <div className="mt-6">
              <TextLink to={projectUrl}>View project</TextLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V1: Wide Plate (Plate cols 1-12, 16:9; Meta below-left, description right)
  if (variant === 'v1') {
    return (
      <div className="group w-full max-w-[1696px] mx-auto px-[var(--margin)] py-6 md:py-10">
        <Link to={projectUrl} className="block w-full max-h-[55vh] overflow-hidden" data-cursor="open" tabIndex={-1} aria-hidden="true">
          <Plate
            image={project.images.hero}
            aspect="16:9"
            counterParallax={true}
            cursorState="open"
            className="w-full max-h-[55vh]"
            flipId={`project-plate-${project.slug}`}
          />
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-baseline justify-between">
          <div className="lg:col-span-6 flex flex-col">
            <Metadata className="mb-1.5">
              {indexStr} · {project.category}, {project.year}
            </Metadata>
            <Link
              to={projectUrl}
              className="text-h1 text-[32px] sm:text-[44px] md:text-[56px] text-[var(--color-fg)] font-semibold tracking-[-0.035em] hover:text-[var(--color-fg-secondary)] transition-colors"
              data-cursor="open"
            >
              <h2>{project.title}</h2>
            </Link>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <p className="text-[15px] md:text-[16px] text-[var(--color-fg-secondary)] leading-relaxed max-w-[32ch]">
              {project.summary}
            </p>
            <div className="shrink-0">
              <TextLink to={projectUrl}>View project</TextLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V4: Oversized Type + Plate
  if (variant === 'v4') {
    return (
      <div className="group w-full max-w-[1696px] mx-auto px-[var(--margin)] py-6 md:py-12">
        <div className="flex flex-col">
          <Metadata className="mb-2">
            {indexStr} · {project.category}, {project.year}
          </Metadata>

          <Link
            to={projectUrl}
            className="text-display text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] text-[var(--color-fg)] font-semibold tracking-[-0.035em] leading-[0.88] hover:text-[var(--color-fg-secondary)] transition-colors"
            data-cursor="open"
          >
            <h2>{project.title}</h2>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6 lg:mt-8">
            <div className="lg:col-span-7">
              <Link to={projectUrl} className="block w-full max-h-[48vh] overflow-hidden" data-cursor="open" tabIndex={-1} aria-hidden="true">
                <Plate
                  image={project.images.thumbnail}
                  aspect="16:10"
                  counterParallax={true}
                  cursorState="open"
                  className="w-full max-h-[48vh]"
                  flipId={`project-plate-${project.slug}`}
                />
              </Link>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-between self-stretch pt-2">
              <p className="text-[15px] md:text-[16px] text-[var(--color-fg-secondary)] leading-relaxed">
                {project.summary}
              </p>
              <div className="mt-6">
                <TextLink to={projectUrl}>View project</TextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V5: Image-first, Side-aligned (Large Plate cols 5-12, text cols 1-4)
  return (
    <div className="group w-full max-w-[1696px] mx-auto px-[var(--margin)] py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Text stack cols 1-4 */}
        <div className="lg:col-span-4 flex flex-col pt-2">
          <Metadata className="mb-2">
            {indexStr} · {project.category}, {project.year}
          </Metadata>

          <Link
            to={projectUrl}
            className="text-h1 text-[36px] sm:text-[48px] md:text-[64px] text-[var(--color-fg)] font-semibold tracking-[-0.035em] leading-[0.95] hover:text-[var(--color-fg-secondary)] transition-colors"
            data-cursor="open"
          >
            <h2>{project.title}</h2>
          </Link>

          <p className="mt-4 text-[15px] md:text-[16px] text-[var(--color-fg-secondary)] leading-relaxed max-w-[32ch]">
            {project.summary}
          </p>

          <div className="mt-6">
            <TextLink to={projectUrl}>View project</TextLink>
          </div>
        </div>

        {/* Large Plate cols 5-12 */}
        <div className="lg:col-span-8">
          <Link to={projectUrl} className="block w-full max-h-[52vh] overflow-hidden" data-cursor="open" tabIndex={-1} aria-hidden="true">
            <Plate
              image={project.images.thumbnail}
              aspect="16:10"
              counterParallax={true}
              cursorState="open"
              className="w-full max-h-[52vh]"
              flipId={`project-plate-${project.slug}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
