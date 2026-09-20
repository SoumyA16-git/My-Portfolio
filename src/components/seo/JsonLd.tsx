import { useEffect } from "react";

interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
  /** Unique ID to allow replacement on route change */
  id?: string;
}

/**
 * JsonLd — injects a JSON-LD <script> tag into <head> for structured data.
 * Automatically cleans up on unmount.
 */
export function JsonLd({ schema, id = "jsonld-default" }: JsonLdProps) {
  useEffect(() => {
    // Remove existing
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [schema, id]);

  return null;
}

/* ─── Pre-built schema factories ─────────────────────────────────────── */

/** Person schema for the portfolio owner */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Soumya Ranjan Das",
    url: "https://soumyadas.dev",
    image: "https://soumyadas.dev/its_me.png",
    jobTitle: "Web Designer & Developer",
    description:
      "Independent web designer and developer based in Bhubaneswar, India. I design and build business websites, online stores, landing pages and web applications.",
    email: "soumya.js@hotmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhubaneswar",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com/in/soumya-ranjan-das-872377266/",
      "https://github.com/SoumyA16-git",
    ],
    knowsAbout: [
      "Web Design",
      "Web Development",
      "React",
      "TypeScript",
      "GSAP",
      "UI/UX Design",
      "Front-end Development",
      "Tailwind CSS",
      "Performance Optimisation",
    ],
  };
}

/** WebSite schema with SearchAction */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Soumya Ranjan Das",
    url: "https://soumyadas.dev",
    description:
      "Portfolio of Soumya Ranjan Das, independent web designer and developer.",
    author: {
      "@type": "Person",
      name: "Soumya Ranjan Das",
    },
    inLanguage: "en-IN",
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://soumyadas.dev/work?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** CreativeWork schema for a single project/case study */
export function projectSchema(project: {
  title: string;
  slug: string;
  summary: string;
  year: number;
  category: string;
  client: string;
  role: string[];
  tools: string[];
  thumbnail?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    url: `https://soumyadas.dev/work/${project.slug}`,
    description: project.summary,
    creator: {
      "@type": "Person",
      name: "Soumya Ranjan Das",
    },
    dateCreated: `${project.year}`,
    genre: project.category,
    about: project.client,
    contributor: project.role.map((r) => ({ "@type": "Role", roleName: r })),
    keywords: project.tools.join(", "),
    ...(project.thumbnail
      ? { image: project.thumbnail }
      : {}),
  };
}

/** ItemList schema for the work archive page */
export function projectListSchema(
  projects: Array<{ title: string; slug: string; summary: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected Work — Soumya Ranjan Das",
    url: "https://soumyadas.dev/work",
    description:
      "A selection of web design and development projects by Soumya Ranjan Das.",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `https://soumyadas.dev/work/${p.slug}`,
      description: p.summary,
    })),
  };
}
