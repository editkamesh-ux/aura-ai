import { cn } from "@/lib/utils";

interface GoldBadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "success" | "warning" | "muted";
  className?: string;
}

const variantClasses = {
  gold: "bg-primary/20 text-primary border border-primary/30",
  success: "bg-green-500/20 text-green-400 border border-green-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  muted: "bg-muted text-muted-foreground border border-border",
};

export function GoldBadge({
  children,
  variant = "gold",
  className,
}: GoldBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-display",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
