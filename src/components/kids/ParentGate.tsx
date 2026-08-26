import { useEffect, useMemo, useState } from "react";
import { STRINGS } from "@/lib/kids/i18n";
import { useKidsStore } from "@/lib/kids/store";
import { KidsButton } from "./KidsButton";

function makeSum() {
  const a = 2 + Math.floor(Math.random() * 8);
  const b = 2 + Math.floor(Math.random() * 8);
  return { a, b, answer: a + b };
}

const PAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0"] as const;

export function ParentGate({
  onPass,
  onClose,
}: {
  onPass: () => void;
  onClose: () => void;
}) {
  const lang = useKidsStore((s) => s.lang);
  const t = STRINGS[lang];
  const puzzle = useMemo(makeSum, []);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const check = (next: string) => {
    const expected = String(puzzle.answer);
    if (next.length < expected.length) {
      setValue(next);
      return;
    }
    if (Number(next) === puzzle.answer) {
      onPass();
      return;
    }
    setError(true);
    setValue("");
  };

  const press = (key: (typeof PAD)[number]) => {
    setError(false);
    if (key === "⌫") {
      setValue((v) => v.slice(0, -1));
      return;
    }
    if (value.length >= 3) return;
    check(value + key);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        press("⌫");
        return;
      }
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        press(e.key as (typeof PAD)[number]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // press closes over value; rebind when digits change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, puzzle.answer, onClose, onPass]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-fg/40 p-4 sm:items-center">
      <div
        role="dialog"
        aria-labelledby="parent-gate-title"
        className="w-full max-w-md rounded-2xl bg-elevated p-5 shadow-[var(--shadow-border)]"
      >
        <h2 id="parent-gate-title" className="font-display text-2xl font-semibold">
          {t.parentGateTitle}
        </h2>
        <p className="mt-1 text-sm font-semibold text-muted">{t.parentGateHint}</p>
        <p
          className="mt-5 font-display text-4xl font-semibold tabular-nums"
          aria-live="polite"
        >
          {puzzle.a} + {puzzle.b} = {value || "?"}
        </p>
        {error ? <p className="mt-2 text-sm font-bold text-error">{t.parentGateError}</p> : null}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {PAD.map((key) => (
            <KidsButton
              key={key}
              variant="ghost"
              className="min-h-14 text-xl font-extrabold tabular-nums"
              onPress={() => press(key)}
              aria-label={key === "⌫" ? t.back : key}
            >
              {key}
            </KidsButton>
          ))}
        </div>
        <KidsButton variant="ghost" className="mt-3 w-full" onPress={onClose}>
          {t.close}
        </KidsButton>
      </div>
    </div>
  );
}
