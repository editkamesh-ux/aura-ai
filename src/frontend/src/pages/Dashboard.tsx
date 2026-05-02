import { useRouter } from "@/App";
import { GlassCard } from "@/components/GlassCard";
import { GoldBadge } from "@/components/GoldBadge";
import { GoldButton } from "@/components/GoldButton";
import { ProgressBar } from "@/components/ProgressBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAppStore } from "@/store/appStore";
import type { Goal, Routine, Task } from "@/types";
import {
  BrainCircuit,
  CheckCircle2,
  Flame,
  Lightbulb,
  Play,
  Sunrise,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

// ─── Sample seed data ────────────────────────────────────────────────────────
const SEED_ROUTINES: Routine[] = [
  {
    id: "r1",
    title: "Morning Momentum",
    description: "Kickstart your day with energy",
    icon: "sunrise",
    timeOfDay: "morning",
    duration: 45,
    steps: [],
    isActive: true,
    createdAt: Date.now(),
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
    createdAt: Date.now(),
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
    createdAt: Date.now(),
  },
];

const SEED_TASKS: Task[] = [
  {
    id: "t1",
    title: "Review project roadmap",
    completed: true,
    priority: "high",
    category: "Work",
    createdAt: Date.now(),
  },
  {
    id: "t2",
    title: "30-min workout session",
    completed: true,
    priority: "high",
    category: "Health",
    createdAt: Date.now(),
  },
  {
    id: "t3",
    title: "Read 20 pages",
    completed: true,
    priority: "medium",
    category: "Learning",
    createdAt: Date.now(),
  },
  {
    id: "t4",
    title: "Plan tomorrow's schedule",
    completed: false,
    priority: "medium",
    category: "Planning",
    createdAt: Date.now(),
  },
  {
    id: "t5",
    title: "Meditate for 10 minutes",
    completed: false,
    priority: "low",
    category: "Mindfulness",
    createdAt: Date.now(),
  },
];

const SEED_GOALS: Goal[] = [
  {
    id: "g1",
    title: "Run a 5K",
    description: "Build stamina through consistent training",
    targetDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    progress: 68,
    milestones: [],
    category: "Fitness",
    createdAt: Date.now(),
  },
  {
    id: "g2",
    title: "Read 24 books this year",
    description: "Two books per month to expand knowledge",
    targetDate: Date.now() + 90 * 24 * 60 * 60 * 1000,
    progress: 42,
    milestones: [],
    category: "Learning",
    createdAt: Date.now(),
  },
  {
    id: "g3",
    title: "Launch side project",
    description: "Build and ship a profitable product",
    targetDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
    progress: 25,
    milestones: [],
    category: "Career",
    createdAt: Date.now(),
  },
];

const AI_SUGGESTIONS = [
  {
    quote:
      "Your morning routine is 80% consistent this week. Small daily wins compound into extraordinary results.",
    tip: "Try adding 5 minutes of journaling after meditation.",
  },
  {
    quote:
      "Champions aren't made in the gym — they're made from the stuff inside them.",
    tip: "You're on a 12-day streak. Keep the momentum alive!",
  },
  {
    quote: "Focus is the art of knowing what to ignore.",
    tip: "Schedule your deep work session before 11 AM for peak performance.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getRoutineTime(tod: Routine["timeOfDay"]): string {
  const map: Record<Routine["timeOfDay"], string> = {
    morning: "07:00 AM",
    afternoon: "01:00 PM",
    evening: "07:00 PM",
    night: "09:30 PM",
  };
  return map[tod];
}

function getRoutineIcon(icon: string) {
  if (icon === "sunrise") return <Sunrise size={18} className="text-primary" />;
  if (icon === "brain")
    return <BrainCircuit size={18} className="text-primary" />;
  return <Zap size={18} className="text-primary" />;
}

const categoryColors: Record<string, string> = {
  Fitness: "bg-emerald-500/20 text-emerald-400",
  Learning: "bg-blue-500/20 text-blue-400",
  Career: "bg-purple-500/20 text-purple-400",
  Health: "bg-rose-500/20 text-rose-400",
  Mindfulness: "bg-cyan-500/20 text-cyan-400",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Animated ring for task completion
function TaskRing({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div
      className="relative flex items-center justify-center"
      aria-label={`${done} of ${total} tasks done`}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="oklch(var(--muted))"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="oklch(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 40 40)"
          className="transition-all duration-700 ease-out"
          style={{ filter: "drop-shadow(0 0 6px oklch(var(--primary) / 0.6))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold font-display text-foreground leading-none">
          {done}
        </span>
        <span className="text-[10px] text-muted-foreground">/{total}</span>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const { profile } = useAppStore();
  const { navigate } = useRouter();

  const [routines] = useLocalStorage<Routine[]>("aura-routines", SEED_ROUTINES);
  const [tasks] = useLocalStorage<Task[]>("aura-tasks", SEED_TASKS);
  const [goals] = useLocalStorage<Goal[]>("aura-goals", SEED_GOALS);

  const now = new Date();
  const suggestion = useMemo(
    () => AI_SUGGESTIONS[new Date().getDate() % AI_SUGGESTIONS.length],
    [],
  );

  const doneTasks = tasks.filter((t) => t.completed).length;
  const upcomingRoutines = routines.filter((r) => r.isActive).slice(0, 3);
  const topGoals = goals.slice(0, 3);
  const streak = profile.stats.streakDays;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-4 pb-2"
      data-ocid="dashboard.page"
    >
      {/* ── Hero Greeting ── */}
      <motion.div variants={cardItem} data-ocid="dashboard.greeting.card">
        <GlassCard padding="lg" className="relative overflow-hidden">
          <div
            className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-muted-foreground text-sm font-body mb-0.5">
                  {getGreeting()},
                </p>
                <h1 className="text-2xl font-display font-bold gradient-gold-text truncate">
                  {profile.name}
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  {now.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                  {" · "}
                  {formatTime(now)}
                </p>
              </div>
              {/* Streak badge */}
              <div
                className="flex flex-col items-center gap-0.5 shrink-0 ml-3"
                data-ocid="dashboard.streak.card"
              >
                <div className="flex items-center gap-1 bg-primary/15 border border-primary/30 rounded-xl px-2.5 py-1.5">
                  <Flame size={16} className="text-primary" />
                  <span className="font-display font-bold text-primary text-base leading-none">
                    {streak}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  day streak
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Task Stats + Focus Quick-start ── */}
      <motion.div variants={cardItem} className="grid grid-cols-2 gap-3">
        {/* Task completion widget */}
        <GlassCard padding="md" data-ocid="dashboard.tasks.card">
          <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Today’s Tasks
          </p>
          <div className="flex items-center gap-3">
            <TaskRing done={doneTasks} total={tasks.length} />
            <div className="min-w-0">
              <p className="text-sm font-body text-foreground leading-snug">
                <span className="font-bold text-primary font-display">
                  {doneTasks}
                </span>
                {" of "}
                <span className="font-semibold">{tasks.length}</span>
              </p>
              <p className="text-xs text-muted-foreground">tasks done</p>
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="mt-2 text-xs text-primary hover:underline font-display"
                data-ocid="dashboard.view_tasks.link"
              >
                View all →
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Focus quick-start */}
        <GlassCard
          padding="md"
          hover
          className="flex flex-col justify-between"
          data-ocid="dashboard.focus.card"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Timer size={16} className="text-primary" />
            <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
              Focus
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground font-body leading-snug">
              {profile.stats.focusMinutesToday} min
            </p>
            <p className="text-xs text-muted-foreground mb-3">logged today</p>
            <GoldButton
              size="sm"
              onClick={() => navigate("/routines")}
              className="w-full"
              data-ocid="dashboard.focus.start_button"
            >
              <Play size={12} />
              Start
            </GoldButton>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Today's Routine Timeline ── */}
      <motion.div variants={cardItem} data-ocid="dashboard.routines.card">
        <GlassCard padding="none">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <Sunrise size={16} className="text-primary" />
              <span className="text-sm font-display font-semibold text-foreground">
                Daily Routine
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate("/routines")}
              className="text-xs text-primary hover:underline font-display"
              data-ocid="dashboard.routines.view_all.link"
            >
              See all
            </button>
          </div>

          {upcomingRoutines.length === 0 ? (
            <div
              className="px-4 pb-4 text-center py-6"
              data-ocid="dashboard.routines.empty_state"
            >
              <p className="text-sm text-muted-foreground">No routines yet.</p>
              <button
                type="button"
                onClick={() => navigate("/routines")}
                className="text-xs text-primary mt-1 hover:underline font-display"
                data-ocid="dashboard.routines.add_button"
              >
                + Add your first routine
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border/30 px-4 pb-3">
              {upcomingRoutines.map((routine, idx) => (
                <li
                  key={routine.id}
                  className="flex items-center gap-3 py-2.5"
                  data-ocid={`dashboard.routine.item.${idx + 1}`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 shrink-0">
                    {getRoutineIcon(routine.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-display font-medium text-foreground truncate">
                      {routine.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getRoutineTime(routine.timeOfDay)} · {routine.duration}{" "}
                      min
                    </p>
                  </div>
                  <GoldBadge variant="muted" className="shrink-0 capitalize">
                    {routine.timeOfDay}
                  </GoldBadge>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </motion.div>

      {/* ── Active Goals ── */}
      <motion.div variants={cardItem} data-ocid="dashboard.goals.card">
        <GlassCard padding="none">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-primary" />
              <span className="text-sm font-display font-semibold text-foreground">
                Active Goals
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="text-xs text-primary hover:underline font-display"
              data-ocid="dashboard.goals.view_all.link"
            >
              See all
            </button>
          </div>

          {topGoals.length === 0 ? (
            <div
              className="px-4 pb-4 text-center py-6"
              data-ocid="dashboard.goals.empty_state"
            >
              <p className="text-sm text-muted-foreground">No goals set yet.</p>
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="text-xs text-primary mt-1 hover:underline font-display"
                data-ocid="dashboard.goals.add_button"
              >
                + Set your first goal
              </button>
            </div>
          ) : (
            <ul className="px-4 pb-3">
              {topGoals.map((goal, idx) => (
                <li
                  key={goal.id}
                  className="py-2.5 border-b border-border/30 last:border-0"
                  data-ocid={`dashboard.goal.item.${idx + 1}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${
                          categoryColors[goal.category] ??
                          "bg-muted text-muted-foreground"
                        }`}
                      >
                        {goal.category}
                      </span>
                      <span className="text-sm font-display text-foreground truncate">
                        {goal.title}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-primary font-display shrink-0 ml-2">
                      {goal.progress}%
                    </span>
                  </div>
                  <ProgressBar value={goal.progress} size="sm" animated />
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </motion.div>

      {/* ── AI Suggestion Card ── */}
      <motion.div variants={cardItem} data-ocid="dashboard.ai_suggestion.card">
        <GlassCard
          glow
          padding="lg"
          className="relative overflow-hidden border border-primary/30"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/20">
                <Lightbulb size={15} className="text-primary" />
              </div>
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-primary">
                AURA Insight
              </span>
            </div>
            <p className="text-sm font-body text-foreground/90 italic leading-relaxed mb-3">
              &ldquo;{suggestion.quote}&rdquo;
            </p>
            <div className="flex items-start gap-2 bg-muted/30 rounded-lg p-2.5">
              <TrendingUp size={14} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-snug">
                {suggestion.tip}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div variants={cardItem} data-ocid="dashboard.quick_actions.card">
        <GlassCard padding="md">
          <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Actions
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => navigate("/chat")}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth group"
              data-ocid="dashboard.quick_action.chat.button"
            >
              <BrainCircuit
                size={20}
                className="text-muted-foreground group-hover:text-primary transition-smooth"
              />
              <span className="text-[11px] font-display text-muted-foreground group-hover:text-foreground transition-smooth">
                AI Chat
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth group"
              data-ocid="dashboard.quick_action.tasks.button"
            >
              <CheckCircle2
                size={20}
                className="text-muted-foreground group-hover:text-primary transition-smooth"
              />
              <span className="text-[11px] font-display text-muted-foreground group-hover:text-foreground transition-smooth">
                Tasks
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/routines")}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/40 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-smooth group"
              data-ocid="dashboard.quick_action.routines.button"
            >
              <Zap
                size={20}
                className="text-muted-foreground group-hover:text-primary transition-smooth"
              />
              <span className="text-[11px] font-display text-muted-foreground group-hover:text-foreground transition-smooth">
                Routines
              </span>
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Branding footer */}
      <motion.p
        variants={cardItem}
        className="text-center text-[11px] text-muted-foreground/50 pb-2 font-body"
      >
        © {new Date().getFullYear()} · Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/70 hover:text-primary transition-smooth"
        >
          caffeine.ai
        </a>
      </motion.p>
    </motion.div>
  );
}
