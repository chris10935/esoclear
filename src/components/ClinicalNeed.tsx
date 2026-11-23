import { siteContent } from "@/data/siteContent";
import { Cite } from "./Cite";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { ComparisonExplorer } from "./ComparisonExplorer";
import { SectionHeading } from "./SectionHeading";

const { need } = siteContent;

export function ClinicalNeed() {
  return (
    <section
      id={need.id}
      aria-labelledby="need-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeading eyebrow={need.eyebrow} heading={need.heading} id="need-heading" />
          <Reveal delay={0.1} className="space-y-4 text-base leading-relaxed sm:text-lg">
            {need.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <ol className="relative mt-14 grid gap-5 lg:grid-cols-3 lg:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-[16.6%] right-[16.6%] top-[3.1rem] hidden h-px bg-gradient-to-r from-line via-teal/50 to-line lg:block"
          />
          {need.cards.map((card, index) => (
            <Reveal as="li" key={card.title} delay={index * 0.12}>
              <article className="relative h-full rounded-3xl border border-line bg-paper p-7 shadow-card transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-cyan">
                    <Icon name={card.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm font-bold tracking-widest text-muted">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{card.title}</h3>
                <p className="mt-3 leading-relaxed">
                  {card.body}
                  <Cite ids={card.refs} />
                </p>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16">
          <ComparisonExplorer />
        </Reveal>

        <Reveal className="mt-16">
          <div className="rounded-[2rem] bg-navy px-7 py-12 text-center sm:px-14 sm:py-16">
            <p className="mx-auto max-w-3xl font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
              {need.closing}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {need.closingNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
