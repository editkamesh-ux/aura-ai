import { c as createLucideIcon, u as useAppStore, b as useLocalStorage, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, S as Sparkles, T as Target, m as motion, G as GoldButton } from "./index-CBgNZDlk.js";
import { G as GlassCard } from "./GlassCard-Ft1dy7gz.js";
import { G as GoldBadge } from "./GoldBadge-DMLsRV-h.js";
import { T as Timer } from "./timer-CmAqi-o_.js";
import { R as RotateCcw, D as Dumbbell } from "./rotate-ccw-B_rybdwc.js";
import { Z as Zap, F as Flame } from "./zap-DuJHAryu.js";
import { C as CircleCheck } from "./circle-check-CYPGWPeU.js";
import { X } from "./x-CnhfiOg3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
];
const Focus = createLucideIcon("focus", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { x: "3", y: "5", width: "6", height: "6", rx: "1", key: "1defrl" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
];
const ListTodo = createLucideIcon("list-todo", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const Mic = createLucideIcon("mic", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const QUICK_PROMPTS = [
  { label: "Generate today plan", icon: Zap, ocid: "chat.quick.plan" },
  { label: "Motivate me", icon: Flame, ocid: "chat.quick.motivate" },
  { label: "Suggest workout", icon: Dumbbell, ocid: "chat.quick.workout" },
  { label: "Review my goals", icon: Target, ocid: "chat.quick.goals" }
];
const FOCUS_MODES = [
  { id: "pomodoro", label: "Pomodoro", minutes: 25, icon: Timer },
  { id: "deep-work", label: "Deep Work", minutes: 90, icon: Focus },
  { id: "break", label: "Break", minutes: 5, icon: CircleCheck }
];
function getMockResponse(message, context) {
  const lower = message.toLowerCase();
  if (/plan|today|schedule|morning|routine/.test(lower)) {
    return `✦ **Your Personalized Day Plan**

Based on your current tasks and routines, here's how to dominate today:

🌅 **6:00 AM** — Wake & hydrate (2 glasses water)
🧘 **6:15 AM** — Morning mindfulness (10 min)
🏃 **6:30 AM** — Morning workout or walk (30 min)
💡 **8:00 AM** — Deep work block — highest-priority task first
📋 **10:30 AM** — Review & clear inbox
🥗 **12:30 PM** — Lunch + 10-min walk
🎯 **2:00 PM** — Focus session (your peak performance window)
📖 **5:00 PM** — Learning or reading (30 min)
🌙 **9:30 PM** — Evening review: 3 wins from today
😴 **10:30 PM** — Wind down, no screens

${context ? `
*Context: ${context.slice(0, 120)}...*` : ""}

You've got everything it takes. Make today legendary. ✦`;
  }
  if (/motivat|inspire|boost|energy|confidence|uplift/.test(lower)) {
    const quotes = [
      "The disciplined mind is the most powerful force on earth. Every small action you take today compounds into the legend you're becoming. Your streak didn't happen by accident — it happened because you showed up.",
      "Champions don't wait for motivation — they build systems. You already have the system. Now execute. The version of you that future-you will thank exists in today's choices.",
      "Every elite performer has one secret: they do the work whether they feel like it or not. That's the gap between average and extraordinary. You're already choosing the right side.",
      "Progress isn't always visible day-to-day. But zoom out and look at who you were 90 days ago. The growth is undeniable. Keep going — the best is always ahead."
    ];
    return `✦ **AURA Motivation Transmission**

${quotes[Math.floor(Math.random() * quotes.length)]}

*Today's micro-challenge:* Complete one task you've been avoiding. That single action will shift your momentum entirely. You have this. ✦`;
  }
  if (/workout|exercise|fitness|gym|training|strength|cardio|run/.test(lower)) {
    return `✦ **Personalized Workout Plan**

**Today's Recommended Session (45 min)**

🔥 **Warm-Up** (5 min)
• Dynamic stretches + joint circles
• 2 min light jog in place

💪 **Main Circuit** (30 min — 3 rounds)
• Push-ups: 15 reps
• Bodyweight squats: 20 reps
• Plank hold: 45 seconds
• Mountain climbers: 30 reps
• Rest: 60 seconds between rounds

🧘 **Cool-Down** (10 min)
• Full-body stretch sequence
• 5-min deep breathing

**Pro tip:** Consistency > Intensity. 3–4 sessions per week with progressive overload will compound into remarkable results within 8 weeks.

Track this in your routine today. 💫`;
  }
  if (/goal|goals|progress|target|achieve|milestone|objective/.test(lower)) {
    return `✦ **Goal Review & Strategy**

Here's how to think about your goals with precision:

**The AURA Framework:**

🎯 **Audit** — Are your goals specific enough? Vague goals = vague results. "Get fit" → "Run 5K in under 30 min by June 30."

📈 **Upgrade** — What's the one next action for each goal? Identify it now.

🔁 **Routine** — Goals are won through systems, not willpower. Link each goal to a daily habit.

🏆 **Acknowledge** — Celebrate micro-wins. Every milestone matters.

**This week's focus:** Pick your #1 goal and give it 25% more attention than everything else. Single-pointed focus compounds faster than scattered effort.

You're on the right path. Let's accelerate it. ✦`;
  }
  if (/focus|distract|concentrate|deep work|pomodoro|productivity/.test(lower)) {
    return `✦ **Focus Optimization Protocol**

Here's your science-backed focus system:

⚡ **The Setup (2 min)**
1. Close all tabs except what you need
2. Phone on silent, face-down
3. Set a clear intention: *"I will complete [X] in the next 25 min"*

🎯 **The Session**
• Use the Focus Mode timer (tap the ⏱ button)
• Work on ONE task only — no switching
• If distracted, write the thought down and return immediately

🔄 **The Reset**
• 5-min break: stand, stretch, hydrate
• Repeat 4× for a 2-hour deep work block

**Key insight:** Your brain takes 23 minutes to recover from a single distraction. Protecting your focus window is the highest-leverage action you can take today.

Activate Focus Mode now and enter your peak state. ✦`;
  }
  if (/sleep|rest|recover|tired|fatigue|night/.test(lower)) {
    return `✦ **Sleep & Recovery Blueprint**

Elite performance starts with elite recovery:

🌙 **Evening Wind-Down (1hr before bed)**
• Dim lights — signals melatonin production
• No screens (or use blue-light glasses)
• Light stretching or journaling
• Set tomorrow's top 3 priorities

😴 **Sleep Optimization**
• Consistent bedtime = more important than duration
• Room temp: 65–68°F (18–20°C) is ideal
• Complete darkness activates deep sleep
• 7–9 hours for cognitive peak performance

☀️ **Morning Recovery Signal**
• Get sunlight within 30 min of waking
• This resets your circadian clock and boosts daytime alertness by up to 50%

*Recovery isn't weakness — it's when growth actually happens.* ✦`;
  }
  if (/stress|anxiety|overwhelm|pressure|calm|relax|breath/.test(lower)) {
    return `✦ **Stress Reset Protocol**

When the pressure builds, use this 4-step reset:

1. **4-7-8 Breathing** (60 seconds)
   Inhale 4 counts → Hold 7 counts → Exhale 8 counts
   Repeat 3× — activates parasympathetic nervous system instantly

2. **Cognitive Reframe**
   Ask: *"Is this urgent, important, both, or neither?"*
   Most stressors fall into "neither" when examined clearly.

3. **Micro-Action**
   Pick the smallest possible next step. Action dissolves anxiety.

4. **Perspective Anchor**
   Where will this be in 5 years? Most things won't matter at all.

You are more capable than this moment. Breathe, reset, execute. ✦`;
  }
  return `✦ **AURA AI Response**

Thank you for sharing that with me. Based on your message, here's my perspective:

${message.length > 20 ? `You mentioned: *"${message.slice(0, 80)}${message.length > 80 ? "..." : ""}"* — this is worth exploring deeply.

` : ""}**My recommendation:** Break this down into the smallest actionable step and do that first. Momentum builds on momentum.

For more personalized guidance, try asking me about:
• Your daily plan or schedule
• Motivation and mindset
• Workout and fitness
• Goal progress and strategy
• Focus and deep work
• Sleep and recovery

I'm here to help you reach your highest potential. What aspect would you like to explore? ✦`;
}
function formatContent(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/);
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static text split — order is immutable
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        parts.map(
          (part, j) => part.startsWith("**") && part.endsWith("**") ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: static text split
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-primary", children: part.slice(2, -2) }, j)
          ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: static text split
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, j)
          )
        ),
        i < lines.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
      ] }, i)
    );
  });
}
function FocusOverlay({ onClose, onComplete }) {
  const [selected, setSelected] = reactExports.useState(
    FOCUS_MODES[0]
  );
  const [customMinutes, setCustomMinutes] = reactExports.useState(30);
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [showCustom, setShowCustom] = reactExports.useState(false);
  const [sessionStart, setSessionStart] = reactExports.useState(0);
  const totalSeconds = (showCustom ? customMinutes : selected.minutes) * 60;
  const [remaining, setRemaining] = reactExports.useState(totalSeconds);
  const intervalRef = reactExports.useRef(null);
  const [done, setDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isRunning) {
      setRemaining((showCustom ? customMinutes : selected.minutes) * 60);
    }
  }, [selected, customMinutes, showCustom]);
  reactExports.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setDone(true);
            return 0;
          }
          return r - 1;
        });
      }, 1e3);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);
  const handleStart = () => {
    setSessionStart(Date.now());
    setDone(false);
    setRemaining((showCustom ? customMinutes : selected.minutes) * 60);
    setIsRunning(true);
  };
  const handleStop = () => {
    setIsRunning(false);
    const elapsed = Math.round((Date.now() - sessionStart) / 6e4);
    if (elapsed >= 1) {
      onComplete({
        id: `focus-${Date.now()}`,
        duration: elapsed,
        type: showCustom ? "pomodoro" : selected.id,
        startedAt: sessionStart,
        completedAt: Date.now(),
        isActive: false
      });
    }
  };
  const handleDone = () => {
    const totalMin = showCustom ? customMinutes : selected.minutes;
    onComplete({
      id: `focus-${Date.now()}`,
      duration: totalMin,
      type: showCustom ? "pomodoro" : selected.id,
      startedAt: sessionStart,
      completedAt: Date.now(),
      isActive: false
    });
  };
  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const totalSec = (showCustom ? customMinutes : selected.minutes) * 60;
  const progress = (totalSec - remaining) / totalSec * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "focus.modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              if (isRunning) handleStop();
              onClose();
            },
            className: "absolute top-4 right-4 p-2 rounded-xl glassmorphism text-muted-foreground hover:text-foreground transition-smooth",
            "aria-label": "Close focus mode",
            "data-ocid": "focus.close_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm px-6 flex flex-col items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl gradient-gold-text", children: "Focus Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: "Eliminate distractions. Enter peak state." })
          ] }),
          !isRunning && !done && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full", children: [
            FOCUS_MODES.map((mode) => {
              const Icon = mode.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSelected(mode);
                    setShowCustom(false);
                  },
                  "data-ocid": `focus.mode.${mode.id}`,
                  className: `flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-display transition-smooth ${selected.id === mode.id && !showCustom ? "bg-primary text-primary-foreground gold-glow" : "glassmorphism text-muted-foreground hover:text-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70", children: [
                      mode.minutes,
                      "m"
                    ] })
                  ]
                },
                mode.id
              );
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowCustom(true),
                "data-ocid": "focus.mode.custom",
                className: `flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-display transition-smooth ${showCustom ? "bg-primary text-primary-foreground gold-glow" : "glassmorphism text-muted-foreground hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 16 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Custom" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70", children: [
                    customMinutes,
                    "m"
                  ] })
                ]
              }
            )
          ] }),
          showCustom && !isRunning && !done && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setCustomMinutes((m) => Math.max(1, m - 5)),
                className: "w-10 h-10 glassmorphism rounded-xl font-bold text-foreground hover:gold-glow transition-smooth",
                "data-ocid": "focus.custom.minus",
                children: "−"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center font-display font-bold text-2xl gradient-gold-text", children: [
              customMinutes,
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setCustomMinutes((m) => Math.min(180, m + 5)),
                className: "w-10 h-10 glassmorphism rounded-xl font-bold text-foreground hover:gold-glow transition-smooth",
                "data-ocid": "focus.custom.plus",
                children: "+"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-52 h-52", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                className: "absolute inset-0 w-full h-full -rotate-90",
                viewBox: "0 0 100 100",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "50",
                      cy: "50",
                      r: "44",
                      fill: "none",
                      stroke: "oklch(var(--border) / 0.3)",
                      strokeWidth: "4"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "50",
                      cy: "50",
                      r: "44",
                      fill: "none",
                      stroke: "oklch(var(--primary))",
                      strokeWidth: "4",
                      strokeLinecap: "round",
                      strokeDasharray: "276.46",
                      strokeDashoffset: 276.46 * (1 - progress / 100),
                      style: { transition: "stroke-dashoffset 1s linear" }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 32, className: "text-primary mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg gradient-gold-text", children: "Complete!" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-4xl gradient-gold-text", children: [
                String(minutes).padStart(2, "0"),
                ":",
                String(secs).padStart(2, "0")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body mt-1", children: showCustom ? "Custom" : selected.label })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 w-full", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GoldButton,
            {
              className: "flex-1",
              onClick: handleDone,
              "data-ocid": "focus.complete_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }),
                " Log Session"
              ]
            }
          ) : isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            GoldButton,
            {
              variant: "outline",
              className: "flex-1",
              onClick: handleStop,
              "data-ocid": "focus.stop_button",
              children: "Stop & Save"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GoldButton,
            {
              className: "flex-1",
              onClick: handleStart,
              "data-ocid": "focus.start_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16 }),
                " Start Session"
              ]
            }
          ) }),
          isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body text-center", children: "Stay focused. Close eyes, breathe deeply, and execute." })
        ] })
      ]
    }
  );
}
function ClearConfirmDialog({
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "chat.clear_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/60 backdrop-blur-sm",
            onClick: onCancel,
            onKeyDown: (e) => e.key === "Escape" && onCancel(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative w-full max-w-sm",
            initial: { y: 32, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 32, opacity: 0 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { glow: true, padding: "lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-destructive/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18, className: "text-destructive" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Clear chat history?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-0.5", children: "This will permanently delete all messages. This action cannot be undone." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GoldButton,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: onCancel,
                    "data-ocid": "chat.clear_dialog.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onConfirm,
                    className: "flex-1 px-4 py-2.5 rounded-xl bg-destructive/80 hover:bg-destructive text-destructive-foreground text-sm font-semibold font-display transition-smooth",
                    "data-ocid": "chat.clear_dialog.confirm_button",
                    children: "Clear All"
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
function Chat() {
  const { profile, setProfile } = useAppStore();
  const [messages, setMessages] = useLocalStorage(
    "aura-chat",
    []
  );
  const [tasks] = useLocalStorage("aura-tasks", []);
  const [_focusSessions, setFocusSessions] = useLocalStorage(
    "aura-focus-sessions",
    []
  );
  const [input, setInput] = reactExports.useState("");
  const [isTyping, setIsTyping] = reactExports.useState(false);
  const [showClearConfirm, setShowClearConfirm] = reactExports.useState(false);
  const [showFocus, setShowFocus] = reactExports.useState(false);
  const [voiceActive, setVoiceActive] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  const buildContext = reactExports.useCallback(() => {
    const pending = tasks.filter((t) => !t.completed).slice(0, 5);
    const done = tasks.filter((t) => t.completed).length;
    if (pending.length === 0 && done === 0) return "";
    const pendingStr = pending.map((t) => t.title).join(", ");
    return `User has ${done} tasks completed today. Pending: ${pendingStr || "none"}. Streak: ${profile.stats.streakDays} days. Focus minutes today: ${profile.stats.focusMinutesToday}.`;
  }, [tasks, profile.stats]);
  const sendMessage = reactExports.useCallback(
    async (text) => {
      const content = (text ?? input).trim();
      if (!content || isTyping) return;
      const userMsg = {
        id: `msg-${Date.now()}`,
        role: "user",
        content,
        timestamp: Date.now()
      };
      setMessages((prev) => {
        const updated = [...prev, userMsg];
        return updated.slice(-50);
      });
      setInput("");
      setIsTyping(true);
      const delay = 800 + Math.random() * 1e3;
      await new Promise((r) => setTimeout(r, delay));
      const context = buildContext();
      const aiContent = getMockResponse(content, context);
      const aiMsg = {
        id: `msg-${Date.now()}-ai`,
        role: "assistant",
        content: aiContent,
        timestamp: Date.now()
      };
      setMessages((prev) => {
        const updated = [...prev, aiMsg];
        return updated.slice(-50);
      });
      setIsTyping(false);
    },
    [input, isTyping, setMessages, buildContext]
  );
  const handleQuickPrompt = (label) => {
    sendMessage(label);
  };
  const handleClear = () => {
    setMessages([]);
    setShowClearConfirm(false);
  };
  const handleFocusComplete = (session) => {
    setFocusSessions((prev) => [...prev, session]);
    setProfile({
      stats: {
        ...profile.stats,
        focusMinutesToday: profile.stats.focusMinutesToday + session.duration
      }
    });
    setShowFocus(false);
    const completionMsg = {
      id: `msg-${Date.now()}-focus`,
      role: "assistant",
      content: `✦ **Focus Session Complete!**

You just completed a ${session.duration}-minute ${session.type === "deep-work" ? "Deep Work" : session.type === "break" ? "Break" : "Pomodoro"} session. That's elite-level discipline.

Total focus time today: **${profile.stats.focusMinutesToday + session.duration} minutes**. Keep compounding. ✦`,
      timestamp: Date.now()
    };
    setMessages((prev) => [...prev, completionMsg].slice(-50));
  };
  const handleVoice = () => {
    const win = window;
    const Ctor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    if (!Ctor) return;
    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setVoiceActive(true);
    recognition.onend = () => setVoiceActive(false);
    recognition.onresult = (e) => {
      var _a;
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      (_a = inputRef.current) == null ? void 0 : _a.focus();
    };
    recognition.start();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showFocus && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FocusOverlay,
      {
        onClose: () => setShowFocus(false),
        onComplete: handleFocusComplete
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showClearConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ClearConfirmDialog,
      {
        onConfirm: handleClear,
        onCancel: () => setShowClearConfirm(false)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col h-[calc(100vh-10rem)]",
        "data-ocid": "chat.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 pt-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18, className: "text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AURA AI Chat" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
                "Your personal AI · ",
                messages.length,
                " message",
                messages.length !== 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowFocus(true),
                  className: "p-2 glassmorphism rounded-xl text-primary hover:gold-glow transition-smooth",
                  "aria-label": "Start focus mode",
                  "data-ocid": "chat.focus_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 16 })
                }
              ),
              messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowClearConfirm(true),
                  className: "p-2 text-muted-foreground hover:text-foreground transition-smooth rounded-xl glassmorphism",
                  "aria-label": "Clear chat history",
                  "data-ocid": "chat.clear_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 15 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-2 mb-3 shrink-0 overflow-x-auto scrollbar-none pb-1",
              "data-ocid": "chat.quick_prompts",
              children: QUICK_PROMPTS.map(({ label, icon: Icon, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleQuickPrompt(label),
                  disabled: isTyping,
                  "data-ocid": ocid,
                  className: "flex items-center gap-1.5 px-3 py-1.5 glassmorphism rounded-full text-xs font-display text-foreground whitespace-nowrap hover:gold-glow hover:text-primary transition-smooth shrink-0 disabled:opacity-50",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 11, className: "text-primary shrink-0" }),
                    label
                  ]
                },
                label
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 overflow-y-auto space-y-3 pb-3 scrollbar-none",
              "data-ocid": "chat.messages",
              children: [
                messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    className: "flex flex-col items-center text-center py-6 gap-4",
                    "data-ocid": "chat.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full glassmorphism gold-glow flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 28, className: "text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-foreground mb-1", children: [
                          "Hello, ",
                          profile.name,
                          ". I'm AURA AI."
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: [
                          "Your personal assistant for productivity, wellness,",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          "and daily excellence. Ask me anything."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(GoldBadge, { variant: "gold", children: "Tap a prompt above to start ✦" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 w-full", children: [
                        { icon: ListTodo, text: "Daily task planning" },
                        { icon: Dumbbell, text: "Fitness & workouts" },
                        { icon: Target, text: "Goal strategy" },
                        { icon: Focus, text: "Deep focus & flow" }
                      ].map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-2 p-3 glassmorphism rounded-xl text-xs text-muted-foreground font-body",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, className: "text-primary shrink-0" }),
                            text
                          ]
                        },
                        text
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10, scale: 0.97 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.28 },
                    className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                    "data-ocid": `chat.message.${i + 1}`,
                    children: [
                      msg.role === "assistant" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full glassmorphism gold-glow flex items-center justify-center shrink-0 mr-2 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, className: "text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `max-w-[82%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "glassmorphism text-foreground rounded-bl-sm"}`,
                          children: msg.role === "assistant" ? formatContent(msg.content) : msg.content
                        }
                      )
                    ]
                  },
                  msg.id
                )) }),
                isTyping && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                    className: "flex items-center gap-2",
                    "data-ocid": "chat.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full glassmorphism gold-glow flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, className: "text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glassmorphism px-4 py-3 rounded-2xl rounded-bl-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 items-center", children: [0, 1, 2].map((dot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-1.5 h-1.5 rounded-full bg-primary",
                          style: {
                            animation: `bounce 1.2s ease-in-out ${dot * 0.2}s infinite`
                          }
                        },
                        dot
                      )) }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0", "data-ocid": "chat.input_area", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { padding: "sm", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleVoice,
                  className: `p-2 transition-smooth shrink-0 rounded-lg ${voiceActive ? "text-primary gold-glow animate-pulse" : "text-muted-foreground hover:text-primary"}`,
                  "aria-label": "Voice input",
                  "data-ocid": "chat.voice_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 18 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && !e.shiftKey && sendMessage(),
                  placeholder: "Ask AURA AI anything...",
                  className: "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-body min-w-0",
                  "data-ocid": "chat.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GoldButton,
                {
                  size: "sm",
                  onClick: () => sendMessage(),
                  disabled: !input.trim() || isTyping,
                  className: "shrink-0 !px-3 !py-2",
                  "data-ocid": "chat.send_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] text-muted-foreground font-body mt-1.5 opacity-60", children: "AURA AI · Powered by personalized context" })
          ] })
        ]
      }
    )
  ] });
}
export {
  Chat as default
};
