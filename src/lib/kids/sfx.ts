let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export async function unlockAudio() {
  const audio = context();
  if (!audio) return;
  if (audio.state === "suspended") await audio.resume();
}

function tone(freq: number, duration: number, type: OscillatorType, gain = 0.07, delay = 0) {
  const audio = context();
  if (!audio) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = 0;
  osc.connect(g);
  g.connect(audio.destination);
  const t = audio.currentTime + delay;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

export function playSuccess(enabled: boolean) {
  if (!enabled) return;
  tone(523.25, 0.12, "sine", 0.06, 0);
  tone(659.25, 0.16, "sine", 0.06, 0.09);
}

export function playError(enabled: boolean) {
  if (!enabled) return;
  tone(196, 0.18, "triangle", 0.05, 0);
}

export function playTap(enabled: boolean) {
  if (!enabled) return;
  tone(440, 0.06, "sine", 0.04, 0);
}

export function playLevel(enabled: boolean) {
  if (!enabled) return;
  tone(523.25, 0.12, "sine", 0.055, 0);
  tone(659.25, 0.12, "sine", 0.055, 0.1);
  tone(783.99, 0.22, "sine", 0.06, 0.2);
}

export function buzz(ms = 14) {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(ms);
  }
}
