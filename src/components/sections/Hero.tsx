import React from 'react';
import ResponsiveHeroBanner from '@/components/ui/responsive-hero-banner';
import siteData from '@/content/site.json';

export const Hero: React.FC = () => {
  return (
    <ResponsiveHeroBanner
      badgeLabel={siteData.availability.status === 'available' ? 'Available' : 'Booking'}
      badgeText={siteData.availability.label}
      title="Websites With A"
      titleLine2="Point Of View."
      description={siteData.hero.descriptor}
      primaryButtonText="Explore Selected Work"
      primaryButtonHref="#work"
      secondaryButtonText="Start A Project"
      secondaryButtonHref="#contact"
      partnersTitle="Core Disciplines & Technologies"
      partners={[
        { name: "Design & Art Direction", href: "#capabilities" },
        { name: "React 19 & TypeScript", href: "#capabilities" },
        { name: "GSAP Creative Motion", href: "#capabilities" },
        { name: "Tailwind CSS v4", href: "#capabilities" },
        { name: "Performance & A11y", href: "#capabilities" }
      ]}
    />
  );
};
