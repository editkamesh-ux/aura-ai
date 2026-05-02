import { GlassCard } from "@/components/GlassCard";
import { GoldBadge } from "@/components/GoldBadge";
import { GoldButton } from "@/components/GoldButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import type { Theme } from "@/types";
import {
  Bell,
  BellOff,
  Check,
  ChevronRight,
  Clock,
  Database,
  Download,
  Dumbbell,
  Info,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  Timer,
  Trash2,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type FocusType = "pomodoro" | "deep-work" | "custom";

interface NotifPrefs {
  routineReminders: boolean;
  motivationalAlerts: boolean;
  habitNudges: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

interface FocusPrefs {
  defaultType: FocusType;
  customDuration: number;
}

function SectionHeader({
  icon,
  title,
}: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="text-primary">{icon}</span>
      <h2 className="font-display font-semibold text-base text-foreground">
        {title}
      </h2>
    </div>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  ocid,
}: {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <Label
          htmlFor={id}
          className="text-sm text-foreground font-medium cursor-pointer"
        >
          {label}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        data-ocid={ocid}
        className="shrink-0"
      />
    </div>
  );
}

const themeOptions: { id: Theme; label: string; bg: string; accent: string }[] =
  [
    { id: "darkGold", label: "Dark Gold", bg: "#0A0A0A", accent: "#D4AF37" },
    {
      id: "darkCopper",
      label: "Dark Copper",
      bg: "#0F0A07",
      accent: "#B87333",
    },
    { id: "light", label: "Light", bg: "#FAF9F7", accent: "#B8960C" },
  ];

function ThemeSwatch({
  option,
  selected,
  onSelect,
}: {
  option: (typeof themeOptions)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-ocid={`settings.theme_${option.id}`}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full",
        selected
          ? "border-primary gold-glow"
          : "border-border hover:border-primary/50",
      )}
    >
      <div
        className="w-full h-10 rounded-lg flex items-end justify-end p-1.5"
        style={{ background: option.bg }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: option.accent }}
        />
      </div>
      <span className="text-xs font-medium text-foreground">
        {option.label}
      </span>
      {selected && (
        <div className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
          <Check size={10} strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

const focusTypes: { id: FocusType; label: string; desc: string }[] = [
  { id: "pomodoro", label: "Pomodoro", desc: "25 min work / 5 min break" },
  { id: "deep-work", label: "Deep Work", desc: "90 min uninterrupted flow" },
  { id: "custom", label: "Custom", desc: "Set your own duration" },
];

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    profile,
    setProfile,
    notificationsEnabled,
    setNotificationsEnabled,
    setOnboardingCompleted,
  } = useAppStore();

  const [displayName, setDisplayName] = useState(profile.name);
  const [nameSaved, setNameSaved] = useState(false);

  const [notifPrefs, setNotifPrefs] = useLocalStorage<NotifPrefs>(
    "aura-notif-prefs",
    {
      routineReminders: true,
      motivationalAlerts: true,
      habitNudges: true,
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00",
    },
  );

  const [focusPrefs, setFocusPrefs] = useLocalStorage<FocusPrefs>(
    "aura-focus-prefs",
    {
      defaultType: "pomodoro",
      customDuration: 45,
    },
  );

  const [permissionState, setPermissionState] =
    useState<NotificationPermission>(
      "Notification" in window ? Notification.permission : "denied",
    );

  function handleSaveName() {
    const trimmed = displayName.trim();
    if (!trimmed) return;
    setProfile({ name: trimmed });
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2200);
  }

  async function handleRequestPermission() {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setPermissionState(result);
    }
  }

  function handleExportData() {
    const allData: Record<string, unknown> = {
      exportedAt: new Date().toISOString(),
    };
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("aura-")) {
        try {
          allData[key] = JSON.parse(localStorage.getItem(key) ?? "");
        } catch {
          allData[key] = localStorage.getItem(key);
        }
      }
    }
    const blob = new Blob([JSON.stringify(allData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aura-ai-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClearData() {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith("aura-")) keys.push(k);
    }
    for (const k of keys) localStorage.removeItem(k);
    window.location.reload();
  }

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      delay,
    },
  });

  return (
    <div className="max-w-lg mx-auto pb-8 px-1" data-ocid="settings.page">
      {/* Page header */}
      <motion.div {...fadeUp(0)} className="mb-6 pt-1">
        <h1 className="font-display text-2xl font-bold gradient-gold-text">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Personalize your AURA AI experience
        </p>
      </motion.div>

      {/* ── Profile ── */}
      <motion.div {...fadeUp(0.05)}>
        <GlassCard padding="lg" className="mb-4">
          <SectionHeader icon={<User size={18} />} title="Profile" />
          <div className="flex flex-col gap-3">
            <Label
              htmlFor="display-name"
              className="text-xs text-muted-foreground"
            >
              Display Name
            </Label>
            <div className="flex gap-2">
              <Input
                id="display-name"
                data-ocid="settings.name_input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                placeholder="Your name"
                className="bg-muted/40 border-border focus-visible:ring-primary"
                maxLength={40}
              />
              <GoldButton
                type="button"
                size="sm"
                onClick={handleSaveName}
                data-ocid="settings.save_name_button"
                className="shrink-0"
              >
                {nameSaved ? <Check size={14} /> : "Save"}
              </GoldButton>
            </div>
            {nameSaved && (
              <p
                className="text-xs text-primary"
                data-ocid="settings.name_success_state"
              >
                ✓ Name updated
              </p>
            )}
            <div className="section-divider pt-3 mt-1 space-y-2">
              {(
                [
                  [
                    "Member since",
                    new Date(profile.joinedAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    }),
                  ],
                  ["Tasks completed", profile.stats.tasksCompletedTotal],
                  ["Current streak", `${profile.stats.streakDays} days 🔥`],
                ] as [string, string | number][]
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span
                    className={cn(
                      "font-medium",
                      label === "Current streak"
                        ? "text-primary"
                        : "text-foreground",
                    )}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Theme ── */}
      <motion.div {...fadeUp(0.1)}>
        <GlassCard padding="lg" className="mb-4">
          <SectionHeader icon={<Sparkles size={18} />} title="Theme" />
          <div
            className="grid grid-cols-3 gap-3"
            data-ocid="settings.theme_section"
          >
            {themeOptions.map((opt) => (
              <ThemeSwatch
                key={opt.id}
                option={opt}
                selected={theme === opt.id}
                onSelect={() => setTheme(opt.id)}
              />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Notifications ── */}
      <motion.div {...fadeUp(0.15)}>
        <GlassCard padding="lg" className="mb-4">
          <SectionHeader icon={<Bell size={18} />} title="Notifications" />

          {permissionState !== "granted" && (
            <div
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-primary/10 border border-primary/30 mb-4"
              data-ocid="settings.notification_permission_banner"
            >
              <div className="flex items-center gap-2 min-w-0">
                <BellOff size={15} className="text-primary shrink-0" />
                <p className="text-xs text-muted-foreground">
                  {permissionState === "denied"
                    ? "Notifications blocked — enable in browser settings"
                    : "Allow browser notifications for reminders"}
                </p>
              </div>
              {permissionState === "default" && (
                <GoldButton
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleRequestPermission}
                  data-ocid="settings.request_permission_button"
                  className="shrink-0 text-xs"
                >
                  Allow
                </GoldButton>
              )}
            </div>
          )}

          <ToggleRow
            id="master-notif"
            label="Enable Notifications"
            description="Master toggle for all AURA AI alerts"
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
            ocid="settings.notifications_master_toggle"
          />

          <div
            className={cn(
              "section-divider pt-1 transition-smooth",
              !notificationsEnabled && "opacity-40 pointer-events-none",
            )}
          >
            <ToggleRow
              id="routine-reminders"
              label="Routine Reminders"
              description="Wake up, workout & sleep alerts"
              checked={notifPrefs.routineReminders}
              onCheckedChange={(v) =>
                setNotifPrefs({ ...notifPrefs, routineReminders: v })
              }
              ocid="settings.routine_reminders_toggle"
            />
            <ToggleRow
              id="motivational-alerts"
              label="Motivational Alerts"
              description="Daily inspiration and progress nudges"
              checked={notifPrefs.motivationalAlerts}
              onCheckedChange={(v) =>
                setNotifPrefs({ ...notifPrefs, motivationalAlerts: v })
              }
              ocid="settings.motivational_alerts_toggle"
            />
            <ToggleRow
              id="habit-nudges"
              label="Habit Nudges"
              description="Gentle reminders to stay on track"
              checked={notifPrefs.habitNudges}
              onCheckedChange={(v) =>
                setNotifPrefs({ ...notifPrefs, habitNudges: v })
              }
              ocid="settings.habit_nudges_toggle"
            />

            <div className="section-divider pt-3 mt-1">
              <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                <Moon size={12} aria-hidden="true" /> Quiet Hours
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label
                    htmlFor="quiet-start"
                    className="text-xs text-muted-foreground mb-1.5 block"
                  >
                    Start
                  </Label>
                  <Input
                    id="quiet-start"
                    type="time"
                    data-ocid="settings.quiet_hours_start_input"
                    value={notifPrefs.quietHoursStart}
                    onChange={(e) =>
                      setNotifPrefs({
                        ...notifPrefs,
                        quietHoursStart: e.target.value,
                      })
                    }
                    className="bg-muted/40 border-border focus-visible:ring-primary text-sm"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="quiet-end"
                    className="text-xs text-muted-foreground mb-1.5 block"
                  >
                    End
                  </Label>
                  <Input
                    id="quiet-end"
                    type="time"
                    data-ocid="settings.quiet_hours_end_input"
                    value={notifPrefs.quietHoursEnd}
                    onChange={(e) =>
                      setNotifPrefs({
                        ...notifPrefs,
                        quietHoursEnd: e.target.value,
                      })
                    }
                    className="bg-muted/40 border-border focus-visible:ring-primary text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Focus Preferences ── */}
      <motion.div {...fadeUp(0.2)}>
        <GlassCard padding="lg" className="mb-4">
          <SectionHeader icon={<Timer size={18} />} title="Focus Preferences" />
          <p className="text-xs text-muted-foreground mb-3">
            Default session type
          </p>
          <div className="space-y-2" data-ocid="settings.focus_type_section">
            {focusTypes.map((ft) => (
              <button
                key={ft.id}
                type="button"
                onClick={() =>
                  setFocusPrefs({ ...focusPrefs, defaultType: ft.id })
                }
                data-ocid={`settings.focus_type_${ft.id}`}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl border transition-smooth text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  focusPrefs.defaultType === ft.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/40",
                )}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {ft.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {ft.desc}
                  </p>
                </div>
                {focusPrefs.defaultType === ft.id && (
                  <Check size={16} className="text-primary shrink-0" />
                )}
              </button>
            ))}
          </div>

          {focusPrefs.defaultType === "custom" && (
            <div className="mt-4">
              <Label
                htmlFor="custom-duration"
                className="text-xs text-muted-foreground mb-2 block"
              >
                <span className="flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" /> Custom Duration
                  (minutes)
                </span>
              </Label>
              <Input
                id="custom-duration"
                type="number"
                min={5}
                max={240}
                data-ocid="settings.custom_duration_input"
                value={focusPrefs.customDuration}
                onChange={(e) =>
                  setFocusPrefs({
                    ...focusPrefs,
                    customDuration: Math.max(
                      5,
                      Math.min(240, Number(e.target.value)),
                    ),
                  })
                }
                className="bg-muted/40 border-border focus-visible:ring-primary max-w-[140px]"
              />
            </div>
          )}
        </GlassCard>
      </motion.div>

      {/* ── Data ── */}
      <motion.div {...fadeUp(0.25)}>
        <GlassCard padding="lg" className="mb-4">
          <SectionHeader icon={<Database size={18} />} title="Data" />
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleExportData}
              data-ocid="settings.export_data_button"
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center gap-3">
                <Download size={16} className="text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    Export Data
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Download all your data as JSON
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  data-ocid="settings.clear_data_button"
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-destructive/30 hover:border-destructive/60 hover:bg-destructive/5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 size={16} className="text-destructive" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-destructive">
                        Clear All Data
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete all local data
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent
                className="glassmorphism border-border"
                data-ocid="settings.clear_data_dialog"
              >
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display text-foreground">
                    Clear all data?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    This will permanently delete your routines, tasks, goals,
                    chat history, and settings. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    data-ocid="settings.clear_data_cancel_button"
                    className="border-border"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearData}
                    data-ocid="settings.clear_data_confirm_button"
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Clear Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <button
              type="button"
              onClick={() => setOnboardingCompleted(false)}
              data-ocid="settings.reset_onboarding_button"
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/40 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center gap-3">
                <RotateCcw size={16} className="text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    Restart Onboarding
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Re-run the setup wizard
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── App Info ── */}
      <motion.div {...fadeUp(0.3)}>
        <GlassCard padding="lg" className="mb-4">
          <SectionHeader icon={<Info size={18} />} title="About AURA AI" />
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-display font-bold text-lg gradient-gold-text">
                AURA AI
              </p>
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <GoldBadge variant="muted">v1.0.0</GoldBadge>
              <GoldBadge variant="gold">✦ Premium</GoldBadge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            AURA AI is your premium AI-powered personal assistant — helping you
            build routines, achieve goals, and unlock your highest potential.
            Designed for modern high-performers who demand both beauty and
            function.
          </p>
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-medium text-primary"
              data-ocid="settings.free_forever_badge"
            >
              <Sparkles size={11} aria-hidden="true" />
              Free forever — no subscription required
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground">
              <Dumbbell size={11} aria-hidden="true" />
              Offline capable
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground">
              <Sun size={11} aria-hidden="true" />
              Privacy first
            </span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Footer */}
      <div className="text-center pb-2">
        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
