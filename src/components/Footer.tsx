import { ExternalLink } from "lucide-react";
import { references } from "@/data/references";
import { siteContent } from "@/data/siteContent";
import { CurrentYear } from "./CurrentYear";
import { Wordmark } from "./Navbar";

const { footer, company } = siteContent;

const kindLabel = {
  publication: "Publication",
  patent: "Patent application",
  regulatory: "FDA resource",
} as const;

export function Footer() {
  return (
    <footer className="on-dark bg-navy text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer, references, and disclosures
      </h2>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div id="references" className="scroll-mt-24">
          <h3 className="font-display text-xl font-bold !text-white">References</h3>
          <ol className="mt-6 grid gap-x-12 gap-y-4 text-sm leading-relaxed text-white/85 lg:grid-cols-2">
            {references.map((reference, index) => (
              <li
                key={reference.id}
                id={`ref-${reference.id}`}
                className="flex scroll-mt-28 gap-3 target:rounded-lg target:bg-white/10 target:p-2"
              >
                <span aria-hidden="true" className="w-6 shrink-0 font-bold text-cyan">
                  {index + 1}.
                </span>
                <span>
                  <span className="sr-only">Reference {index + 1}. </span>
                  {reference.citation}{" "}
                  <span className="whitespace-nowrap rounded-full border border-white/25 px-2 py-0.5 text-xs">
                    {kindLabel[reference.kind]}
                  </span>{" "}
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-cyan underline-offset-2 hover:underline"
                  >
                    View source
                    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  {reference.note ? (
                    <span className="mt-1 block text-xs text-white/65">{reference.note}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/15 pt-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Wordmark light />
            <p className="mt-4 max-w-md font-display text-lg font-semibold leading-snug text-white">
              {company.legalName}
            </p>
            <p className="mt-2 max-w-md text-sm text-white/80">{company.footerTagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold">
              {footer.navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-white/90 hover:text-cyan">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#references" className="text-white/90 hover:text-cyan">
                  References
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-white/90 hover:text-cyan">
                  Privacy notice
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 space-y-5 border-t border-white/15 pt-8 text-xs leading-relaxed text-white/75">
          <p>
            <span className="font-bold text-white">Investigational research disclaimer. </span>
            {footer.disclaimer}
          </p>
          <p id="privacy" className="scroll-mt-28">
            <span className="font-bold text-white">Privacy notice. </span>
            {footer.privacy}
          </p>
          <p>
            © <CurrentYear fallback={new Date().getFullYear()} /> {company.legalName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
