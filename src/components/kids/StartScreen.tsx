import { Hash, LayoutGrid, Palette, Rabbit, Shapes } from "lucide-react";
import { STRINGS } from "@/lib/kids/i18n";
import { useKidsStore } from "@/lib/kids/store";

const PEEK = [
  { Icon: Hash, labelKey: "numbers" as const },
  { Icon: Shapes, labelKey: "shapes" as const },
  { Icon: Palette, labelKey: "colors" as const },
  { Icon: LayoutGrid, labelKey: "memory" as const },
  { Icon: Rabbit, labelKey: "bunny" as const },
];

export function StartScreen({ onStart }: { onStart: () => void }) {
  const lang = useKidsStore((s) => s.lang);
  const t = STRINGS[lang];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onStart}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onStart();
        }
      }}
      className="flex min-h-dvh w-full cursor-pointer select-none flex-col items-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-center touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      aria-label={t.tapToStart}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="stagger-item mb-6 flex size-24 items-center justify-center rounded-2xl bg-tile">
          <LogoMark />
        </div>
        <p
          className="stagger-item text-xs font-extrabold uppercase tracking-[0.18em] text-muted"
          style={{ animationDelay: "40ms" }}
        >
          {t.brand}
        </p>
        <h1
          className="stagger-item mt-2 font-display text-4xl font-semibold tracking-tight text-fg"
          style={{ animationDelay: "80ms" }}
        >
          {t.appName}
        </h1>
        <p
          className="stagger-item mt-2 max-w-[18ch] text-base font-semibold leading-snug text-muted"
          style={{ animationDelay: "120ms" }}
        >
          {t.tagline}
        </p>

        <div
          className="stagger-item mt-8 flex items-center justify-center gap-2"
          style={{ animationDelay: "160ms" }}
        >
          {PEEK.map((item) => (
            <span
              key={item.labelKey}
              className="flex size-12 items-center justify-center rounded-xl bg-elevated text-accent shadow-[var(--shadow-border)]"
              aria-hidden="true"
            >
              <item.Icon className="size-5" strokeWidth={2.2} />
            </span>
          ))}
        </div>

        <span
          className="stagger-item mt-10 inline-flex min-h-14 items-center justify-center rounded-2xl bg-accent px-8 text-lg font-bold text-accent-fg shadow-[var(--shadow-border)]"
          style={{ animationDelay: "200ms" }}
        >
          {t.tapToStart}
        </span>
        <p
          className="stagger-item mt-4 max-w-[24ch] text-sm font-semibold leading-snug text-muted"
          style={{ animationDelay: "240ms" }}
        >
          {t.tapHint}
        </p>
        <p
          className="stagger-item mt-3 text-xs font-extrabold text-muted"
          style={{ animationDelay: "280ms" }}
        >
          {t.freeNoAds}
        </p>
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-14" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="currentColor" className="text-accent" />
      <polygon
        points="16,7 19.2,13.4 26.2,13.8 20.8,18.4 22.6,25.2 16,21.4 9.4,25.2 11.2,18.4 5.8,13.8 12.8,13.4"
        fill="var(--app-accent-fg)"
      />
    </svg>
  );
}
