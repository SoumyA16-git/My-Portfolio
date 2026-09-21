export interface SiteContent {
  name: string;
  studioName: string | null;
  role: string;
  email: string;
  domain: string;
  location: {
    city: string;
    country: string;
    timezone: string;
    showCity: boolean;
  };
  availability: {
    status: 'available' | 'booking';
    label: string;
    bookingFrom: string;
    replyTime: string;
  };
  socials: Array<{
    network: string;
    url: string;
  }>;
  resume: {
    label: string;
    url: string | null;
  };
  hero: {
    headline: string[];
    descriptor: string;
    metadata: string[];
  };
  philosophy: {
    statement: string;
    design: string[];
    code: string[];
  };
  capabilities: Array<{
    discipline: string;
    items: Array<{
      name: string;
      tag: string;
      description: string;
    }>;
  }>;
  process: Array<{
    number: string;
    title: string;
    description: string;
    youGet: string;
  }>;
  about: {
    lead: string;
    paragraphs: string[];
    howIWork: string[];
    tools: string[];
    portrait: {
      src: string;
      alt: string;
    };
  };
  contact: {
    statement: string[];
    projectTypes: string[];
  };
  seo: {
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
  };
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  focal?: {
    desktop?: number[];
    mobile?: number[];
  };
  placeholderColor: string;
  treatment?: 'color' | 'mono';
}

export type SectionBlock =
  | {
      type: 'text';
      heading: string;
      body: string;
      caption?: string;
    }
  | {
      type: 'plate';
      layout: 'offset' | 'full' | 'pair';
      image: ProjectImage;
      secondaryImage?: ProjectImage;
      caption?: string;
    }
  | {
      type: 'gallery';
      images: ProjectImage[];
      caption?: string;
    }
  | {
      type: 'responsive';
      desktop: ProjectImage;
      tablet?: ProjectImage | null;
      mobile?: ProjectImage | null;
    }
  | {
      type: 'compare';
      beforeLabel: string;
      afterLabel: string;
      before: ProjectImage;
      after: ProjectImage;
    }
  | {
      type: 'list';
      heading: string;
      items: Array<{
        name: string;
        note: string;
      }>;
    }
  | {
      type: 'challenges';
      items: Array<{
        challenge: string;
        response: string;
      }>;
    }
  | {
      type: 'result';
      body: string;
      metrics?: Array<{
        label: string;
        value: string;
        verified: boolean;
        source?: string;
      }>;
    };

export interface Project {
  id: string;
  slug: string;
  status: 'draft' | 'published';
  placeholder: boolean;
  featured: boolean;
  order: number;
  featureLayout: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | null;
  title: string;
  client: string | null;
  year: number;
  category: string;
  role: string[];
  tools: string[];
  capabilities: string[];
  summary: string;
  overview: string;
  links: {
    live: string | null;
    source: string | null;
  };
  images: {
    thumbnail: ProjectImage;
    hero: ProjectImage;
    mobileHero?: ProjectImage;
  };
  sections: SectionBlock[];
  seo?: {
    title: string | null;
    description: string | null;
    ogImage: string | null;
  };
  dates: {
    published: string | null;
    updated: string | null;
  };
}
