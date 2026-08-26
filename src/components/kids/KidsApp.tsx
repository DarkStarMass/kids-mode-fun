import { useEffect, useState } from "react";
import { HomeHub } from "@/components/kids/HomeHub";
import { ParentGate } from "@/components/kids/ParentGate";
import { SettingsPanel } from "@/components/kids/SettingsPanel";
import { StartScreen } from "@/components/kids/StartScreen";
import { BunnyGame } from "@/components/kids/games/BunnyGame";
import { ColorsGame } from "@/components/kids/games/ColorsGame";
import { MemoryGame } from "@/components/kids/games/MemoryGame";
import { NumbersGame } from "@/components/kids/games/NumbersGame";
import { ShapesGame } from "@/components/kids/games/ShapesGame";
import { applyPalette } from "@/lib/kids/palettes";
import { unlockAudio } from "@/lib/kids/sfx";
import { rehydrateKids, useKidsStore } from "@/lib/kids/store";
import { hushTTS, warmVoices } from "@/lib/kids/tts";
import type { GameId } from "@/lib/kids/types";

type View = "home" | "settings" | GameId;

const SESSION_KEY = "kids-mode-fun-session-v1";

type SessionSnap = { started: boolean; view: "home" | "settings" };

function readSession(): SessionSnap {
  if (typeof sessionStorage === "undefined") return { started: false, view: "home" };
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return { started: false, view: "home" };
    const parsed = JSON.parse(raw) as Partial<SessionSnap>;
    return {
      started: parsed.started === true,
      view: parsed.view === "settings" ? "settings" : "home",
    };
  } catch {
    return { started: false, view: "home" };
  }
}

function writeSession(snap: SessionSnap) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(snap));
  } catch {
    /* private mode */
  }
}

export function KidsApp() {
  const schema = useKidsStore((s) => s.schema);
  const parentUntil = useKidsStore((s) => s.parentUntil);
  const unlockParent = useKidsStore((s) => s.unlockParent);

  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>("home");
  const [started, setStarted] = useState(false);
  const [gate, setGate] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await rehydrateKids();
      warmVoices();
      if (cancelled) return;
      const snap = readSession();
      const until = useKidsStore.getState().parentUntil;
      setStarted(snap.started);
      if (snap.started && snap.view === "settings" && Date.now() < until) {
        setView("settings");
      }
      if (snap.started) void unlockAudio();
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    applyPalette(schema);
  }, [schema]);

  useEffect(() => {
    if (!ready) return;
    writeSession({
      started,
      view: view === "settings" ? "settings" : "home",
    });
  }, [ready, started, view]);

  useEffect(() => {
    return () => hushTTS();
  }, [view]);

  const begin = () => {
    void unlockAudio();
    warmVoices();
    setStarted(true);
    setView("home");
  };

  const openParent = () => {
    void unlockAudio();
    if (Date.now() < parentUntil) {
      setView("settings");
      return;
    }
    setGate(true);
  };

  const goHome = () => {
    hushTTS();
    setView("home");
  };

  const openGame = (id: GameId) => {
    void unlockAudio();
    setView(id);
  };

  if (!ready) {
    return <main className="min-h-dvh bg-bg" aria-hidden="true" />;
  }

  return (
    <main className="min-h-dvh bg-bg text-fg">
      {!started ? <StartScreen onStart={begin} /> : null}

      {started && view === "home" ? (
        <HomeHub onOpenGame={openGame} onOpenParent={openParent} />
      ) : null}
      {started && view === "numbers" ? <NumbersGame onBack={goHome} /> : null}
      {started && view === "shapes" ? <ShapesGame onBack={goHome} /> : null}
      {started && view === "colors" ? <ColorsGame onBack={goHome} /> : null}
      {started && view === "memory" ? <MemoryGame onBack={goHome} /> : null}
      {started && view === "bunny" ? <BunnyGame onBack={goHome} /> : null}
      {started && view === "settings" ? <SettingsPanel onBack={goHome} /> : null}

      {gate ? (
        <ParentGate
          onClose={() => setGate(false)}
          onPass={() => {
            unlockParent();
            setGate(false);
            setView("settings");
          }}
        />
      ) : null}
    </main>
  );
}
