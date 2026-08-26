import { useCallback, useEffect, useRef, useState } from "react";
import { FeedbackBanner, GameFrame } from "@/components/kids/GameFrame";
import { KidsButton } from "@/components/kids/KidsButton";
import { STRINGS } from "@/lib/kids/i18n";
import { numberRangeForLevel, numberWord } from "@/lib/kids/numbers";
import { playError, playLevel, playSuccess, buzz } from "@/lib/kids/sfx";
import { useKidsStore } from "@/lib/kids/store";
import { speakTTS } from "@/lib/kids/tts";
import { optionSet, pickAvoiding } from "@/lib/kids/types";
import { cn } from "@/lib/utils";

type Feedback = "idle" | "ok" | "no" | "level";

export function NumbersGame({ onBack }: { onBack: () => void }) {
  const lang = useKidsStore((s) => s.lang);
  const ttsEnabled = useKidsStore((s) => s.ttsEnabled);
  const soundEnabled = useKidsStore((s) => s.soundEnabled);
  const saved = useKidsStore((s) => s.progress.numbers);
  const recordScore = useKidsStore((s) => s.recordScore);
  const t = STRINGS[lang];

  const [level, setLevel] = useState(saved.level);
  const [score, setScore] = useState(saved.score);
  const [target, setTarget] = useState(1);
  const [options, setOptions] = useState<number[]>([1, 2, 3, 4]);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [message, setMessage] = useState("");
  const recent = useRef<number[]>([]);
  const lock = useRef(false);

  const next = useCallback(
    (lvl: number) => {
      const { min, max } = numberRangeForLevel(lvl);
      const pool = Array.from({ length: max - min + 1 }, (_, i) => min + i);
      const n = pickAvoiding(pool, recent.current);
      recent.current = [...recent.current, n].slice(-5);
      setTarget(n);
      setOptions(optionSet(n, pool, 4));
      setFeedback("idle");
      setMessage("");
      speakTTS(`${t.howMany} ${numberWord(n, lang)}`, lang, ttsEnabled);
    },
    [lang, t.howMany, ttsEnabled],
  );

  useEffect(() => {
    next(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const check = (n: number) => {
    if (lock.current) return;
    if (n === target) {
      lock.current = true;
      const nextScore = score + 1;
      let nextLevel = level;
      let kind: Feedback = "ok";
      let msg = t.correct;
      if (nextScore > 0 && nextScore % 10 === 0) {
        nextLevel = level + 1;
        kind = "level";
        msg = `${t.levelUp} ${nextLevel}`;
        playLevel(soundEnabled);
        speakTTS(`${t.levelUp} ${nextLevel}`, lang, ttsEnabled);
      } else {
        playSuccess(soundEnabled);
        speakTTS(`${t.correct} ${numberWord(target, lang)}`, lang, ttsEnabled);
      }
      buzz(12);
      setScore(nextScore);
      setLevel(nextLevel);
      recordScore("numbers", 1, nextLevel);
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
      speakTTS(`${t.wrong}. ${numberWord(target, lang)}`, lang, ttsEnabled);
      window.setTimeout(() => setFeedback("idle"), 1400);
    }
  };

  return (
    <GameFrame
      title={t.games.numbers}
      score={score}
      level={level}
      onBack={onBack}
      onListen={() => speakTTS(`${t.howMany} ${numberWord(target, lang)}`, lang, true)}
    >
      <p className="mb-3 text-center text-lg font-extrabold">{t.howMany}</p>
      <div className="flex flex-1 items-center justify-center">
        <NumberVisual count={target} level={level} />
      </div>
      <FeedbackBanner kind={feedback} text={message} />
      <div className="grid grid-cols-2 gap-3">
        {options.map((n) => (
          <KidsButton key={n} variant="choice" onPress={() => check(n)} className="rounded-2xl text-3xl">
            {n}
          </KidsButton>
        ))}
      </div>
    </GameFrame>
  );
}

function NumberVisual({ count, level }: { count: number; level: number }) {
  if (level === 1 && count <= 10) {
    return (
      <div className="flex max-w-sm flex-wrap justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <Apple key={i} />
        ))}
      </div>
    );
  }
  const tens = Math.floor(count / 10);
  const ones = count % 10;
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {Array.from({ length: tens }).map((_, i) => (
        <TenFrame key={`t-${i}`} filled={10} compact={count > 30} />
      ))}
      {(ones > 0 || tens === 0) && <TenFrame filled={ones} compact={count > 30} />}
    </div>
  );
}

function TenFrame({ filled, compact }: { filled: number; compact?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-5 grid-rows-2 rounded-xl border-2 border-fg/20 bg-elevated p-1.5",
        compact ? "gap-0.5" : "gap-1",
      )}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full",
            compact ? "size-4" : "size-6",
            i < filled ? "bg-accent" : "bg-fg/10",
          )}
        />
      ))}
    </div>
  );
}

function Apple() {
  return (
    <svg viewBox="0 0 48 48" className="size-11" aria-hidden="true">
      <path d="M24 10 C24 10 28 4 32 8" fill="none" stroke="#2f6a56" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 12 C18 12 12 20 12 28 C12 38 18 44 24 44 C30 44 36 38 36 28 C36 20 30 12 20 12" fill="#a33b32" stroke="#1a1a1a" strokeWidth="2" />
      <ellipse cx="18" cy="24" rx="3" ry="5" fill="#fffbf4" opacity="0.35" />
    </svg>
  );
}
