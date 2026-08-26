import { useEffect, useRef, useState } from "react";
import { GameFrame } from "@/components/kids/GameFrame";
import { KidsButton } from "@/components/kids/KidsButton";
import { STRINGS } from "@/lib/kids/i18n";
import { playLevel, playSuccess, playTap, buzz } from "@/lib/kids/sfx";
import { useKidsStore } from "@/lib/kids/store";
import { speakTTS } from "@/lib/kids/tts";

type Phase = "countdown" | "play" | "done";

type Bunny = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  caught: boolean;
};

const ROUND_S = 25;
const COUNTDOWN = ["3", "2", "1"] as const;

export function BunnyGame({ onBack }: { onBack: () => void }) {
  const lang = useKidsStore((s) => s.lang);
  const ttsEnabled = useKidsStore((s) => s.ttsEnabled);
  const soundEnabled = useKidsStore((s) => s.soundEnabled);
  const saved = useKidsStore((s) => s.progress.bunny);
  const recordScore = useKidsStore((s) => s.recordScore);
  const t = STRINGS[lang];

  const [level, setLevel] = useState(saved.level);
  const [score, setScore] = useState(saved.score);
  const [caught, setCaught] = useState(0);
  const [phase, setPhase] = useState<Phase>("countdown");
  const [countText, setCountText] = useState("3");
  const [left, setLeft] = useState(ROUND_S);
  const fieldRef = useRef<HTMLDivElement>(null);
  const bunniesRef = useRef<Bunny[]>([]);
  const nodesRef = useRef<Map<number, HTMLButtonElement>>(new Map());
  const raf = useRef(0);
  const last = useRef(0);
  const roundCaught = useRef(0);
  const scoreRef = useRef(saved.score);
  const levelRef = useRef(saved.level);
  scoreRef.current = score;
  levelRef.current = level;

  const spawn = (lvl: number) => {
    const n = Math.min(4 + lvl, 8);
    const speed = 40 + lvl * 12;
    bunniesRef.current = Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      x: 10 + Math.random() * 70,
      y: 12 + Math.random() * 60,
      vx: (Math.random() < 0.5 ? -1 : 1) * (speed + Math.random() * 20),
      vy: (Math.random() < 0.5 ? -1 : 1) * (speed * 0.7 + Math.random() * 16),
      caught: false,
    }));
    roundCaught.current = 0;
    setCaught(0);
  };

  const beginRound = (lvl: number) => {
    let step = 0;
    setPhase("countdown");
    setCountText("3");
    speakTTS("3", lang, ttsEnabled);
    const id = window.setInterval(() => {
      step += 1;
      if (step < 3) {
        const v = COUNTDOWN[step]!;
        setCountText(v);
        speakTTS(v, lang, ttsEnabled);
      } else {
        window.clearInterval(id);
        setCountText(t.countdownGo);
        speakTTS(t.countdownGo, lang, ttsEnabled);
        window.setTimeout(() => {
          spawn(lvl);
          setLeft(ROUND_S);
          setPhase("play");
        }, 500);
      }
    }, 800);
    return () => window.clearInterval(id);
  };

  useEffect(() => {
    return beginRound(levelRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "play") return;
    last.current = performance.now();
    const tick = (now: number) => {
      let dt = (now - last.current) / 1000;
      last.current = now;
      if (dt > 0.1) dt = 0.1;
      const field = fieldRef.current;
      const w = field?.clientWidth || 1;
      const h = field?.clientHeight || 1;
      const size = 72;
      for (const b of bunniesRef.current) {
        if (b.caught) continue;
        b.x += (b.vx * dt * 100) / w;
        b.y += (b.vy * dt * 100) / h;
        if (b.x < 0) {
          b.x = 0;
          b.vx = Math.abs(b.vx);
        }
        if (b.x > 100 - (size / w) * 100) {
          b.x = 100 - (size / w) * 100;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y < 0) {
          b.y = 0;
          b.vy = Math.abs(b.vy);
        }
        if (b.y > 100 - (size / h) * 100) {
          b.y = 100 - (size / h) * 100;
          b.vy = -Math.abs(b.vy);
        }
        const hop = Math.sin(now / 180 + b.id) * 6;
        const node = nodesRef.current.get(b.id);
        if (node) {
          node.style.transform = `translate(${(b.x / 100) * w}px, ${(b.y / 100) * h + hop}px)`;
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    const timer = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(timer);
          cancelAnimationFrame(raf.current);
          setPhase("done");
          const gained = roundCaught.current;
          const nextScore = scoreRef.current + gained;
          let nextLevel = levelRef.current;
          if (gained >= 4 + levelRef.current) {
            nextLevel = levelRef.current + 1;
            playLevel(soundEnabled);
            speakTTS(`${t.levelUp} ${nextLevel}`, lang, ttsEnabled);
          } else {
            speakTTS(t.wellDone, lang, ttsEnabled);
          }
          setScore(nextScore);
          setLevel(nextLevel);
          recordScore("bunny", gained, nextLevel);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      cancelAnimationFrame(raf.current);
      window.clearInterval(timer);
    };
  }, [phase, lang, recordScore, soundEnabled, t.levelUp, t.wellDone, ttsEnabled]);

  const catchBunny = (id: number) => {
    const b = bunniesRef.current.find((x) => x.id === id);
    if (!b || b.caught || phase !== "play") return;
    b.caught = true;
    roundCaught.current += 1;
    setCaught(roundCaught.current);
    playTap(soundEnabled);
    playSuccess(soundEnabled);
    buzz(10);
    const node = nodesRef.current.get(id);
    if (node) node.style.opacity = "0";
  };

  return (
    <GameFrame
      title={t.games.bunny}
      score={score}
      level={level}
      onBack={onBack}
      extra={
        <p className="px-4 pb-2 text-center text-sm font-extrabold tabular-nums text-muted">
          {t.caught} {caught}
          <span className="mx-2">·</span>
          {t.time} {left}s
        </p>
      }
    >
      <div
        ref={fieldRef}
        className="relative min-h-[22rem] flex-1 overflow-hidden rounded-2xl bg-tile shadow-[var(--shadow-border)]"
      >
        {phase === "countdown" ? (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <p className="font-display text-7xl font-semibold tabular-nums text-accent">{countText}</p>
          </div>
        ) : null}

        {phase === "play"
          ? bunniesRef.current.map((b) => (
              <button
                key={b.id}
                type="button"
                aria-label={t.games.bunny}
                ref={(el) => {
                  if (el) {
                    nodesRef.current.set(b.id, el);
                    const field = fieldRef.current;
                    if (field) {
                      el.style.transform = `translate(${(b.x / 100) * field.clientWidth}px, ${(b.y / 100) * field.clientHeight}px)`;
                    }
                  } else {
                    nodesRef.current.delete(b.id);
                  }
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  if (e.button === 0) catchBunny(b.id);
                }}
                className="absolute left-0 top-0 size-[72px] touch-manipulation transition-opacity duration-200"
              >
                <BunnySvg />
              </button>
            ))
          : null}

        {phase === "done" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-elevated/90 p-6 text-center">
            <p className="font-display text-3xl font-semibold">{t.wellDone}</p>
            <p className="text-lg font-extrabold tabular-nums">
              {t.caught} {caught}
            </p>
            <KidsButton onPress={() => beginRound(level)}>{t.playAgain}</KidsButton>
          </div>
        ) : null}
      </div>
      {phase === "play" ? (
        <p className="mt-3 text-center text-sm font-bold text-muted">{t.catchBunnies}</p>
      ) : null}
    </GameFrame>
  );
}

function BunnySvg() {
  return (
    <svg viewBox="0 0 72 72" className="h-full w-full" aria-hidden="true">
      <ellipse cx="26" cy="18" rx="7" ry="16" fill="#f4efe6" stroke="#1a1a1a" strokeWidth="2.2" />
      <ellipse cx="46" cy="18" rx="7" ry="16" fill="#f4efe6" stroke="#1a1a1a" strokeWidth="2.2" />
      <ellipse cx="26" cy="20" rx="3.2" ry="10" fill="#e8c4b8" />
      <ellipse cx="46" cy="20" rx="3.2" ry="10" fill="#e8c4b8" />
      <ellipse cx="36" cy="44" rx="20" ry="18" fill="#f4efe6" stroke="#1a1a1a" strokeWidth="2.4" />
      <circle cx="29" cy="42" r="2.2" fill="#1a1a1a" />
      <circle cx="43" cy="42" r="2.2" fill="#1a1a1a" />
      <ellipse cx="36" cy="48" rx="3.2" ry="2.2" fill="#c45c26" />
      <circle cx="54" cy="50" r="5" fill="#f4efe6" stroke="#1a1a1a" strokeWidth="2" />
    </svg>
  );
}
