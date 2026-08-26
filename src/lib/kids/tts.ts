import { TTS_LANG } from "./i18n";
import type { Lang } from "./types";

function pickVoice(lang: Lang): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const prefix = TTS_LANG[lang].slice(0, 2).toLowerCase();
  const match =
    voices.find((v) => v.lang.toLowerCase().startsWith(TTS_LANG[lang].toLowerCase())) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
  return match ?? null;
}

export function warmVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    window.speechSynthesis.getVoices();
  });
}

export function speakTTS(text: string, lang: Lang, enabled: boolean) {
  if (!enabled || typeof window === "undefined" || !window.speechSynthesis) return;
  const trimmed = text.trim();
  if (!trimmed) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(trimmed);
  utter.lang = TTS_LANG[lang];
  utter.rate = 0.92;
  utter.pitch = 1.04;
  const voice = pickVoice(lang);
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

export function hushTTS() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}
