"use client";

import { motion } from "framer-motion";
import { Check, CircleDashed, Loader } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import { Cite } from "./Cite";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const { pipeline } = siteContent;
type Status = (typeof pipeline.milestones)[number]["status"];

const nodeStyle: Record<Status, string> = {
  supported: "border-navy bg-navy text-white",
  "in-progress": "border-teal-deep bg-teal-deep text-white",
  planned: "border-dashed border-muted bg-white text-muted",
};

const pillStyle: Record<Status, string> = {
  supported: "bg-navy/10 text-navy",
  "in-progress": "bg-teal/15 text-teal-deep",
  planned: "bg-slate-100 text-slate-600",
};

function StatusIcon({ status }: { status: Status }) {
  const className = "h-5 w-5";
  if (status === "supported") return <Check aria-hidden="true" className={className} />;
  if (status === "in-progress") return <Loader aria-hidden="true" className={className} />;
  return <CircleDashed aria-hidden="true" className={className} />;
}

export function DevelopmentPipeline() {
  const count = pipeline.milestones.length;
  let lastReached = -1;
  pipeline.milestones.forEach((milestone, i) => {
    if (milestone.status !== "planned") lastReached = i;
  });
  const fraction = lastReached < 0 ? 0 : lastReached / (count - 1);

  return (
    <section
      id={pipeline.id}
      aria-labelledby="pipeline-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow={pipeline.eyebrow}
            heading={pipeline.heading}
            id="pipeline-heading"
          />
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed sm:text-lg">{pipeline.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14">
          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
            {/* Horizontal track (desktop) */}
            <div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-6 hidden h-0.5 bg-line lg:block"
            >
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-navy to-teal"
                initial={{ width: 0 }}
                whileInView={{ width: `${fraction * 100}%` }}
                viewport={{ once: true, margin: "0px 0px -120px 0px" }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            {pipeline.milestones.map((milestone, i) => (
              <Reveal
                as="li"
                key={milestone.number}
                delay={i * 0.12}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center"
              >
                {i < count - 1 ? (
                  <motion.span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-8 left-6 top-12 w-0.5 origin-top -translate-x-1/2 lg:hidden",
                      pipeline.milestones[i + 1].status === "planned"
                        ? "bg-line"
                        : "bg-gradient-to-b from-navy to-teal",
                    )}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                  />
                ) : null}
                <span
                  className={cn(
                    "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-sm",
                    nodeStyle[milestone.status],
                  )}
                >
                  <StatusIcon status={milestone.status} />
                  {milestone.status === "in-progress" ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 48 48"
                      className="absolute inset-0 h-full w-full"
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r="23"
                        fill="none"
                        stroke="#149E9A"
                        strokeWidth="2"
                        className="pulse-ring"
                      />
                    </svg>
                  ) : null}
                </span>

                <article
                  className={cn(
                    "flex-1 rounded-3xl border p-5 text-left lg:w-full lg:flex-none",
                    milestone.status === "planned"
                      ? "border-dashed border-line bg-paper"
                      : "border-line bg-white shadow-card",
                  )}
                >
                  <p className="font-display text-sm font-extrabold tracking-widest text-muted">
                    {milestone.number}
                  </p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{milestone.title}</h3>
                  <p
                    className={cn(
                      "mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
                      pillStyle[milestone.status],
                    )}
                  >
                    <StatusIcon status={milestone.status} />
                    <span className="sr-only">Status: </span>
                    {pipeline.statusLabels[milestone.status]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed">{milestone.body}</p>
                </article>
              </Reveal>
            ))}
          </ol>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-ink">
            {(Object.keys(pipeline.statusLabels) as Status[]).map((status) => (
              <li key={status} className="inline-flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border-2",
                    nodeStyle[status],
                  )}
                >
                  <StatusIcon status={status} />
                </span>
                {pipeline.statusLabels[status]}
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-14">
          <div className="rounded-[2rem] border border-line bg-aqua p-7 sm:p-10">
            <h3 className="text-xl font-bold sm:text-2xl">{pipeline.regulatory.title}</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pipeline.regulatory.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm font-semibold text-navy"
                >
                  <CircleDashed
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep"
                  />
                  <span>
                    {item.label}
                    <Cite ids={"refs" in item ? item.refs : undefined} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed">{pipeline.regulatory.note}</p>
            <p className="mt-2 text-xs leading-relaxed text-ink">
              {pipeline.regulatory.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
