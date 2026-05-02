import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeMap = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export function ProgressBar({
  value,
  className,
  showLabel = false,
  size = "md",
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full rounded-full overflow-hidden bg-muted/50",
          sizeMap[size],
        )}
      >
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-700 ease-out",
            animated && "shadow-glow",
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground mt-1 block">
          {clamped}%
        </span>
      )}
    </div>
  );
}
