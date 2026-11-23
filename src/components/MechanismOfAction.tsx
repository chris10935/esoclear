"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Lightbulb, ShieldCheck } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import { Cite } from "./Cite";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { TissueSchematic } from "./TissueSchematic";
import { SectionHeading } from "./SectionHeading";

const { mechanism } = siteContent;

type PathwayId = "without" | "with";
type Evidence = keyof typeof mechanism.evidenceLevels;

const evidenceIcon: Record<Evidence, typeof ShieldCheck> = {
  established: ShieldCheck,
  preclinical: FlaskConical,
  proposed: Lightbulb,
};

const theme = {
  without: {
    node: "border-pathology/30 bg-pathology-soft hover:border-pathology",
    nodeActive: "border-pathology bg-white ring-2 ring-pathology/30",
    badge: "bg-pathology text-white",
    icon: "bg-pathology/10 text-pathology",
    stroke: "#9A3B2E",
    panel: "border-pathology/25 bg-white",
    accent: "text-pathology",
  },
  with: {
    node: "border-teal-deep/30 bg-aqua hover:border-teal-deep",
    nodeActive: "border-teal-deep bg-white ring-2 ring-teal/40",
    badge: "bg-teal-deep text-white",
    icon: "bg-teal/15 text-teal-deep",
    stroke: "#0B7A78",
    panel: "border-teal-deep/25 bg-white",
    accent: "text-teal-deep",
  },
} as const;

function EvidenceBadge({ level }: { level: Evidence }) {
  const IconComponent = evidenceIcon[level];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink">
      <IconComponent aria-hidden="true" className="h-3.5 w-3.5" />
      {mechanism.evidenceLevels[level]}
    </span>
  );
}

function Connector({ stroke, last }: { stroke: string; last: boolean }) {
  if (last) return null;
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 16"
        className="absolute -right-7 top-1/2 hidden h-4 w-6 -translate-y-1/2 xl:block"
      >
        <line
          x1="2"
          y1="8"
          x2="22"
          y2="8"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          className="flow-line"
        />
        <path d="M22 3 L30 8 L22 13 Z" fill={stroke} />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 32"
        className="mx-auto mt-1 block h-8 w-4 xl:hidden"
      >
        <line
          x1="8"
          y1="2"
          x2="8"
          y2="20"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          className="flow-line"
        />
        <path d="M3 20 L8 29 L13 20 Z" fill={stroke} />
      </svg>
    </>
  );
}

export function MechanismOfAction() {
  const [pathway, setPathway] = useState<PathwayId>("without");
  const [selected, setSelected] = useState<Record<PathwayId, number>>({ without: 0, with: 0 });
  const tabRefs = useRef<Record<PathwayId, HTMLButtonElement | null>>({ without: null, with: null });

  const data = mechanism.pathways[pathway];
  const colors = theme[pathway];
  const index = selected[pathway];
  const node = data.nodes[index];

  const schematic = (
    <div className="rounded-3xl border border-line bg-paper p-3 xl:p-4">
      <TissueSchematic mode={pathway} step={index} description={data.visuals[index]} />
      <p className="mt-2 text-xs leading-snug text-ink xl:mt-3 xl:text-sm xl:leading-relaxed">
        <span className="font-bold text-navy">Step {index + 1}: </span>
        {data.visuals[index]}
      </p>
      <p className="mt-1 hidden text-xs text-muted xl:block">
        Select a step above to update this schematic.
      </p>
    </div>
  );

  const detail = (
    <div className={cn("rounded-3xl border p-6 sm:p-8", colors.panel)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${pathway}-${index}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn("text-xs font-bold uppercase tracking-[0.16em]", colors.accent)}>
              Step {index + 1} of {data.nodes.length}
            </span>
            <EvidenceBadge level={node.evidence as Evidence} />
          </div>
          <h4 className="mt-3 text-lg font-bold sm:text-xl">{node.title}</h4>
          <p className="mt-2 font-semibold text-clinical">{node.short}</p>
          <p className="mt-3 leading-relaxed">
            {node.detail}
            <Cite ids={"refs" in node ? node.refs : undefined} />
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  const onTabKey = (event: React.KeyboardEvent, current: PathwayId) => {
    const order: PathwayId[] = ["without", "with"];
    let next: PathwayId | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      next = order[(order.indexOf(current) + 1) % order.length];
    } else if (event.key === "Home") {
      next = "without";
    } else if (event.key === "End") {
      next = "with";
    }
    if (next) {
      event.preventDefault();
      setPathway(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section
      id={mechanism.id}
      aria-labelledby="mechanism-heading"
      className="bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow={mechanism.eyebrow}
            heading={mechanism.heading}
            id="mechanism-heading"
          />
          <Reveal delay={0.1} className="space-y-4 text-base leading-relaxed sm:text-lg">
            {mechanism.intro.map((paragraph, i) => (
              <p key={paragraph}>
                {paragraph}
                {i === mechanism.intro.length - 1 ? <Cite ids={mechanism.introRefs} /> : null}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <figure className="rounded-[2rem] border border-line bg-white p-5 shadow-card sm:p-9">
            <div
              role="tablist"
              aria-label="Compare pathways"
              className="mx-auto flex w-full max-w-2xl flex-col gap-1 rounded-3xl bg-paper p-1.5 sm:flex-row sm:rounded-full"
            >
              {mechanism.tabs.map((tab) => {
                const id = tab.id as PathwayId;
                const active = pathway === id;
                return (
                  <button
                    key={id}
                    ref={(el) => {
                      tabRefs.current[id] = el;
                    }}
                    role="tab"
                    id={`tab-${id}`}
                    type="button"
                    aria-selected={active}
                    aria-controls={`panel-${id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setPathway(id)}
                    onKeyDown={(event) => onTabKey(event, id)}
                    className={cn(
                      "flex-1 rounded-full px-5 py-3 text-sm font-bold transition-colors",
                      active
                        ? id === "without"
                          ? "bg-pathology text-white shadow"
                          : "bg-teal-deep text-white shadow"
                        : "text-ink hover:bg-white",
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`panel-${pathway}`}
              aria-labelledby={`tab-${pathway}`}
              tabIndex={0}
              className="mt-8 rounded-2xl"
            >
              <div className="max-w-3xl">
                <h3 className={cn("text-xl font-bold sm:text-2xl", colors.accent)}>
                  {data.title}
                </h3>
                <p className="mt-2 leading-relaxed">{data.summary}</p>
              </div>

              <div className="sticky top-[4.5rem] z-20 mt-6 xl:hidden">
                <div className="mx-auto max-w-[17rem] rounded-3xl shadow-card">{schematic}</div>
              </div>

              <ol className="mt-8 grid gap-0 xl:grid-cols-6 xl:gap-x-8">
                {data.nodes.map((item, i) => {
                  const active = i === index;
                  return (
                    <li key={item.title} className="relative flex flex-col">
                      <button
                        type="button"
                        onClick={() => setSelected((s) => ({ ...s, [pathway]: i }))}
                        aria-pressed={active}
                        aria-label={`Step ${i + 1}: ${item.title}. Show details.`}
                        className={cn(
                          "flex h-full w-full flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                          active ? colors.nodeActive : colors.node,
                        )}
                      >
                        <span className="flex w-full items-center justify-between">
                          <span
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-xl",
                              colors.icon,
                            )}
                          >
                            <Icon name={item.icon} className="h-5 w-5" />
                          </span>
                          <span
                            className={cn(
                              "flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold",
                              colors.badge,
                            )}
                          >
                            {i + 1}
                          </span>
                        </span>
                        <span className="break-words text-[0.8125rem] font-bold leading-snug text-navy">
                          {item.title}
                        </span>
                      </button>
                      {active ? (
                        <div aria-live="polite" className="mt-3 xl:hidden">
                          {detail}
                        </div>
                      ) : null}
                      <Connector stroke={colors.stroke} last={i === data.nodes.length - 1} />
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <div aria-live="polite" className="hidden xl:block">
                  {detail}
                </div>

                <div className="hidden xl:block">{schematic}</div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-navy">
                  Schematic key
                </h4>
                <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <li className="flex items-center gap-2.5">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0">
                      <polygon points="10,2 17,6 17,14 10,18 3,14 3,6" fill="#9A3B2E" />
                    </svg>
                    Active PAI-1 (solid hexagon)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0">
                      <polygon
                        points="10,2 17,6 17,14 10,18 3,14 3,6"
                        fill="#fff"
                        stroke="#64748B"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                    </svg>
                    PAI-1 bound by inhibitor (dashed hexagon)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0 rounded-full bg-teal-deep" />
                    PAI-039 (teal circle)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-2.5 w-4 shrink-0 rounded-full bg-[#3B82C4]" />
                    Plasmin (blue capsule)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0">
                      <path
                        d="M4,4 L16,16 M4,16 L16,4"
                        stroke="#9A3B2E"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Blocked plasmin generation (red cross)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 rounded-full border border-amber-deep bg-[#D9A441]"
                    />
                    Inflammatory cell (amber)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="flex shrink-0 gap-0.5">
                      <span className="h-2 w-3 rounded-full bg-[#9CC9CC]" />
                      <span className="h-2 w-3 rounded-full bg-[#B4533F]" />
                    </span>
                    Fibroblast: quiet (teal) to activated (red)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0">
                      <path
                        d="M6,2 C12,7 0,13 6,18 M14,2 C20,7 8,13 14,18"
                        fill="none"
                        stroke="#7C6650"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Collagen fibers
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted">
                  Colors alone are not used to convey meaning: each item also differs in shape or
                  label. Red and amber tones mark pathology; teal and blue tones mark the
                  investigational intervention.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-navy">
                  Strength of support
                </h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {(Object.keys(mechanism.evidenceLevels) as Evidence[]).map((key) => (
                    <li key={key} className="flex items-center gap-2.5">
                      <EvidenceBadge level={key} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <figcaption className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              <p className="font-semibold text-ink">{mechanism.caption}</p>
              <p className="mt-1">{mechanism.note}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
