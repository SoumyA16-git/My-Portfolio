import React, { useEffect } from 'react';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Certifications } from '@/components/sections/Certifications';
import { ProjectArchive } from '@/components/sections/ProjectArchive';
import { RedesignArchive } from '@/components/sections/RedesignArchive';
import { Contact } from '@/components/sections/Contact';
import { SectionSeam } from '@/components/ui/SectionSeam';

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main" className="relative w-full max-w-full overflow-x-hidden">
      <Hero />
      <SectionSeam />
      <About />
      <SectionSeam />
      <Certifications />
      <SectionSeam />
      <ProjectArchive />
      <SectionSeam />
      <RedesignArchive />
      <SectionSeam />
      <Contact />
      <SectionSeam />
    </main>
  );
};


