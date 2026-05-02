import { c as createLucideIcon, u as useAppStore, a as useRouter, b as useLocalStorage, r as reactExports, j as jsxRuntimeExports, m as motion, G as GoldButton, T as Target } from "./index-CBgNZDlk.js";
import { G as GlassCard } from "./GlassCard-Ft1dy7gz.js";
import { G as GoldBadge } from "./GoldBadge-DMLsRV-h.js";
import { P as ProgressBar, T as TrendingUp } from "./ProgressBar-DgTpRB2T.js";
import { F as Flame, Z as Zap } from "./zap-DuJHAryu.js";
import { T as Timer } from "./timer-CmAqi-o_.js";
import { C as CircleCheck } from "./circle-check-CYPGWPeU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4", key: "10igwf" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M12 13h4", key: "1ku699" }],
  ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1", key: "105ag5" }],
  ["path", { d: "M12 8h8", key: "1lhi5i" }],
  ["path", { d: "M16 8V5a2 2 0 0 1 2-2", key: "u6izg6" }],
  ["circle", { cx: "16", cy: "13", r: ".5", key: "ry7gng" }],
  ["circle", { cx: "18", cy: "3", r: ".5", key: "1aiba7" }],
  ["circle", { cx: "20", cy: "21", r: ".5", key: "yhc1fs" }],
  ["circle", { cx: "20", cy: "8", r: ".5", key: "1e43v0" }]
];
const BrainCircuit = createLucideIcon("brain-circuit", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["path", { d: "m4.93 10.93 1.41 1.41", key: "2a7f42" }],
  ["path", { d: "M2 18h2", key: "j10viu" }],
  ["path", { d: "M20 18h2", key: "wocana" }],
  ["path", { d: "m19.07 10.93-1.41 1.41", key: "15zs5n" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }],
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M16 18a4 4 0 0 0-8 0", key: "1lzouq" }]
];
const Sunrise = createLucideIcon("sunrise", __iconNode);
const SEED_ROUTINES = [
  {
    id: "r1",
    title: "Morning Momentum",
    description: "Kickstart your day with energy",
    icon: "sunrise",
    timeOfDay: "morning",
    duration: 45,
    steps: [],
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: "r2",
    title: "Deep Work Flow",
    description: "90-min focused work session",
    icon: "brain",
    timeOfDay: "afternoon",
    duration: 90,
    steps: [],
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: "r3",
    title: "Evening Reflection",
    description: "Wind down and review your day",
    icon: "moon",
    timeOfDay: "evening",
    duration: 20,
    steps: [],
    isActive: true,
    createdAt: Date.now()
  }
];
const SEED_TASKS = [
  {
    id: "t1",
    title: "Review project roadmap",
    completed: true,
    priority: "high",
    category: "Work",
    createdAt: Date.now()
  },
  {
    id: "t2",
    title: "30-min workout session",
    completed: true,
    priority: "high",
    category: "Health",
    createdAt: Date.now()
  },
  {
    id: "t3",
    title: "Read 20 pages",
    completed: true,
    priority: "medium",
    category: "Learning",
    createdAt: Date.now()
  },
  {
    id: "t4",
    title: "Plan tomorrow's schedule",
    completed: false,
    priority: "medium",
    category: "Planning",
    createdAt: Date.now()
  },
  {
    id: "t5",
    title: "Meditate for 10 minutes",
    completed: false,
    priority: "low",
    category: "Mindfulness",
    createdAt: Date.now()
  }
];
const SEED_GOALS = [
  {
    id: "g1",
    title: "Run a 5K",
    description: "Build stamina through consistent training",
    targetDate: Date.now() + 30 * 24 * 60 * 60 * 1e3,
    progress: 68,
    milestones: [],
    category: "Fitness",
    createdAt: Date.now()
  },
  {
    id: "g2",
    title: "Read 24 books this year",
    description: "Two books per month to expand knowledge",
    targetDate: Date.now() + 90 * 24 * 60 * 60 * 1e3,
    progress: 42,
    milestones: [],
    category: "Learning",
    createdAt: Date.now()
  },
  {
    id: "g3",
    title: "Launch side project",
    description: "Build and ship a profitable product",
    targetDate: Date.now() + 60 * 24 * 60 * 60 * 1e3,
    progress: 25,
    milestones: [],
    category: "Career",
    createdAt: Date.now()
  }
];
const AI_SUGGESTIONS = [
  {
    quote: "Your morning routine is 80% consistent this week. Small daily wins compound into extraordinary results.",
    tip: "Try adding 5 minutes of journaling after meditation."
  },
  {
    quote: "Champions aren't made in the gym — they're made from the stuff inside them.",
    tip: "You're on a 12-day streak. Keep the momentum alive!"
  },
  {
    quote: "Focus is the art of knowing what to ignore.",
    tip: "Schedule your deep work session before 11 AM for peak performance."
  }
];
function getGreeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function getRoutineTime(tod) {
  const map = {
    morning: "07:00 AM",
    afternoon: "01:00 PM",
    evening: "07:00 PM",
    night: "09:30 PM"
  };
  return map[tod];
}
function getRoutineIcon(icon) {
  if (icon === "sunrise") return /* @__PURE__ */ jsxRuntimeExports.jsx(Sunrise, { size: 18, className: "text-primary" });
  if (icon === "brain")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { size: 18, className: "text-primary" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18, className: "text-primary" });
}
const categoryColors = {
  Fitness: "bg-emerald-500/20 text-emerald-400",
  Learning: "bg-blue-500/20 text-blue-400",
  Career: "bg-purple-500/20 text-purple-400",
  Health: "bg-rose-500/20 text-rose-400",
  Mindfulness: "bg-cyan-500/20 text-cyan-400"
};
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
function TaskRing({ done, total }) {
  const pct = total > 0 ? done / total * 100 : 0;
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = pct / 100 * circ;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      "aria-label": `${done} of ${total} tasks done`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "80", height: "80", viewBox: "0 0 80 80", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "40",
              cy: "40",
              r,
              fill: "none",
              stroke: "oklch(var(--muted))",
              strokeWidth: "6"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "40",
              cy: "40",
              r,
              fill: "none",
              stroke: "oklch(var(--primary))",
              strokeWidth: "6",
              strokeLinecap: "round",
              strokeDasharray: `${dash} ${circ}`,
              transform: "rotate(-90 40 40)",
              className: "transition-all duration-700 ease-out",
              style: { filter: "drop-shadow(0 0 6px oklch(var(--primary) / 0.6))" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold font-display text-foreground leading-none", children: done }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
            "/",
            total
          ] })
        ] })
      ]
    }
  );
}
function Dashboard() {
  const { profile } = useAppStore();
  const { navigate } = useRouter();
  const [routines] = useLocalStorage("aura-routines", SEED_ROUTINES);
  const [tasks] = useLocalStorage("aura-tasks", SEED_TASKS);
  const [goals] = useLocalStorage("aura-goals", SEED_GOALS);
  const now = /* @__PURE__ */ new Date();
  const suggestion = reactExports.useMemo(
    () => AI_SUGGESTIONS[(/* @__PURE__ */ new Date()).getDate() % AI_SUGGESTIONS.length],
    []
  );
  const doneTasks = tasks.filter((t) => t.completed).length;
  const upcomingRoutines = routines.filter((r) => r.isActive).slice(0, 3);
  const topGoals = goals.slice(0, 3);
  const streak = profile.stats.streakDays;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: staggerContainer,
      initial: "hidden",
      animate: "show",
      className: "space-y-4 pb-2",
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: cardItem, "data-ocid": "dashboard.greeting.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "lg", className: "relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-body mb-0.5", children: [
                getGreeting(),
                ","
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold gradient-gold-text truncate", children: profile.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                now.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                }),
                " · ",
                formatTime(now)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-0.5 shrink-0 ml-3",
                "data-ocid": "dashboard.streak.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-primary/15 border border-primary/30 rounded-xl px-2.5 py-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 16, className: "text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-base leading-none", children: streak })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "day streak" })
                ]
              }
            )
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: cardItem, className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "md", "data-ocid": "dashboard.tasks.card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Today’s Tasks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TaskRing, { done: doneTasks, total: tasks.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-body text-foreground leading-snug", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary font-display", children: doneTasks }),
                  " of ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: tasks.length })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "tasks done" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate("/tasks"),
                    className: "mt-2 text-xs text-primary hover:underline font-display",
                    "data-ocid": "dashboard.view_tasks.link",
                    children: "View all →"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              padding: "md",
              hover: true,
              className: "flex flex-col justify-between",
              "data-ocid": "dashboard.focus.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 16, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider", children: "Focus" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-body leading-snug", children: [
                    profile.stats.focusMinutesToday,
                    " min"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "logged today" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    GoldButton,
                    {
                      size: "sm",
                      onClick: () => navigate("/routines"),
                      className: "w-full",
                      "data-ocid": "dashboard.focus.start_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 12 }),
                        "Start"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: cardItem, "data-ocid": "dashboard.routines.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-4 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sunrise, { size: 16, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-foreground", children: "Daily Routine" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate("/routines"),
                className: "text-xs text-primary hover:underline font-display",
                "data-ocid": "dashboard.routines.view_all.link",
                children: "See all"
              }
            )
          ] }),
          upcomingRoutines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-4 pb-4 text-center py-6",
              "data-ocid": "dashboard.routines.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No routines yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate("/routines"),
                    className: "text-xs text-primary mt-1 hover:underline font-display",
                    "data-ocid": "dashboard.routines.add_button",
                    children: "+ Add your first routine"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border/30 px-4 pb-3", children: upcomingRoutines.map((routine, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-center gap-3 py-2.5",
              "data-ocid": `dashboard.routine.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 shrink-0", children: getRoutineIcon(routine.icon) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground truncate", children: routine.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    getRoutineTime(routine.timeOfDay),
                    " · ",
                    routine.duration,
                    " ",
                    "min"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(GoldBadge, { variant: "muted", className: "shrink-0 capitalize", children: routine.timeOfDay })
              ]
            },
            routine.id
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: cardItem, "data-ocid": "dashboard.goals.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-4 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 16, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-foreground", children: "Active Goals" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate("/tasks"),
                className: "text-xs text-primary hover:underline font-display",
                "data-ocid": "dashboard.goals.view_all.link",
                children: "See all"
              }
            )
          ] }),
          topGoals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-4 pb-4 text-center py-6",
              "data-ocid": "dashboard.goals.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No goals set yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate("/tasks"),
                    className: "text-xs text-primary mt-1 hover:underline font-display",
                    "data-ocid": "dashboard.goals.add_button",
                    children: "+ Set your first goal"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "px-4 pb-3", children: topGoals.map((goal, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "py-2.5 border-b border-border/30 last:border-0",
              "data-ocid": `dashboard.goal.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] font-medium px-1.5 py-0.5 rounded-md ${categoryColors[goal.category] ?? "bg-muted text-muted-foreground"}`,
                        children: goal.category
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display text-foreground truncate", children: goal.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary font-display shrink-0 ml-2", children: [
                    goal.progress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: goal.progress, size: "sm", animated: true })
              ]
            },
            goal.id
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: cardItem, "data-ocid": "dashboard.ai_suggestion.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            glow: true,
            padding: "lg",
            className: "relative overflow-hidden border border-primary/30",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 15, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-semibold uppercase tracking-wider text-primary", children: "AURA Insight" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-body text-foreground/90 italic leading-relaxed mb-3", children: [
                  "“",
                  suggestion.quote,
                  "”"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-muted/30 rounded-lg p-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14, className: "text-primary shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-snug", children: suggestion.tip })
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: cardItem, "data-ocid": "dashboard.quick_actions.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Quick Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate("/chat"),
                className: "flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth group",
                "data-ocid": "dashboard.quick_action.chat.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    BrainCircuit,
                    {
                      size: 20,
                      className: "text-muted-foreground group-hover:text-primary transition-smooth"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-display text-muted-foreground group-hover:text-foreground transition-smooth", children: "AI Chat" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate("/tasks"),
                className: "flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth group",
                "data-ocid": "dashboard.quick_action.tasks.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      size: 20,
                      className: "text-muted-foreground group-hover:text-primary transition-smooth"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-display text-muted-foreground group-hover:text-foreground transition-smooth", children: "Tasks" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate("/routines"),
                className: "flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth group",
                "data-ocid": "dashboard.quick_action.routines.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Zap,
                    {
                      size: 20,
                      className: "text-muted-foreground group-hover:text-primary transition-smooth"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-display text-muted-foreground group-hover:text-foreground transition-smooth", children: "Routines" })
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.p,
          {
            variants: cardItem,
            className: "text-center text-[11px] text-muted-foreground/50 pb-2 font-body",
            children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " · Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-primary/70 hover:text-primary transition-smooth",
                  children: "caffeine.ai"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  Dashboard as default
};
