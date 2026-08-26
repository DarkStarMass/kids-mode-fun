export type Lang = "de" | "en" | "fr" | "it";

export type ColorSchema =
  | "default"
  | "protanomaly"
  | "protanopia"
  | "deuteranomaly"
  | "deuteranopia"
  | "tritanomaly"
  | "tritanopia"
  | "high-contrast";

export type GameId = "numbers" | "shapes" | "colors" | "memory" | "bunny";

export type ShapeName =
  | "circle"
  | "square"
  | "triangle"
  | "rectangle"
  | "star"
  | "heart"
  | "diamond"
  | "house";

export type ColorId =
  | "red"
  | "yellow"
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "pink"
  | "brown"
  | "gray"
  | "teal";

export type GameProgress = {
  level: number;
  score: number;
  best: number;
};

export function pickAvoiding<T>(
  pool: readonly T[],
  recent: readonly T[],
  eq: (a: T, b: T) => boolean = Object.is,
): T {
  const fresh = pool.filter((p) => !recent.some((r) => eq(p, r)));
  const src = fresh.length ? fresh : pool;
  return src[Math.floor(Math.random() * src.length)]!;
}

export function shuffle<T>(list: readonly T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

export function optionSet<T>(
  target: T,
  pool: readonly T[],
  count: number,
  eq: (a: T, b: T) => boolean = Object.is,
): T[] {
  const opts: T[] = [target];
  const n = Math.min(count, pool.length);
  while (opts.length < n) {
    const r = pool[Math.floor(Math.random() * pool.length)]!;
    if (!opts.some((x) => eq(x, r))) opts.push(r);
  }
  return shuffle(opts);
}

export function starsFromLevel(level: number): number {
  return Math.max(0, Math.min(3, level - 1));
}
