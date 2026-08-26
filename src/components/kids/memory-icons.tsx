const stroke = "#1a1a1a";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      {children}
    </svg>
  );
}

export const MEMORY_IDS = [
  "cat",
  "dog",
  "bird",
  "fish",
  "frog",
  "bee",
  "snail",
  "fox",
  "owl",
  "turtle",
  "leaf",
  "moon",
] as const;

export type MemoryId = (typeof MEMORY_IDS)[number];

export function MemoryIcon({ id }: { id: MemoryId }) {
  switch (id) {
    case "cat":
      return (
        <Frame>
          <circle cx="32" cy="36" r="16" fill="#d9e6de" stroke={stroke} strokeWidth="2.4" />
          <polygon points="18,28 22,12 28,26" fill="#d9e6de" stroke={stroke} strokeWidth="2.2" />
          <polygon points="46,28 42,12 36,26" fill="#d9e6de" stroke={stroke} strokeWidth="2.2" />
          <circle cx="26" cy="36" r="2.2" fill={stroke} />
          <circle cx="38" cy="36" r="2.2" fill={stroke} />
        </Frame>
      );
    case "dog":
      return (
        <Frame>
          <ellipse cx="32" cy="36" rx="16" ry="14" fill="#e4d5be" stroke={stroke} strokeWidth="2.4" />
          <ellipse cx="16" cy="24" rx="7" ry="10" fill="#cbb48e" stroke={stroke} strokeWidth="2" />
          <ellipse cx="48" cy="24" rx="7" ry="10" fill="#cbb48e" stroke={stroke} strokeWidth="2" />
          <ellipse cx="32" cy="42" rx="5" ry="3.4" fill="#1a1a1a" />
        </Frame>
      );
    case "bird":
      return (
        <Frame>
          <ellipse cx="30" cy="34" rx="14" ry="11" fill="#8eb8c8" stroke={stroke} strokeWidth="2.4" />
          <circle cx="42" cy="26" r="8" fill="#8eb8c8" stroke={stroke} strokeWidth="2.2" />
          <polygon points="50,26 60,30 50,34" fill="#c45c26" stroke={stroke} strokeWidth="1.8" />
          <circle cx="45" cy="24" r="1.8" fill={stroke} />
        </Frame>
      );
    case "fish":
      return (
        <Frame>
          <ellipse cx="30" cy="32" rx="16" ry="10" fill="#2f6f71" stroke={stroke} strokeWidth="2.4" />
          <polygon points="46,32 60,22 60,42" fill="#2f6f71" stroke={stroke} strokeWidth="2.2" />
          <circle cx="22" cy="30" r="2" fill="#fffbf4" />
          <circle cx="22.6" cy="30" r="1" fill={stroke} />
        </Frame>
      );
    case "frog":
      return (
        <Frame>
          <ellipse cx="32" cy="38" rx="18" ry="12" fill="#3f8a62" stroke={stroke} strokeWidth="2.4" />
          <circle cx="22" cy="24" r="7" fill="#3f8a62" stroke={stroke} strokeWidth="2.2" />
          <circle cx="42" cy="24" r="7" fill="#3f8a62" stroke={stroke} strokeWidth="2.2" />
          <circle cx="22" cy="24" r="2.4" fill="#fffbf4" />
          <circle cx="42" cy="24" r="2.4" fill="#fffbf4" />
          <circle cx="22.4" cy="24.4" r="1.2" fill={stroke} />
          <circle cx="42.4" cy="24.4" r="1.2" fill={stroke} />
        </Frame>
      );
    case "bee":
      return (
        <Frame>
          <ellipse cx="32" cy="34" rx="14" ry="10" fill="#e2b203" stroke={stroke} strokeWidth="2.4" />
          <rect x="24" y="24" width="5" height="20" fill="#1a1a1a" opacity="0.7" />
          <rect x="35" y="24" width="5" height="20" fill="#1a1a1a" opacity="0.7" />
          <ellipse cx="22" cy="22" rx="8" ry="5" fill="#d9e6de" stroke={stroke} strokeWidth="1.8" />
          <ellipse cx="42" cy="22" rx="8" ry="5" fill="#d9e6de" stroke={stroke} strokeWidth="1.8" />
        </Frame>
      );
    case "snail":
      return (
        <Frame>
          <path d="M12 46 C20 46 28 40 46 40 L54 46" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="38" cy="30" r="12" fill="#cbb48e" stroke={stroke} strokeWidth="2.4" />
          <circle cx="38" cy="30" r="6" fill="none" stroke={stroke} strokeWidth="2" />
        </Frame>
      );
    case "fox":
      return (
        <Frame>
          <polygon points="32,52 12,28 20,16 32,24 44,16 52,28" fill="#c45c26" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="26" cy="32" r="2" fill={stroke} />
          <circle cx="38" cy="32" r="2" fill={stroke} />
        </Frame>
      );
    case "owl":
      return (
        <Frame>
          <ellipse cx="32" cy="36" rx="16" ry="18" fill="#8b6a3c" stroke={stroke} strokeWidth="2.4" />
          <circle cx="24" cy="32" r="7" fill="#fffbf4" stroke={stroke} strokeWidth="2" />
          <circle cx="40" cy="32" r="7" fill="#fffbf4" stroke={stroke} strokeWidth="2" />
          <circle cx="24" cy="32" r="2.2" fill={stroke} />
          <circle cx="40" cy="32" r="2.2" fill={stroke} />
          <polygon points="32,38 28,44 36,44" fill="#c45c26" />
        </Frame>
      );
    case "turtle":
      return (
        <Frame>
          <ellipse cx="32" cy="34" rx="18" ry="14" fill="#2f6a56" stroke={stroke} strokeWidth="2.4" />
          <circle cx="50" cy="34" r="7" fill="#3f8a62" stroke={stroke} strokeWidth="2" />
          <path d="M20 26 L32 20 L44 26 L32 32 Z" fill="#d9e6de" stroke={stroke} strokeWidth="1.6" />
        </Frame>
      );
    case "leaf":
      return (
        <Frame>
          <path d="M18 46 C18 22 32 12 48 16 C52 32 42 52 22 50 Z" fill="#2f6a56" stroke={stroke} strokeWidth="2.4" />
          <path d="M22 48 C30 36 38 26 48 18" fill="none" stroke={stroke} strokeWidth="1.8" />
        </Frame>
      );
    case "moon":
      return (
        <Frame>
          <path
            d="M40 12 A20 20 0 1 0 40 52 A16 16 0 1 1 40 12 Z"
            fill="#e2b203"
            stroke={stroke}
            strokeWidth="2.4"
          />
        </Frame>
      );
  }
}
