"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import { Cite } from "./Cite";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const { evidence } = siteContent;
type Group = keyof typeof evidence.chart.groups;

const barStyle: Record<Group, string> = {
  control: "bg-[#A8927E]",
  genetic: "bg-navy",
  pharmacological:
    "bg-teal-deep [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.35)_0_5px,transparent_5px_11px)]",
};

const badgeStyle: Record<Group, string> = {
  control: "border-[#A8927E] text-[#6F5A47]",
  genetic: "border-navy text-navy",
  pharmacological: "border-teal-deep text-teal-deep",
};

export function PreclinicalEvidence() {
  const { chart } = evidence;
  return (
    <section
      id={evidence.id}
      aria-labelledby="evidence-heading"
      className="bg-aqua py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={evidence.eyebrow}
          heading={evidence.heading}
          id="evidence-heading"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-base leading-relaxed sm:text-lg">{evidence.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.45fr_0.55fr] lg:gap-10">
          <Reveal>
            <figure
              aria-labelledby="chart-title"
              className="rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-10"
            >
              <figcaption className="max-w-xl">
                <p className="inline-block rounded-full bg-amber-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-deep">
                  Preclinical · Animal model
                </p>
                <h3 id="chart-title" className="mt-3 text-xl font-bold sm:text-2xl">
                  {chart.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{chart.subtitle}</p>
              </figcaption>

              <div className="mt-8">
                <div
                  aria-hidden="true"
                  className="mb-2 hidden grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_8rem] gap-4 text-xs font-semibold text-muted sm:grid"
                >
                  <span />
                  <span className="relative h-4">
                    {[0, 25, 50, 75, 100].map((tick) => (
                      <span
                        key={tick}
                        className="absolute top-0"
                        style={{
                          left: `${tick}%`,
                          transform: `translateX(-${tick}%)`,
                        }}
                      >
                        {tick}%
                      </span>
                    ))}
                  </span>
                  <span />
                </div>

                <ul className="divide-y divide-line">
                  {chart.rows.map((row, i) => {
                    const group = row.group as Group;
                    return (
                      <li
                        key={row.id}
                        className="grid items-center gap-x-4 gap-y-3 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_8rem]"
                      >
                        <div>
                          <p className="font-display text-base font-bold leading-snug text-navy sm:text-lg">
                            {row.label}
                          </p>
                          <p
                            className={cn(
                              "mt-1.5 inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold",
                              badgeStyle[group],
                            )}
                          >
                            {chart.groups[group]}
                          </p>
                        </div>

                        <div
                          aria-hidden="true"
                          className="relative h-9 rounded-md bg-paper"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, var(--color-line) 1px, transparent 1px)",
                            backgroundSize: "25% 100%",
                          }}
                        >
                          <motion.div
                            className={cn("h-full rounded-md", barStyle[group])}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${row.percent}%` }}
                            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                            transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                          />
                          {row.percent === 0 ? (
                            <span className="absolute inset-y-0 left-0 w-1 rounded-sm bg-navy" />
                          ) : null}
                        </div>

                        <div className="sm:text-right">
                          <p className="whitespace-nowrap font-display text-2xl font-extrabold text-navy sm:text-3xl">
                            {row.display}
                          </p>
                          <p className="text-xs font-semibold text-muted">
                            {row.events} of {row.n} mice
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-xs text-ink">
                {(Object.keys(chart.groups) as Group[]).map((key) => (
                  <span key={key} className="inline-flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn("h-3.5 w-6 rounded-sm", barStyle[key])}
                    />
                    {chart.groups[key]}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-xs leading-relaxed text-muted">
                {chart.footnotes.map((note, i) => (
                  <p key={note}>
                    <span aria-hidden="true">{["†", "‡"][i]} </span>
                    {note}
                    {i === 0 ? <Cite ids={chart.refs} /> : null}
                  </p>
                ))}
                <p>
                  <span className="font-semibold text-ink">Source:</span> Preclinical observations
                  in mice reported in the published patent application
                  <Cite ids={chart.refs} />.
                </p>
              </div>
            </figure>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-between gap-8">
            <div className="space-y-4 text-base leading-relaxed">
              {evidence.narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="rounded-3xl bg-navy p-7 font-display text-xl font-bold leading-snug text-white">
              {evidence.takeaway}
            </blockquote>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-8 max-w-4xl border-l-2 border-teal-deep pl-4 text-xs leading-relaxed text-ink">
            {evidence.disclosure}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
