import type { ColorId, ColorSchema, Lang, ShapeName } from "./types";

export type Dict = {
  appName: string;
  tagline: string;
  tapToStart: string;
  tapHint: string;
  freeNoAds: string;
  brand: string;
  parent: string;
  settings: string;
  back: string;
  close: string;
  score: string;
  level: string;
  stars: string;
  correct: string;
  wrong: string;
  tryAgain: string;
  listen: string;
  wellDone: string;
  levelUp: string;
  parentGateTitle: string;
  parentGateHint: string;
  parentGateError: string;
  language: string;
  colorSchema: string;
  tts: string;
  sound: string;
  resetProgress: string;
  resetDone: string;
  howMany: string;
  whichShape: string;
  whichColor: string;
  findPairs: string;
  catchBunnies: string;
  countdownGo: string;
  caught: string;
  time: string;
  pairs: string;
  moves: string;
  playAgain: string;
  parentIntro: string;
  parentBody: string;
  schemaHelp: string;
  games: {
    numbers: string;
    numbersHint: string;
    shapes: string;
    shapesHint: string;
    colors: string;
    colorsHint: string;
    memory: string;
    memoryHint: string;
    bunny: string;
    bunnyHint: string;
  };
  schemas: Record<ColorSchema, string>;
  shapeNames: Record<ShapeName, string>;
  colorNames: Record<ColorId, string>;
};

const DE: Dict = {
  appName: "Kids Mode Fun",
  tagline: "Spielen. Lernen. Ruhig bleiben.",
  tapToStart: "Tippe zum Starten",
  tapHint: "Ein Tipp, dann kann dein Handy sprechen und klingen.",
  freeNoAds: "Kostenlos · Ohne Werbung",
  brand: "DarkStarMass",
  parent: "Eltern",
  settings: "Einstellungen",
  back: "Zurück",
  close: "Schließen",
  score: "Punkte",
  level: "Level",
  stars: "Sterne",
  correct: "Richtig!",
  wrong: "Noch mal versuchen",
  tryAgain: "Nochmal",
  listen: "Anhören",
  wellDone: "Super gemacht!",
  levelUp: "Neues Level!",
  parentGateTitle: "Nur für Eltern",
  parentGateHint: "Löse die Aufgabe, um die Einstellungen zu öffnen.",
  parentGateError: "Das war nicht richtig.",
  language: "Sprache",
  colorSchema: "Farben & Sehen",
  tts: "Vorlesen",
  sound: "Töne",
  resetProgress: "Fortschritt zurücksetzen",
  resetDone: "Fortschritt gelöscht",
  howMany: "Wie viele siehst du?",
  whichShape: "Welche Form ist das?",
  whichColor: "Welche Farbe ist das?",
  findPairs: "Finde die Paare",
  catchBunnies: "Tippe die Häschen",
  countdownGo: "Los!",
  caught: "Gefangen",
  time: "Zeit",
  pairs: "Paare",
  moves: "Züge",
  playAgain: "Nochmal spielen",
  parentIntro: "Für Eltern",
  parentBody:
    "Keine Werbung, keine In-App-Käufe, keine Tracker. Fortschritt bleibt nur auf diesem Gerät. Farbenblind-Modi gelten für die Oberfläche — im Farbenspiel helfen zusätzlich Muster und Namen.",
  schemaHelp:
    "Drei Arten (Rot, Grün, Blau) jeweils leicht und vollständig, plus hoher Kontrast.",
  games: {
    numbers: "Zahlen",
    numbersHint: "Zählen und Zehner verstehen",
    shapes: "Formen",
    shapesHint: "Kreis, Viereck und mehr",
    colors: "Farben",
    colorsHint: "Farben benennen",
    memory: "Memory",
    memoryHint: "Paare merken",
    bunny: "Hasenfang",
    bunnyHint: "Tippen und reagieren",
  },
  schemas: {
    default: "Sanft (Standard)",
    protanomaly: "Rotschwäche, leicht",
    protanopia: "Rotblindheit",
    deuteranomaly: "Grünschwäche, leicht",
    deuteranopia: "Grünblindheit",
    tritanomaly: "Blauschwäche, leicht",
    tritanopia: "Blaublindheit",
    "high-contrast": "Hoher Kontrast",
  },
  shapeNames: {
    circle: "Kreis",
    square: "Quadrat",
    triangle: "Dreieck",
    rectangle: "Rechteck",
    star: "Stern",
    heart: "Herz",
    diamond: "Raute",
    house: "Haus",
  },
  colorNames: {
    red: "Rot",
    yellow: "Gelb",
    blue: "Blau",
    green: "Grün",
    orange: "Orange",
    purple: "Lila",
    pink: "Rosa",
    brown: "Braun",
    gray: "Grau",
    teal: "Türkis",
  },
};

const EN: Dict = {
  appName: "Kids Mode Fun",
  tagline: "Play. Learn. Stay calm.",
  tapToStart: "Tap to start",
  tapHint: "One tap so the phone can talk and play sounds.",
  freeNoAds: "Free · No ads",
  brand: "DarkStarMass",
  parent: "Parents",
  settings: "Settings",
  back: "Back",
  close: "Close",
  score: "Score",
  level: "Level",
  stars: "Stars",
  correct: "Correct!",
  wrong: "Try again",
  tryAgain: "Again",
  listen: "Listen",
  wellDone: "Well done!",
  levelUp: "New level!",
  parentGateTitle: "Parents only",
  parentGateHint: "Solve this to open settings.",
  parentGateError: "That was not right.",
  language: "Language",
  colorSchema: "Color & vision",
  tts: "Read aloud",
  sound: "Sounds",
  resetProgress: "Reset progress",
  resetDone: "Progress cleared",
  howMany: "How many do you see?",
  whichShape: "Which shape is this?",
  whichColor: "Which color is this?",
  findPairs: "Find the pairs",
  catchBunnies: "Tap the bunnies",
  countdownGo: "Go!",
  caught: "Caught",
  time: "Time",
  pairs: "Pairs",
  moves: "Moves",
  playAgain: "Play again",
  parentIntro: "For parents",
  parentBody:
    "No ads, no in-app purchases, no trackers. Progress stays on this device. Color-vision modes change the interface — the color game also uses patterns and names.",
  schemaHelp:
    "Three types (red, green, blue), mild and complete, plus high contrast.",
  games: {
    numbers: "Numbers",
    numbersHint: "Count and learn tens",
    shapes: "Shapes",
    shapesHint: "Circles, squares and more",
    colors: "Colors",
    colorsHint: "Name the colors",
    memory: "Memory",
    memoryHint: "Match the pairs",
    bunny: "Bunny catch",
    bunnyHint: "Tap and react",
  },
  schemas: {
    default: "Calm (default)",
    protanomaly: "Red-weak, mild",
    protanopia: "Red-blind",
    deuteranomaly: "Green-weak, mild",
    deuteranopia: "Green-blind",
    tritanomaly: "Blue-weak, mild",
    tritanopia: "Blue-blind",
    "high-contrast": "High contrast",
  },
  shapeNames: {
    circle: "Circle",
    square: "Square",
    triangle: "Triangle",
    rectangle: "Rectangle",
    star: "Star",
    heart: "Heart",
    diamond: "Diamond",
    house: "House",
  },
  colorNames: {
    red: "Red",
    yellow: "Yellow",
    blue: "Blue",
    green: "Green",
    orange: "Orange",
    purple: "Purple",
    pink: "Pink",
    brown: "Brown",
    gray: "Gray",
    teal: "Teal",
  },
};

const FR: Dict = {
  appName: "Kids Mode Fun",
  tagline: "Jouer. Apprendre. Rester calme.",
  tapToStart: "Touche pour commencer",
  tapHint: "Un toucher pour que le téléphone parle et joue des sons.",
  freeNoAds: "Gratuit · Sans publicité",
  brand: "DarkStarMass",
  parent: "Parents",
  settings: "Réglages",
  back: "Retour",
  close: "Fermer",
  score: "Points",
  level: "Niveau",
  stars: "Étoiles",
  correct: "Bravo !",
  wrong: "Essaie encore",
  tryAgain: "Encore",
  listen: "Écouter",
  wellDone: "Très bien !",
  levelUp: "Nouveau niveau !",
  parentGateTitle: "Réservé aux parents",
  parentGateHint: "Résous l’addition pour ouvrir les réglages.",
  parentGateError: "Ce n’est pas la bonne réponse.",
  language: "Langue",
  colorSchema: "Couleurs et vision",
  tts: "Lecture à voix haute",
  sound: "Sons",
  resetProgress: "Réinitialiser la progression",
  resetDone: "Progression effacée",
  howMany: "Combien en vois-tu ?",
  whichShape: "Quelle est cette forme ?",
  whichColor: "Quelle est cette couleur ?",
  findPairs: "Trouve les paires",
  catchBunnies: "Touche les lapins",
  countdownGo: "C’est parti !",
  caught: "Attrapés",
  time: "Temps",
  pairs: "Paires",
  moves: "Coups",
  playAgain: "Rejouer",
  parentIntro: "Pour les parents",
  parentBody:
    "Pas de publicité, pas d’achats intégrés, pas de traqueurs. La progression reste sur cet appareil. Les modes daltonisme changent l’interface — le jeu des couleurs ajoute motifs et noms.",
  schemaHelp:
    "Trois types (rouge, vert, bleu), forme légère et complète, plus contraste élevé.",
  games: {
    numbers: "Nombres",
    numbersHint: "Compter et comprendre les dizaines",
    shapes: "Formes",
    shapesHint: "Cercle, carré et plus",
    colors: "Couleurs",
    colorsHint: "Nommer les couleurs",
    memory: "Memory",
    memoryHint: "Retrouver les paires",
    bunny: "Attrape-lapin",
    bunnyHint: "Toucher et réagir",
  },
  schemas: {
    default: "Doux (défaut)",
    protanomaly: "Faiblesse du rouge, légère",
    protanopia: "Cécité au rouge",
    deuteranomaly: "Faiblesse du vert, légère",
    deuteranopia: "Cécité au vert",
    tritanomaly: "Faiblesse du bleu, légère",
    tritanopia: "Cécité au bleu",
    "high-contrast": "Contraste élevé",
  },
  shapeNames: {
    circle: "Cercle",
    square: "Carré",
    triangle: "Triangle",
    rectangle: "Rectangle",
    star: "Étoile",
    heart: "Cœur",
    diamond: "Losange",
    house: "Maison",
  },
  colorNames: {
    red: "Rouge",
    yellow: "Jaune",
    blue: "Bleu",
    green: "Vert",
    orange: "Orange",
    purple: "Violet",
    pink: "Rose",
    brown: "Marron",
    gray: "Gris",
    teal: "Turquoise",
  },
};

const IT: Dict = {
  appName: "Kids Mode Fun",
  tagline: "Gioca. Impara. Resta sereno.",
  tapToStart: "Tocca per iniziare",
  tapHint: "Un tocco così il telefono può parlare e suonare.",
  freeNoAds: "Gratis · Senza pubblicità",
  brand: "DarkStarMass",
  parent: "Genitori",
  settings: "Impostazioni",
  back: "Indietro",
  close: "Chiudi",
  score: "Punti",
  level: "Livello",
  stars: "Stelle",
  correct: "Giusto!",
  wrong: "Prova ancora",
  tryAgain: "Di nuovo",
  listen: "Ascolta",
  wellDone: "Benissimo!",
  levelUp: "Nuovo livello!",
  parentGateTitle: "Solo per i genitori",
  parentGateHint: "Risolvi l’operazione per aprire le impostazioni.",
  parentGateError: "Non è la risposta giusta.",
  language: "Lingua",
  colorSchema: "Colori e vista",
  tts: "Leggi ad alta voce",
  sound: "Suoni",
  resetProgress: "Azzera i progressi",
  resetDone: "Progressi cancellati",
  howMany: "Quanti ne vedi?",
  whichShape: "Che forma è questa?",
  whichColor: "Che colore è questo?",
  findPairs: "Trova le coppie",
  catchBunnies: "Tocca i coniglietti",
  countdownGo: "Via!",
  caught: "Presi",
  time: "Tempo",
  pairs: "Coppie",
  moves: "Mosse",
  playAgain: "Gioca ancora",
  parentIntro: "Per i genitori",
  parentBody:
    "Niente pubblicità, niente acquisti in-app, niente tracker. I progressi restano su questo dispositivo. Le modalità per daltonismo cambiano l’interfaccia — il gioco dei colori usa anche motivi e nomi.",
  schemaHelp:
    "Tre tipi (rosso, verde, blu), forma lieve e completa, più alto contrasto.",
  games: {
    numbers: "Numeri",
    numbersHint: "Contare e capire le decine",
    shapes: "Forme",
    shapesHint: "Cerchio, quadrato e altro",
    colors: "Colori",
    colorsHint: "Nominare i colori",
    memory: "Memory",
    memoryHint: "Trova le coppie",
    bunny: "Prendi il coniglio",
    bunnyHint: "Toccare e reagire",
  },
  schemas: {
    default: "Morbido (predefinito)",
    protanomaly: "Debolezza al rosso, lieve",
    protanopia: "Cecità al rosso",
    deuteranomaly: "Debolezza al verde, lieve",
    deuteranopia: "Cecità al verde",
    tritanomaly: "Debolezza al blu, lieve",
    tritanopia: "Cecità al blu",
    "high-contrast": "Alto contrasto",
  },
  shapeNames: {
    circle: "Cerchio",
    square: "Quadrato",
    triangle: "Triangolo",
    rectangle: "Rettangolo",
    star: "Stella",
    heart: "Cuore",
    diamond: "Rombo",
    house: "Casa",
  },
  colorNames: {
    red: "Rosso",
    yellow: "Giallo",
    blue: "Blu",
    green: "Verde",
    orange: "Arancione",
    purple: "Viola",
    pink: "Rosa",
    brown: "Marrone",
    gray: "Grigio",
    teal: "Turchese",
  },
};

export const STRINGS: Record<Lang, Dict> = {
  de: DE,
  en: EN,
  fr: FR,
  it: IT,
};

export const LANGS: { id: Lang; native: string }[] = [
  { id: "de", native: "Deutsch" },
  { id: "en", native: "English" },
  { id: "fr", native: "Français" },
  { id: "it", native: "Italiano" },
];

export const SCHEMA_ORDER: ColorSchema[] = [
  "default",
  "protanomaly",
  "protanopia",
  "deuteranomaly",
  "deuteranopia",
  "tritanomaly",
  "tritanopia",
  "high-contrast",
];

export const TTS_LANG: Record<Lang, string> = {
  de: "de-DE",
  en: "en-US",
  fr: "fr-FR",
  it: "it-IT",
};
