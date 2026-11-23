"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { hexagon } from "./ScientificDiagram";

export type TissueMode = "without" | "with";

/**
 * Visual parameters (0 to 1) for each pathway step. They drive a conceptual
 * schematic only; they are not measurements.
 */
interface TissueState {
  injury: number; // lining damage
  inflammation: number; // inflammatory cells
  narrowing: number; // lumen narrowing from matrix build-up
  collagen: number; // collagen fibres in the matrix
  activation: number; // fibroblast / myofibroblast activation
  pai1: number; // PAI-1 present
  bound: number; // PAI-1 bound by inhibitor
  inhibitorFree: number; // free PAI-039 molecules
  plasmin: number; // plasmin generation
  blocked: number; // plasminogen activation blocked by PAI-1
  pathTint: number;
  tealTint: number;
}

const BASE: TissueState = {
  injury: 0.5,
  inflammation: 0,
  narrowing: 0,
  collagen: 0.2,
  activation: 0,
  pai1: 0.2,
  bound: 0,
  inhibitorFree: 0,
  plasmin: 0.75,
  blocked: 0,
  pathTint: 0,
  tealTint: 0,
};

const STATES: Record<TissueMode, TissueState[]> = {
  without: [
    BASE,
    { ...BASE, injury: 1, inflammation: 1, narrowing: 0.05, activation: 0.1, pai1: 1, pathTint: 0.2 },
    { ...BASE, injury: 0.9, inflammation: 0.9, narrowing: 0.1, collagen: 0.25, activation: 0.2, pai1: 1, plasmin: 0, blocked: 1, pathTint: 0.3 },
    { ...BASE, injury: 0.8, inflammation: 0.7, narrowing: 0.25, collagen: 0.5, activation: 0.4, pai1: 1, plasmin: 0, blocked: 1, pathTint: 0.5 },
    { ...BASE, injury: 0.8, inflammation: 0.6, narrowing: 0.55, collagen: 0.8, activation: 1, pai1: 1, plasmin: 0, blocked: 0.7, pathTint: 0.75 },
    { ...BASE, injury: 0.7, inflammation: 0.4, narrowing: 1, collagen: 1, activation: 1, pai1: 1, plasmin: 0, blocked: 0.5, pathTint: 1 },
  ],
  with: [
    BASE,
    { ...BASE, injury: 0.6, inflammation: 0.4, pai1: 0.6, inhibitorFree: 1, plasmin: 0.5, tealTint: 0.1 },
    { ...BASE, injury: 0.6, inflammation: 0.4, narrowing: 0.05, activation: 0.1, pai1: 0.8, bound: 1, inhibitorFree: 0.3, plasmin: 0.5, tealTint: 0.25 },
    { ...BASE, injury: 0.4, inflammation: 0.2, narrowing: 0.05, activation: 0.1, pai1: 0.8, bound: 1, plasmin: 1, tealTint: 0.45 },
    { ...BASE, injury: 0.3, inflammation: 0.1, narrowing: 0.05, collagen: 0.15, pai1: 0.8, bound: 1, plasmin: 1, tealTint: 0.6 },
    { ...BASE, injury: 0.1, narrowing: 0, collagen: 0.12, pai1: 0.8, bound: 1, plasmin: 1, tealTint: 0.8 },
  ],
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function mix(from: string, to: string, t: number) {
  const parse = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const a = parse(from);
  const b = parse(to);
  const k = clamp01(t);
  return `#${a
    .map((v, i) => Math.round(v + (b[i] - v) * k).toString(16).padStart(2, "0"))
    .join("")}`;
}

const FIBRES = Array.from({ length: 15 }, (_, i) => ({
  x: 14 + i * 20.5,
  bend: i % 2 === 0 ? 14 : -14,
  rank: ((i * 7) % 15) / 15,
}));

const HEXAGONS = [
  { x: 40, y: 178 },
  { x: 120, y: 138 },
  { x: 200, y: 180 },
  { x: 282, y: 142 },
];

const PLASMIN = [
  { x: 82, y: 168, r: -20 },
  { x: 160, y: 132, r: 15 },
  { x: 240, y: 172, r: -10 },
  { x: 20, y: 140, r: 25 },
  { x: 300, y: 180, r: -25 },
];

const FREE_INHIBITORS = [
  { x: 60, y: 28 },
  { x: 140, y: 40 },
  { x: 232, y: 26 },
  { x: 288, y: 42 },
];

const INFLAMMATORY = [28, 74, 118, 168, 214, 262, 300].map((x, i) => ({ x, row: i % 2 }));

const transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

interface TissueSchematicProps {
  mode: TissueMode;
  step: number;
  description: string;
}

export function TissueSchematic({ mode, step, description }: TissueSchematicProps) {
  const uid = useId().replace(/:/g, "");
  const list = STATES[mode];
  const s = list[Math.min(step, list.length - 1)];
  const epiY = 56 + s.narrowing * 62;
  const boundNow = s.bound > 0.5;

  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-labelledby={`${uid}-t ${uid}-d`}
      className="h-auto w-full"
    >
      <title id={`${uid}-t`}>
        {`Tissue-level schematic, step ${step + 1}, ${mode === "with" ? "with" : "without"} PAI-1 inhibition`}
      </title>
      <desc id={`${uid}-d`}>{description}</desc>

      <rect x="0" y="0" width="320" height="240" rx="14" fill="#F4F7FA" />
      <motion.rect
        x="0"
        y="0"
        width="320"
        height="240"
        rx="14"
        fill="#F8ECE8"
        initial={false}
        animate={{ opacity: s.pathTint }}
        transition={transition}
      />
      <motion.rect
        x="0"
        y="0"
        width="320"
        height="240"
        rx="14"
        fill="#EAF7F7"
        initial={false}
        animate={{ opacity: s.tealTint }}
        transition={transition}
      />

      {/* Lumen */}
      <motion.rect
        x="0"
        y="0"
        width="320"
        fill="#FFFFFF"
        initial={false}
        animate={{ height: epiY - 6 }}
        transition={transition}
      />
      <text x="10" y="18" fontSize="9.5" fontWeight="700" fill="#64748B" letterSpacing="0.6">
        LUMEN
      </text>

      {/* Subepithelial matrix */}
      <motion.rect
        x="0"
        width="320"
        initial={false}
        animate={{
          y: epiY - 6,
          height: 206 - epiY,
          fill: mix("#E4EEF2", "#E7D3C5", s.collagen),
        }}
        transition={transition}
      />

      {/* Collagen fibres */}
      {FIBRES.map((fibre) => {
        const present = clamp01((s.collagen - fibre.rank * 0.85) / 0.15);
        const top = epiY + 6;
        return (
          <motion.path
            key={fibre.x}
            fill="none"
            strokeLinecap="round"
            initial={false}
            animate={{
              d: `M${fibre.x},${top} C${fibre.x + fibre.bend},${top + 30} ${fibre.x - fibre.bend},${top + 60} ${fibre.x},196`,
              opacity: present * 0.9,
              strokeWidth: 1.6 + s.collagen * 1.8,
              stroke: mix("#6FA3A6", "#7C6650", s.collagen + (mode === "without" ? 0.2 : 0)),
            }}
            transition={transition}
          />
        );
      })}

      {/* Epithelium (lining) */}
      <motion.rect
        x="0"
        width="320"
        height="12"
        initial={false}
        animate={{ y: epiY - 12, fill: mix("#E8B9B0", "#B5483A", s.injury) }}
        transition={transition}
      />
      <motion.path
        fill="#B5483A"
        initial={false}
        animate={{
          d: `M0,${epiY - 12} ${Array.from({ length: 16 }, (_, i) => `L${i * 20 + 10},${epiY - 12 - 7 * ((i % 2) + 0.4)} L${i * 20 + 20},${epiY - 12}`).join(" ")} Z`,
          opacity: clamp01((s.injury - 0.35) / 0.4),
        }}
        transition={transition}
      />

      {/* Muscular layer */}
      <rect x="0" y="200" width="320" height="40" fill="#BFD5E1" />
      <rect x="0" y="200" width="320" height="2" fill="#98B7C8" />
      <text x="10" y="222" fontSize="9.5" fontWeight="700" fill="#3C5A70" letterSpacing="0.6">
        MUSCULAR LAYER
      </text>

      {/* Inflammatory cells */}
      {INFLAMMATORY.map((cell) => (
        <motion.circle
          key={cell.x}
          cx={cell.x}
          r="3.6"
          fill="#D9A441"
          stroke="#8A5A12"
          strokeWidth="1"
          initial={false}
          animate={{ cy: epiY + 10 + cell.row * 14, opacity: s.inflammation }}
          transition={transition}
        />
      ))}

      {/* Fibroblasts */}
      {[60, 150, 240].map((x, i) => {
        const cy = 152 + (i % 2) * 12;
        return (
          <motion.ellipse
            key={x}
            cx={x}
            cy={cy}
            ry="5.5"
            initial={false}
            animate={{
              rx: 12 + s.activation * 4,
              fill: mix("#9CC9CC", "#B4533F", s.activation),
            }}
            transition={transition}
            transform={`rotate(${i % 2 === 0 ? -12 : 10} ${x} ${cy})`}
          />
        );
      })}

      {/* Plasmin */}
      {PLASMIN.map((p, i) => (
        <motion.rect
          key={i}
          x={p.x - 6}
          y={p.y - 3}
          width="12"
          height="6"
          rx="3"
          fill="#3B82C4"
          stroke="#FFFFFF"
          strokeWidth="1"
          transform={`rotate(${p.r} ${p.x} ${p.y})`}
          initial={false}
          animate={{ opacity: s.plasmin }}
          transition={transition}
        />
      ))}

      {/* PAI-1 (hexagons), blocked-activation marks, and bound inhibitor */}
      {HEXAGONS.map((p, i) => (
        <g key={i}>
          <motion.polygon
            points={hexagon(p.x, p.y, 9, Math.PI / 6)}
            strokeWidth="1.5"
            strokeDasharray={boundNow ? "3 2" : undefined}
            initial={false}
            animate={{
              opacity: s.pai1,
              fill: boundNow ? "#FFFFFF" : "#9A3B2E",
              stroke: boundNow ? "#64748B" : "#6E2A20",
            }}
            transition={transition}
          />
          <motion.g
            transform={`translate(${p.x + 18} ${p.y + 4})`}
            initial={false}
            animate={{ opacity: s.blocked }}
            transition={transition}
          >
            <path d="M-4,-4 L4,4 M-4,4 L4,-4" stroke="#9A3B2E" strokeWidth="2.2" strokeLinecap="round" />
          </motion.g>
          <motion.circle
            cx={p.x + 13}
            cy={p.y - 10}
            r="6.5"
            fill="#0B7A78"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            initial={false}
            animate={{ opacity: s.bound, scale: 0.3 + s.bound * 0.7 }}
            transition={transition}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>
      ))}

      {/* Free PAI-039 molecules */}
      {FREE_INHIBITORS.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="6.5"
          fill="#0B7A78"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          initial={false}
          animate={{ opacity: s.inhibitorFree, scale: 0.3 + s.inhibitorFree * 0.7 }}
          transition={transition}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}
