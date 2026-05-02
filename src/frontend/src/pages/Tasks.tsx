import { GlassCard } from "@/components/GlassCard";
import { GoldBadge } from "@/components/GoldBadge";
import { GoldButton } from "@/components/GoldButton";
import { ProgressBar } from "@/components/ProgressBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Goal, Task } from "@/types";
import {
  CheckCircle2,
  Circle,
  Plus,
  SlidersHorizontal,
  Star,
  Target,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Default data ───────────────────────────────────────────────────────────
const NOW = Date.now();
const DAY = 86_400_000;

const DEFAULT_TASKS: Task[] = [
  {
    id: "t1",
    title: "Complete morning workout",
    completed: true,
    priority: "high",
    category: "Health",
    createdAt: NOW - DAY,
  },
  {
    id: "t2",
    title: "Review quarterly goals",
    completed: true,
    priority: "high",
    category: "Productivity",
    createdAt: NOW - DAY,
  },
  {
    id: "t3",
    title: "Read 30 pages of current book",
    completed: false,
    priority: "medium",
    category: "Learning",
    createdAt: NOW,
  },
  {
    id: "t4",
    title: "Prepare presentation slides",
    completed: false,
    priority: "high",
    category: "Work",
    createdAt: NOW,
  },
  {
    id: "t5",
    title: "10-minute meditation",
    completed: false,
    priority: "low",
    category: "Mindfulness",
    createdAt: NOW,
  },
  {
    id: "t6",
    title: "Call with accountability partner",
    completed: false,
    priority: "medium",
    category: "Productivity",
    dueDate: NOW + DAY,
    createdAt: NOW,
  },
];

const DEFAULT_GOALS: Goal[] = [
  {
    id: "g1",
    title: "Run a 5K",
    description: "Train to complete a 5km run in under 30 minutes",
    targetDate: NOW + 30 * DAY,
    progress: 65,
    category: "Fitness",
    createdAt: NOW,
    milestones: [],
  },
  {
    id: "g2",
    title: "Read 12 books this year",
    description: "One book per month across key topics",
    targetDate: NOW + 60 * DAY,
    progress: 42,
    category: "Learning",
    createdAt: NOW,
    milestones: [],
  },
  {
    id: "g3",
    title: "Build a side project",
    description: "Launch a personal project with real users",
    targetDate: NOW + 90 * DAY,
    progress: 25,
    category: "Career",
    createdAt: NOW,
    milestones: [],
  },
  {
    id: "g4",
    title: "Master deep work habits",
    description: "Achieve 4 hours of focused work daily for 60 days",
    targetDate: NOW + 45 * DAY,
    progress: 80,
    category: "Productivity",
    createdAt: NOW,
    milestones: [],
  },
];

// ─── Monthly trend data (last 6 months) ────────────────────────────────────
const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const MONTHLY_DATA = [
  { month: "Nov", completed: 18 },
  { month: "Dec", completed: 22 },
  { month: "Jan", completed: 14 },
  { month: "Feb", completed: 28 },
  { month: "Mar", completed: 31 },
  { month: "Apr", completed: 24 },
];

// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Health",
  "Work",
  "Learning",
  "Mindfulness",
  "Productivity",
  "Fitness",
  "Career",
  "Finance",
  "Personal",
];
const PRIORITIES = ["all", "high", "medium", "low"] as const;

const PRIORITY_BADGE: Record<Task["priority"], "warning" | "gold" | "muted"> = {
  high: "warning",
  medium: "gold",
  low: "muted",
};
const PRIORITY_LABEL: Record<Task["priority"], string> = {
  high: "High",
  medium: "Med",
  low: "Low",
};

type Tab = "tasks" | "goals";
type PriorityFilter = (typeof PRIORITIES)[number];

// ─── Tooltip component for Recharts ─────────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
}: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glassmorphism rounded-lg px-3 py-2 text-xs font-display">
      <p className="text-muted-foreground">{label}</p>
      <p className="text-primary font-semibold">{payload[0].value} tasks</p>
    </div>
  );
}

// ─── Add Task Form ────────────────────────────────────────────────────────────
interface AddTaskFormProps {
  onAdd: (t: Task) => void;
  onCancel: () => void;
}
function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");

  const submit = () => {
    if (!title.trim()) return;
    onAdd({
      id: `t-${Date.now()}`,
      title: title.trim(),
      completed: false,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate).getTime() : undefined,
      createdAt: Date.now(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard glow padding="md">
        <div className="flex items-center justify-between mb-3">
          <p className="font-display font-semibold text-sm text-foreground">
            New Task
          </p>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="tasks.new_task.close_button"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="What needs to be done?"
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
            data-ocid="tasks.new_task.input"
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="task-priority"
                className="text-xs text-muted-foreground font-display block mb-1"
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Task["priority"])
                }
                className="w-full bg-muted/50 border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                data-ocid="tasks.new_task.priority.select"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">⚪ Low</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="task-category"
                className="text-xs text-muted-foreground font-display block mb-1"
              >
                Category
              </label>
              <select
                id="task-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                data-ocid="tasks.new_task.category.select"
              >
                {CATEGORIES.slice(1).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="text-xs text-muted-foreground font-display block mb-1"
            >
              Due Date (optional)
            </label>
            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
              data-ocid="tasks.new_task.due_date.input"
            />
          </div>

          <div className="flex gap-2">
            <GoldButton
              size="sm"
              onClick={submit}
              data-ocid="tasks.new_task.submit_button"
            >
              <Plus size={14} /> Add Task
            </GoldButton>
            <GoldButton
              size="sm"
              variant="outline"
              onClick={onCancel}
              data-ocid="tasks.new_task.cancel_button"
            >
              Cancel
            </GoldButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Add Goal Form ────────────────────────────────────────────────────────────
interface AddGoalFormProps {
  onAdd: (g: Goal) => void;
  onCancel: () => void;
}
function AddGoalForm({ onAdd, onCancel }: AddGoalFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [targetDate, setTargetDate] = useState("");

  const submit = () => {
    if (!title.trim()) return;
    onAdd({
      id: `g-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      targetDate: targetDate
        ? new Date(targetDate).getTime()
        : Date.now() + 90 * DAY,
      progress: 0,
      category,
      createdAt: Date.now(),
      milestones: [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard glow padding="md">
        <div className="flex items-center justify-between mb-3">
          <p className="font-display font-semibold text-sm text-foreground">
            New Goal
          </p>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="goals.new_goal.close_button"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you want to achieve?"
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
            data-ocid="goals.new_goal.title.input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your goal..."
            rows={2}
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body resize-none"
            data-ocid="goals.new_goal.description.textarea"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="goal-category"
                className="text-xs text-muted-foreground font-display block mb-1"
              >
                Category
              </label>
              <select
                id="goal-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                data-ocid="goals.new_goal.category.select"
              >
                {[
                  "Health",
                  "Fitness",
                  "Learning",
                  "Career",
                  "Finance",
                  "Productivity",
                  "Personal",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="goal-target-date"
                className="text-xs text-muted-foreground font-display block mb-1"
              >
                Target Date
              </label>
              <input
                id="goal-target-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
                data-ocid="goals.new_goal.target_date.input"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <GoldButton
              size="sm"
              onClick={submit}
              data-ocid="goals.new_goal.submit_button"
            >
              <Plus size={14} /> Add Goal
            </GoldButton>
            <GoldButton
              size="sm"
              variant="outline"
              onClick={onCancel}
              data-ocid="goals.new_goal.cancel_button"
            >
              Cancel
            </GoldButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Goal Card ────────────────────────────────────────────────────────────────
interface GoalCardProps {
  goal: Goal;
  index: number;
  onUpdateProgress: (id: string, progress: number) => void;
  onDelete: (id: string) => void;
}
function GoalCard({ goal, index, onUpdateProgress, onDelete }: GoalCardProps) {
  const [editing, setEditing] = useState(false);
  const [slider, setSlider] = useState(goal.progress);
  const daysLeft = Math.ceil((goal.targetDate - Date.now()) / DAY);

  const save = () => {
    onUpdateProgress(goal.id, slider);
    setEditing(false);
  };

  return (
    <GlassCard hover data-ocid={`goals.item.${index + 1}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
          <Target size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-sm text-foreground truncate">
            {goal.title}
          </h3>
          <p className="text-xs text-muted-foreground font-body line-clamp-1">
            {goal.description}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <GoldBadge variant="muted">{goal.category}</GoldBadge>
          <button
            type="button"
            onClick={() => onDelete(goal.id)}
            className="text-muted-foreground hover:text-destructive transition-smooth"
            aria-label="Delete goal"
            data-ocid={`goals.delete_button.${index + 1}`}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <ProgressBar value={goal.progress} size="md" className="flex-1" />
        <div className="flex items-center gap-1 text-xs text-primary font-display font-bold shrink-0">
          <TrendingUp size={11} /> {goal.progress}%
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-body">
          {daysLeft > 0 ? `${daysLeft}d left` : "Overdue"}
        </span>
        {!editing ? (
          <GoldButton
            size="sm"
            variant="ghost"
            onClick={() => {
              setSlider(goal.progress);
              setEditing(true);
            }}
            data-ocid={`goals.edit_button.${index + 1}`}
          >
            <SlidersHorizontal size={12} /> Update
          </GoldButton>
        ) : (
          <div className="flex items-center gap-2 flex-1 ml-3">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="flex-1 accent-primary"
              data-ocid={`goals.progress_slider.${index + 1}`}
            />
            <span className="text-xs text-primary font-display font-bold w-8 text-right">
              {slider}%
            </span>
            <GoldButton
              size="sm"
              onClick={save}
              data-ocid={`goals.save_button.${index + 1}`}
            >
              Save
            </GoldButton>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Cancel edit"
              data-ocid={`goals.cancel_button.${index + 1}`}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Tasks() {
  const [tab, setTab] = useState<Tab>("tasks");
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "aura-tasks",
    DEFAULT_TASKS,
  );
  const [goals, setGoals] = useLocalStorage<Goal[]>(
    "aura-goals",
    DEFAULT_GOALS,
  );

  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  // Derived
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const catOk = categoryFilter === "All" || t.category === categoryFilter;
      const priOk = priorityFilter === "all" || t.priority === priorityFilter;
      return catOk && priOk;
    });
  }, [tasks, categoryFilter, priorityFilter]);

  const pending = filteredTasks.filter((t) => !t.completed);
  const done = filteredTasks.filter((t) => t.completed);
  const completionPct =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((t) => t.completed).length / tasks.length) * 100,
        );

  const usedCategories = useMemo(
    () => ["All", ...Array.from(new Set(tasks.map((t) => t.category)))],
    [tasks],
  );

  // Task handlers
  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
    setShowAddTask(false);
  };

  // Goal handlers
  const addGoal = (goal: Goal) => {
    setGoals((prev) => [...prev, goal]);
    setShowAddGoal(false);
  };

  const updateGoalProgress = (id: string, progress: number) =>
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, progress } : g)));

  const deleteGoal = (id: string) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  return (
    <motion.div
      className="space-y-4 pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-ocid="tasks.page"
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="font-display font-bold text-2xl gradient-gold-text">
            Tasks & Goals
          </h1>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            Track progress. Build momentum.
          </p>
        </div>
        {tab === "tasks" && (
          <GoldButton
            size="sm"
            onClick={() => setShowAddTask(true)}
            data-ocid="tasks.add_button"
          >
            <Plus size={16} /> Add
          </GoldButton>
        )}
        {tab === "goals" && (
          <GoldButton
            size="sm"
            onClick={() => setShowAddGoal(true)}
            data-ocid="goals.add_button"
          >
            <Plus size={16} /> Add Goal
          </GoldButton>
        )}
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 glassmorphism rounded-xl p-1"
        role="tablist"
        data-ocid="tasks.filter.tab"
      >
        {(["tasks", "goals"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            data-ocid={`tasks.${t}.tab`}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-display font-medium transition-smooth ${
              tab === t
                ? "bg-primary text-primary-foreground gold-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "tasks" ? "Daily Tasks" : "Long-Term Goals"}
          </button>
        ))}
      </div>

      {/* ═══════════ TASKS TAB ═══════════ */}
      {tab === "tasks" && (
        <>
          {/* Completion bar */}
          <GlassCard padding="sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-display font-semibold text-foreground">
                Today's Progress
              </span>
              <span className="text-xs font-display font-bold text-primary">
                {completionPct}%
              </span>
            </div>
            <ProgressBar value={completionPct} size="lg" animated />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-body">
              <span>{tasks.filter((t) => t.completed).length} completed</span>
              <span>{tasks.filter((t) => !t.completed).length} remaining</span>
            </div>
          </GlassCard>

          {/* Filters */}
          <div className="space-y-2">
            {/* Category filter */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {usedCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  data-ocid={`tasks.category_filter.${cat.toLowerCase()}`}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-display font-medium transition-smooth border ${
                    categoryFilter === cat
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Priority filter */}
            <div className="flex gap-1.5">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriorityFilter(p)}
                  data-ocid={`tasks.priority_filter.${p}`}
                  className={`flex-1 py-1 rounded-lg text-xs font-display font-medium transition-smooth border capitalize ${
                    priorityFilter === p
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p === "all"
                    ? "All"
                    : p === "high"
                      ? "🔴 High"
                      : p === "medium"
                        ? "🟡 Med"
                        : "⚪ Low"}
                </button>
              ))}
            </div>
          </div>

          {/* Add task form */}
          <AnimatePresence>
            {showAddTask && (
              <AddTaskForm
                onAdd={addTask}
                onCancel={() => setShowAddTask(false)}
              />
            )}
          </AnimatePresence>

          {/* Pending tasks */}
          {pending.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
                Pending · {pending.length}
              </p>
              <AnimatePresence>
                {pending.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <GlassCard
                      padding="sm"
                      className="flex items-center gap-3"
                      data-ocid={`tasks.item.${i + 1}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className="shrink-0"
                        aria-label="Complete task"
                        data-ocid={`tasks.checkbox.${i + 1}`}
                      >
                        <Circle
                          size={20}
                          className="text-muted-foreground hover:text-primary transition-smooth"
                        />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-foreground truncate">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">
                            {task.category}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-muted-foreground">
                              ·{" "}
                              {new Date(task.dueDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" },
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <GoldBadge variant={PRIORITY_BADGE[task.priority]}>
                          {PRIORITY_LABEL[task.priority]}
                        </GoldBadge>
                        <button
                          type="button"
                          onClick={() => deleteTask(task.id)}
                          className="text-muted-foreground hover:text-destructive transition-smooth"
                          aria-label="Delete task"
                          data-ocid={`tasks.delete_button.${i + 1}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Done tasks */}
          {done.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
                Completed · {done.length}
              </p>
              <AnimatePresence>
                {done.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GlassCard
                      padding="sm"
                      className="flex items-center gap-3 opacity-55"
                      data-ocid={`tasks.done_item.${i + 1}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className="shrink-0"
                        aria-label="Uncheck task"
                      >
                        <CheckCircle2 size={20} className="text-primary" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-muted-foreground line-through truncate">
                          {task.title}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {task.category}
                        </span>
                      </div>
                      <GoldBadge variant={PRIORITY_BADGE[task.priority]}>
                        {PRIORITY_LABEL[task.priority]}
                      </GoldBadge>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty state */}
          {filteredTasks.length === 0 && (
            <GlassCard
              className="text-center py-10"
              data-ocid="tasks.empty_state"
            >
              <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-4">
                <Star size={24} className="text-primary" />
              </div>
              <p className="font-display font-semibold text-foreground mb-1">
                {tasks.length === 0 ? "No tasks yet" : "No tasks match filters"}
              </p>
              <p className="text-sm text-muted-foreground font-body mb-4">
                {tasks.length === 0
                  ? "Add your first task to start building momentum"
                  : "Try a different category or priority filter"}
              </p>
              {tasks.length === 0 && (
                <GoldButton
                  size="sm"
                  onClick={() => setShowAddTask(true)}
                  data-ocid="tasks.empty.add_button"
                >
                  <Plus size={16} /> Add First Task
                </GoldButton>
              )}
            </GlassCard>
          )}
        </>
      )}

      {/* ═══════════ GOALS TAB ═══════════ */}
      {tab === "goals" && (
        <div className="space-y-4">
          {/* Add goal form */}
          <AnimatePresence>
            {showAddGoal && (
              <AddGoalForm
                onAdd={addGoal}
                onCancel={() => setShowAddGoal(false)}
              />
            )}
          </AnimatePresence>

          {/* Goal cards */}
          {goals.length > 0 && (
            <div className="space-y-3">
              <AnimatePresence>
                {goals.map((goal, i) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <GoalCard
                      goal={goal}
                      index={i}
                      onUpdateProgress={updateGoalProgress}
                      onDelete={deleteGoal}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Monthly completion chart */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <TrendingUp size={14} className="text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-foreground">
                  Completion Trend
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  Past 6 months · tasks completed
                </p>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MONTHLY_DATA}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border) / 0.3)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 11,
                      fontFamily: "var(--font-display)",
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fontFamily: "var(--font-display)",
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "oklch(var(--primary) / 0.08)" }}
                  />
                  <Bar
                    dataKey="completed"
                    radius={[4, 4, 0, 0]}
                    fill="oklch(var(--primary))"
                    opacity={0.85}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none">
              {MONTHLY_DATA.map((d, i) => (
                <div key={MONTHS[i]} className="flex-1 text-center min-w-0">
                  <p className="text-xs font-display font-bold text-primary">
                    {d.completed}
                  </p>
                  <p className="text-xs text-muted-foreground">{d.month}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Empty state */}
          {goals.length === 0 && (
            <GlassCard
              className="text-center py-10"
              data-ocid="goals.empty_state"
            >
              <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-4">
                <Target size={24} className="text-primary" />
              </div>
              <p className="font-display font-semibold text-foreground mb-1">
                No goals set
              </p>
              <p className="text-sm text-muted-foreground font-body mb-4">
                Set your first ambitious goal and track progress
              </p>
              <GoldButton
                size="sm"
                onClick={() => setShowAddGoal(true)}
                data-ocid="goals.empty.add_button"
              >
                <Plus size={16} /> Set First Goal
              </GoldButton>
            </GlassCard>
          )}
        </div>
      )}
    </motion.div>
  );
}
