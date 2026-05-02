import { useRouter } from "@/App";
import type { AppRoute } from "@/App";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  MessageCircle,
  Settings,
} from "lucide-react";

const navItems: { path: AppRoute; label: string; icon: React.ElementType }[] = [
  { path: "/", label: "Home", icon: LayoutDashboard },
  { path: "/routines", label: "Routines", icon: CalendarDays },
  { path: "/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/chat", label: "AI Chat", icon: MessageCircle },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const { route, navigate } = useRouter();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glassmorphism border-t border-border/40"
      aria-label="Main navigation"
      data-ocid="bottom_nav"
    >
      <div className="flex items-center justify-around px-2 py-1 max-w-lg mx-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = route === path;
          return (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              data-ocid={`nav.${label.toLowerCase().replace(" ", "-")}.link`}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-smooth min-w-[52px]",
                isActive
                  ? "text-primary gold-glow"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={22}
                className={cn(
                  "transition-smooth",
                  isActive && "drop-shadow-[0_0_6px_oklch(0.70_0.14_58/0.8)]",
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-display font-medium leading-none",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
