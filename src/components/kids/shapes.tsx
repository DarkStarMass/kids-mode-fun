import type { ShapeName } from "@/lib/kids/types";

const STROKE = 3.2;

export function ShapeSvg({
  name,
  className,
}: {
  name: ShapeName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {name === "circle" && (
        <circle cx="50" cy="50" r="34" fill="currentColor" stroke="#1a1a1a" strokeWidth={STROKE} />
      )}
      {name === "square" && (
        <rect x="20" y="20" width="60" height="60" rx="4" fill="currentColor" stroke="#1a1a1a" strokeWidth={STROKE} />
      )}
      {name === "triangle" && (
        <polygon points="50,18 86,82 14,82" fill="currentColor" stroke="#1a1a1a" strokeWidth={STROKE} strokeLinejoin="round" />
      )}
      {name === "rectangle" && (
        <rect x="12" y="28" width="76" height="44" rx="4" fill="currentColor" stroke="#1a1a1a" strokeWidth={STROKE} />
      )}
      {name === "star" && (
        <polygon
          points="50,12 61,38 90,38 66,56 76,84 50,68 24,84 34,56 10,38 39,38"
          fill="currentColor"
          stroke="#1a1a1a"
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
      )}
      {name === "heart" && (
        <path
          d="M50 84 C24 64 12 48 12 32 C12 20 22 14 32 14 C40 14 46 18 50 26 C54 18 60 14 68 14 C78 14 88 20 88 32 C88 48 76 64 50 84 Z"
          fill="currentColor"
          stroke="#1a1a1a"
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
      )}
      {name === "diamond" && (
        <polygon points="50,10 90,50 50,90 10,50" fill="currentColor" stroke="#1a1a1a" strokeWidth={STROKE} strokeLinejoin="round" />
      )}
      {name === "house" && (
        <g>
          <polygon points="50,12 90,46 10,46" fill="currentColor" stroke="#1a1a1a" strokeWidth={STROKE} strokeLinejoin="round" />
          <rect x="22" y="44" width="56" height="40" fill="currentColor" stroke="#1a1a1a" strokeWidth={STROKE} />
          <rect x="42" y="58" width="16" height="26" fill="#fffbf4" stroke="#1a1a1a" strokeWidth="2.4" />
        </g>
      )}
    </svg>
  );
}

export const BASIC_SHAPES: ShapeName[] = ["circle", "square", "triangle", "rectangle"];
export const ALL_SHAPES: ShapeName[] = [...BASIC_SHAPES, "star", "heart", "diamond", "house"];

export function shapesForLevel(level: number): ShapeName[] {
  return level >= 3 ? ALL_SHAPES : BASIC_SHAPES;
}
