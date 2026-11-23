"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function scallop(cx: number, cy: number, r: number, amp: number, lobes: number) {
  const steps = 96;
  const points: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const theta = (i / steps) * Math.PI * 2;
    const radius = r + amp * Math.sin(lobes * theta);
    const x = cx + radius * Math.cos(theta);
    const y = cy + radius * Math.sin(theta);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `${points.join(" ")} Z`;
}

export function hexagon(cx: number, cy: number, r: number, rotation = 0) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i + rotation;
    return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
}

/* -------------------------------------------------------------------------- */
/* Hero: longitudinal esophageal section                                       */
/* -------------------------------------------------------------------------- */

const LUMEN_WIDTH = 80;
const SCAR_TOP = 300;
const SCAR_BOTTOM = 520;
const SCAR_MAX_DEPTH = 34;
export const BEAD_RADIUS = 13;
export const BEAD_START_Y = 40;
export const STAGE_MARKER_Y = [96, 262, 420] as const;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** 0 = healthy, 1 = fully developed scar. Injury appears first, scar follows. */
export function scarFraction(progress: number) {
  return clamp01((progress - 30) / 70);
}

function scarDepthAt(y: number, fraction: number) {
  if (y <= SCAR_TOP || y >= SCAR_BOTTOM) return 0;
  const t = (y - SCAR_TOP) / (SCAR_BOTTOM - SCAR_TOP);
  return SCAR_MAX_DEPTH * fraction * Math.sin(Math.PI * t) ** 2;
}

/** First y at which the lumen is narrower than the illustrative bolus, or null. */
export function stallY(progress: number): number | null {
  const fraction = scarFraction(progress);
  for (let y = BEAD_START_Y; y <= 500; y += 2) {
    if (LUMEN_WIDTH - 2 * scarDepthAt(y, fraction) < 2 * BEAD_RADIUS) return y;
  }
  return null;
}

function scarOutline(fraction: number) {
  const points: string[] = [];
  const steps = 44;
  for (let i = 0; i <= steps; i += 1) {
    const y = SCAR_TOP + ((SCAR_BOTTOM - SCAR_TOP) * i) / steps;
    points.push(`${(140 + scarDepthAt(y, fraction)).toFixed(2)},${y.toFixed(2)}`);
  }
  return points;
}

function WallLayers() {
  return (
    <>
      <rect x="92" y="0" width="24" height="520" fill="#BFD5E1" />
      <rect x="116" y="0" width="12" height="520" fill="#E0EBF1" />
      <rect x="128" y="0" width="12" height="520" fill="#F0CEC7" />
      <line x1="116" x2="116" y1="0" y2="520" stroke="#98B7C8" strokeWidth="1" />
      <line x1="128" x2="128" y1="0" y2="520" stroke="#D3AFA7" strokeWidth="1" />
      <line x1="140" x2="140" y1="0" y2="520" stroke="#C98F85" strokeWidth="1.5" />
      {Array.from({ length: 26 }, (_, i) => (
        <line
          key={i}
          x1="94"
          x2="114"
          y1={i * 20 + 6}
          y2={i * 20 + 14}
          stroke="#A5C0CF"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

interface HeroEsophagusProps {
  progress: number;
  beadY: number | null;
  activeStage: number;
  onSelectStage: (index: number) => void;
}

export function HeroEsophagus({ progress, beadY, activeStage, onSelectStage }: HeroEsophagusProps) {
  const uid = useId().replace(/:/g, "");
  const fraction = scarFraction(progress);
  const injuryOpacity = clamp01(progress / 35);
  const outline = scarOutline(fraction);
  const scarShape = `M140,${SCAR_TOP} L${outline.join(" L")} L140,${SCAR_BOTTOM} Z`;
  const scarEdge = `M${outline.join(" L")}`;
  const ids = {
    mask: `${uid}-mask`,
    fade: `${uid}-fade`,
    collagen: `${uid}-collagen`,
    injury: `${uid}-injury`,
    injuryMask: `${uid}-injmask`,
    injuryFade: `${uid}-injfade`,
    lumen: `${uid}-lumen`,
  };

  return (
    <svg
      viewBox="0 0 360 520"
      role="img"
      aria-labelledby={`${uid}-t ${uid}-d`}
      className="h-auto w-full"
    >
      <title id={`${uid}-t`}>Esophagus: from healthy wall to fibrotic stricture</title>
      <desc id={`${uid}-d`}>
        A longitudinal cutaway of the esophagus. The upper segment shows a healthy wall with an open
        lumen. The middle segment shows chemical injury to the lining with inflammation. The lower
        segment shows dense scar tissue growing inward and narrowing the lumen.
      </desc>
      <defs>
        <linearGradient id={ids.fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.09" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.92" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={ids.mask}>
          <rect width="360" height="520" fill={`url(#${ids.fade})`} />
        </mask>
        <linearGradient id={ids.lumen} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E9F1F5" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E9F1F5" />
        </linearGradient>
        <mask id={ids.injuryMask} maskUnits="userSpaceOnUse" x="100" y="170" width="60" height="190">
          <rect x="100" y="170" width="60" height="190" fill={`url(#${ids.injuryFade})`} />
        </mask>
        <linearGradient id={ids.injuryFade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.injury} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D9A441" stopOpacity="0.55" />
          <stop offset="1" stopColor="#B4533F" stopOpacity="0.9" />
        </linearGradient>
        <pattern
          id={ids.collagen}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(32)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="#6F5A47" strokeWidth="1.6" opacity="0.55" />
        </pattern>
      </defs>

      <g mask={`url(#${ids.mask})`}>
        <rect x="140" y="0" width="80" height="520" fill={`url(#${ids.lumen})`} />

        <WallLayers />
        <g transform="translate(360 0) scale(-1 1)">
          <WallLayers />
        </g>

        {[false, true].map((mirrored) => (
          <g key={String(mirrored)} transform={mirrored ? "translate(360 0) scale(-1 1)" : undefined}>
            {/* Chemical injury: eroded lining with inflammation */}
            <g opacity={injuryOpacity}>
              <rect
                x="116"
                y="180"
                width="24"
                height="170"
                fill={`url(#${ids.injury})`}
                mask={`url(#${ids.injuryMask})`}
              />
              <path
                d="M140,196 L147,208 L139,223 L148,241 L140,259 L149,277 L141,295 L148,311 L140,326 Z"
                fill="#A94A39"
                opacity="0.9"
              />
            </g>

            {/* Fibrosis: scar grows inward from the wall */}
            {fraction > 0 ? (
              <g>
                <path d={scarShape} fill="#B8A38E" />
                <path d={scarShape} fill={`url(#${ids.collagen})`} />
                <path d={scarEdge} fill="none" stroke="#7C6650" strokeWidth="1.5" />
              </g>
            ) : null}
          </g>
        ))}

        {/* Illustrative bolus used by the "trace passage" control */}
        {beadY !== null ? (
          <g>
            <circle cx="180" cy={beadY} r={BEAD_RADIUS} fill="#0B7A78" opacity="0.95" />
            <circle cx="175" cy={beadY - 4} r="4" fill="#fff" opacity="0.45" />
          </g>
        ) : null}
      </g>

      {STAGE_MARKER_Y.map((y, index) => {
        const active = activeStage === index;
        return (
          <g
            key={y}
            aria-hidden="true"
            onClick={() => onSelectStage(index)}
            className="cursor-pointer"
          >
            <rect x="254" y={y - 24} width="80" height="48" fill="transparent" />
            <line
              x1="264"
              x2={active ? 292 : 298}
              y1={y}
              y2={y}
              stroke={active ? "#0B7A78" : "#153E5C"}
              strokeWidth={active ? 2.5 : 1.5}
              strokeDasharray="3 3"
            />
            <circle cx="264" cy={y} r="3.5" fill={active ? "#0B7A78" : "#153E5C"} />
            <circle
              cx="316"
              cy={y}
              r={active ? 21 : 17}
              fill={active ? "#0B7A78" : "#102A43"}
              style={{ transition: "r 0.25s, fill 0.25s" }}
            />
            <text
              x="316"
              y={y + 6}
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill="#fff"
              fontFamily="var(--font-display), sans-serif"
            >
              {index + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Clinical need: cross-sections                                               */
/* -------------------------------------------------------------------------- */

export type CompareRegion = "wall" | "tissue" | "lumen" | "flow";

interface CrossSectionProps {
  variant: "healthy" | "stricture";
  region?: CompareRegion | null;
  onRegionHover?: (region: CompareRegion | null) => void;
}

function Particles({
  cx,
  cy,
  count,
  maxRadius,
  size,
  duration,
  color,
}: {
  cx: number;
  cy: number;
  count: number;
  maxRadius: number;
  size: number;
  duration: number;
  color: string;
}) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (i % 2) * 0.35;
        const reach = maxRadius * (0.55 + ((i * 37) % 45) / 100);
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={size}
            fill={color}
            className="particle"
            style={
              {
                "--dx": `${(Math.cos(angle) * reach).toFixed(1)}px`,
                "--dy": `${(Math.sin(angle) * reach).toFixed(1)}px`,
                "--dur": `${duration}s`,
                "--delay": `${((i * duration) / count).toFixed(2)}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </g>
  );
}

export function CrossSection({ variant, region = null, onRegionHover }: CrossSectionProps) {
  const uid = useId().replace(/:/g, "");
  const healthy = variant === "healthy";
  const cx = 112;
  const cy = 130;
  const lumenOpen = scallop(cx, cy, 40, 3.5, 7);
  const lumenClosed = scallop(cx, cy, 11, 2, 5);
  const title = healthy
    ? "Cross-section of a healthy esophagus"
    : "Cross-section of a caustic esophageal stricture";
  const desc = healthy
    ? "Layered esophageal wall surrounding a wide, open lumen."
    : "Thickened, dense fibrotic wall surrounding a very narrow lumen.";

  const labels: { text: string; y: number; tx: number; region: CompareRegion }[] = healthy
    ? [
        { text: "Open lumen", y: 130, tx: cx + 22, region: "lumen" },
        { text: "Mucosa", y: 70, tx: cx + 40, region: "tissue" },
        { text: "Muscular wall", y: 38, tx: cx + 70, region: "wall" },
      ]
    : [
        { text: "Narrowed lumen", y: 130, tx: cx + 10, region: "lumen" },
        { text: "Dense fibrotic tissue", y: 82, tx: cx + 52, region: "tissue" },
        { text: "Muscular wall", y: 38, tx: cx + 70, region: "wall" },
      ];

  const dim = (own: CompareRegion) => {
    if (region === null) return 1;
    const related = own === "lumen" ? region === "lumen" || region === "flow" : region === own;
    return related ? 1 : 0.22;
  };
  const fade = { transition: "opacity 0.35s ease" };
  const tissueRadius = healthy ? 78 : 86;
  const ringFor = (own: CompareRegion) => region === own;

  return (
    <svg
      viewBox="0 0 410 260"
      role="img"
      aria-labelledby={`${uid}-t ${uid}-d`}
      className="h-auto w-full"
    >
      <title id={`${uid}-t`}>{title}</title>
      <desc id={`${uid}-d`}>{desc}</desc>
      <defs>
        <pattern
          id={`${uid}-fib`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke="#6F5A47" strokeWidth="1.5" opacity="0.5" />
        </pattern>
      </defs>

      <g
        style={{ ...fade, opacity: dim("wall") }}
        onMouseEnter={() => onRegionHover?.("wall")}
        onMouseLeave={() => onRegionHover?.(null)}
      >
        <circle cx={cx} cy={cy} r="100" fill="#BFD5E1" />
        <circle cx={cx} cy={cy} r="100" fill="none" stroke="#98B7C8" strokeWidth="1" />
        {[93, 87].map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#A5C0CF"
            strokeWidth="0.8"
            strokeDasharray="2 5"
          />
        ))}
      </g>

      {healthy ? (
        <>
          <g
            style={{ ...fade, opacity: dim("tissue") }}
            onMouseEnter={() => onRegionHover?.("tissue")}
            onMouseLeave={() => onRegionHover?.(null)}
          >
            <circle cx={cx} cy={cy} r="78" fill="#E0EBF1" />
            <circle cx={cx} cy={cy} r="62" fill="#F0CEC7" />
            <circle cx={cx} cy={cy} r="62" fill="none" stroke="#C98F85" strokeWidth="1.5" />
          </g>
          <g
            style={{ ...fade, opacity: dim("lumen") }}
            onMouseEnter={() => onRegionHover?.("lumen")}
            onMouseLeave={() => onRegionHover?.(null)}
          >
            <g className="breathe">
              <motion.path
                d={lumenOpen}
                fill="#FFFFFF"
                stroke="#C98F85"
                strokeWidth="1.5"
                initial={{ scale: 0.35 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: EASE }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            </g>
            <Particles
              cx={cx}
              cy={cy}
              count={region === "flow" ? 16 : 11}
              maxRadius={32}
              size={region === "flow" ? 3.4 : 2.6}
              duration={2.6}
              color="#149E9A"
            />
          </g>
        </>
      ) : (
        <>
          <g
            style={{ ...fade, opacity: dim("tissue") }}
            onMouseEnter={() => onRegionHover?.("tissue")}
            onMouseLeave={() => onRegionHover?.(null)}
          >
            <circle cx={cx} cy={cy} r="86" fill="#B8A38E" />
            <circle cx={cx} cy={cy} r="86" fill={`url(#${uid}-fib)`} />
            <circle cx={cx} cy={cy} r="86" fill="none" stroke="#7C6650" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="30" fill="#9A8570" opacity="0.6" />
          </g>
          <g
            style={{ ...fade, opacity: dim("lumen") }}
            onMouseEnter={() => onRegionHover?.("lumen")}
            onMouseLeave={() => onRegionHover?.(null)}
          >
            <motion.path
              d={lumenClosed}
              fill="#FFFFFF"
              stroke="#7C6650"
              strokeWidth="1.5"
              initial={{ scale: 3.4 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: EASE }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <Particles
              cx={cx}
              cy={cy}
              count={region === "flow" ? 7 : 4}
              maxRadius={6}
              size={region === "flow" ? 2.2 : 1.7}
              duration={5.2}
              color="#8A5A12"
            />
          </g>
        </>
      )}

      {/* Selection outlines for the linked-highlight feature */}
      <circle
        cx={cx}
        cy={cy}
        r="104"
        fill="none"
        stroke="#0B7A78"
        strokeWidth="2.5"
        strokeDasharray="6 5"
        style={{ ...fade, opacity: ringFor("wall") ? 1 : 0 }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={tissueRadius + 3}
        fill="none"
        stroke="#0B7A78"
        strokeWidth="2.5"
        strokeDasharray="6 5"
        style={{ ...fade, opacity: ringFor("tissue") ? 1 : 0 }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={healthy ? 46 : 17}
        fill="none"
        stroke="#0B7A78"
        strokeWidth="2.5"
        strokeDasharray="6 5"
        style={{ ...fade, opacity: ringFor("lumen") || ringFor("flow") ? 1 : 0 }}
      />

      {labels.map((label) => (
        <g
          key={label.text}
          className="cursor-pointer"
          style={{ ...fade, opacity: region === null || region === label.region || (label.region === "lumen" && region === "flow") ? 1 : 0.35 }}
          onMouseEnter={() => onRegionHover?.(label.region)}
          onMouseLeave={() => onRegionHover?.(null)}
        >
          <rect x={label.tx - 4} y={label.y - 12} width={400 - label.tx} height="24" fill="transparent" />
          <line
            x1={label.tx}
            y1={label.y}
            x2={252}
            y2={label.y}
            stroke="#153E5C"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <circle cx={label.tx} cy={label.y} r="3.2" fill="#153E5C" />
          <text
            x="258"
            y={label.y + 4.5}
            fontSize="13"
            fontWeight="600"
            fill="#243746"
            fontFamily="var(--font-sans), sans-serif"
          >
            {label.text}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Therapeutic asset: schematic molecule motif                                 */
/* -------------------------------------------------------------------------- */

export function MoleculeMotif() {
  const uid = useId().replace(/:/g, "");
  const rings: { cx: number; cy: number; r: number; rot: number }[] = [
    { cx: 120, cy: 150, r: 34, rot: 0 },
    { cx: 120 + 34 * 1.732, cy: 150 + 0, r: 34, rot: 0 },
    { cx: 300, cy: 150 + 3, r: 34, rot: 0 },
    { cx: 300 + 34 * 1.732, cy: 150 + 3 - 51, r: 30, rot: 0 },
  ];

  const bonds: [number, number, number, number][] = [
    [rings[1].cx + 34 * 0.866, rings[1].cy, rings[2].cx - 34 * 0.866, rings[2].cy],
    [rings[0].cx, rings[0].cy + 34, rings[0].cx - 10, rings[0].cy + 80],
    [rings[2].cx + 34 * 0.5, rings[2].cy - 34 * 0.866, rings[3].cx - 30 * 0.866, rings[3].cy + 15],
  ];

  return (
    <svg
      viewBox="0 0 460 300"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#47C7D3" stopOpacity="0.28" />
          <stop offset="1" stopColor="#47C7D3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="460" height="300" fill={`url(#${uid}-glow)`} />

      {bonds.map((b, i) => (
        <motion.line
          key={i}
          x1={b[0]}
          y1={b[1]}
          x2={b[2]}
          y2={b[3]}
          stroke="#47C7D3"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 + i * 0.2, ease: EASE }}
        />
      ))}

      {rings.map((ring, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <polygon
            points={hexagon(ring.cx, ring.cy, ring.r, Math.PI / 6)}
            fill="rgba(71,199,211,0.10)"
            stroke="#47C7D3"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points={hexagon(ring.cx, ring.cy, ring.r * 0.55, Math.PI / 6)}
            fill="none"
            stroke="#47C7D3"
            strokeWidth="1.2"
            opacity="0.55"
          />
        </motion.g>
      ))}

      {[
        [rings[0].cx - 10, rings[0].cy + 80],
        [rings[3].cx + 30 * 0.866 + 4, rings[3].cy - 14],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="#EAF7F7" stroke="#47C7D3" strokeWidth="2.5" />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Brand mark                                                                  */
/* -------------------------------------------------------------------------- */

export function EsoClearMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <rect width="32" height="32" rx="9" fill="#102A43" />
      <path
        d="M9 5 C9 11 13 13 13 16 C13 19 9 21 9 27 M23 5 C23 11 19 13 19 16 C19 19 23 21 23 27"
        fill="none"
        stroke="#47C7D3"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
