import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  id: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  id,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.18em]",
          dark ? "text-cyan" : "text-teal-deep",
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-3 max-w-3xl text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.7rem]",
          dark && "!text-white",
          align === "center" && "mx-auto",
        )}
      >
        {heading}
      </h2>
    </Reveal>
  );
}
