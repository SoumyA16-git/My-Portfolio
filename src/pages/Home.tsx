import React, { useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { ProjectArchive } from "@/components/sections/ProjectArchive";
import { RedesignArchive } from "@/components/sections/RedesignArchive";
import { Contact } from "@/components/sections/Contact";
import { SectionSeam } from "@/components/ui/SectionSeam";
import { useSEO } from "@/hooks/useSEO";
import { JsonLd, personSchema, websiteSchema } from "@/components/seo/JsonLd";

export const Home: React.FC = () => {
  useSEO({
    title: "Soumya Ranjan Das \u2014 Web Designer & Developer",
    description:
      "Independent web designer and developer based in Bhubaneswar, India. I design and build business websites, online stores, landing pages and web applications with a point of view.",
    canonical: "https://soumyadas.dev/",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <JsonLd schema={personSchema()} id="jsonld-person" />
      <JsonLd schema={websiteSchema()} id="jsonld-website" />
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
    </>
  );
};
