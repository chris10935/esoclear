import { siteContent } from "@/data/siteContent";
import { Cite } from "./Cite";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { MoleculeMotif } from "./ScientificDiagram";
import { SectionHeading } from "./SectionHeading";

const { candidate } = siteContent;

export function TherapeuticAsset() {
  return (
    <section
      id={candidate.id}
      aria-labelledby="candidate-heading"
      className="on-dark relative overflow-hidden bg-navy py-20 text-white sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-clinical/60 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={candidate.eyebrow}
          heading={candidate.heading}
          id="candidate-heading"
          tone="dark"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal className="space-y-5 text-base leading-relaxed text-white/90 sm:text-lg">
            {candidate.paragraphs.map((paragraph, i) => (
              <p key={paragraph}>
                {paragraph}
                {i === 1 ? (
                  <span className="[&_a]:!text-cyan">
                    <Cite ids={candidate.paragraphRefs} />
                  </span>
                ) : null}
              </p>
            ))}

            <ul className="!mt-10 grid gap-4">
              {candidate.modules.map((module) => (
                <li
                  key={module.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                    <Icon name={module.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="!text-base font-bold !text-white">{module.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/80">{module.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[2rem] bg-white text-ink shadow-2xl">
              <div className="bg-clinical px-6 pt-4">
                <MoleculeMotif />
                <p className="pb-3 text-center text-xs text-white/75">{candidate.figureCaption}</p>
              </div>
              <dl className="divide-y divide-line px-6 py-2 sm:px-8">
                {candidate.summary.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
                  >
                    <dt className="text-xs font-bold uppercase tracking-wider text-muted">
                      {item.label}
                    </dt>
                    <dd className="font-display font-bold text-navy">{item.value}</dd>
                  </div>
                ))}
                <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">
                    Chemical name
                  </dt>
                  <dd className="break-words text-sm text-ink">
                    {candidate.chemicalName}
                    <Cite ids={[candidate.chemicalNameRef]} />
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-10 max-w-4xl rounded-2xl border border-white/15 bg-white/5 p-5 text-sm leading-relaxed text-white/85">
            <span className="font-bold text-white">Important: </span>
            {candidate.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
