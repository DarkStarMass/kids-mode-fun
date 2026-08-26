import { useCallback, useEffect, useRef, useState } from "react";
import { FeedbackBanner, GameFrame } from "@/components/kids/GameFrame";
import { KidsButton } from "@/components/kids/KidsButton";
import { MEMORY_IDS, MemoryIcon, type MemoryId } from "@/components/kids/memory-icons";
import { STRINGS } from "@/lib/kids/i18n";
import { playError, playLevel, playSuccess, playTap, buzz } from "@/lib/kids/sfx";
import { useKidsStore } from "@/lib/kids/store";
import { speakTTS } from "@/lib/kids/tts";
import { shuffle } from "@/lib/kids/types";
import { cn } from "@/lib/utils";

type Card = { key: string; id: MemoryId };
type Feedback = "idle" | "ok" | "level";

function pairCount(level: number) {
  if (level <= 1) return 4;
  if (level === 2) return 6;
  return 8;
}

function deal(level: number): Card[] {
  const n = pairCount(level);
  const ids = shuffle([...MEMORY_IDS]).slice(0, n);
  const doubled = shuffle([...ids, ...ids]);
  return doubled.map((id, i) => ({ key: `${id}-${i}`, id }));
}

export function MemoryGame({ onBack }: { onBack: () => void }) {
  const lang = useKidsStore((s) => s.lang);
  const ttsEnabled = useKidsStore((s) => s.ttsEnabled);
  const soundEnabled = useKidsStore((s) => s.soundEnabled);
  const saved = useKidsStore((s) => s.progress.memory);
  const recordScore = useKidsStore((s) => s.recordScore);
  const t = STRINGS[lang];

  const [level, setLevel] = useState(saved.level);
  const [score, setScore] = useState(saved.score);
  const [cards, setCards] = useState<Card[]>(() => deal(saved.level));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [message, setMessage] = useState("");
  const lock = useRef(false);

  const startBoard = useCallback(
    (lvl: number) => {
      setCards(deal(lvl));
      setFlipped([]);
      setMatched(new Set());
      setMoves(0);
      setFeedback("idle");
      setMessage("");
      speakTTS(t.findPairs, lang, ttsEnabled);
    },
    [lang, t.findPairs, ttsEnabled],
  );

  useEffect(() => {
    speakTTS(t.findPairs, lang, ttsEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCard = (index: number) => {
    if (lock.current) return;
    if (flipped.includes(index)) return;
    if (matched.has(cards[index]!.id)) return;
    playTap(soundEnabled);
    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);
    if (nextFlipped.length < 2) return;

    setMoves((m) => m + 1);
    const [a, b] = nextFlipped;
    const ca = cards[a!]!;
    const cb = cards[b!]!;
    if (ca.id === cb.id) {
      const nextMatched = new Set(matched);
      nextMatched.add(ca.id);
      setMatched(nextMatched);
      setFlipped([]);
      playSuccess(soundEnabled);
      buzz(10);
      const pairs = pairCount(level);
      if (nextMatched.size === pairs) {
        const nextScore = score + pairs;
        let nextLevel = level;
        let kind: Feedback = "ok";
        let msg = t.wellDone;
        if ((score + pairs) / 8 >= level) {
          nextLevel = level + 1;
          kind = "level";
          msg = `${t.levelUp} ${nextLevel}`;
          playLevel(soundEnabled);
        }
        setScore(nextScore);
        setLevel(nextLevel);
        recordScore("memory", pairs, nextLevel);
        setFeedback(kind);
        setMessage(msg);
        speakTTS(msg, lang, ttsEnabled);
        window.setTimeout(() => startBoard(nextLevel), 1600);
      }
    } else {
      lock.current = true;
      playError(soundEnabled);
      window.setTimeout(() => {
        setFlipped([]);
        lock.current = false;
      }, 800);
    }
  };

  const cols = pairCount(level) <= 4 ? "grid-cols-4" : "grid-cols-4";

  return (
    <GameFrame title={t.games.memory} score={score} level={level} onBack={onBack}>
      <p className="mb-3 text-center text-sm font-extrabold text-muted">
        {t.pairs} {matched.size}/{pairCount(level)}
        <span className="mx-2">·</span>
        {t.moves} {moves}
      </p>
      <div className={cn("mx-auto grid w-full max-w-md flex-1 content-start gap-2", cols)}>
        {cards.map((card, i) => {
          const open = flipped.includes(i) || matched.has(card.id);
          return (
            <button
              key={card.key}
              type="button"
              aria-label={open ? card.id : t.games.memory}
              onClick={() => onCard(i)}
              className={cn(
                "aspect-square min-h-16 rounded-xl shadow-[var(--shadow-border)] transition-transform duration-150 active:scale-[0.96]",
                open ? "bg-elevated text-accent" : "bg-accent text-accent-fg",
              )}
            >
              {open ? (
                <MemoryIcon id={card.id} />
              ) : (
                <span className="font-display text-2xl font-semibold">?</span>
              )}
            </button>
          );
        })}
      </div>
      <FeedbackBanner kind={feedback} text={message} />
    </GameFrame>
  );
}
