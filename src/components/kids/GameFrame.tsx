import { ArrowLeft, Volume2 } from "lucide-react";
import type { ReactNode } from "react";
import { STRINGS } from "@/lib/kids/i18n";
import { useKidsStore } from "@/lib/kids/store";
import { cn } from "@/lib/utils";
import { KidsButton } from "./KidsButton";

export function GameFrame({
  title,
  score,
  level,
  extra,
  onBack,
  onListen,
  children,
  footer,
}: {
  title: string;
  score: number;
  level: number;
  extra?: ReactNode;
  onBack: () => void;
  onListen?: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const lang = useKidsStore((s) => s.lang);
  const t = STRINGS[lang];

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex items-center gap-2 px-3 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <KidsButton variant="ghost" onPress={onBack} aria-label={t.back} className="size-12 shrink-0 rounded-xl px-0">
          <ArrowLeft className="size-6" strokeWidth={2.4} />
        </KidsButton>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold leading-tight">{title}</p>
          <p className="text-sm font-bold tabular-nums text-muted">
            {t.level} {level}
            <span className="mx-2 text-border">·</span>
            {t.score} {score}
          </p>
        </div>
        {onListen ? (
          <KidsButton
            variant="ghost"
            className="size-12 shrink-0 rounded-xl px-0"
            aria-label={t.listen}
            onPress={onListen}
          >
            <Volume2 className="size-5" strokeWidth={2.4} />
          </KidsButton>
        ) : null}
      </header>
      {extra}
      <div className="flex flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
      {footer}
    </div>
  );
}

export function FeedbackBanner({
  kind,
  text,
}: {
  kind: "idle" | "ok" | "no" | "level";
  text: string;
}) {
  if (kind === "idle") return <div className="h-12" />;
  return (
    <div
      className={cn(
        "mx-auto mb-2 flex h-12 items-center justify-center rounded-xl px-4 text-base font-extrabold",
        kind === "ok" && "bg-success text-accent-fg",
        kind === "level" && "bg-accent text-accent-fg",
        kind === "no" && "bg-error text-accent-fg",
      )}
      role="status"
    >
      {text}
    </div>
  );
}
