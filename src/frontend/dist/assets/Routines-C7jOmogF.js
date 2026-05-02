import { b as useLocalStorage, r as reactExports, j as jsxRuntimeExports, G as GoldButton, m as motion, d as cn, A as AnimatePresence } from "./index-CBgNZDlk.js";
import { G as GlassCard } from "./GlassCard-Ft1dy7gz.js";
const CATEGORY_META = {
  morning: { icon: "🌅", label: "Morning", color: "text-amber-400" },
  workout: {
    icon: "🏋️",
    label: "Workout",
    color: "text-orange-400"
  },
  work: { icon: "💼", label: "Work", color: "text-blue-400" },
  evening: { icon: "🌙", label: "Evening", color: "text-violet-400" },
  sleep: { icon: "😴", label: "Sleep", color: "text-indigo-400" },
  custom: { icon: "⚡", label: "Custom", color: "text-primary" }
};
const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TEMPLATES = [
  {
    name: "Morning Power",
    startTime: "06:00",
    endTime: "07:30",
    category: "morning",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true
  },
  {
    name: "Work Focus Block",
    startTime: "09:00",
    endTime: "12:00",
    category: "work",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true
  },
  {
    name: "Evening Wind-Down",
    startTime: "19:00",
    endTime: "20:30",
    category: "evening",
    days: ALL_DAYS,
    enabled: true
  },
  {
    name: "Sleep Prep",
    startTime: "22:00",
    endTime: "22:30",
    category: "sleep",
    days: ALL_DAYS,
    enabled: true
  }
];
const DEFAULT_ROUTINES = [
  {
    id: "r1",
    name: "Morning Power",
    startTime: "06:00",
    endTime: "07:30",
    category: "morning",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
    done: false
  },
  {
    id: "r2",
    name: "Gym Session",
    startTime: "07:45",
    endTime: "09:00",
    category: "workout",
    days: ["Mon", "Wed", "Fri"],
    enabled: true,
    done: false
  },
  {
    id: "r3",
    name: "Deep Work Block",
    startTime: "09:30",
    endTime: "12:00",
    category: "work",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
    done: false
  },
  {
    id: "r4",
    name: "Lunch Break",
    startTime: "12:00",
    endTime: "13:00",
    category: "custom",
    days: ALL_DAYS,
    enabled: true,
    done: false
  },
  {
    id: "r5",
    name: "Afternoon Focus",
    startTime: "13:00",
    endTime: "17:00",
    category: "work",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
    done: false
  },
  {
    id: "r6",
    name: "Evening Wind-Down",
    startTime: "19:00",
    endTime: "20:30",
    category: "evening",
    days: ALL_DAYS,
    enabled: true,
    done: false
  },
  {
    id: "r7",
    name: "Sleep Prep",
    startTime: "22:00",
    endTime: "22:30",
    category: "sleep",
    days: ALL_DAYS,
    enabled: true,
    done: false
  }
];
function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}
function minutesToDisplay(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}
function durationMins(r) {
  return Math.max(0, timeToMinutes(r.endTime) - timeToMinutes(r.startTime));
}
function formatTime12(t) {
  const [hStr, mStr] = t.split(":");
  let h = Number(hStr);
  const m = mStr ?? "00";
  const ampm = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${m} ${ampm}`;
}
function getCurrentDayAbbr() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[(/* @__PURE__ */ new Date()).getDay()] ?? "Mon";
}
function getCurrentTimeMinutes() {
  const now = /* @__PURE__ */ new Date();
  return now.getHours() * 60 + now.getMinutes();
}
function isActiveNow(r, nowMins) {
  return nowMins >= timeToMinutes(r.startTime) && nowMins < timeToMinutes(r.endTime);
}
function uid() {
  return Math.random().toString(36).slice(2, 10);
}
const PX_PER_HOUR = 72;
const TIMELINE_START = 5;
const TIMELINE_END = 24;
const TIMELINE_HOURS = TIMELINE_END - TIMELINE_START;
function timelineTop(t) {
  return (timeToMinutes(t) / 60 - TIMELINE_START) * PX_PER_HOUR;
}
function TimelineMarker({ hour, top }) {
  const label = hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute left-0 right-0 flex items-center gap-2 pointer-events-none",
      style: { top },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-10 text-right select-none shrink-0", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/30" })
      ]
    }
  );
}
function RoutineBlock({
  routine,
  top,
  height,
  active,
  onTap
}) {
  const meta = CATEGORY_META[routine.category];
  const mins = durationMins(routine);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      className: cn(
        "absolute left-14 right-0 rounded-xl px-3 py-2 text-left overflow-hidden",
        active ? "glassmorphism gold-glow border border-primary/60" : "glassmorphism border border-border/20 opacity-80",
        routine.done && "opacity-50",
        !routine.enabled && "opacity-30"
      ),
      style: { top, height: Math.max(height, 48) },
      whileHover: { scale: 1.01, x: 2 },
      whileTap: { scale: 0.98 },
      onClick: onTap,
      "data-ocid": `routine.block.${routine.id}`,
      children: [
        active && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "absolute top-1.5 right-2 flex h-2 w-2",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-primary" })
            ]
          }
        ),
        routine.done && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-2 text-xs text-primary", children: "Done" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none shrink-0", "aria-hidden": "true", children: meta.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "font-display font-semibold text-xs truncate",
                active ? "gradient-gold-text" : "text-foreground"
              ),
              children: routine.name
            }
          )
        ] }),
        height >= 60 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          formatTime12(routine.startTime),
          " · ",
          minutesToDisplay(mins)
        ] })
      ]
    }
  );
}
function TimelineView({
  routines,
  onTap
}) {
  const nowMins = getCurrentTimeMinutes();
  const nowTop = (nowMins / 60 - TIMELINE_START) * PX_PER_HOUR;
  const totalHeight = TIMELINE_HOURS * PX_PER_HOUR;
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = Math.max(0, nowTop - 80);
    }
  }, [nowTop]);
  const todayAbbr = getCurrentDayAbbr();
  const todayRoutines = routines.filter(
    (r) => r.enabled && r.days.includes(todayAbbr)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: scrollRef,
      className: "relative overflow-y-auto scrollbar-none",
      style: { height: "calc(100vh - 300px)", minHeight: 320 },
      "data-ocid": "routine.timeline",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { height: totalHeight }, children: [
        Array.from({ length: TIMELINE_HOURS + 1 }, (_, i) => {
          const h = TIMELINE_START + i;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineMarker, { hour: h, top: i * PX_PER_HOUR }, h);
        }),
        todayRoutines.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RoutineBlock,
          {
            routine: r,
            top: timelineTop(r.startTime),
            height: durationMins(r) / 60 * PX_PER_HOUR,
            active: isActiveNow(r, nowMins),
            onTap: () => onTap(r)
          },
          r.id
        )),
        nowTop >= 0 && nowTop <= totalHeight && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute left-10 right-0 flex items-center gap-1 z-10 pointer-events-none",
            style: { top: nowTop },
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary gold-glow shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-primary/60" })
            ]
          }
        )
      ] })
    }
  );
}
const EMPTY_FORM = {
  name: "",
  startTime: "08:00",
  endTime: "09:00",
  category: "morning",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"]
};
function RoutineModal({
  initial,
  onSave,
  onClose
}) {
  const [form, setForm] = reactExports.useState(
    initial ? {
      name: initial.name,
      startTime: initial.startTime,
      endTime: initial.endTime,
      category: initial.category,
      days: initial.days
    } : EMPTY_FORM
  );
  const toggleDay = (day) => setForm((f) => ({
    ...f,
    days: f.days.includes(day) ? f.days.filter((d) => d !== day) : [...f.days, day]
  }));
  const timeError = !!form.startTime && !!form.endTime && timeToMinutes(form.endTime) <= timeToMinutes(form.startTime);
  const isValid = form.name.trim().length > 0 && form.days.length > 0 && !timeError;
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4",
      "data-ocid": "routine.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative w-full max-w-md",
            initial: { y: 40, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 40, opacity: 0 },
            transition: { ease: "easeOut", duration: 0.25 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "lg", glow: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold gradient-gold-text", children: initial ? "Edit Routine" : "New Routine" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth",
                    "aria-label": "Close modal",
                    "data-ocid": "routine.close_button",
                    children: "✕"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "routine-name",
                      className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
                      children: "Activity Name"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "routine-name",
                      type: "text",
                      placeholder: "e.g. Morning Meditation",
                      value: form.name,
                      onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                      className: "w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border/40 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth",
                      "data-ocid": "routine.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "routine-category",
                      className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
                      children: "Category"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "routine-category",
                      value: form.category,
                      onChange: (e) => setForm((f) => ({
                        ...f,
                        category: e.target.value
                      })),
                      className: "w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border/40 text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth",
                      "data-ocid": "routine.select",
                      children: Object.entries(CATEGORY_META).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: k, children: [
                        v.icon,
                        " ",
                        v.label
                      ] }, k))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "routine-start",
                        className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
                        children: "Start Time"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "routine-start",
                        type: "time",
                        value: form.startTime,
                        onChange: (e) => setForm((f) => ({ ...f, startTime: e.target.value })),
                        className: "w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border/40 text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth",
                        "data-ocid": "routine.start_time_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "routine-end",
                        className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
                        children: "End Time"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "routine-end",
                        type: "time",
                        value: form.endTime,
                        onChange: (e) => setForm((f) => ({ ...f, endTime: e.target.value })),
                        className: "w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border/40 text-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth",
                        "data-ocid": "routine.end_time_input"
                      }
                    )
                  ] })
                ] }),
                timeError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "routine.field_error",
                    children: "End time must be after start time"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block", children: "Repeat Days" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: ALL_DAYS.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleDay(day),
                      className: cn(
                        "w-9 h-9 rounded-lg text-xs font-semibold transition-smooth focus-visible:ring-2 focus-visible:ring-ring",
                        form.days.includes(day) ? "bg-primary text-primary-foreground gold-glow" : "bg-muted/60 text-muted-foreground hover:bg-muted"
                      ),
                      "aria-pressed": form.days.includes(day),
                      "data-ocid": `routine.day_toggle.${day.toLowerCase()}`,
                      children: day
                    },
                    day
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GoldButton,
                  {
                    type: "button",
                    variant: "outline",
                    size: "md",
                    className: "flex-1",
                    onClick: onClose,
                    "data-ocid": "routine.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GoldButton,
                  {
                    type: "button",
                    size: "md",
                    className: "flex-1",
                    disabled: !isValid,
                    onClick: () => isValid && onSave(form),
                    "data-ocid": "routine.submit_button",
                    children: initial ? "Save Changes" : "Add Routine"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function DeleteConfirm({
  name,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "routine.delete_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
            onClick: onCancel,
            onKeyDown: (e) => e.key === "Escape" && onCancel(),
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative w-full max-w-sm",
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { ease: "easeOut", duration: 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "lg", glow: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground mb-2", children: "Delete Routine?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: name }),
                " will be permanently removed."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GoldButton,
                  {
                    type: "button",
                    variant: "outline",
                    size: "md",
                    className: "flex-1",
                    onClick: onCancel,
                    "data-ocid": "routine.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onConfirm,
                    className: "flex-1 px-5 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold transition-smooth hover:opacity-90",
                    "data-ocid": "routine.confirm_button",
                    children: "Delete"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function ExecutionPanel({
  routine,
  onMarkDone,
  onClose
}) {
  const meta = CATEGORY_META[routine.category];
  const mins = durationMins(routine);
  const nowMins = getCurrentTimeMinutes();
  const active = isActiveNow(routine, nowMins);
  const elapsed = active ? Math.max(0, nowMins - timeToMinutes(routine.startTime)) : 0;
  const progress = mins > 0 ? Math.min(100, elapsed / mins * 100) : 0;
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4",
      "data-ocid": "routine.execution_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/80 backdrop-blur-md",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative w-full max-w-sm",
            initial: { y: 60, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 60, opacity: 0 },
            transition: { ease: "easeOut", duration: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "lg", glow: active, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth",
                  "aria-label": "Close panel",
                  "data-ocid": "routine.close_button",
                  children: "✕"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", "aria-hidden": "true", children: meta.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: cn(
                      "font-display text-xl font-bold",
                      active ? "gradient-gold-text" : "text-foreground"
                    ),
                    children: routine.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  formatTime12(routine.startTime),
                  " –",
                  " ",
                  formatTime12(routine.endTime),
                  " · ",
                  minutesToDisplay(mins)
                ] })
              ] }),
              active && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    Math.round(progress),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full rounded-full bg-primary gold-glow",
                    initial: { width: "0%" },
                    animate: { width: `${progress}%` },
                    transition: { duration: 0.8, ease: "easeOut" }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5 text-center", children: [
                  minutesToDisplay(elapsed),
                  " elapsed ·",
                  " ",
                  minutesToDisplay(mins - elapsed),
                  " remaining"
                ] })
              ] }),
              !active && !routine.done && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-5 text-sm text-muted-foreground", children: [
                "Starts at",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatTime12(routine.startTime) })
              ] }),
              routine.done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", "aria-hidden": "true", children: "🏆" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary mt-1", children: "Completed!" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                GoldButton,
                {
                  type: "button",
                  size: "lg",
                  className: "w-full",
                  onClick: onMarkDone,
                  "data-ocid": "routine.mark_done_button",
                  children: "✓ Mark as Done"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
function TemplatesSection({
  onAdd
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "routine.templates_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Starter Templates" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: TEMPLATES.map((t, i) => {
      const meta = CATEGORY_META[t.category];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07, duration: 0.25 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-left w-full",
              onClick: () => onAdd(t),
              "data-ocid": `routine.template.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { hover: true, padding: "sm", className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", "aria-hidden": "true", children: meta.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-xs text-foreground truncate", children: t.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                  formatTime12(t.startTime),
                  " –",
                  " ",
                  formatTime12(t.endTime)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded self-start font-medium", children: "+ Add" })
              ] })
            }
          )
        },
        t.name
      );
    }) })
  ] });
}
function RoutineListItem({
  routine,
  index,
  onEdit,
  onDelete,
  onToggle,
  onTap
}) {
  const meta = CATEGORY_META[routine.category];
  const mins = durationMins(routine);
  const nowMins = getCurrentTimeMinutes();
  const active = isActiveNow(routine, nowMins);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.2, delay: index * 0.04 },
      "data-ocid": `routine.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassCard,
        {
          padding: "none",
          glow: active,
          className: cn("overflow-hidden", !routine.enabled && "opacity-50"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col gap-[3px] opacity-30 shrink-0 cursor-grab",
                title: "Drag to reorder (coming soon)",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-0.5 bg-muted-foreground rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-0.5 bg-muted-foreground rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-0.5 bg-muted-foreground rounded-full" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onTap,
                className: cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-smooth",
                  active ? "bg-primary/20 gold-glow" : "bg-muted/60"
                ),
                "aria-label": `Open ${routine.name}`,
                "data-ocid": `routine.open_modal_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: meta.icon })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "font-display font-semibold text-sm truncate",
                      active ? "gradient-gold-text" : "text-foreground"
                    ),
                    children: routine.name
                  }
                ),
                active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-medium", children: "Active" }),
                routine.done && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full", children: "Done" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                formatTime12(routine.startTime),
                " –",
                " ",
                formatTime12(routine.endTime),
                " · ",
                minutesToDisplay(mins)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mt-1 flex-wrap", children: routine.days.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded",
                  children: d
                },
                d
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onEdit,
                  className: "p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
                  "aria-label": `Edit ${routine.name}`,
                  "data-ocid": `routine.edit_button.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      viewBox: "0 0 16 16",
                      className: "w-3.5 h-3.5 fill-current",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onDelete,
                  className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                  "aria-label": `Delete ${routine.name}`,
                  "data-ocid": `routine.delete_button.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      viewBox: "0 0 16 16",
                      className: "w-3.5 h-3.5 fill-current",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            fillRule: "evenodd",
                            d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": routine.enabled,
                  onClick: onToggle,
                  className: cn(
                    "relative w-9 h-5 rounded-full transition-smooth focus-visible:ring-2 focus-visible:ring-ring",
                    routine.enabled ? "bg-primary" : "bg-muted"
                  ),
                  "aria-label": `Toggle ${routine.name}`,
                  "data-ocid": `routine.toggle.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform duration-200",
                        routine.enabled ? "translate-x-4" : "translate-x-0"
                      )
                    }
                  )
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
function Routines() {
  const [routines, setRoutines] = useLocalStorage(
    "aura-scheduled-routines",
    DEFAULT_ROUTINES
  );
  const [view, setView] = reactExports.useState("timeline");
  const [showTemplates, setShowTemplates] = reactExports.useState(false);
  const [modalMode, setModalMode] = reactExports.useState(null);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(
    null
  );
  const [executionTarget, setExecutionTarget] = reactExports.useState(null);
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  const todayAbbr = getCurrentDayAbbr();
  const todayRoutines = routines.filter(
    (r) => r.enabled && r.days.includes(todayAbbr)
  );
  const doneCount = routines.filter(
    (r) => r.done && r.days.includes(todayAbbr)
  ).length;
  function handleSave(form) {
    if (modalMode === "edit" && editTarget) {
      setRoutines(
        (prev) => prev.map((r) => r.id === editTarget.id ? { ...r, ...form } : r)
      );
    } else {
      setRoutines((prev) => [
        ...prev,
        { ...form, id: uid(), enabled: true, done: false }
      ]);
    }
    setModalMode(null);
    setEditTarget(null);
  }
  function handleDelete(id) {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
    setDeleteTarget(null);
  }
  function handleToggle(id) {
    setRoutines(
      (prev) => prev.map((r) => r.id === id ? { ...r, enabled: !r.enabled } : r)
    );
  }
  function handleMarkDone(id) {
    setRoutines(
      (prev) => prev.map((r) => r.id === id ? { ...r, done: true } : r)
    );
    setExecutionTarget((prev) => prev ? { ...prev, done: true } : null);
  }
  function handleAddTemplate(t) {
    setRoutines((prev) => [...prev, { ...t, id: uid(), done: false }]);
  }
  const sortedRoutines = [...routines].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );
  const liveRoutine = executionTarget ? routines.find((r) => r.id === executionTarget.id) ?? executionTarget : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto pb-24", "data-ocid": "routines.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold gradient-gold-text leading-tight", children: "Daily Routine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: today })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GoldButton,
          {
            type: "button",
            size: "sm",
            onClick: () => {
              setEditTarget(null);
              setModalMode("add");
            },
            "data-ocid": "routine.add_button",
            children: "+ New"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "sm", className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Today's Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary", children: [
            doneCount,
            "/",
            todayRoutines.length,
            " done"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full rounded-full bg-primary",
            initial: { width: "0%" },
            animate: {
              width: todayRoutines.length > 0 ? `${doneCount / todayRoutines.length * 100}%` : "0%"
            },
            transition: { duration: 0.8, ease: "easeOut" }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center bg-muted/60 rounded-xl p-1 gap-1",
            "data-ocid": "routine.view_toggle",
            children: ["timeline", "list"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setView(v),
                className: cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth capitalize",
                  view === v ? "bg-primary text-primary-foreground gold-glow" : "text-muted-foreground hover:text-foreground"
                ),
                "data-ocid": `routine.${v}_tab`,
                children: v === "timeline" ? "📅 Timeline" : "📋 List"
              },
              v
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowTemplates((s) => !s),
            className: cn(
              "ml-auto px-3 py-1.5 rounded-xl text-xs font-semibold border transition-smooth",
              showTemplates ? "border-primary/60 text-primary bg-primary/10" : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
            ),
            "data-ocid": "routine.templates_toggle",
            children: "✨ Templates"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showTemplates && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.25, ease: "easeOut" },
        className: "overflow-hidden mb-5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TemplatesSection,
          {
            onAdd: (t) => {
              handleAddTemplate(t);
              setShowTemplates(false);
            }
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: view === "timeline" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TimelineView,
          {
            routines: sortedRoutines,
            onTap: setExecutionTarget
          }
        )
      },
      "timeline"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "space-y-2.5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sortedRoutines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            padding: "lg",
            className: "text-center",
            "data-ocid": "routine.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", "aria-hidden": "true", children: "📅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No routines yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Add your first routine or pick a starter template" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GoldButton,
                {
                  type: "button",
                  size: "sm",
                  onClick: () => setShowTemplates(true),
                  "data-ocid": "routine.templates_cta_button",
                  children: "Browse Templates"
                }
              )
            ]
          }
        ) : sortedRoutines.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          RoutineListItem,
          {
            routine: r,
            index: i,
            onEdit: () => {
              setEditTarget(r);
              setModalMode("edit");
            },
            onDelete: () => setDeleteTarget(r),
            onToggle: () => handleToggle(r.id),
            onTap: () => setExecutionTarget(r)
          },
          r.id
        )) })
      },
      "list"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: (modalMode === "add" || modalMode === "edit") && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RoutineModal,
      {
        initial: modalMode === "edit" ? editTarget : null,
        onSave: handleSave,
        onClose: () => {
          setModalMode(null);
          setEditTarget(null);
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        name: deleteTarget.name,
        onConfirm: () => handleDelete(deleteTarget.id),
        onCancel: () => setDeleteTarget(null)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: liveRoutine && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExecutionPanel,
      {
        routine: liveRoutine,
        onMarkDone: () => handleMarkDone(liveRoutine.id),
        onClose: () => setExecutionTarget(null)
      }
    ) })
  ] });
}
export {
  Routines as default
};
