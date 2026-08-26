import { Hash, Lock, Palette, Rabbit, Shapes, LayoutGrid, Star } from "lucide-react";
import type { GameId } from "@/lib/kids/types";
import { starsFromLevel } from "@/lib/kids/types";
import { STRINGS } from "@/lib/kids/i18n";
import { useKidsStore } from "@/lib/kids/store";
import { cn } from "@/lib/utils";
import { KidsButton } from "./KidsButton";

const GAMES: { id: GameId; Icon: typeof Hash }[] = [
  { id: "numbers", Icon: Hash },
  { id: "shapes", Icon: Shapes },
  { id: "colors", Icon: Palette },
  { id: "memory", Icon: LayoutGrid },
  { id: "bunny", Icon: Rabbit },
];

export function HomeHub({
  onOpenGame,
  onOpenParent,
}: {
  onOpenGame: (id: GameId) => void;
  onOpenParent: () => void;
}) {
  const lang = useKidsStore((s) => s.lang);
  const progress = useKidsStore((s) => s.progress);
  const t = STRINGS[lang];
  const copy: Record<GameId, { title: string; hint: string }> = {
    numbers: { title: t.games.numbers, hint: t.games.numbersHint },
    shapes: { title: t.games.shapes, hint: t.games.shapesHint },
    colors: { title: t.games.colors, hint: t.games.colorsHint },
    memory: { title: t.games.memory, hint: t.games.memoryHint },
    bunny: { title: t.games.bunny, hint: t.games.bunnyHint },
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <LogoMark />
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted">{t.brand}</p>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-none tracking-tight text-fg">{t.appName}</h1>
          <p className="mt-2 max-w-[18ch] text-base font-semibold leading-snug text-muted">{t.tagline}</p>
          <p className="mt-3 inline-flex rounded-full bg-tile px-3 py-1 text-xs font-extrabold text-accent">{t.freeNoAds}</p>
        </div>
        <KidsButton
          variant="ghost"
          className="size-12 shrink-0 rounded-xl px-0"
          aria-label={t.parent}
          onPress={onOpenParent}
        >
          <Lock className="size-5" strokeWidth={2.4} />
        </KidsButton>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((g, i) => {
          const stars = starsFromLevel(progress[g.id].level);
          const item = copy[g.id];
          return (
            <KidsButton
              key={g.id}
              variant="tile"
              onPress={() => onOpenGame(g.id)}
              className={cn(
                "stagger-item h-auto items-stretch rounded-2xl p-3.5",
                g.id === "bunny" ? "col-span-2 min-h-20" : "min-h-32",
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div
                className={cn(
                  "flex w-full gap-3",
                  g.id === "bunny" ? "flex-row items-center" : "flex-col items-start",
                )}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-tile text-accent">
                  <g.Icon className="size-6" strokeWidth={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold leading-tight">{item.title}</span>
                  <span className="mt-0.5 block text-xs font-semibold leading-snug text-muted">{item.hint}</span>
                  <span className="mt-2 flex gap-1" aria-label={`${t.stars}: ${stars}`}>
                    {[0, 1, 2].map((s) => (
                      <Star
                        key={s}
                        className={cn("size-3.5", s < stars ? "fill-accent text-accent" : "text-border")}
                        strokeWidth={2.2}
                      />
                    ))}
                  </span>
                </span>
              </div>
            </KidsButton>
          );
        })}
      </div>

      <p className="mt-auto pt-6 text-center text-xs font-bold tracking-wide text-muted">
        {t.brand} · {t.freeNoAds}
      </p>
    </div>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" className="text-accent" />
      <polygon points="16,7 19.2,13.4 26.2,13.8 20.8,18.4 22.6,25.2 16,21.4 9.4,25.2 11.2,18.4 5.8,13.8 12.8,13.4" fill="#f7f3ea" />
    </svg>
  );
}
