"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Route, RotateCcw } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import {
  BEAD_START_Y,
  HeroEsophagus,
  scarFraction,
  stallY,
} from "./ScientificDiagram";

const { hero } = siteContent;
const { illustration } = hero;

const AUTOPLAY_MS = 5600;
const BEAD_END_Y = 500;

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

type Passage = "idle" | "running" | "passed" | "stalled";

function stageFor(progress: number) {
  if (progress < 20) return 0;
  if (progress < 70) return 1;
  return 2;
}

function lumenStatusFor(progress: number) {
  const fraction = scarFraction(progress);
  if (fraction < 0.15) return 0;
  if (fraction < 0.6) return 1;
  return 2;
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [beadY, setBeadY] = useState<number | null>(null);
  const [passage, setPassage] = useState<Passage>("idle");
  const progressRef = useRef(0);
  const progressFrame = useRef<number | null>(null);
  const beadFrame = useRef<number | null>(null);

  const cancelFrames = useCallback(() => {
    if (progressFrame.current !== null) cancelAnimationFrame(progressFrame.current);
    if (beadFrame.current !== null) cancelAnimationFrame(beadFrame.current);
    progressFrame.current = null;
    beadFrame.current = null;
  }, []);

  const resetPassage = useCallback(() => {
    if (beadFrame.current !== null) cancelAnimationFrame(beadFrame.current);
    beadFrame.current = null;
    setBeadY(null);
    setPassage("idle");
  }, []);

  const tweenTo = useCallback(
    (target: number, duration: number) => {
      if (progressFrame.current !== null) cancelAnimationFrame(progressFrame.current);
      resetPassage();
      if (reduceMotion) {
        progressRef.current = target;
        setProgress(target);
        return;
      }
      const from = progressRef.current;
      const startedAt = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startedAt) / duration);
        const value = from + (target - from) * easeInOut(t);
        progressRef.current = value;
        setProgress(value);
        progressFrame.current = t < 1 ? requestAnimationFrame(step) : null;
      };
      progressFrame.current = requestAnimationFrame(step);
    },
    [reduceMotion, resetPassage],
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => tweenTo(100, AUTOPLAY_MS));
    return () => {
      cancelAnimationFrame(id);
      cancelFrames();
    };
  }, [tweenTo, cancelFrames]);

  const scrub = (value: number) => {
    cancelFrames();
    resetPassage();
    progressRef.current = value;
    setProgress(value);
  };

  const replay = () => {
    cancelFrames();
    progressRef.current = 0;
    setProgress(0);
    tweenTo(100, AUTOPLAY_MS);
  };

  const tracePassage = () => {
    cancelFrames();
    const stopAt = stallY(progressRef.current);
    const endY = stopAt ?? BEAD_END_Y;
    setPassage("running");
    if (reduceMotion) {
      setBeadY(endY);
      setPassage(stopAt === null ? "passed" : "stalled");
      return;
    }
    const duration = 400 + ((endY - BEAD_START_Y) / (BEAD_END_Y - BEAD_START_Y)) * 1700;
    const startedAt = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      setBeadY(BEAD_START_Y + (endY - BEAD_START_Y) * easeInOut(t));
      if (t < 1) {
        beadFrame.current = requestAnimationFrame(step);
      } else {
        beadFrame.current = null;
        setPassage(stopAt === null ? "passed" : "stalled");
      }
    };
    beadFrame.current = requestAnimationFrame(step);
  };

  const activeStage = stageFor(progress);
  const lumenStatus = illustration.lumenStatus[lumenStatusFor(progress)];
  const passageMessage =
    passage === "idle" ? "" : illustration.passage[passage as Exclude<Passage, "idle">];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-paper pb-16 pt-28 lg:pb-10 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_85%_30%,var(--color-aqua),transparent_70%),radial-gradient(40rem_30rem_at_0%_100%,#eef3f8,transparent_70%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-deep"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-[2.5rem] font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl font-display text-lg font-semibold leading-snug text-clinical sm:text-xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-ink"
          >
            {hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-card transition-colors hover:bg-clinical"
            >
              {hero.primaryCta.label}
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 bg-white px-7 py-3.5 text-sm font-bold text-navy transition-colors hover:border-teal hover:bg-aqua"
            >
              {hero.secondaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 max-w-xl border-l-4 border-teal pl-4 font-display text-base font-semibold leading-snug text-navy"
          >
            {hero.statement}
          </motion.blockquote>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto w-full max-w-[35rem]"
        >
          <div className="rounded-[2rem] border border-line bg-white p-5 shadow-card sm:p-7">
            <div className="grid items-center gap-6 sm:grid-cols-[12.5rem_1fr]">
              <div className="mx-auto w-full max-w-[12.5rem]">
                <HeroEsophagus
                  progress={progress}
                  beadY={beadY}
                  activeStage={activeStage}
                  onSelectStage={(index) => tweenTo(illustration.stages[index].target, 1400)}
                />
              </div>

              <div>
                <ol className="space-y-2">
                  {illustration.stages.map((stage, index) => {
                    const active = index === activeStage;
                    return (
                      <li key={stage.label}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => tweenTo(stage.target, 1400)}
                          className={cn(
                            "flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors",
                            active
                              ? "border-teal-deep bg-aqua"
                              : "border-line bg-white hover:border-teal hover:bg-paper",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-colors",
                              active ? "bg-teal-deep" : "bg-navy",
                            )}
                          >
                            {index + 1}
                          </span>
                          <span className="text-sm leading-snug">
                            <span className="block font-bold text-navy">{stage.label}</span>
                            {active ? (
                              <span className="mt-0.5 block text-ink">{stage.detail}</span>
                            ) : null}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <button
                    type="button"
                    onClick={tracePassage}
                    disabled={passage === "running"}
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-clinical disabled:opacity-60"
                  >
                    <Route aria-hidden="true" className="h-3.5 w-3.5" />
                    {illustration.passage.button}
                  </button>
                  <p className="text-xs font-bold uppercase tracking-wider text-clinical">
                    {lumenStatus}
                  </p>
                </div>
                <p
                  aria-live="polite"
                  className={cn(
                    "mt-2 min-h-[2.5rem] text-xs leading-snug",
                    passage === "stalled" ? "font-semibold text-pathology" : "text-ink",
                  )}
                >
                  {passageMessage}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <label
                htmlFor="progression-slider"
                className="flex items-baseline justify-between gap-3 text-xs"
              >
                <span className="font-bold text-navy">{illustration.sliderLabel}</span>
                <span className="text-muted">{illustration.sliderHint}</span>
              </label>
              <input
                id="progression-slider"
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(progress)}
                onChange={(event) => scrub(Number(event.target.value))}
                aria-valuetext={illustration.stages[activeStage].label}
                className="mt-3 h-2 w-full cursor-pointer accent-teal-deep"
              />
              <div aria-hidden="true" className="relative mt-1 h-4 text-[0.7rem] font-semibold text-muted">
                <span className="absolute left-0">Healthy</span>
                <span
                  className="absolute -translate-x-1/2"
                  style={{ left: `${illustration.stages[1].target}%` }}
                >
                  Injury
                </span>
                <span className="absolute right-0">Fibrosis</span>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 flex items-start justify-between gap-4 px-2 text-xs leading-relaxed text-muted">
            <span>
              {illustration.caption} {illustration.passage.note}
            </span>
            <button
              type="button"
              onClick={replay}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 font-semibold text-teal-deep hover:bg-aqua"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Replay
            </button>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
