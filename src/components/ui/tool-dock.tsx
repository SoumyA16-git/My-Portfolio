"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type ToolDockItem = {
  label: string;
  icon: React.ReactNode;
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TILT_VALUES = [-7, 5, -4, 8, -6, 4, -8, 6, -3, 7, -5, 6];
const MAGNIFICATION_FACTOR = 1.2;
const POINTER_HEIGHT_FACTOR = 0.19;

const SPRING = {
  stiffness: 520,
  damping: 40,
  mass: 0.5,
};

type LayoutState = {
  centers: number[];
  width: number;
};

function swellAt(
  layout: LayoutState,
  index: number,
  pointer: number
) {
  const center = layout.centers[index];

  if (
    !Number.isFinite(pointer) ||
    center === undefined ||
    !layout.width
  ) {
    return 0;
  }

  return Math.max(
    0,
    1 -
      Math.abs(pointer - center) /
        layout.width /
        MAGNIFICATION_FACTOR
  ) ** 2;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.94,
    filter: "blur(3px)",
  },

  shown: ({
    index,
    still,
  }: {
    index: number;
    still: boolean;
  }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: still
      ? { duration: 0 }
      : {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: index * 0.04,
        },

    transitionEnd: {
      filter: "none",
    },
  }),
};

type ToolDockItemProps = {
  item: ToolDockItem;
  index: number;
  count: number;
  pointer: ReturnType<typeof useMotionValue<number>>;
  layout: React.MutableRefObject<LayoutState>;
  still: boolean;
  overlap: number;
  magnification: number;
  tilt: boolean;
};

const DockTile2 = React.memo(function DockTile2({
  item,
  index,
  count,
  pointer,
  layout,
  still,
  overlap,
  magnification,
  tilt,
}: ToolDockItemProps) {
  const rotation =
    tilt
      ? TILT_VALUES[index % TILT_VALUES.length]
      : 0;

  const space =
    Math.max(0.15, Math.abs(overlap) + magnification / 2);

  const swell = useTransform(pointer, (value) =>
    still
      ? 0
      : swellAt(layout.current, index, value)
  );

  const x = useTransform(pointer, (value) => {
    if (still) {
      return 0;
    }

    const {
      centers,
      width,
    } = layout.current;

    let offset = 0;

    for (
      let i = 0;
      i < centers.length;
      i++
    ) {
      if (i === index) {
        continue;
      }

      offset +=
        swellAt(
          layout.current,
          i,
          value
        ) *
        (i < index ? 1 : -1);
    }

    return offset * width * space;
  });

  const springX = useSpring(
    x,
    SPRING
  );

  const springSwell = useSpring(
    swell,
    SPRING
  );

  const scale = useTransform(
    springSwell,
    (value) => 1 + value * magnification
  );

  const y = useTransform(
    springSwell,
    (value) =>
      -value *
      POINTER_HEIGHT_FACTOR *
      layout.current.width
  );

  const rotate = useTransform(
    springSwell,
    (value) =>
      rotation * (1 - value)
  );

  return (
    <motion.li
      data-slot="tool-dock-item"
      custom={{
        index,
        still,
      }}
      variants={itemVariants}
      className="pointer-events-none relative flex shrink-0"
      style={{
        zIndex: count - index,
        marginLeft:
          index === 0
            ? 0
            : overlap < 0
            ? `calc(var(--tool-dock-size) * ${Math.abs(overlap)})`
            : overlap === 0
            ? "8px"
            : `calc(var(--tool-dock-size) * ${-overlap})`,
      }}
    >
      <motion.div
        role="img"
        aria-label={item.label}
        style={{
          x: springX,
          y,
          scale,
          rotate,
        }}
        className="w-[var(--tool-dock-size)] h-[var(--tool-dock-size)] origin-bottom will-change-transform select-none"
      >
        {item.icon}
      </motion.div>
    </motion.li>
  );
});

export function ToolDock({
  items,
  size = 48,
  overlap = -0.2,
  magnification = 0.25,
  tilt = false,
  label = "Tools",
  className,
  ...props
}: {
  items: ToolDockItem[];
  size?: number;
  overlap?: number;
  magnification?: number;
  tilt?: boolean;
  label?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const listRef =
    React.useRef<HTMLUListElement>(null);

  const layout =
    React.useRef<LayoutState>({
      centers: [],
      width: 0,
    });

  const reducedMotion =
    useReducedMotion() ?? false;

  const pointer =
    useMotionValue(
      Number.POSITIVE_INFINITY
    );

  const [
    hoveredIndex,
    setHoveredIndex,
  ] = React.useState<number | null>(
    null
  );

  const previousIndex =
    React.useRef<number | null>(null);

  const [
    hasMoved,
    setHasMoved,
  ] = React.useState(false);

  const [
    tooltipX,
    setTooltipX,
  ] = React.useState(0);

  const [
    tooltipLabel,
    setTooltipLabel,
  ] = React.useState(
    items[0]?.label ?? ""
  );

  React.useEffect(() => {
    const element =
      listRef.current;

    if (!element) {
      return;
    }

    const measure = () => {
      const children =
        [...element.children] as HTMLElement[];

      layout.current = {
        centers: children.map(
          (child) =>
            child.offsetLeft +
            child.offsetWidth / 2
        ),

        width:
          children[0]?.offsetWidth ??
          0,
      };
    };

    measure();

    const observer =
      new ResizeObserver(
        measure
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, [items.length]);

  const trackPointer =
    React.useCallback(
      (clientX: number) => {
        const element =
          listRef.current;

        if (!element) {
          return;
        }

        const localX =
          clientX -
          element.getBoundingClientRect()
            .left;

        pointer.set(localX);

        const {
          centers,
        } = layout.current;

        if (!centers.length) {
          return;
        }

        let nearest = 0;

        for (
          let index = 1;
          index < centers.length;
          index++
        ) {
          if (
            Math.abs(
              localX -
                centers[index]
            ) <
            Math.abs(
              localX -
                centers[nearest]
            )
          ) {
            nearest = index;
          }
        }

        if (
          nearest !==
          previousIndex.current
        ) {
          setHasMoved(
            previousIndex.current !==
              null
          );

          previousIndex.current =
            nearest;

          setHoveredIndex(
            nearest
          );

          setTooltipLabel(
            items[nearest]?.label ??
              ""
          );

          setTooltipX(
            centers[nearest]
          );
        }
      },
      [items, pointer]
    );

  const releasePointer =
    React.useCallback(() => {
      pointer.set(
        Number.POSITIVE_INFINITY
      );

      previousIndex.current =
        null;

      setHoveredIndex(null);
    }, [pointer]);

  const overlapFactor =
    1 +
    (items.length - 1) *
      (1 - overlap) +
    2 *
      Math.max(
        0,
        overlap +
          magnification / 2
      );

  const dockRise =
    POINTER_HEIGHT_FACTOR +
    magnification;

  return (
    <div
      data-slot="tool-dock"
      className={cn(
        "flex w-full justify-center @container",
        className
      )}
      {...props}
    >
      <div
        className="relative w-fit pt-[calc(var(--tool-dock-size)*var(--tool-dock-rise)+2.75rem)]"
        style={{
          "--tool-dock-size": `min(${size}px, calc((100cqw - 1rem) / ${overlapFactor}))`,
          "--tool-dock-rise": dockRise,
        } as React.CSSProperties}
      >
        <span
          aria-hidden="true"
          data-slot="tool-dock-tooltip"
          data-state={
            hoveredIndex === null
              ? "closed"
              : "open"
          }
          className={cn(
            "pointer-events-none absolute bottom-[calc(var(--tool-dock-size)*(1+var(--tool-dock-rise))+0.625rem)] left-0 z-50 whitespace-nowrap rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[13px] font-medium text-neutral-200 shadow-lg opacity-0 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:opacity-100 motion-reduce:transition-none",

            hasMoved
              ? "transition-[translate,opacity] duration-300"
              : "transition-opacity duration-200"
          )}
          style={{
            translate: `calc(${tooltipX}px - 50%) 0`,
          }}
        >
          {tooltipLabel}

          <span
            className="absolute -bottom-[5px] left-1/2 -ml-[4.5px] size-[9px] rotate-45 rounded-br-[2px] border-r border-b border-neutral-700 bg-neutral-900"
          />
        </span>

        <motion.ul
          ref={listRef}
          role="list"
          aria-label={label}
          initial="hidden"
          whileInView="shown"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          onPointerMove={(event) =>
            trackPointer(
              event.clientX
            )
          }
          onPointerDown={(event) =>
            trackPointer(
              event.clientX
            )
          }
          onPointerLeave={
            releasePointer
          }
          onPointerUp={(event) => {
            if (
              event.pointerType !==
              "mouse"
            ) {
              releasePointer();
            }
          }}
          onPointerCancel={
            releasePointer
          }
          className="relative flex w-fit touch-pan-y pointer-events-auto cursor-pointer"
        >
          {items.map(
            (item, index) => (
              <DockTile2
                key={item.label}
                item={item}
                index={index}
                count={items.length}
                pointer={pointer}
                layout={layout}
                still={
                  reducedMotion
                }
                overlap={overlap}
                magnification={
                  magnification
                }
                tilt={tilt}
              />
            )
          )}
        </motion.ul>
      </div>
    </div>
  );
}

export function ToolDockTile({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="tool-dock-tile"
      className={cn(
        "relative grid size-full place-items-center overflow-hidden rounded-[23%] shadow-[0_4px_14px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-200 select-none",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/20 after:via-transparent after:to-black/15 after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.2)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const portfolioToolDockItems: ToolDockItem[] = [
  {
    label: "Claude",
    icon: (
      <ToolDockTile className="bg-[#D97757] border-[#E88E70]/30">
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a1 1 0 0 1 1 1v2.1l1.48-.86a1 1 0 1 1 1 1.73L14 6.83l1.82-.48a1 1 0 1 1 .52 1.93L14.47 8.8l1.88.25a1 1 0 1 1-.26 1.98l-1.92-.25.96 1.66a1 1 0 1 1-1.74 1L12.4 11.7v2a1 1 0 1 1-2 0v-2l-.99 1.74a1 1 0 1 1-1.74-1l.96-1.66-1.92.25a1 1 0 1 1-.26-1.98l1.88-.25-1.87-.52a1 1 0 1 1 .52-1.93L8.8 6.83l-1.48-.86a1 1 0 1 1 1-1.73L9.8 5.1V3a1 1 0 0 1 1-1h1.2z" transform="scale(1.2) translate(-2, -2)" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "Warp Terminal",
    icon: (
      <ToolDockTile className="bg-[#18181B] border-white/15">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-400 text-white shadow-sm font-mono text-[11px] font-bold tracking-tighter">
          {">_"}
        </div>
      </ToolDockTile>
    ),
  },
  {
    label: "VS Code",
    icon: (
      <ToolDockTile className="bg-white border-black/10">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#007ACC">
          <path d="M17.58 2.22a1.8 1.8 0 0 0-1.85.28L6.47 9.8 3.53 7.55a1.2 1.2 0 0 0-1.68.22l-.71.95a1.2 1.2 0 0 0 .22 1.68l2.67 2.05-2.67 2.05a1.2 1.2 0 0 0-.22 1.68l.71.95a1.2 1.2 0 0 0 1.68.22l2.94-2.25 9.26 7.3a1.8 1.8 0 0 0 2.92-1.41V3.63a1.8 1.8 0 0 0-1.07-1.41zm-1.78 6.13L8.93 12.4l6.87 4.05V8.35z" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "GitHub",
    icon: (
      <ToolDockTile className="bg-[#181717] border-white/15">
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "Figma",
    icon: (
      <ToolDockTile className="bg-white border-black/10">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" fill="#F24E1E" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#FF7262" />
          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" fill="#1ABCFE" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" fill="#0ACF83" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="#A259FF" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "Supabase",
    icon: (
      <ToolDockTile className="bg-[#1C1C1E] border-white/15">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M13.4 2.8c-.6-.9-2-.4-2 .7v8.5H3.8c-1.1 0-1.6 1.4-.7 2l8.8 9.2c.6.9 2 .4 2-.7v-8.5h7.6c1.1 0 1.6-1.4.7-2l-8.8-9.2z" fill="url(#supabase-grad)" />
          <defs>
            <linearGradient id="supabase-grad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3ECF8E" />
              <stop offset="1" stopColor="#249361" />
            </linearGradient>
          </defs>
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "Slack",
    icon: (
      <ToolDockTile className="bg-white border-black/10">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A" />
          <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0" />
          <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D" />
          <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "Vercel",
    icon: (
      <ToolDockTile className="bg-black border-white/20">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19.7778H22L12 2Z" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "Linear",
    icon: (
      <ToolDockTile className="bg-white border-black/10">
        <div className="flex items-center gap-[2.5px] rotate-[-25deg]">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
          <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
          <div className="w-1.5 h-6 bg-rose-500 rounded-full" />
          <div className="w-2.5 h-3 bg-black rounded-sm self-end" />
        </div>
      </ToolDockTile>
    ),
  },
  {
    label: "Three.js & 3D",
    icon: (
      <ToolDockTile className="bg-[#1C1C1E] border-white/15">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "Cloudflare",
    icon: (
      <ToolDockTile className="bg-white border-black/10">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F38020">
          <path d="M18.2 9.4A5.5 5.5 0 0 0 7.8 8.1 4.5 4.5 0 0 0 4 14.5a3.5 3.5 0 0 0 3.5 3.5h11a3.5 3.5 0 0 0 3.5-3.5 3.5 3.5 0 0 0-3.8-5.1z" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "Raycast",
    icon: (
      <ToolDockTile className="bg-[#362C5B] border-[#4A3D78]/40">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19a8 8 0 0 1 16 0" />
          <path d="M7 19a5 5 0 0 1 10 0" />
          <path d="M10 19a2 2 0 0 1 4 0" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "React 19",
    icon: (
      <ToolDockTile className="bg-[#0D1117] border-cyan-500/25">
        <svg className="w-5 h-5 text-[#00D8FF]" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
          <circle cx="0" cy="0" r="2.1" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.2" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "TypeScript",
    icon: (
      <ToolDockTile className="bg-[#3178C6] border-blue-400/30">
        <span className="font-bold text-white text-[13px] tracking-tight font-sans">TS</span>
      </ToolDockTile>
    ),
  }
];

export default ToolDock;
