import type { ButtonHTMLAttributes, ReactNode } from "react";
import { unlockAudio } from "@/lib/kids/sfx";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "choice" | "tile" | "quiet";

type Props = {
  children: ReactNode;
  variant?: Variant;
  onPress?: () => void;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[var(--shadow-border)] hover:brightness-[1.04]",
  ghost:
    "bg-elevated text-fg shadow-[var(--shadow-border)] hover:bg-tile",
  choice:
    "bg-elevated text-fg shadow-[var(--shadow-border)] hover:bg-tile min-h-16 text-xl font-extrabold",
  tile:
    "bg-elevated text-fg shadow-[var(--shadow-border)] hover:bg-tile text-left",
  quiet:
    "bg-transparent text-muted hover:text-fg hover:bg-surface/70",
};

export function KidsButton({
  children,
  variant = "primary",
  onPress,
  className,
  disabled,
  type = "button",
  ...rest
}: Props) {
  const fire = () => {
    if (disabled) return;
    void unlockAudio();
    onPress?.();
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        fire();
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3",
        "min-h-12 select-none font-sans text-base font-bold tracking-tight",
        "touch-manipulation transition-transform duration-150 ease-out",
        "active:not-disabled:scale-[0.96] disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
