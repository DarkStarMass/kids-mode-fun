import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyPalette, PALETTES } from "./palettes";
import type { ColorSchema, GameId, GameProgress, Lang } from "./types";

const EMPTY_PROGRESS: Record<GameId, GameProgress> = {
  numbers: { level: 1, score: 0, best: 0 },
  shapes: { level: 1, score: 0, best: 0 },
  colors: { level: 1, score: 0, best: 0 },
  memory: { level: 1, score: 0, best: 0 },
  bunny: { level: 1, score: 0, best: 0 },
};

const LANGS: Lang[] = ["de", "en", "fr", "it"];
const PARENT_WINDOW_MS = 10 * 60 * 1000;

type KidsState = {
  hydrated: boolean;
  lang: Lang;
  schema: ColorSchema;
  ttsEnabled: boolean;
  soundEnabled: boolean;
  parentUntil: number;
  progress: Record<GameId, GameProgress>;
  setHydrated: () => void;
  setLang: (lang: Lang) => void;
  setSchema: (schema: ColorSchema) => void;
  setTts: (on: boolean) => void;
  setSound: (on: boolean) => void;
  unlockParent: () => void;
  recordScore: (game: GameId, delta: number, level?: number) => void;
  setLevel: (game: GameId, level: number) => void;
  resetProgress: () => void;
};

export const useKidsStore = create<KidsState>()(
  persist(
    (set) => ({
      hydrated: false,
      lang: "de",
      schema: "default",
      ttsEnabled: true,
      soundEnabled: true,
      parentUntil: 0,
      progress: EMPTY_PROGRESS,
      setHydrated: () => set({ hydrated: true }),
      setLang: (lang) => {
        if (typeof document !== "undefined") document.documentElement.lang = lang;
        set({ lang });
      },
      setSchema: (schema) => {
        applyPalette(schema);
        set({ schema });
      },
      setTts: (ttsEnabled) => set({ ttsEnabled }),
      setSound: (soundEnabled) => set({ soundEnabled }),
      unlockParent: () => set({ parentUntil: Date.now() + PARENT_WINDOW_MS }),
      recordScore: (game, delta, level) =>
        set((s) => {
          const cur = s.progress[game] ?? EMPTY_PROGRESS[game];
          const score = Math.max(0, cur.score + delta);
          const nextLevel = level ?? cur.level;
          return {
            progress: {
              ...s.progress,
              [game]: {
                level: nextLevel,
                score,
                best: Math.max(cur.best, score),
              },
            },
          };
        }),
      setLevel: (game, level) =>
        set((s) => ({
          progress: {
            ...s.progress,
            [game]: { ...(s.progress[game] ?? EMPTY_PROGRESS[game]), level: Math.max(1, level) },
          },
        })),
      resetProgress: () => set({ progress: EMPTY_PROGRESS }),
    }),
    {
      name: "kids-mode-fun-v1",
      skipHydration: true,
      partialize: (s) => ({
        lang: s.lang,
        schema: s.schema,
        ttsEnabled: s.ttsEnabled,
        soundEnabled: s.soundEnabled,
        parentUntil: s.parentUntil,
        progress: s.progress,
      }),
    },
  ),
);

function sanitizeProgress(raw: unknown): Record<GameId, GameProgress> {
  const src = raw && typeof raw === "object" ? (raw as Record<string, Partial<GameProgress>>) : {};
  const out = { ...EMPTY_PROGRESS };
  (Object.keys(EMPTY_PROGRESS) as GameId[]).forEach((id) => {
    const cur = src[id];
    out[id] = {
      level: Math.max(1, Number(cur?.level) || 1),
      score: Math.max(0, Number(cur?.score) || 0),
      best: Math.max(0, Number(cur?.best) || 0),
    };
  });
  return out;
}

export function rehydrateKids(): Promise<void> {
  const result = useKidsStore.persist.rehydrate();
  const finish = () => {
    const s = useKidsStore.getState();
    const lang: Lang = LANGS.includes(s.lang) ? s.lang : "de";
    const schema: ColorSchema = s.schema in PALETTES ? s.schema : "default";
    const progress = sanitizeProgress(s.progress);
    const parentUntil =
      typeof s.parentUntil === "number" && s.parentUntil > Date.now()
        ? Math.min(s.parentUntil, Date.now() + PARENT_WINDOW_MS)
        : 0;
    useKidsStore.setState({ lang, schema, progress, parentUntil });
    applyPalette(schema);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    useKidsStore.getState().setHydrated();
  };
  return Promise.resolve(result).then(finish).catch(finish);
}
