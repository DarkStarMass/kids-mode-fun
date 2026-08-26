import { useCallback, useEffect, useRef, useState } from "react";
import { FeedbackBanner, GameFrame } from "@/components/kids/GameFrame";
import { KidsButton } from "@/components/kids/KidsButton";
import { ALL_SHAPES, ShapeSvg, shapesForLevel } from "@/components/kids/shapes";
import { STRINGS } from "@/lib/kids/i18n";
import { playError, playLevel, playSuccess, buzz } from "@/lib/kids/sfx";
import { useKidsStore } from "@/lib/kids/store";
import { speakTTS } from "@/lib/kids/tts";
import { optionSet, pickAvoiding, type ShapeName } from "@/lib/kids/types";

type Feedback = "idle" | "ok" | "no" | "level";

export function ShapesGame({ onBack }: { onBack: () => void }) {
  const lang = useKidsStore((s) => s.lang);
  const ttsEnabled = useKidsStore((s) => s.ttsEnabled);
  const soundEnabled = useKidsStore((s) => s.soundEnabled);
  const saved = useKidsStore((s) => s.progress.shapes);
  const recordScore = useKidsStore((s) => s.recordScore);
  const t = STRINGS[lang];

  const [level, setLevel] = useState(saved.level);
  const [score, setScore] = useState(saved.score);
  const [current, setCurrent] = useState<ShapeName>("circle");
  const [options, setOptions] = useState<ShapeName[]>(["circle"]);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [message, setMessage] = useState("");
  const recent = useRef<ShapeName[]>([]);
  const lock = useRef(false);

  const next = useCallback(
    (lvl: number) => {
      const pool = shapesForLevel(lvl);
      const target = pickAvoiding(pool, recent.current);
      recent.current = [...recent.current, target].slice(-4);
      const count = Math.min(4 + Math.floor(lvl / 2), ALL_SHAPES.length);
      setCurrent(target);
      setOptions(optionSet(target, pool, count));
      setFeedback("idle");
      setMessage("");
      speakTTS(`${t.whichShape} ${t.shapeNames[target]}`, lang, ttsEnabled);
    },
    [lang, t, ttsEnabled],
  );

  useEffect(() => {
    next(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const check = (sel: ShapeName) => {
    if (lock.current) return;
    if (sel === current) {
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
        speakTTS(`${t.correct} ${t.shapeNames[current]}`, lang, ttsEnabled);
      }
      buzz(12);
      setScore(nextScore);
      setLevel(nextLevel);
      recordScore("shapes", 1, nextLevel);
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
      speakTTS(`${t.wrong}. ${t.shapeNames[current]}`, lang, ttsEnabled);
      window.setTimeout(() => setFeedback("idle"), 1400);
    }
  };

  return (
    <GameFrame
      title={t.games.shapes}
      score={score}
      level={level}
      onBack={onBack}
      onListen={() => speakTTS(`${t.whichShape} ${t.shapeNames[current]}`, lang, true)}
    >
      <p className="mb-2 text-center text-lg font-extrabold">{t.whichShape}</p>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex size-44 items-center justify-center rounded-2xl bg-elevated text-accent shadow-[var(--shadow-border)] sm:size-52">
          <ShapeSvg name={current} className="size-32 sm:size-40" />
        </div>
      </div>
      <FeedbackBanner kind={feedback} text={message} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((sh) => (
          <KidsButton
            key={sh}
            variant="choice"
            onPress={() => check(sh)}
            aria-label={t.shapeNames[sh]}
            className="h-24 flex-col rounded-2xl text-accent"
          >
            <ShapeSvg name={sh} className="size-12" />
            <span className="text-sm font-extrabold text-fg">{t.shapeNames[sh]}</span>
          </KidsButton>
        ))}
      </div>
    </GameFrame>
  );
}
