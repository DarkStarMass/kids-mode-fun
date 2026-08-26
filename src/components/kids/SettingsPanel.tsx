import { ArrowLeft } from "lucide-react";
import { LANGS, SCHEMA_ORDER, STRINGS } from "@/lib/kids/i18n";
import { PALETTES } from "@/lib/kids/palettes";
import { useKidsStore } from "@/lib/kids/store";
import { cn } from "@/lib/utils";
import { KidsButton } from "./KidsButton";

export function SettingsPanel({ onBack }: { onBack: () => void }) {
  const lang = useKidsStore((s) => s.lang);
  const schema = useKidsStore((s) => s.schema);
  const ttsEnabled = useKidsStore((s) => s.ttsEnabled);
  const soundEnabled = useKidsStore((s) => s.soundEnabled);
  const setLang = useKidsStore((s) => s.setLang);
  const setSchema = useKidsStore((s) => s.setSchema);
  const setTts = useKidsStore((s) => s.setTts);
  const setSound = useKidsStore((s) => s.setSound);
  const resetProgress = useKidsStore((s) => s.resetProgress);
  const t = STRINGS[lang];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col overflow-y-auto overscroll-y-contain px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center gap-2">
        <KidsButton variant="ghost" className="size-12 rounded-xl px-0" onPress={onBack} aria-label={t.back}>
          <ArrowLeft className="size-6" strokeWidth={2.4} />
        </KidsButton>
        <h1 className="font-display text-2xl font-semibold">{t.settings}</h1>
      </header>

      <section className="rounded-2xl bg-elevated p-4 shadow-[var(--shadow-border)]">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-muted">{t.language}</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {LANGS.map((l) => (
            <KidsButton
              key={l.id}
              variant={lang === l.id ? "primary" : "ghost"}
              onPress={() => setLang(l.id)}
            >
              {l.native}
            </KidsButton>
          ))}
        </div>
      </section>

      <section className="mt-3 rounded-2xl bg-elevated p-4 shadow-[var(--shadow-border)]">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-muted">{t.colorSchema}</h2>
        <p className="mt-1 text-sm font-semibold text-muted">{t.schemaHelp}</p>
        <div className="mt-3 grid gap-2">
          {SCHEMA_ORDER.map((id) => (
            <KidsButton
              key={id}
              variant="ghost"
              onPress={() => setSchema(id)}
              className={cn(
                "h-auto justify-start rounded-xl px-3 py-3",
                schema === id && "ring-2 ring-accent",
              )}
            >
              <span
                className="size-8 shrink-0 rounded-lg"
                style={{ background: PALETTES[id].accent }}
                aria-hidden
              />
              <span className="text-left text-sm font-extrabold leading-tight">{t.schemas[id]}</span>
            </KidsButton>
          ))}
        </div>
      </section>

      <section className="mt-3 rounded-2xl bg-elevated p-4 shadow-[var(--shadow-border)]">
        <ToggleRow label={t.tts} on={ttsEnabled} onToggle={() => setTts(!ttsEnabled)} />
        <div className="my-3 h-px bg-border" />
        <ToggleRow label={t.sound} on={soundEnabled} onToggle={() => setSound(!soundEnabled)} />
      </section>

      <section className="mt-3 rounded-2xl bg-elevated p-4 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-lg font-semibold">{t.parentIntro}</h2>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-muted">{t.parentBody}</p>
        <KidsButton
          variant="ghost"
          className="mt-4 w-full"
          onPress={() => {
            resetProgress();
          }}
        >
          {t.resetProgress}
        </KidsButton>
      </section>
    </div>
  );
}

function ToggleRow({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex min-h-12 w-full items-center justify-between gap-3 text-left"
    >
      <span className="font-extrabold">{label}</span>
      <span
        className={cn(
          "relative h-8 w-14 rounded-full transition-colors duration-150",
          on ? "bg-accent" : "bg-surface",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-6 rounded-full bg-elevated shadow-sm transition-transform duration-150",
            on ? "translate-x-7" : "translate-x-1",
          )}
        />
      </span>
    </button>
  );
}
