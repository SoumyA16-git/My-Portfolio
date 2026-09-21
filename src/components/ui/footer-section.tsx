"use client";

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowUpRight,
  ChevronUp,
  Check,
  Send
} from "lucide-react";
import siteData from "@/content/site.json";
import { lenisInstance } from "@/components/layout/SmoothScroll";

export interface FooterNavLink {
  label: string;
  href: string;
  isRoute?: boolean;
  isExternal?: boolean;
}

export interface FooterNavColumn {
  title: string;
  links: FooterNavLink[];
}

export interface FooterSectionProps {
  className?: string;
  brandName?: string;
  brandDescription?: string;
  showNewsletter?: boolean;
}

export function FooterSection({
  className = "",
  brandName = siteData.name || "Portfolio",
  brandDescription = siteData.hero?.descriptor || "Independent web designer and developer. I design and build websites for businesses, brands and creatives.",
  showNewsletter = true
}: FooterSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (href: string, isExternal?: boolean, e?: React.MouseEvent) => {
    if (isExternal) return;
    if (href.startsWith("/#") || href.startsWith("#")) {
      if (e) e.preventDefault();
      const targetId = href.replace("/#", "").replace("#", "");
      const performScroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const w = window.innerWidth;
          const offset = w < 640 ? 35 : w < 1024 ? 45 : 60;
          if (lenisInstance.current) {
            lenisInstance.current.scrollTo(el, { offset, duration: 1.2 });
          } else {
            window.scrollTo({ top: el.offsetTop + offset, behavior: "smooth" });
          }
        }
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(performScroll, 150);
      } else {
        performScroll();
      }
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  const scrollToTop = () => {
    if (lenisInstance.current) {
      lenisInstance.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const socialLinks = [
    { name: "LinkedIn", href: siteData.socials?.[0]?.url || "https://linkedin.com", icon: Linkedin },
    { name: "GitHub", href: siteData.socials?.[1]?.url || "https://github.com", icon: Github },
    { name: "Instagram", href: siteData.socials?.[2]?.url || "https://instagram.com", icon: Instagram },
    { name: "Email", href: `mailto:${siteData.email}`, icon: Mail }
  ];

  const navigationColumns: FooterNavColumn[] = [
    {
      title: "Navigation",
      links: [
        { label: "About Studio", href: "/#about" },
        { label: "Certifications", href: "/#certifications" },
        { label: "Selected Work", href: "/#work" },
        { label: "Redesign Archive", href: "/#redesigns" },
        { label: "Contact", href: "/#contact" }
      ]
    },
    {
      title: "Specialization",
      links: [
        { label: "Design Systems", href: "/#work" },
        { label: "Interface Direction", href: "/#work" },
        { label: "Spatial Applications", href: "/#redesigns" },
        { label: "Creative Motion", href: "/#work" },
        { label: "Performance & A11y", href: "/#about" }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", href: siteData.socials?.[0]?.url || "https://linkedin.com", isExternal: true },
        { label: "GitHub", href: siteData.socials?.[1]?.url || "https://github.com", isExternal: true },
        { label: "Instagram", href: siteData.socials?.[2]?.url || "https://instagram.com", isExternal: true },
        { label: "Download Résumé (PDF)", href: siteData.resume?.url || "/assets/resume.pdf", isExternal: true }
      ]
    },
    {
      title: "Inquiries",
      links: [
        { label: "Start A Project", href: "/#contact" },
        { label: siteData.email, href: `mailto:${siteData.email}`, isExternal: true },
        { label: siteData.availability?.label || "Available for select projects", href: "/#contact" },
        { label: `Reply time: ${siteData.availability?.replyTime || "2 business days"}`, href: "/#contact" }
      ]
    }
  ];

  return (
    <footer className={`w-full max-w-full bg-[#0A0A0A] text-white relative overflow-hidden isolate ${className}`}>
      {/* Signature Orange-Red Atmospheric Glow seamlessly continuing from the page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1300px] lg:w-[1500px] h-[450px] sm:h-[600px] bg-gradient-to-b from-[#FF4500]/08 via-[#FF3E1D]/03 to-transparent blur-[170px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[280px] bg-[#FF4500]/05 blur-[140px] pointer-events-none -z-10 rounded-full" />

      {/* Top seamless blend feathering */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0A0A0A] to-transparent pointer-events-none z-0" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 pt-[clamp(3rem,4.5vw,4rem)] pb-[clamp(2rem,3vw,3rem)] relative z-10">
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[clamp(2rem,3vw,3.5rem)] pb-[clamp(2.5rem,3.5vw,3.5rem)] border-b border-white/10 items-start">
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-[clamp(1.75rem,2.2vw,2.25rem)] font-bold tracking-tight text-white font-haas uppercase">
              {brandName}
            </h2>
            
            <p className="text-[14px] sm:text-[15px] xl:text-[16px] text-white/70 max-w-md leading-relaxed font-sans">
              {brandDescription}
            </p>

            {/* Social Icons with Orange-Red Hover Glow */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-[#FF4500]/40 hover:shadow-[0_0_15px_rgba(255,69,0,0.25)] transition-all duration-200 hover:scale-110 active:scale-95"
                    aria-label={social.name}
                    data-cursor="link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter Box seamlessly blended with soft glass styling */}
          {showNewsletter && (
            <div className="lg:col-span-6 flex flex-col justify-between bg-white/[0.03] border border-white/10 ring-1 ring-white/5 rounded-2xl p-5 sm:p-[clamp(1.25rem,2vw,2rem)] backdrop-blur-md relative overflow-hidden shadow-xl transition-all duration-300">
              {/* Soft Atmospheric Diffused Glow */}
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#FF4500]/08 blur-3xl rounded-full pointer-events-none" />

              <div className="space-y-2 mb-5 sm:mb-6 relative z-10">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold font-sans">
                  Stay Updated
                </span>
                <h3 className="text-lg sm:text-xl lg:text-[clamp(1.2rem,1.5vw,1.5rem)] font-bold text-white font-haas tracking-tight leading-snug">
                  Subscribe to design drops &amp; case studies
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  No spam ever. Unsubscribe anytime with a single click.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="relative z-10 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full h-11 px-4 bg-white/[0.04] border border-white/10 focus:border-white/40 focus:bg-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all font-sans"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="h-11 px-6 bg-white hover:bg-neutral-200 text-neutral-950 font-medium text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all shrink-0 hover:scale-105 active:scale-95 disabled:opacity-75 shadow-md font-sans"
                  data-cursor="link"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold"
                      >
                        <Check className="w-4 h-4" /> Joined!
                      </motion.span>
                    ) : isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Subscribing...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <span>Subscribe</span>
                        <Send className="w-3.5 h-3.5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Middle Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-[clamp(2rem,3vw,3rem)] border-b border-white/10">
          {navigationColumns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/60 font-semibold">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors duration-150 font-sans"
                        data-cursor="link"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-150" />
                      </Link>
                    ) : link.isExternal ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="group inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors duration-150 font-sans"
                        data-cursor="link"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-150" />
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(link.href, false, e)}
                        className="group inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors duration-150 font-sans"
                        data-cursor="link"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-150" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-neutral-400 font-sans">
          <span>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
          
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group font-sans"
            data-cursor="link"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export const Footer = FooterSection;
export default FooterSection;

