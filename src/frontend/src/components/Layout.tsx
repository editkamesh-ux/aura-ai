import { useRouter } from "@/App";
import type { AppRoute } from "@/App";
import { BottomNav } from "@/components/BottomNav";
import { useNotifications } from "@/hooks/useNotifications";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: AppRoute;
}

export function Layout({ children }: LayoutProps) {
  const { unreadCount } = useNotifications();
  const { navigate } = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!notifOpen) return;
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [notifOpen]);

  return (
    <div className="flex flex-col min-h-screen min-h-dvh bg-background">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-border/40 h-14"
        data-ocid="app_header"
      >
        <div className="flex items-center justify-between px-4 h-full max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => navigate("/")}
            data-ocid="logo.link"
            className="flex items-center gap-2"
          >
            <span className="font-display font-bold text-xl tracking-wider gradient-gold-text uppercase">
              AURA AI
            </span>
          </button>
          <div className="flex items-center gap-2">
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen((o) => !o)}
                className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Notifications"
                aria-expanded={notifOpen}
                data-ocid="notifications.button"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full gold-glow animate-glow-pulse" />
                )}
              </button>

              {notifOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 rounded-2xl glassmorphism border border-border/40 shadow-xl z-50 overflow-hidden"
                  data-ocid="notifications.popover"
                  aria-label="Notifications panel"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
                    <span className="text-xs font-display font-semibold uppercase tracking-wider text-foreground">
                      Notifications
                    </span>
                    <button
                      type="button"
                      onClick={() => setNotifOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-smooth text-xs"
                      aria-label="Close notifications"
                      data-ocid="notifications.close_button"
                    >
                      &#x2715;
                    </button>
                  </div>
                  <div className="px-4 py-6 text-center">
                    <p className="text-2xl mb-2" aria-hidden="true">
                      🔔
                    </p>
                    <p className="text-sm font-display text-muted-foreground">
                      No new notifications
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      You're all caught up!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        className="flex-1 pt-14 pb-[72px] overflow-y-auto"
        data-ocid="main_content"
      >
        <div className="max-w-lg mx-auto px-4 py-4">{children}</div>
      </main>

      <BottomNav />

      {/* Ambient glow bg */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
      </div>
    </div>
  );
}
