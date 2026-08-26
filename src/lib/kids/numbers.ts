import type { Lang } from "./types";

const ONES: Record<Lang, string[]> = {
  de: ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"],
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
  fr: ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"],
  it: ["zero", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove"],
};

const TEENS: Record<Lang, string[]> = {
  de: ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"],
  en: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
  fr: ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"],
  it: ["dieci", "undici", "dodici", "tredici", "quattordici", "quindici", "sedici", "diciassette", "diciotto", "diciannove"],
};

const TENS: Record<Lang, string[]> = {
  de: ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig"],
  en: ["", "", "twenty", "thirty", "forty", "fifty"],
  fr: ["", "", "vingt", "trente", "quarante", "cinquante"],
  it: ["", "", "venti", "trenta", "quaranta", "cinquanta"],
};

export function numberWord(n: number, lang: Lang): string {
  const v = Math.max(0, Math.min(50, Math.round(n)));
  if (v < 10) return ONES[lang][v]!;
  if (v < 20) return TEENS[lang][v - 10]!;
  const t = Math.floor(v / 10);
  const o = v % 10;
  if (o === 0) return TENS[lang][t]!;
  if (lang === "de") {
    const one = o === 1 ? "ein" : ONES.de[o]!;
    return `${one}und${TENS.de[t]}`;
  }
  if (lang === "en") return `${TENS.en[t]}-${ONES.en[o]}`;
  if (lang === "fr") {
    if (o === 1) return `${TENS.fr[t]}-et-un`;
    return `${TENS.fr[t]}-${ONES.fr[o]}`;
  }
  if (o === 1) {
    if (t === 2) return "ventuno";
    if (t === 3) return "trentuno";
    if (t === 4) return "quarantuno";
    return "cinquantuno";
  }
  if (o === 8 && t === 2) return "ventotto";
  return `${TENS.it[t]}${ONES.it[o]}`;
}

export function numberRangeForLevel(level: number): { min: number; max: number } {
  if (level <= 1) return { min: 1, max: 10 };
  if (level === 2) return { min: 1, max: 20 };
  if (level === 3) return { min: 1, max: 30 };
  return { min: 1, max: 50 };
}
