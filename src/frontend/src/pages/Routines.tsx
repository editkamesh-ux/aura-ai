import { GlassCard } from "@/components/GlassCard";
import { GoldButton } from "@/components/GoldButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = "morning" | "workout" | "work" | "evening" | "sleep" | "custom";
type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

interface ScheduledRoutine {
  id: string;
  name: string;
  startTime: string; // "HH:MM"
  endTime: string;
  category: Category;
  days: DayOfWeek[];
  enabled: boolean;
  done: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  Category,
  { icon: string; label: string; color: string }
> = {
  morning: { icon: "\u{1F305}", label: "Morning", color: "text-amber-400" },
  workout: {
    icon: "\u{1F3CB}\u{FE0F}",
    label: "Workout",
    color: "text-orange-400",
  },
  work: { icon: "\u{1F4BC}", label: "Work", color: "text-blue-400" },
  evening: { icon: "\u{1F319}", label: "Evening", color: "text-violet-400" },
  sleep: { icon: "\u{1F634}", label: "Sleep", color: "text-indigo-400" },
  custom: { icon: "\u26A1", label: "Custom", color: "text-primary" },
};

const ALL_DAYS: DayOfWeek[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TEMPLATES: Omit<ScheduledRoutine, "id" | "done">[] = [
  {
    name: "Morning Power",
    startTime: "06:00",
    endTime: "07:30",
    category: "morning",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
  },
  {
    name: "Work Focus Block",
    startTime: "09:00",
    endTime: "12:00",
    category: "work",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
  },
  {
    name: "Evening Wind-Down",
    startTime: "19:00",
    endTime: "20:30",
    category: "evening",
    days: ALL_DAYS,
    enabled: true,
  },
  {
    name: "Sleep Prep",
    startTime: "22:00",
    endTime: "22:30",
    category: "sleep",
    days: ALL_DAYS,
    enabled: true,
  },
];

const DEFAULT_ROUTINES: ScheduledRoutine[] = [
  {
    id: "r1",
    name: "Morning Power",
    startTime: "06:00",
    endTime: "07:30",
    category: "morning",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
    done: false,
  },
  {
    id: "r2",
    name: "Gym Session",
    startTime: "07:45",
    endTime: "09:00",
    category: "workout",
    days: ["Mon", "Wed", "Fri"],
    enabled: true,
    done: false,
  },
  {
    id: "r3",
    name: "Deep Work Block",
    startTime: "09:30",
    endTime: "12:00",
    category: "work",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
    done: false,
  },
  {
    id: "r4",
    name: "Lunch Break",
    startTime: "12:00",
    endTime: "13:00",
    category: "custom",
    days: ALL_DAYS,
    enabled: true,
    done: false,
  },
  {
    id: "r5",
    name: "Afternoon Focus",
    startTime: "13:00",
    endTime: "17:00",
    category: "work",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
    done: false,
  },
  {
    id: "r6",
    name: "Evening Wind-Down",
    startTime: "19:00",
    endTime: "20:30",
    category: "evening",
    days: ALL_DAYS,
    enabled: true,
    done: false,
  },
  {
    id: "r7",
    name: "Sleep Prep",
    startTime: "22:00",
    endTime: "22:30",
    category: "sleep",
    days: ALL_DAYS,
    enabled: true,
    done: false,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

function minutesToDisplay(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function durationMins(r: ScheduledRoutine): number {
  return Math.max(0, timeToMinutes(r.endTime) - timeToMinutes(r.startTime));
}

function formatTime12(t: string): string {
  const [hStr, mStr] = t.split(":");
  let h = Number(hStr);
  const m = mStr ?? "00";
  const ampm = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${m} ${ampm}`;
}

function getCurrentDayAbbr(): DayOfWeek {
  const days: DayOfWeek[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()] ?? "Mon";
}

function getCurrentTimeMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function isActiveNow(r: ScheduledRoutine, nowMins: number): boolean {
  return (
    nowMins >= timeToMinutes(r.startTime) && nowMins < timeToMinutes(r.endTime)
  );
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Timeline constants ──────────────────────────────────────────────────────

const PX_PER_HOUR = 72;
const TIMELINE_START = 5;
const TIMELINE_END = 24;
const TIMELINE_HOURS = TIMELINE_END - TIMELINE_START;

function timelineTop(t: string): number {
  return (timeToMinutes(t) / 60 - TIMELINE_START) * PX_PER_HOUR;
}

// ─── TimelineMarker ──────────────────────────────────────────────────────────

function TimelineMarker({ hour, top }: { hour: number; top: number }) {
  const label =
    hour === 0
      ? "12 AM"
      : hour < 12
        ? `${hour} AM`
        : hour === 12
          ? "12 PM"
          : `${hour - 12} PM`;
  return (
    <div
      className="absolute left-0 right-0 flex items-center gap-2 pointer-events-none"
      style={{ top }}
    >
      <span className="text-xs text-muted-foreground w-10 text-right select-none shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-border/30" />
    </div>
  );
}

// ─── RoutineBlock ─────────────────────────────────────────────────────────────

function RoutineBlock({
  routine,
  top,
  height,
  active,
  onTap,
}: {
  routine: ScheduledRoutine;
  top: number;
  height: number;
  active: boolean;
  onTap: () => void;
}) {
  const meta = CATEGORY_META[routine.category];
  const mins = durationMins(routine);
  return (
    <motion.button
      type="button"
      className={cn(
        "absolute left-14 right-0 rounded-xl px-3 py-2 text-left overflow-hidden",
        active
          ? "glassmorphism gold-glow border border-primary/60"
          : "glassmorphism border border-border/20 opacity-80",
        routine.done && "opacity-50",
        !routine.enabled && "opacity-30",
      )}
      style={{ top, height: Math.max(height, 48) }}
      whileHover={{ scale: 1.01, x: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      data-ocid={`routine.block.${routine.id}`}
    >
      {active && (
        <span
          className="absolute top-1.5 right-2 flex h-2 w-2"
          aria-hidden="true"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
      )}
      {routine.done && (
        <span className="absolute top-1.5 right-2 text-xs text-primary">
          Done
        </span>
      )}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-base leading-none shrink-0" aria-hidden="true">
          {meta.icon}
        </span>
        <span
          className={cn(
            "font-display font-semibold text-xs truncate",
            active ? "gradient-gold-text" : "text-foreground",
          )}
        >
          {routine.name}
        </span>
      </div>
      {height >= 60 && (
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatTime12(routine.startTime)} &middot; {minutesToDisplay(mins)}
        </p>
      )}
    </motion.button>
  );
}

// ─── TimelineView ─────────────────────────────────────────────────────────────

function TimelineView({
  routines,
  onTap,
}: { routines: ScheduledRoutine[]; onTap: (r: ScheduledRoutine) => void }) {
  const nowMins = getCurrentTimeMinutes();
  const nowTop = (nowMins / 60 - TIMELINE_START) * PX_PER_HOUR;
  const totalHeight = TIMELINE_HOURS * PX_PER_HOUR;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = Math.max(0, nowTop - 80);
    }
  }, [nowTop]);

  const todayAbbr = getCurrentDayAbbr();
  const todayRoutines = routines.filter(
    (r) => r.enabled && r.days.includes(todayAbbr),
  );

  return (
    <div
      ref={scrollRef}
      className="relative overflow-y-auto scrollbar-none"
      style={{ height: "calc(100vh - 300px)", minHeight: 320 }}
      data-ocid="routine.timeline"
    >
      <div className="relative" style={{ height: totalHeight }}>
        {Array.from({ length: TIMELINE_HOURS + 1 }, (_, i) => {
          const h = TIMELINE_START + i;
          return <TimelineMarker key={h} hour={h} top={i * PX_PER_HOUR} />;
        })}
        {todayRoutines.map((r) => (
          <RoutineBlock
            key={r.id}
            routine={r}
            top={timelineTop(r.startTime)}
            height={(durationMins(r) / 60) * PX_PER_HOUR}
            active={isActiveNow(r, nowMins)}
            onTap={() => onTap(r)}
          />
        ))}
        {nowTop >= 0 && nowTop <= totalHeight && (
          <div
            className="absolute left-10 right-0 flex items-center gap-1 z-10 pointer-events-none"
            style={{ top: nowTop }}
            aria-hidden="true"
          >
            <div className="w-2 h-2 rounded-full bg-primary gold-glow shrink-0" />
            <div className="flex-1 h-px bg-primary/60" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RoutineFormState ─────────────────────────────────────────────────────────

interface RoutineFormState {
  name: string;
  startTime: string;
  endTime: string;
  category: Category;
  days: DayOfWeek[];
}

const EMPTY_FORM: RoutineFormState = {
  name: "",
  startTime: "08:00",
  endTime: "09:00",
  category: "morning",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
};

// ─── RoutineModal ─────────────────────────────────────────────────────────────

function RoutineModal({
  initial,
  onSave,
  onClose,
}: {
  initial: ScheduledRoutine | null;
  onSave: (form: RoutineFormState) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<RoutineFormState>(
    initial
      ? {
          name: initial.name,
          startTime: initial.startTime,
          endTime: initial.endTime,
          category: initial.category,
          days: initial.days,
        }
      : EMPTY_FORM,
  );

  const toggleDay = (day: DayOfWeek) =>
    setForm((f) => ({
      ...f,
      days: f.days.includes(day)
        ? f.days.filter((d) => d !== day)
        : [...f.days, day],
    }));

  const timeError =
    !!form.startTime &&
    !!form.endTime &&
    timeToMinutes(form.endTime) <= timeToMinutes(form.startTime);
  const isValid =
    form.name.trim().length > 0 && form.days.length > 0 && !timeError;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      data-ocid="routine.dialog"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      />
      <motion.div
        className="relative w-full max-w-md"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.25 }}
      >
        <GlassCard padding="lg" glow>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-bold gradient-gold-text">
              {initial ? "Edit Routine" : "New Routine"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              aria-label="Close modal"
              data-ocid="routine.close_button"
            >
              &#x2715;
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="routine-name"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
              >
                Activity Name
              </label>
              <input
                id="routine-name"
                type="text"
                placeholder="e.g. Morning Meditation"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border/40 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth"
                data-ocid="routine.input"
              />
            </div>
            <div>
              <label
                htmlFor="routine-category"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
              >
                Category
              </label>
              <select
                id="routine-category"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value as Category,
                  }))
                }
                className="w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border/40 text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth"
                data-ocid="routine.select"
              >
                {(
                  Object.entries(CATEGORY_META) as [
                    Category,
                    { icon: string; label: string; color: string },
                  ][]
                ).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.icon} {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="routine-start"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
                >
                  Start Time
                </label>
                <input
                  id="routine-start"
                  type="time"
                  value={form.startTime}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, startTime: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border/40 text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth"
                  data-ocid="routine.start_time_input"
                />
              </div>
              <div>
                <label
                  htmlFor="routine-end"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
                >
                  End Time
                </label>
                <input
                  id="routine-end"
                  type="time"
                  value={form.endTime}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, endTime: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border/40 text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth"
                  data-ocid="routine.end_time_input"
                />
              </div>
            </div>
            {timeError && (
              <p
                className="text-xs text-destructive"
                data-ocid="routine.field_error"
              >
                End time must be after start time
              </p>
            )}
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                Repeat Days
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {ALL_DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={cn(
                      "w-9 h-9 rounded-lg text-xs font-semibold transition-smooth focus-visible:ring-2 focus-visible:ring-ring",
                      form.days.includes(day)
                        ? "bg-primary text-primary-foreground gold-glow"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted",
                    )}
                    aria-pressed={form.days.includes(day)}
                    data-ocid={`routine.day_toggle.${day.toLowerCase()}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <GoldButton
              type="button"
              variant="outline"
              size="md"
              className="flex-1"
              onClick={onClose}
              data-ocid="routine.cancel_button"
            >
              Cancel
            </GoldButton>
            <GoldButton
              type="button"
              size="md"
              className="flex-1"
              disabled={!isValid}
              onClick={() => isValid && onSave(form)}
              data-ocid="routine.submit_button"
            >
              {initial ? "Save Changes" : "Add Routine"}
            </GoldButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

// ─── DeleteConfirm ────────────────────────────────────────────────────────────

function DeleteConfirm({
  name,
  onConfirm,
  onCancel,
}: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="routine.delete_dialog"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        role="presentation"
      />
      <motion.div
        className="relative w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      >
        <GlassCard padding="lg" glow>
          <h3 className="font-display text-base font-bold text-foreground mb-2">
            Delete Routine?
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            <span className="text-foreground font-medium">{name}</span> will be
            permanently removed.
          </p>
          <div className="flex gap-3">
            <GoldButton
              type="button"
              variant="outline"
              size="md"
              className="flex-1"
              onClick={onCancel}
              data-ocid="routine.cancel_button"
            >
              Cancel
            </GoldButton>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 px-5 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold transition-smooth hover:opacity-90"
              data-ocid="routine.confirm_button"
            >
              Delete
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

// ─── ExecutionPanel ───────────────────────────────────────────────────────────

function ExecutionPanel({
  routine,
  onMarkDone,
  onClose,
}: {
  routine: ScheduledRoutine;
  onMarkDone: () => void;
  onClose: () => void;
}) {
  const meta = CATEGORY_META[routine.category];
  const mins = durationMins(routine);
  const nowMins = getCurrentTimeMinutes();
  const active = isActiveNow(routine, nowMins);
  const elapsed = active
    ? Math.max(0, nowMins - timeToMinutes(routine.startTime))
    : 0;
  const progress = mins > 0 ? Math.min(100, (elapsed / mins) * 100) : 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      data-ocid="routine.execution_panel"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      />
      <motion.div
        className="relative w-full max-w-sm"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <GlassCard padding="lg" glow={active}>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
            aria-label="Close panel"
            data-ocid="routine.close_button"
          >
            &#x2715;
          </button>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3" aria-hidden="true">
              {meta.icon}
            </div>
            <h2
              className={cn(
                "font-display text-xl font-bold",
                active ? "gradient-gold-text" : "text-foreground",
              )}
            >
              {routine.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {formatTime12(routine.startTime)} &#8211;{" "}
              {formatTime12(routine.endTime)} &middot; {minutesToDisplay(mins)}
            </p>
          </div>
          {active && (
            <div className="mb-5">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary gold-glow"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 text-center">
                {minutesToDisplay(elapsed)} elapsed &middot;{" "}
                {minutesToDisplay(mins - elapsed)} remaining
              </p>
            </div>
          )}
          {!active && !routine.done && (
            <div className="text-center mb-5 text-sm text-muted-foreground">
              Starts at{" "}
              <span className="text-foreground font-medium">
                {formatTime12(routine.startTime)}
              </span>
            </div>
          )}
          {routine.done ? (
            <div className="text-center py-3">
              <span className="text-2xl" aria-hidden="true">
                &#x1F3C6;
              </span>
              <p className="text-sm font-semibold text-primary mt-1">
                Completed!
              </p>
            </div>
          ) : (
            <GoldButton
              type="button"
              size="lg"
              className="w-full"
              onClick={onMarkDone}
              data-ocid="routine.mark_done_button"
            >
              &#x2713; Mark as Done
            </GoldButton>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}

// ─── TemplatesSection ─────────────────────────────────────────────────────────

function TemplatesSection({
  onAdd,
}: { onAdd: (t: Omit<ScheduledRoutine, "id" | "done">) => void }) {
  return (
    <div data-ocid="routine.templates_section">
      <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Starter Templates
      </h3>
      <div className="grid grid-cols-2 gap-2.5">
        {TEMPLATES.map((t, i) => {
          const meta = CATEGORY_META[t.category];
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.25 }}
            >
              <button
                type="button"
                className="text-left w-full"
                onClick={() => onAdd(t)}
                data-ocid={`routine.template.${i + 1}`}
              >
                <GlassCard hover padding="sm" className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">
                      {meta.icon}
                    </span>
                    <span className="font-display font-semibold text-xs text-foreground truncate">
                      {t.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {formatTime12(t.startTime)} &#8211;{" "}
                    {formatTime12(t.endTime)}
                  </p>
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded self-start font-medium">
                    + Add
                  </span>
                </GlassCard>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── RoutineListItem ──────────────────────────────────────────────────────────

function RoutineListItem({
  routine,
  index,
  onEdit,
  onDelete,
  onToggle,
  onTap,
}: {
  routine: ScheduledRoutine;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onTap: () => void;
}) {
  const meta = CATEGORY_META[routine.category];
  const mins = durationMins(routine);
  const nowMins = getCurrentTimeMinutes();
  const active = isActiveNow(routine, nowMins);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      data-ocid={`routine.item.${index + 1}`}
    >
      <GlassCard
        padding="none"
        glow={active}
        className={cn("overflow-hidden", !routine.enabled && "opacity-50")}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div
            className="flex flex-col gap-[3px] opacity-30 shrink-0 cursor-grab"
            title="Drag to reorder (coming soon)"
            aria-hidden="true"
          >
            <div className="w-3.5 h-0.5 bg-muted-foreground rounded-full" />
            <div className="w-3.5 h-0.5 bg-muted-foreground rounded-full" />
            <div className="w-3.5 h-0.5 bg-muted-foreground rounded-full" />
          </div>
          <button
            type="button"
            onClick={onTap}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-smooth",
              active ? "bg-primary/20 gold-glow" : "bg-muted/60",
            )}
            aria-label={`Open ${routine.name}`}
            data-ocid={`routine.open_modal_button.${index + 1}`}
          >
            <span aria-hidden="true">{meta.icon}</span>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={cn(
                  "font-display font-semibold text-sm truncate",
                  active ? "gradient-gold-text" : "text-foreground",
                )}
              >
                {routine.name}
              </span>
              {active && (
                <span className="shrink-0 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-medium">
                  Active
                </span>
              )}
              {routine.done && (
                <span className="shrink-0 text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                  Done
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatTime12(routine.startTime)} &#8211;{" "}
              {formatTime12(routine.endTime)} &middot; {minutesToDisplay(mins)}
            </p>
            <div className="flex gap-1 mt-1 flex-wrap">
              {routine.days.map((d) => (
                <span
                  key={d}
                  className="text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onEdit}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
              aria-label={`Edit ${routine.name}`}
              data-ocid={`routine.edit_button.${index + 1}`}
            >
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 fill-current"
                aria-hidden="true"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
              aria-label={`Delete ${routine.name}`}
              data-ocid={`routine.delete_button.${index + 1}`}
            >
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 fill-current"
                aria-hidden="true"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={routine.enabled}
              onClick={onToggle}
              className={cn(
                "relative w-9 h-5 rounded-full transition-smooth focus-visible:ring-2 focus-visible:ring-ring",
                routine.enabled ? "bg-primary" : "bg-muted",
              )}
              aria-label={`Toggle ${routine.name}`}
              data-ocid={`routine.toggle.${index + 1}`}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform duration-200",
                  routine.enabled ? "translate-x-4" : "translate-x-0",
                )}
              />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Routines() {
  const [routines, setRoutines] = useLocalStorage<ScheduledRoutine[]>(
    "aura-scheduled-routines",
    DEFAULT_ROUTINES,
  );
  const [view, setView] = useState<"timeline" | "list">("timeline");
  const [showTemplates, setShowTemplates] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<ScheduledRoutine | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ScheduledRoutine | null>(
    null,
  );
  const [executionTarget, setExecutionTarget] =
    useState<ScheduledRoutine | null>(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const todayAbbr = getCurrentDayAbbr();
  const todayRoutines = routines.filter(
    (r) => r.enabled && r.days.includes(todayAbbr),
  );
  const doneCount = routines.filter(
    (r) => r.done && r.days.includes(todayAbbr),
  ).length;

  function handleSave(form: RoutineFormState) {
    if (modalMode === "edit" && editTarget) {
      setRoutines((prev) =>
        prev.map((r) => (r.id === editTarget.id ? { ...r, ...form } : r)),
      );
    } else {
      setRoutines((prev) => [
        ...prev,
        { ...form, id: uid(), enabled: true, done: false },
      ]);
    }
    setModalMode(null);
    setEditTarget(null);
  }

  function handleDelete(id: string) {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
    setDeleteTarget(null);
  }

  function handleToggle(id: string) {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
  }

  function handleMarkDone(id: string) {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: true } : r)),
    );
    setExecutionTarget((prev) => (prev ? { ...prev, done: true } : null));
  }

  function handleAddTemplate(t: Omit<ScheduledRoutine, "id" | "done">) {
    setRoutines((prev) => [...prev, { ...t, id: uid(), done: false }]);
  }

  const sortedRoutines = [...routines].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );
  const liveRoutine = executionTarget
    ? (routines.find((r) => r.id === executionTarget.id) ?? executionTarget)
    : null;

  return (
    <div className="max-w-2xl mx-auto pb-24" data-ocid="routines.page">
      <div className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold gradient-gold-text leading-tight">
              Daily Routine
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">{today}</p>
          </div>
          <GoldButton
            type="button"
            size="sm"
            onClick={() => {
              setEditTarget(null);
              setModalMode("add");
            }}
            data-ocid="routine.add_button"
          >
            + New
          </GoldButton>
        </div>

        <GlassCard padding="sm" className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Today's Progress
            </span>
            <span className="text-xs font-semibold text-primary">
              {doneCount}/{todayRoutines.length} done
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: "0%" }}
              animate={{
                width:
                  todayRoutines.length > 0
                    ? `${(doneCount / todayRoutines.length) * 100}%`
                    : "0%",
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </GlassCard>

        <div className="flex items-center gap-2 mt-4">
          <div
            className="flex items-center bg-muted/60 rounded-xl p-1 gap-1"
            data-ocid="routine.view_toggle"
          >
            {(["timeline", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth capitalize",
                  view === v
                    ? "bg-primary text-primary-foreground gold-glow"
                    : "text-muted-foreground hover:text-foreground",
                )}
                data-ocid={`routine.${v}_tab`}
              >
                {v === "timeline"
                  ? "\uD83D\uDCC5 Timeline"
                  : "\uD83D\uDCCB List"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowTemplates((s) => !s)}
            className={cn(
              "ml-auto px-3 py-1.5 rounded-xl text-xs font-semibold border transition-smooth",
              showTemplates
                ? "border-primary/60 text-primary bg-primary/10"
                : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border",
            )}
            data-ocid="routine.templates_toggle"
          >
            &#x2728; Templates
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden mb-5"
          >
            <TemplatesSection
              onAdd={(t) => {
                handleAddTemplate(t);
                setShowTemplates(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === "timeline" ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TimelineView
              routines={sortedRoutines}
              onTap={setExecutionTarget}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2.5"
          >
            <AnimatePresence>
              {sortedRoutines.length === 0 ? (
                <GlassCard
                  padding="lg"
                  className="text-center"
                  data-ocid="routine.empty_state"
                >
                  <div className="text-4xl mb-3" aria-hidden="true">
                    &#x1F4C5;
                  </div>
                  <p className="font-display font-semibold text-foreground mb-1">
                    No routines yet
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add your first routine or pick a starter template
                  </p>
                  <GoldButton
                    type="button"
                    size="sm"
                    onClick={() => setShowTemplates(true)}
                    data-ocid="routine.templates_cta_button"
                  >
                    Browse Templates
                  </GoldButton>
                </GlassCard>
              ) : (
                sortedRoutines.map((r, i) => (
                  <RoutineListItem
                    key={r.id}
                    routine={r}
                    index={i}
                    onEdit={() => {
                      setEditTarget(r);
                      setModalMode("edit");
                    }}
                    onDelete={() => setDeleteTarget(r)}
                    onToggle={() => handleToggle(r.id)}
                    onTap={() => setExecutionTarget(r)}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(modalMode === "add" || modalMode === "edit") && (
          <RoutineModal
            initial={modalMode === "edit" ? editTarget : null}
            onSave={handleSave}
            onClose={() => {
              setModalMode(null);
              setEditTarget(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirm
            name={deleteTarget.name}
            onConfirm={() => handleDelete(deleteTarget.id)}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {liveRoutine && (
          <ExecutionPanel
            routine={liveRoutine}
            onMarkDone={() => handleMarkDone(liveRoutine.id)}
            onClose={() => setExecutionTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
