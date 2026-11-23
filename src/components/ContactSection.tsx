"use client";

import { useState } from "react";
import { Mail, Send, TriangleAlert } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const { contact } = siteContent;
type InquiryId = (typeof contact.inquiryTypes)[number]["id"];

interface FormState {
  type: InquiryId;
  name: string;
  email: string;
  organization: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) {
    errors.message = "Please enter a message of at least 10 characters.";
  }
  return errors;
}

export function ContactSection() {
  const [values, setValues] = useState<FormState>({
    type: "general",
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const recipient = contact.emails[values.type];
  const configured = Boolean(contact.emails.general);
  const typeLabel = contact.inquiryTypes.find((t) => t.id === values.type)?.label ?? "";

  const update = (key: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0 || !recipient) return;

    const subject = `[EsoClear] ${typeLabel}`;
    const body = [
      `Inquiry type: ${typeLabel}`,
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      values.organization.trim() ? `Organization: ${values.organization.trim()}` : null,
      "",
      values.message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const fieldClass = (hasError: boolean) =>
    cn(
      "mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/80 focus:border-teal-deep",
      hasError ? "border-pathology" : "border-slate-300",
    );

  return (
    <section
      id={contact.id}
      aria-labelledby="contact-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={contact.eyebrow}
              heading={contact.heading}
              id="contact-heading"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed sm:text-lg">{contact.body}</p>

              {configured ? (
                <a
                  href={`mailto:${contact.emails.general}?subject=${encodeURIComponent("[EsoClear] General inquiry")}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-card transition-colors hover:bg-clinical"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  {contact.cta}
                </a>
              ) : (
                <p className="mt-8 flex gap-3 rounded-2xl border border-amber-deep/30 bg-amber-soft p-4 text-sm leading-relaxed text-amber-deep">
                  <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  {contact.unconfiguredNotice}
                </p>
              )}

              <ul className="mt-8 space-y-4">
                {contact.inquiryTypes.map((type) => (
                  <li key={type.id} className="border-l-2 border-teal pl-4">
                    <p className="font-display font-bold text-navy">{type.label}</p>
                    <p className="text-sm text-ink">{type.description}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              aria-labelledby="contact-form-title"
              className="rounded-[2rem] border border-line bg-paper p-6 shadow-card sm:p-9"
            >
              <h3 id="contact-form-title" className="text-xl font-bold">
                Send an inquiry
              </h3>
              <p className="mt-1 text-sm text-muted">
                This form opens your email application with the message prepared. Nothing is sent
                or stored by this website.
              </p>

              <fieldset className="mt-6">
                <legend className="text-sm font-bold text-navy">Type of inquiry</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {contact.inquiryTypes.map((type) => (
                    <label
                      key={type.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-xl border bg-white px-3 py-3 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-deep",
                        values.type === type.id
                          ? "border-teal-deep bg-aqua text-navy"
                          : "border-slate-300 text-ink hover:border-teal",
                      )}
                    >
                      <input
                        type="radio"
                        name="inquiry-type"
                        value={type.id}
                        checked={values.type === type.id}
                        onChange={() => setValues((c) => ({ ...c, type: type.id }))}
                        className="h-4 w-4 accent-teal-deep focus-visible:outline-none"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-bold text-navy">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={update("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={fieldClass(Boolean(errors.name))}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" role="alert" className="mt-1.5 text-sm font-semibold text-pathology">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-bold text-navy">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={update("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={fieldClass(Boolean(errors.email))}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" role="alert" className="mt-1.5 text-sm font-semibold text-pathology">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-org" className="text-sm font-bold text-navy">
                  Organization <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="contact-org"
                  name="organization"
                  autoComplete="organization"
                  value={values.organization}
                  onChange={update("organization")}
                  className={fieldClass(false)}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="text-sm font-bold text-navy">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={values.message}
                  onChange={update("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={fieldClass(Boolean(errors.message))}
                />
                {errors.message ? (
                  <p id="contact-message-error" role="alert" className="mt-1.5 text-sm font-semibold text-pathology">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <p className="mt-5 text-xs leading-relaxed text-muted">
                Please do not include patient-identifiable or confidential health information.
              </p>

              <button
                type="submit"
                disabled={!configured}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-deep px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
              >
                <Send aria-hidden="true" className="h-4 w-4" />
                Prepare email
              </button>

              <div aria-live="polite" className="mt-4 text-sm">
                {submitted ? (
                  <p className="font-semibold text-teal-deep">
                    Your email application should now open. If it does not, write to{" "}
                    <a className="underline" href={`mailto:${recipient}`}>
                      {recipient}
                    </a>
                    .
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
