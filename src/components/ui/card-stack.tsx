import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  liveUrl?: string;
  category?: string;
  year?: number | string;
  tools?: string[];
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  className?: string;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;

  // consider wrapped alternative
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 5,

  cardWidth = 480,
  cardHeight = 310,

  overlap = 0.68,
  spreadDeg = 18,

  perspectivePx = 1200,
  depthPx = 90,
  tiltXDeg = 6,

  activeLiftPx = 18,
  activeScale = 1.02,
  inactiveScale = 0.93,

  springStiffness = 260,
  springDamping = 26,

  loop = true,
  autoAdvance = false,
  intervalMs = 3500,
  pauseOnHover = true,

  showDots = true,
  className,

  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);
  const [responsiveWidth, setResponsiveWidth] = React.useState(cardWidth);
  const [responsiveHeight, setResponsiveHeight] = React.useState(cardHeight);
  const [isMobile, setIsMobile] = React.useState(false);

  // Responsive card dimension calculation
  React.useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const mobile = w < 640;
      setIsMobile(mobile);

      if (w < 440) {
        setResponsiveWidth(Math.min(w - 32, 330));
        setResponsiveHeight(380);
      } else if (w < 640) {
        setResponsiveWidth(Math.min(w - 48, 380));
        setResponsiveHeight(370);
      } else if (w < 1024) {
        setResponsiveWidth(Math.min(w - 80, 420));
        setResponsiveHeight(320);
      } else if (w < 1440) {
        setResponsiveWidth(420);
        setResponsiveHeight(275);
      } else {
        setResponsiveWidth(cardWidth);
        setResponsiveHeight(cardHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardWidth, cardHeight]);

  // keep active in bounds if items change
  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
  }, [active, items, len, onChangeIndex]);

  // On mobile screen, limit visible side cards to 3 total (1 left, 1 center, 1 right) so they never overflow viewport
  const isLaptop = !isMobile && responsiveWidth <= 420;
  const effectiveOverlap = isLaptop ? Math.max(overlap, 0.70) : overlap;
  const effectiveMaxVisible = isMobile ? 3 : maxVisible;
  const maxOffset = Math.max(0, Math.floor(effectiveMaxVisible / 2));
  const cardSpacing = isMobile 
    ? Math.max(12, Math.round(responsiveWidth * 0.18))
    : Math.max(10, Math.round(responsiveWidth * (1 - effectiveOverlap)));
  const stepDeg = maxOffset > 0 ? (isMobile ? 8 : isLaptop ? spreadDeg * 0.9 : spreadDeg) / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len) return;
    if (!canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len) return;
    if (!canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  // keyboard navigation (when container focused)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // autoplay
  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(
      () => {
        if (loop || active < len - 1) next();
      },
      Math.max(1000, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ]);

  if (!len) return null;

  return (
    <div
      className={cn("w-full flex flex-col items-center", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* 3D Stage */}
      <div
        className="relative w-full max-w-5xl mx-auto outline-none"
        style={{ height: Math.max(340, responsiveHeight + 65) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Interactive 3D Project Card Stack. Use arrow keys or drag to navigate."
      >
        {/* Ambient Backlight Glow behind 3D Deck */}
        <div
          className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-48 w-[65%] rounded-full bg-[#FF4500]/12 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center pb-6"
          style={{
            perspective: `${perspectivePx}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              // hide far-away cards cleanly
              if (!visible) return null;

              // fan geometry
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 6; // subtle arc-down feel
              const z = -abs * depthPx;

              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              // drag only on the active card
              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: unknown,
                      info: { offset: { x: number }; velocity: { x: number } },
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(140, responsiveWidth * 0.2);

                      // swipe logic
                      if (travel > threshold || v > 550) prev();
                      else if (travel < -threshold || v < -550) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5 backdrop-blur-xl bg-neutral-900/90",
                    "will-change-transform select-none transition-colors duration-300",
                    isActive
                      ? "cursor-grab active:cursor-grabbing ring-white/20 border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                      : "cursor-pointer opacity-80 hover:opacity-100 hover:border-white/20",
                  )}
                  style={{
                    width: responsiveWidth,
                    height: responsiveHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: y + 30,
                          x,
                          rotateZ,
                          rotateX,
                          scale,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls: Arrows + Indicator Dots */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-20">
        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-sm"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Navigation */}
        {showDots && (
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    on
                      ? "w-7 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                      : "w-2 bg-white/30 hover:bg-white/50",
                  )}
                  aria-label={`Go to ${it.title}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden">
      {/* Background Photography with smooth dark grading */}
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-sm text-neutral-500">
            No image
          </div>
        )}
      </div>

      {/* Cinematic Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

      {/* Top Metadata Header Strip */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between gap-2">
        {item.category && (
          <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10.5px] sm:text-[11px] font-medium text-white/90">
            {item.category}
          </span>
        )}
        {item.year && (
          <span className="px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10 font-mono text-[10.5px] sm:text-[11px] text-white/70 backdrop-blur-sm">
            {item.year}
          </span>
        )}
      </div>

      {/* Bottom Content & Interactive CTAs */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col justify-end space-y-2.5 sm:space-y-3">
        <div>
          <h3 className="text-lg sm:text-2xl font-haas font-bold text-white tracking-tight leading-snug">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-white/75 leading-relaxed font-normal">
              {item.description}
            </p>
          )}
        </div>

        {/* Tech Stack Pills */}
        {item.tools && item.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {item.tools.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-[10.5px] font-mono text-white/60 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-md"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons on Active Card */}
        {active && (
          <div className="pt-1.5 sm:pt-2 flex items-center gap-3">
            {(item.liveUrl || item.href) && (
              <a
                href={item.liveUrl || item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-950 bg-white hover:bg-white/90 rounded-full py-2 px-4.5 transition-all shadow-lg hover:scale-105 active:scale-95"
                data-cursor="link"
                title="Open Live Website"
              >
                <span>Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950 stroke-[2.5]" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CardStack;
