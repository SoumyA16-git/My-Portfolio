import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryAccordionItem {
  id: string | number;
  url: string; // After (Redesigned) image
  beforeUrl?: string; // Before (Legacy) image
  title: string;
  client?: string;
  category?: string;
  year?: number | string;
  description: string;
  tags?: string[];
  metrics?: { label: string; value: string; delta?: string }[];
  caseStudyUrl?: string;
  liveUrl?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const defaultGalleryItems: GalleryAccordionItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
    beforeUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    title: "Nova Cloud Platform",
    client: "Nova Infrastructure Corp",
    category: "SaaS & Cloud",
    year: 2026,
    description:
      "Transformed a legacy multi-cloud console into a high-performance spatial observability dashboard with real-time telemetry.",
    tags: ["React", "TypeScript", "Three.js", "WebSockets"],
    metrics: [
      { label: "Triage Speed", value: "3.2m", delta: "-68%" },
      { label: "Active Engineers", value: "45K+", delta: "+180%" },
      { label: "Lighthouse", value: "99/100", delta: "+42pts" },
    ],
    caseStudyUrl: "/work/nova-cloud-platform",
    liveUrl: "https://example.com/nova-cloud",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1600&q=85",
    beforeUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    title: "Apex Treasury Terminal",
    client: "Apex Financial Group",
    category: "Fintech",
    year: 2026,
    description:
      "Rebuilt a legacy institutional banking interface into an ultra-fast, dark luxury multi-currency liquidity portal.",
    tags: ["Fintech", "D3.js", "Radix UI", "Tailwind CSS"],
    metrics: [
      { label: "Wire Execution", value: "0.8s", delta: "-82%" },
      { label: "Monthly Volume", value: "$2.4B", delta: "+220%" },
      { label: "Support Tickets", value: "120/wk", delta: "-54%" },
    ],
    caseStudyUrl: "/work/apex-global-banking",
    liveUrl: "https://example.com/apex-banking",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    beforeUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
    title: "Nordic Living Storefront",
    client: "Nordic Craft Studios",
    category: "E-Commerce",
    year: 2026,
    description:
      "Elevated a cookie-cutter Shopify template into an immersive, editorial Scandinavian architectural storefront.",
    tags: ["Shopify", "GSAP Flip", "Tailwind CSS", "Editorial"],
    metrics: [
      { label: "Conversion Rate", value: "4.8%", delta: "+140%" },
      { label: "Avg Order Value", value: "$420", delta: "+65%" },
      { label: "Mobile Bounce", value: "22%", delta: "-48%" },
    ],
    caseStudyUrl: "/work/nordic-living-storefront",
    liveUrl: "https://example.com/nordic-living",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
    beforeUrl: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=80",
    title: "Pulse Health Portal",
    client: "Pulse MedTech Care",
    category: "HealthTech",
    year: 2026,
    description:
      "Replaced a high-friction clinical hospital portal with a reassuring, accessibility-first telehealth platform.",
    tags: ["HealthTech", "WebRTC", "WCAG AAA", "Accessibility"],
    metrics: [
      { label: "Booking Success", value: "91%", delta: "+165%" },
      { label: "Dropoff Rate", value: "6%", delta: "-62%" },
      { label: "Accessibility", value: "AAA", delta: "100%" },
    ],
    caseStudyUrl: "/work/pulse-health-portal",
    liveUrl: "https://example.com/pulse-health",
  },
];

export interface GalleryModalAccordionProps {
  items?: GalleryAccordionItem[];
  defaultIndex?: number;
  className?: string;
}

// Generates a smooth organic closed cubic Bezier path from polygon vertices
function getClosedBezierSpline(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n === 0) return "";
  let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)} `;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += `C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} `;
  }
  return d + "Z";
}

export function GalleryModalAccordion({
  items = defaultGalleryItems,
  defaultIndex = 0,
  className,
}: GalleryModalAccordionProps) {
  const [index, setIndex] = useState<number>(defaultIndex);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showBeforeMobile, setShowBeforeMobile] = useState<boolean>(false);
  const activeTileRef = useRef<HTMLDivElement | null>(null);

  const prev = useCallback(() => {
    if (!items.length) return;
    setIndex((prevIdx) => (prevIdx - 1 + items.length) % items.length);
    setShowBeforeMobile(false);
  }, [items.length]);

  const next = useCallback(() => {
    if (!items.length) return;
    setIndex((prevIdx) => (prevIdx + 1) % items.length);
    setShowBeforeMobile(false);
  }, [items.length]);

  // Real-time Physics Engine State
  const targetPos = useRef<{ x: number; y: number }>({ x: 240, y: 190 });
  const currentPos = useRef<{ x: number; y: number }>({ x: 240, y: 190 });
  const prevPos = useRef<{ x: number; y: number }>({ x: 240, y: 190 });

  const [liquidData, setLiquidData] = useState<{
    x: number;
    y: number;
    mainPath: string;
    droplets: { x: number; y: number; r: number }[];
  }>({
    x: 240,
    y: 190,
    mainPath: "",
    droplets: [],
  });

  // Droplet physical simulation state
  const dropletsRef = useRef<
    {
      angle: number;
      distance: number;
      baseDistance: number;
      radius: number;
      speed: number;
      phase: number;
    }[]
  >([]);

  useEffect(() => {
    dropletsRef.current = [
      { angle: 0.3, distance: 75, baseDistance: 75, radius: 15, speed: 0.05, phase: 0 },
      { angle: 1.5, distance: 82, baseDistance: 82, radius: 18, speed: -0.04, phase: 1.2 },
      { angle: 2.8, distance: 68, baseDistance: 68, radius: 13, speed: 0.06, phase: 2.4 },
      { angle: 3.9, distance: 79, baseDistance: 79, radius: 16, speed: -0.05, phase: 3.6 },
      { angle: 5.1, distance: 86, baseDistance: 86, radius: 20, speed: 0.035, phase: 4.8 },
      { angle: 5.9, distance: 72, baseDistance: 72, radius: 14, speed: -0.045, phase: 5.5 },
    ];
  }, []);

  // 60FPS Fluid Physics Loop
  useEffect(() => {
    let animId: number;
    let t = 0;

    const updatePhysics = () => {
      t += 0.065;

      // 1. Inertial spring smoothing
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.16;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.16;

      // 2. Velocity vector & magnitude calculation
      const vx = currentPos.current.x - prevPos.current.x;
      const vy = currentPos.current.y - prevPos.current.y;
      prevPos.current = { ...currentPos.current };

      const velocityMag = Math.min(Math.sqrt(vx * vx + vy * vy), 28);
      const moveAngle = Math.atan2(vy, vx);

      // 3. Multi-harmonic organic contour deformation
      const baseRadius = 86;
      const vertexCount = 18;
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < vertexCount; i++) {
        const theta = (i / vertexCount) * Math.PI * 2;

        // Wave harmonics
        const ripple1 = Math.sin(theta * 3 + t * 1.8) * 11;
        const ripple2 = Math.cos(theta * 5 - t * 2.2) * 7.5;
        const ripple3 = Math.sin(theta * 2 + t * 0.9) * 9;

        // Hydrodynamic elongation along velocity vector
        const angleDiff = theta - moveAngle;
        const stretch = Math.cos(angleDiff) * velocityMag * 1.85;

        const r = Math.max(25, baseRadius + ripple1 + ripple2 + ripple3 + stretch);
        points.push({
          x: Math.cos(theta) * r,
          y: Math.sin(theta) * r,
        });
      }

      const mainPath = getClosedBezierSpline(points);

      // 4. Satellite Droplet dynamic orbit & stretching
      const activeDroplets = dropletsRef.current.map((drop) => {
        drop.angle += drop.speed;
        const stretchDist = drop.baseDistance + Math.sin(t * 1.5 + drop.phase) * 14 + velocityMag * 0.9;
        const lagX = -vx * 0.7;
        const lagY = -vy * 0.7;

        return {
          x: Math.cos(drop.angle) * stretchDist + lagX,
          y: Math.sin(drop.angle) * stretchDist + lagY,
          r: drop.radius + Math.sin(t * 2 + drop.phase) * 2.5,
        };
      });

      setLiquidData({
        x: currentPos.current.x,
        y: currentPos.current.y,
        mainPath,
        droplets: activeDroplets,
      });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  const lastSwitchTimeRef = useRef<number>(0);

  const handleTileHover = useCallback((i: number, e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastSwitchTimeRef.current < 60) return;
    lastSwitchTimeRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    currentPos.current = { x, y };
    prevPos.current = { x, y };
    setIndex(i);
    setIsHovered(true);
    setShowBeforeMobile(false);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    setIsHovered(true);
  }, []);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    currentPos.current = { x, y };
    prevPos.current = { x, y };
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <div className={cn("relative w-full select-none", className)}>
      {/* Expanding Tile Strip / Responsive Card Presentation */}
      <div className="w-full md:overflow-x-auto no-scrollbar py-2 sm:py-6">
        <div className="flex items-center justify-center md:gap-3 md:min-w-max mx-auto">
          {items.map((item, i) => {
            const isActive = index === i;

            return (
              <motion.div
                key={item.id}
                ref={isActive ? activeTileRef : null}
                whileTap={{ scale: 0.98 }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_e, info) => {
                  if (info.offset.x > 50 || info.velocity.x > 350) prev();
                  else if (info.offset.x < -50 || info.velocity.x < -350) next();
                }}
                onClick={(e) => {
                  handleTileHover(i, e);
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    handleTileHover(i, e);
                  }
                }}
                onPointerEnter={isActive ? handlePointerEnter : undefined}
                onPointerMove={isActive ? handlePointerMove : undefined}
                onPointerDown={isActive ? handlePointerEnter : undefined}
                onPointerLeave={isActive ? handlePointerLeave : undefined}
                className={cn(
                  "relative rounded-3xl overflow-hidden cursor-pointer shrink-0 border border-white/10 ring-1 ring-white/5 backdrop-blur-md shadow-2xl transition-all duration-500 ease-out",
                  isActive
                    ? "w-full max-w-[350px] sm:max-w-[420px] md:w-[420px] lg:w-[480px] ring-white/30 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-[390px] sm:h-[420px] md:h-[360px] lg:h-[390px]"
                    : "hidden md:block md:w-[68px] lg:w-[80px] opacity-75 hover:opacity-100 hover:border-white/20 md:h-[360px] lg:h-[390px]"
                )}
              >
                {/* Base Image: Modern AFTER (Redesigned) */}
                <img
                  src={item.url}
                  alt={`${item.title} - After`}
                  className="h-full w-full object-cover object-center pointer-events-none select-none"
                  draggable={false}
                  loading="lazy"
                />

                {/* Dynamic Real-Time Realistic Liquid Gooey Mask & Layer for BEFORE Image */}
                {item.beforeUrl && isActive && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
                    style={{
                      opacity: showBeforeMobile ? 1 : isHovered ? 1 : 0,
                      transition: "opacity 0.2s ease-out",
                    }}
                  >
                    <defs>
                      {/* Gooey Liquid Fusion Filter: Sharp 0-feather edge + physical liquid melting */}
                      <filter
                        id={`liquid-goo-${item.id}`}
                        x="-30%"
                        y="-30%"
                        width="160%"
                        height="160%"
                      >
                        <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
                        <feColorMatrix
                          in="blur"
                          mode="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -13"
                          result="goo"
                        />
                      </filter>

                      <mask
                        id={`liquid-mask-${item.id}`}
                        maskUnits="userSpaceOnUse"
                        maskContentUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                      >
                        <rect width="100%" height="100%" fill={showBeforeMobile ? "white" : "black"} />
                        {!showBeforeMobile && (
                          <g filter={`url(#liquid-goo-${item.id})`}>
                            <g transform={`translate(${liquidData.x}, ${liquidData.y})`}>
                              {/* Main Harmonic Rippling Liquid Pool */}
                              {liquidData.mainPath && (
                                <path d={liquidData.mainPath} fill="white" />
                              )}
                              {/* Orbiting & Snapping Fluid Droplets */}
                              {liquidData.droplets.map((d, dIdx) => (
                                <circle
                                  key={dIdx}
                                  cx={d.x.toFixed(1)}
                                  cy={d.y.toFixed(1)}
                                  r={d.r.toFixed(1)}
                                  fill="white"
                                />
                              ))}
                            </g>
                          </g>
                        )}
                      </mask>
                    </defs>

                    {/* Masked Legacy BEFORE Image */}
                    <image
                      href={item.beforeUrl}
                      width="100%"
                      height="100%"
                      preserveAspectRatio="xMidYMid slice"
                      mask={`url(#liquid-mask-${item.id})`}
                    />
                  </svg>
                )}

                {/* Dark Vignette Overlay for crisp typography */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-opacity duration-300",
                    isActive
                      ? "bg-gradient-to-t from-black/95 via-black/45 to-black/25"
                      : "bg-black/60 hover:bg-black/40"
                  )}
                />

                {/* Top Category Badge */}
                {item.category && (
                  <div
                    className={cn(
                      "absolute top-4 left-4 z-20 transition-opacity duration-300 pointer-events-none",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <span className="text-[11px] sm:text-xs font-medium text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      {item.category}
                    </span>
                  </div>
                )}

                {/* Top Right: Mobile Toggle & Desktop Spotlight Indicator */}
                {isActive && item.beforeUrl && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
                    {/* Mobile Toggle Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBeforeMobile((prev) => !prev);
                      }}
                      className="md:hidden inline-flex items-center gap-1.5 text-[11px] font-medium bg-black/75 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20 active:scale-95 transition-all shadow-sm"
                      title="Toggle between Before and After views"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#FF4500]" />
                      <span>{showBeforeMobile ? "Show After" : "View Before"}</span>
                    </button>

                    {/* Desktop Hover Liquid Glass Button Badge */}
                    <div
                      className={cn(
                        "hidden md:inline-flex items-center text-xs font-medium bg-white/10 backdrop-blur-md text-white/95 px-3.5 py-1.5 rounded-full border border-white/20 ring-1 ring-white/10 transition-all duration-300 pointer-events-none shadow-md",
                        isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1"
                      )}
                    >
                      <span>Before UI</span>
                    </div>
                  </div>
                )}



                {/* Active Tile Content */}
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 z-20 flex flex-col justify-end space-y-2 animate-fade-in pointer-events-none">
                    <div className="flex items-center gap-2 pointer-events-auto">
                      {(item.liveUrl || item.caseStudyUrl) && (
                        <a
                          href={item.liveUrl || item.caseStudyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-950 bg-white hover:bg-white/90 rounded-full py-1.5 px-3.5 transition-all shadow-md hover:scale-105 active:scale-95"
                          data-cursor="link"
                          title={`Open Live Site for ${item.title}`}
                        >
                          <span>Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950 stroke-[2.5]" />
                        </a>
                      )}

                      {item.year && (
                        <span className="text-[11px] sm:text-xs font-mono font-medium text-white/80 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/10">
                          {item.year}
                        </span>
                      )}
                    </div>

                    <h3 className="font-haas font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation Controls: Arrows + Dots */}
      {items.length > 1 && (
        <div className="flex md:hidden items-center justify-center gap-4 mt-3">
          <button
            type="button"
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 flex items-center justify-center transition-all active:scale-95 shadow-sm"
            aria-label="Previous redesign"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {items.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  setIndex(dotIdx);
                  setShowBeforeMobile(false);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  dotIdx === index ? "w-6 bg-white" : "w-1.5 bg-white/30"
                )}
                aria-label={`Go to item ${dotIdx + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 flex items-center justify-center transition-all active:scale-95 shadow-sm"
            aria-label="Next redesign"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default GalleryModalAccordion;
