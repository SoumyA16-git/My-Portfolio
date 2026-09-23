import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterTitle?: string;
  twitterDescription?: string;
}

const BASE_DOMAIN = "https://daswebsolutions.me";
const DEFAULT_TITLE = "Soumya Ranjan Das \u2014 Independent Web Designer & Developer";
const DEFAULT_DESCRIPTION =
  "Independent web designer and developer based in Bhubaneswar, India. I design and build business websites, online stores, landing pages and web applications with a point of view.";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="canonical"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * useSEO — dynamically updates document <head> SEO tags per route.
 *
 * Usage:
 *   useSEO({ title: "About", description: "...", canonical: "https://daswebsolutions.me/about" })
 */
export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  noIndex = false,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterTitle,
  twitterDescription,
}: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} \u2014 Soumya Ranjan Das`
      : DEFAULT_TITLE;

    document.title = fullTitle;

    setMeta("description", description);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // Canonical
    if (canonical) {
      setCanonical(canonical);
    }

    // Open Graph
    setMeta("og:type", ogType, "property");
    setMeta("og:title", ogTitle ?? fullTitle, "property");
    setMeta("og:description", ogDescription ?? description, "property");
    setMeta("og:url", canonical ?? BASE_DOMAIN, "property");
    if (ogImage) {
      setMeta("og:image", ogImage, "property");
      setMeta("og:image:width", "1200", "property");
      setMeta("og:image:height", "630", "property");
    }

    // Twitter
    setMeta("twitter:title", twitterTitle ?? ogTitle ?? fullTitle);
    setMeta("twitter:description", twitterDescription ?? ogDescription ?? description);
    if (ogImage) {
      setMeta("twitter:image", ogImage);
    }
  }, [title, description, canonical, noIndex, ogTitle, ogDescription, ogImage, ogType, twitterTitle, twitterDescription]);
}
