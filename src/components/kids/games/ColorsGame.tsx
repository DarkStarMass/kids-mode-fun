import { useCallback, useEffect, useRef, useState } from "react";
import { FeedbackBanner, GameFrame } from "@/components/kids/GameFrame";
import { KidsButton } from "@/components/kids/KidsButton";
import { STRINGS } from "@/lib/kids/i18n";
import { playError, playLevel, playSuccess, buzz } from "@/lib/kids/sfx";
import { useKidsStore } from "@/lib/kids/store";
import { speakTTS } from "@/lib/kids/tts";
import { optionSet, pickAvoiding, type ColorId } from "@/lib/kids/types";

type Feedback = "idle" | "ok" | "no" | "level";

type Swatch = {
  id: ColorId;
  hex: string;
  pattern: "solid" | "stripes" | "dots" | "diag" | "waves" | "grid";
};

const SWATCHES: Swatch[] = [
  { id: "red", hex: "#C44536", pattern: "stripes" },
  { id: "yellow", hex: "#E2B203", pattern: "dots" },
  { id: "blue", hex: "#2F6DB3", pattern: "waves" },
  { id: "green", hex: "#2F7D4A", pattern: "diag" },
  { id: "orange", hex: "#E07A2F", pattern: "grid" },
  { id: "purple", hex: "#6B4C9A", pattern: "stripes" },
  { id: "pink", hex: "#D46A8A", pattern: "dots" },
  { id: "teal", hex: "#2A9B8F", pattern: "waves" },
  { id: "brown", hex: "#8B5E3C", pattern: "diag" },
  { id: "gray", hex: "#6B7280", pattern: "grid" },
];

function poolForLevel(level: number): Swatch[] {
  if (level <= 1) return SWATCHES.slice(0, 3);
  if (level === 2) return SWATCHES.slice(0, 5);
  if (level === 3) return SWATCHES.slice(0, 8);
  return SWATCHES;
}

export function ColorsGame({ onBack }: { onBack: () => void }) {
  const lang = useKidsStore((s) => s.lang);
  const schema = useKidsStore((s) => s.schema);
  const ttsEnabled = useKidsStore((s) => s.ttsEnabled);
  const soundEnabled = useKidsStore((s) => s.soundEnabled);
  const saved = useKidsStore((s) => s.progress.colors);
  const recordScore = useKidsStore((s) => s.recordScore);
  const t = STRINGS[lang];
  const showPattern = schema !== "default";

  const [level, setLevel] = useState(saved.level);
  const [score, setScore] = useState(saved.score);
  const [current, setCurrent] = useState<Swatch>(SWATCHES[0]!);
  const [options, setOptions] = useState<Swatch[]>([SWATCHES[0]!]);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [message, setMessage] = useState("");
  const recent = useRef<ColorId[]>([]);
  const lock = useRef(false);

  const next = useCallback(
    (lvl: number) => {
      const pool = poolForLevel(lvl);
      const target = pickAvoiding(pool, pool.filter((s) => recent.current.includes(s.id)), (a, b) => a.id === b.id);
      recent.current = [...recent.current, target.id].slice(-4);
      setCurrent(target);
      setOptions(optionSet(target, pool, Math.min(4, pool.length), (a, b) => a.id === b.id));
      setFeedback("idle");
      setMessage("");
      speakTTS(`${t.whichColor} ${t.colorNames[target.id]}`, lang, ttsEnabled);
    },
    [lang, t, ttsEnabled],
  );

  useEffect(() => {
    next(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const check = (sel: ColorId) => {
    if (lock.current) return;
    if (sel === current.id) {
      lock.current = true;
      const nextScore = score + 1;
      let nextLevel = level;
      let kind: Feedback = "ok";
      let msg = t.correct;
      if (nextScore % 10 === 0) {
        nextLevel = level + 1;
        kind = "level";
        msg = `${t.levelUp} ${nextLevel}`;
        playLevel(soundEnabled);
        speakTTS(`${t.levelUp} ${nextLevel}`, lang, ttsEnabled);
      } else {
        playSuccess(soundEnabled);
        speakTTS(`${t.correct} ${t.colorNames[current.id]}`, lang, ttsEnabled);
      }
      buzz(12);
      setScore(nextScore);
      setLevel(nextLevel);
      recordScore("colors", 1, nextLevel);
      setFeedback(kind);
      setMessage(msg);
      window.setTimeout(() => {
        lock.current = false;
        next(nextLevel);
      }, 1400);
    } else {
      playError(soundEnabled);
      buzz(24);
      setFeedback("no");
      setMessage(t.wrong);
      speakTTS(`${t.wrong}. ${t.colorNames[current.id]}`, lang, ttsEnabled);
      window.setTimeout(() => setFeedback("idle"), 1400);
    }
  };

  return (
    <GameFrame
      title={t.games.colors}
      score={score}
      level={level}
      onBack={onBack}
      onListen={() => speakTTS(`${t.whichColor} ${t.colorNames[current.id]}`, lang, true)}
    >
      <p className="mb-2 text-center text-lg font-extrabold">{t.whichColor}</p>
      <div className="flex flex-1 items-center justify-center">
        <ColorBlob swatch={current} patterned={showPattern} label={showPattern ? t.colorNames[current.id] : undefined} />
      </div>
      <FeedbackBanner kind={feedback} text={message} />
      <div className="grid grid-cols-2 gap-3">
        {options.map((sw) => (
          <KidsButton key={sw.id} variant="choice" onPress={() => check(sw.id)} className="rounded-2xl">
            {t.colorNames[sw.id]}
          </KidsButton>
        ))}
      </div>
    </GameFrame>
  );
}

function ColorBlob({
  swatch,
  patterned,
  label,
}: {
  swatch: Swatch;
  patterned: boolean;
  label?: string;
}) {
  return (
    <div
      className="relative flex size-44 items-center justify-center overflow-hidden rounded-full shadow-[var(--shadow-border)] sm:size-52"
      style={{ background: swatch.hex }}
    >
      {patterned ? <Pattern kind={swatch.pattern} /> : null}
      {label ? (
        <span className="relative z-10 rounded-full bg-fg/70 px-3 py-1 text-sm font-extrabold text-accent-fg">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function Pattern({ kind }: { kind: Swatch["pattern"] }) {
  const overlay =
    kind === "stripes"
      ? "repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 8px, transparent 8px 16px)"
      : kind === "dots"
        ? "radial-gradient(circle at 6px 6px, rgba(255,255,255,.4) 3px, transparent 4px)"
        : kind === "diag"
          ? "repeating-linear-gradient(45deg, rgba(0,0,0,.18) 0 8px, transparent 8px 16px)"
          : kind === "waves"
            ? "repeating-linear-gradient(0deg, rgba(255,255,255,.28) 0 6px, transparent 6px 14px)"
            : "repeating-linear-gradient(0deg, rgba(0,0,0,.12) 0 10px, transparent 10px 20px), repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 10px, transparent 10px 20px)";
  return (
    <span
      className="absolute inset-0"
      style={{
        backgroundImage: overlay,
        backgroundSize: kind === "dots" ? "16px 16px" : undefined,
      }}
    />
  );
}
