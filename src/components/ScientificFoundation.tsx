import { FileText } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { Cite } from "./Cite";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const { foundation } = siteContent;

export function ScientificFoundation() {
  const publicApplications = foundation.ip.applications.filter((a) => a.verified);

  return (
    <section
      id={foundation.id}
      aria-labelledby="foundation-heading"
      className="bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow={foundation.eyebrow}
            heading={foundation.heading}
            id="foundation-heading"
          />
          <Reveal delay={0.1} className="space-y-4 text-base leading-relaxed sm:text-lg">
            {foundation.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <dl className="grid divide-y divide-line rounded-3xl border border-line bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {foundation.indicators.map((indicator) => (
              <div key={indicator.label} className="px-6 py-5">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  {indicator.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-bold text-navy">
                  {indicator.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {foundation.modules.map((module, i) => (
            <Reveal as="li" key={module.title} delay={i * 0.1}>
              <article className="h-full rounded-3xl border border-line bg-white p-7 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua text-teal-deep">
                  <Icon name={module.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{module.title}</h3>
                {"leader" in module && module.leader ? (
                  <div className="mt-4">
                    <p className="font-display text-lg font-bold text-navy">
                      {module.leader.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-clinical">
                      {module.leader.title}
                    </p>
                    <p className="mt-3 leading-relaxed">
                      {module.leader.contribution}
                      <Cite ids={module.leader.refs} />
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 leading-relaxed">{module.body}</p>
                )}
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <div className="grid gap-8 rounded-[2rem] border border-line bg-white p-7 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-deep">
                <FileText aria-hidden="true" className="h-4 w-4" />
                Intellectual property
              </p>
              <h3 className="mt-3 text-2xl font-bold">{foundation.ip.title}</h3>
              <p className="mt-4 leading-relaxed">{foundation.ip.body}</p>
              <p className="mt-4 text-xs leading-relaxed text-muted">{foundation.ip.note}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-navy">
                Published patent application
              </h4>
              {publicApplications.length > 0 ? (
                <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
                  {publicApplications.map((application) => (
                    <li key={application.id} className="p-4">
                      <p className="font-display text-base font-bold text-navy">
                        {application.id}
                        <span className="ml-2 rounded-full bg-amber-soft px-2 py-0.5 align-middle text-xs font-bold text-amber-deep">
                          Pending
                        </span>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed">
                        {application.detail}
                        <Cite ids={application.refs} />
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  Patent application details will be listed here once verified.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
