import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      glow = false,
      hover = false,
      padding = "md",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-ocid="glass_card"
        className={cn(
          "glassmorphism rounded-xl transition-smooth",
          paddingMap[padding],
          glow && "gold-glow",
          hover && "gold-glow-hover cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
