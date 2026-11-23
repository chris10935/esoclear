"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import { CrossSection, type CompareRegion } from "./ScientificDiagram";

const { comparison } = siteContent.need;

const cards = [
  { data: comparison.healthy, variant: "healthy" },
  { data: comparison.stricture, variant: "stricture" },
] as const;

// Both cards drift together so their edges always stay aligned.
const CARD_DRIFT = 16;
const DIAGRAM_DRIFT = 8;

const wideQuery = "(min-width: 768px)";
const subscribeWide = (notify: () => void) => {
  const query = window.matchMedia(wideQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

function useIsWide() {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(wideQuery).matches,
    () => false,
  );
}

function ParallaxCard({
  progress,
  drift,
  inner,
  enabled,
  className,
  children,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  drift: number;
  inner: number;
  enabled: boolean;
  className?: string;
  children: (innerY: ReturnType<typeof useTransform<number, number>>) => React.ReactNode;
}) {
  const amount = enabled ? drift : 0;
  const innerAmount = enabled ? inner : 0;
  const y = useTransform(progress, [0, 0.5, 1], [amount, 0, -amount]);
  const innerY = useTransform(progress, [0, 0.5, 1], [-innerAmount, 0, innerAmount]);
  return (
    <motion.div style={{ y }} className={className}>
      {children(innerY)}
    </motion.div>
  );
}

export function ComparisonExplorer() {
  const [hovered, setHovered] = useState<CompareRegion | null>(null);
  const [pinned, setPinned] = useState<CompareRegion | null>(null);
  const region = hovered ?? pinned;

  const figureRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const wide = useIsWide();
  const parallax = !reduceMotion;
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ["start end", "end start"],
  });
  const backdropLeftY = useTransform(scrollYProgress, [0, 1], parallax ? [70, -70] : [0, 0]);
  const backdropRightY = useTransform(scrollYProgress, [0, 1], parallax ? [-50, 50] : [0, 0]);

  return (
    <figure
      ref={figureRef}
      aria-labelledby="comparison-heading"
      className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-paper p-6 sm:px-10 sm:py-14"
    >
      {/* Decorative depth layers: drift in opposite directions, slower than the content */}
      <motion.div
        aria-hidden="true"
        style={{ y: backdropLeftY }}
        className="pointer-events-none absolute -left-24 top-1/4 -z-10 h-80 w-80 rounded-full bg-aqua blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: backdropRightY }}
        className="pointer-events-none absolute -right-24 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-[#E3ECF4] blur-3xl"
      />

      <h3 id="comparison-heading" className="sr-only">
        {comparison.heading}
      </h3>
      <p className="relative mb-6 flex items-center justify-center gap-2 text-center text-sm font-semibold text-clinical">
        <MousePointerClick aria-hidden="true" className="h-4 w-4 shrink-0" />
        {comparison.hint}
      </p>

      <div className="relative grid gap-10 md:grid-cols-2">
        {cards.map(({ data, variant }) => (
          <ParallaxCard
            key={variant}
            progress={scrollYProgress}
            drift={CARD_DRIFT}
            inner={DIAGRAM_DRIFT}
            enabled={parallax && wide}
            className="rounded-3xl bg-white p-6 shadow-card"
          >
            {(innerY) => (
              <>
                <h4 className="font-display text-lg font-bold text-navy">{data.title}</h4>
                <motion.div style={{ y: innerY }} className="mx-auto mt-2 max-w-md">
                  <CrossSection variant={variant} region={region} onRegionHover={setHovered} />
                </motion.div>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {data.points.map((point) => {
                    const region_ = point.region as CompareRegion;
                    const active = region === region_;
                    return (
                      <li key={point.label}>
                        <button
                          type="button"
                          aria-pressed={pinned === region_}
                          onClick={() =>
                            setPinned((current) => (current === region_ ? null : region_))
                          }
                          onMouseEnter={() => setHovered(region_)}
                          onMouseLeave={() => setHovered(null)}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors",
                            active ? "bg-aqua text-navy" : "text-ink hover:bg-paper",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-2.5 w-2.5 shrink-0 transition-transform",
                              variant === "healthy"
                                ? "rounded-full bg-teal"
                                : "rotate-45 bg-pathology",
                              active && "scale-150",
                            )}
                          />
                          {point.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </ParallaxCard>
        ))}
      </div>

      <figcaption className="relative mt-8 space-y-1 text-center text-xs text-muted">
        <p>{comparison.caption}</p>
        <p>{comparison.flowNote}</p>
      </figcaption>
    </figure>
  );
}
