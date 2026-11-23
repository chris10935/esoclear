import {
  Activity,
  Baby,
  Ban,
  CircleCheck,
  Dna,
  Flame,
  FlaskConical,
  GraduationCap,
  Layers,
  Microscope,
  Pill,
  Recycle,
  Route,
  Shield,
  Shrink,
  Stethoscope,
  Target,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  activity: Activity,
  baby: Baby,
  ban: Ban,
  "circle-check": CircleCheck,
  dna: Dna,
  flame: Flame,
  "flask-conical": FlaskConical,
  "graduation-cap": GraduationCap,
  layers: Layers,
  microscope: Microscope,
  pill: Pill,
  recycle: Recycle,
  route: Route,
  shield: Shield,
  shrink: Shrink,
  stethoscope: Stethoscope,
  target: Target,
  "triangle-alert": TriangleAlert,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = icons[name] ?? Activity;
  return <Component aria-hidden="true" className={className} />;
}
