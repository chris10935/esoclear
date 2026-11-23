"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import { EsoClearMark } from "./ScientificDiagram";

const sectionIds = ["hero", ...siteContent.nav.flatMap((item) => item.ids)];

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <EsoClearMark className="h-8 w-8 shrink-0" />
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          light ? "text-white" : "text-navy",
        )}
      >
        Eso<span className={light ? "text-cyan" : "text-teal-deep"}>Clear</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const focusable = () =>
      Array.from(
        drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-white/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[4.5rem]"
      >
        <a href="#hero" aria-label="EsoClear home" className="rounded-md">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {siteContent.nav.map((item) => {
            const isActive = item.ids.includes(active);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "text-navy"
                      : "text-ink hover:text-navy",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-teal transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-aqua lg:hidden"
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </nav>
    </header>

    <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col bg-white px-6 pb-8 pt-4 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-12 items-center justify-between">
                <Wordmark />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close navigation menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-aqua"
                >
                  <X aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <ul className="mt-8 flex flex-col">
                {siteContent.nav.map((item) => {
                  const isActive = item.ids.includes(active);
                  return (
                    <li key={item.href} className="border-b border-line">
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex items-center justify-between py-4 font-display text-lg font-bold",
                          isActive ? "text-teal-deep" : "text-navy",
                        )}
                      >
                        {item.label}
                        {isActive ? (
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            Current
                          </span>
                        ) : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-auto text-xs leading-relaxed text-muted">
                Investigational program. Not approved by the FDA for any use.
              </p>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
