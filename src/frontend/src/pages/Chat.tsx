import { GlassCard } from "@/components/GlassCard";
import { GoldBadge } from "@/components/GoldBadge";
import { GoldButton } from "@/components/GoldButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAppStore } from "@/store/appStore";
import type { ChatMessage, FocusSession, Task } from "@/types";
import {
  AlertTriangle,
  CheckCircle2,
  Dumbbell,
  Flame,
  Focus,
  ListTodo,
  Mic,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  Timer,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Quick prompt chips ───────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { label: "Generate today plan", icon: Zap, ocid: "chat.quick.plan" },
  { label: "Motivate me", icon: Flame, ocid: "chat.quick.motivate" },
  { label: "Suggest workout", icon: Dumbbell, ocid: "chat.quick.workout" },
  { label: "Review my goals", icon: Target, ocid: "chat.quick.goals" },
];

// ─── Focus mode config ────────────────────────────────────────────────────────
const FOCUS_MODES = [
  { id: "pomodoro" as const, label: "Pomodoro", minutes: 25, icon: Timer },
  { id: "deep-work" as const, label: "Deep Work", minutes: 90, icon: Focus },
  { id: "break" as const, label: "Break", minutes: 5, icon: CheckCircle2 },
];

// ─── Smart mock AI responses ──────────────────────────────────────────────────
function getMockResponse(message: string, context: string): string {
  const lower = message.toLowerCase();

  if (/plan|today|schedule|morning|routine/.test(lower)) {
    return `✦ **Your Personalized Day Plan**\n\nBased on your current tasks and routines, here's how to dominate today:\n\n🌅 **6:00 AM** — Wake & hydrate (2 glasses water)\n🧘 **6:15 AM** — Morning mindfulness (10 min)\n🏃 **6:30 AM** — Morning workout or walk (30 min)\n💡 **8:00 AM** — Deep work block — highest-priority task first\n📋 **10:30 AM** — Review & clear inbox\n🥗 **12:30 PM** — Lunch + 10-min walk\n🎯 **2:00 PM** — Focus session (your peak performance window)\n📖 **5:00 PM** — Learning or reading (30 min)\n🌙 **9:30 PM** — Evening review: 3 wins from today\n😴 **10:30 PM** — Wind down, no screens\n\n${context ? `\n*Context: ${context.slice(0, 120)}...*` : ""}\n\nYou've got everything it takes. Make today legendary. ✦`;
  }

  if (/motivat|inspire|boost|energy|confidence|uplift/.test(lower)) {
    const quotes = [
      "The disciplined mind is the most powerful force on earth. Every small action you take today compounds into the legend you're becoming. Your streak didn't happen by accident — it happened because you showed up.",
      "Champions don't wait for motivation — they build systems. You already have the system. Now execute. The version of you that future-you will thank exists in today's choices.",
      "Every elite performer has one secret: they do the work whether they feel like it or not. That's the gap between average and extraordinary. You're already choosing the right side.",
      "Progress isn't always visible day-to-day. But zoom out and look at who you were 90 days ago. The growth is undeniable. Keep going — the best is always ahead.",
    ];
    return `✦ **AURA Motivation Transmission**\n\n${quotes[Math.floor(Math.random() * quotes.length)]}\n\n*Today's micro-challenge:* Complete one task you've been avoiding. That single action will shift your momentum entirely. You have this. ✦`;
  }

  if (/workout|exercise|fitness|gym|training|strength|cardio|run/.test(lower)) {
    return `✦ **Personalized Workout Plan**\n\n**Today's Recommended Session (45 min)**\n\n🔥 **Warm-Up** (5 min)\n• Dynamic stretches + joint circles\n• 2 min light jog in place\n\n💪 **Main Circuit** (30 min — 3 rounds)\n• Push-ups: 15 reps\n• Bodyweight squats: 20 reps\n• Plank hold: 45 seconds\n• Mountain climbers: 30 reps\n• Rest: 60 seconds between rounds\n\n🧘 **Cool-Down** (10 min)\n• Full-body stretch sequence\n• 5-min deep breathing\n\n**Pro tip:** Consistency > Intensity. 3–4 sessions per week with progressive overload will compound into remarkable results within 8 weeks.\n\nTrack this in your routine today. 💫`;
  }

  if (/goal|goals|progress|target|achieve|milestone|objective/.test(lower)) {
    return `✦ **Goal Review & Strategy**\n\nHere's how to think about your goals with precision:\n\n**The AURA Framework:**\n\n🎯 **Audit** — Are your goals specific enough? Vague goals = vague results. "Get fit" → "Run 5K in under 30 min by June 30."\n\n📈 **Upgrade** — What's the one next action for each goal? Identify it now.\n\n🔁 **Routine** — Goals are won through systems, not willpower. Link each goal to a daily habit.\n\n🏆 **Acknowledge** — Celebrate micro-wins. Every milestone matters.\n\n**This week's focus:** Pick your #1 goal and give it 25% more attention than everything else. Single-pointed focus compounds faster than scattered effort.\n\nYou're on the right path. Let's accelerate it. ✦`;
  }

  if (
    /focus|distract|concentrate|deep work|pomodoro|productivity/.test(lower)
  ) {
    return `✦ **Focus Optimization Protocol**\n\nHere's your science-backed focus system:\n\n⚡ **The Setup (2 min)**\n1. Close all tabs except what you need\n2. Phone on silent, face-down\n3. Set a clear intention: *"I will complete [X] in the next 25 min"*\n\n🎯 **The Session**\n• Use the Focus Mode timer (tap the ⏱ button)\n• Work on ONE task only — no switching\n• If distracted, write the thought down and return immediately\n\n🔄 **The Reset**\n• 5-min break: stand, stretch, hydrate\n• Repeat 4× for a 2-hour deep work block\n\n**Key insight:** Your brain takes 23 minutes to recover from a single distraction. Protecting your focus window is the highest-leverage action you can take today.\n\nActivate Focus Mode now and enter your peak state. ✦`;
  }

  if (/sleep|rest|recover|tired|fatigue|night/.test(lower)) {
    return `✦ **Sleep & Recovery Blueprint**\n\nElite performance starts with elite recovery:\n\n🌙 **Evening Wind-Down (1hr before bed)**\n• Dim lights — signals melatonin production\n• No screens (or use blue-light glasses)\n• Light stretching or journaling\n• Set tomorrow's top 3 priorities\n\n😴 **Sleep Optimization**\n• Consistent bedtime = more important than duration\n• Room temp: 65–68°F (18–20°C) is ideal\n• Complete darkness activates deep sleep\n• 7–9 hours for cognitive peak performance\n\n☀️ **Morning Recovery Signal**\n• Get sunlight within 30 min of waking\n• This resets your circadian clock and boosts daytime alertness by up to 50%\n\n*Recovery isn't weakness — it's when growth actually happens.* ✦`;
  }

  if (/stress|anxiety|overwhelm|pressure|calm|relax|breath/.test(lower)) {
    return `✦ **Stress Reset Protocol**\n\nWhen the pressure builds, use this 4-step reset:\n\n1. **4-7-8 Breathing** (60 seconds)\n   Inhale 4 counts → Hold 7 counts → Exhale 8 counts\n   Repeat 3× — activates parasympathetic nervous system instantly\n\n2. **Cognitive Reframe**\n   Ask: *"Is this urgent, important, both, or neither?"*\n   Most stressors fall into "neither" when examined clearly.\n\n3. **Micro-Action**\n   Pick the smallest possible next step. Action dissolves anxiety.\n\n4. **Perspective Anchor**\n   Where will this be in 5 years? Most things won't matter at all.\n\nYou are more capable than this moment. Breathe, reset, execute. ✦`;
  }

  // Default intelligent response
  return `✦ **AURA AI Response**\n\nThank you for sharing that with me. Based on your message, here's my perspective:\n\n${message.length > 20 ? `You mentioned: *"${message.slice(0, 80)}${message.length > 80 ? "..." : ""}"* — this is worth exploring deeply.\n\n` : ""}**My recommendation:** Break this down into the smallest actionable step and do that first. Momentum builds on momentum.\n\nFor more personalized guidance, try asking me about:\n• Your daily plan or schedule\n• Motivation and mindset\n• Workout and fitness\n• Goal progress and strategy\n• Focus and deep work\n• Sleep and recovery\n\nI'm here to help you reach your highest potential. What aspect would you like to explore? ✦`;
}

// ─── Format message content (bold **text**) ───────────────────────────────────

function formatContent(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/);
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static text split — order is immutable
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: static text split
            <strong key={j} className="font-semibold text-primary">
              {part.slice(2, -2)}
            </strong>
          ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: static text split
            <span key={j}>{part}</span>
          ),
        )}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ─── Focus Mode Overlay ───────────────────────────────────────────────────────
interface FocusOverlayProps {
  onClose: () => void;
  onComplete: (session: FocusSession) => void;
}

function FocusOverlay({ onClose, onComplete }: FocusOverlayProps) {
  const [selected, setSelected] = useState<(typeof FOCUS_MODES)[0]>(
    FOCUS_MODES[0],
  );
  const [customMinutes, setCustomMinutes] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [sessionStart, setSessionStart] = useState<number>(0);
  const totalSeconds = (showCustom ? customMinutes : selected.minutes) * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [done, setDone] = useState(false);

  // reset timer when mode changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset when mode changes
  useEffect(() => {
    if (!isRunning) {
      setRemaining((showCustom ? customMinutes : selected.minutes) * 60);
    }
  }, [selected, customMinutes, showCustom]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setDone(true);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
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
    const elapsed = Math.round((Date.now() - sessionStart) / 60000);
    if (elapsed >= 1) {
      onComplete({
        id: `focus-${Date.now()}`,
        duration: elapsed,
        type: showCustom ? "pomodoro" : selected.id,
        startedAt: sessionStart,
        completedAt: Date.now(),
        isActive: false,
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
      isActive: false,
    });
  };

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const totalSec = (showCustom ? customMinutes : selected.minutes) * 60;
  const progress = ((totalSec - remaining) / totalSec) * 100;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="focus.modal"
    >
      {/* Close */}
      <button
        type="button"
        onClick={() => {
          if (isRunning) handleStop();
          onClose();
        }}
        className="absolute top-4 right-4 p-2 rounded-xl glassmorphism text-muted-foreground hover:text-foreground transition-smooth"
        aria-label="Close focus mode"
        data-ocid="focus.close_button"
      >
        <X size={20} />
      </button>

      <div className="w-full max-w-sm px-6 flex flex-col items-center gap-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-display font-bold text-2xl gradient-gold-text">
            Focus Mode
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Eliminate distractions. Enter peak state.
          </p>
        </div>

        {/* Mode Selector */}
        {!isRunning && !done && (
          <div className="flex gap-2 w-full">
            {FOCUS_MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => {
                    setSelected(mode);
                    setShowCustom(false);
                  }}
                  data-ocid={`focus.mode.${mode.id}`}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-display transition-smooth ${
                    selected.id === mode.id && !showCustom
                      ? "bg-primary text-primary-foreground gold-glow"
                      : "glassmorphism text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  <span>{mode.label}</span>
                  <span className="opacity-70">{mode.minutes}m</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setShowCustom(true)}
              data-ocid="focus.mode.custom"
              className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-display transition-smooth ${
                showCustom
                  ? "bg-primary text-primary-foreground gold-glow"
                  : "glassmorphism text-muted-foreground hover:text-foreground"
              }`}
            >
              <Timer size={16} />
              <span>Custom</span>
              <span className="opacity-70">{customMinutes}m</span>
            </button>
          </div>
        )}

        {showCustom && !isRunning && !done && (
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => setCustomMinutes((m) => Math.max(1, m - 5))}
              className="w-10 h-10 glassmorphism rounded-xl font-bold text-foreground hover:gold-glow transition-smooth"
              data-ocid="focus.custom.minus"
            >
              −
            </button>
            <div className="flex-1 text-center font-display font-bold text-2xl gradient-gold-text">
              {customMinutes} min
            </div>
            <button
              type="button"
              onClick={() => setCustomMinutes((m) => Math.min(180, m + 5))}
              className="w-10 h-10 glassmorphism rounded-xl font-bold text-foreground hover:gold-glow transition-smooth"
              data-ocid="focus.custom.plus"
            >
              +
            </button>
          </div>
        )}

        {/* Circular Timer */}
        <div className="relative w-52 h-52">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="oklch(var(--border) / 0.3)"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="oklch(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 * (1 - progress / 100)}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {done ? (
              <>
                <CheckCircle2 size={32} className="text-primary mb-1" />
                <span className="font-display font-bold text-lg gradient-gold-text">
                  Complete!
                </span>
              </>
            ) : (
              <>
                <span className="font-display font-bold text-4xl gradient-gold-text">
                  {String(minutes).padStart(2, "0")}:
                  {String(secs).padStart(2, "0")}
                </span>
                <span className="text-xs text-muted-foreground font-body mt-1">
                  {showCustom ? "Custom" : selected.label}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 w-full">
          {done ? (
            <GoldButton
              className="flex-1"
              onClick={handleDone}
              data-ocid="focus.complete_button"
            >
              <CheckCircle2 size={16} /> Log Session
            </GoldButton>
          ) : isRunning ? (
            <GoldButton
              variant="outline"
              className="flex-1"
              onClick={handleStop}
              data-ocid="focus.stop_button"
            >
              Stop & Save
            </GoldButton>
          ) : (
            <GoldButton
              className="flex-1"
              onClick={handleStart}
              data-ocid="focus.start_button"
            >
              <Zap size={16} /> Start Session
            </GoldButton>
          )}
        </div>

        {isRunning && (
          <p className="text-xs text-muted-foreground font-body text-center">
            Stay focused. Close eyes, breathe deeply, and execute.
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Clear Chat Confirmation ──────────────────────────────────────────────────
function ClearConfirmDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="chat.clear_dialog"
    >
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        aria-hidden="true"
      />
      <motion.div
        className="relative w-full max-w-sm"
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
      >
        <GlassCard glow padding="lg">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} className="text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">
                Clear chat history?
              </h3>
              <p className="text-sm text-muted-foreground font-body mt-0.5">
                This will permanently delete all messages. This action cannot be
                undone.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <GoldButton
              variant="outline"
              className="flex-1"
              onClick={onCancel}
              data-ocid="chat.clear_dialog.cancel_button"
            >
              Cancel
            </GoldButton>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl bg-destructive/80 hover:bg-destructive text-destructive-foreground text-sm font-semibold font-display transition-smooth"
              data-ocid="chat.clear_dialog.confirm_button"
            >
              Clear All
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Chat Component ──────────────────────────────────────────────────────
export default function Chat() {
  const { profile, setProfile } = useAppStore();
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(
    "aura-chat",
    [],
  );
  const [tasks] = useLocalStorage<Task[]>("aura-tasks", []);
  const [_focusSessions, setFocusSessions] = useLocalStorage<FocusSession[]>(
    "aura-focus-sessions",
    [],
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message/typing updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Build AI context string from user data
  const buildContext = useCallback(() => {
    const pending = tasks.filter((t) => !t.completed).slice(0, 5);
    const done = tasks.filter((t) => t.completed).length;
    if (pending.length === 0 && done === 0) return "";
    const pendingStr = pending.map((t) => t.title).join(", ");
    return `User has ${done} tasks completed today. Pending: ${pendingStr || "none"}. Streak: ${profile.stats.streakDays} days. Focus minutes today: ${profile.stats.focusMinutesToday}.`;
  }, [tasks, profile.stats]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isTyping) return;

      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        content,
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const updated = [...prev, userMsg];
        return updated.slice(-50); // keep last 50
      });
      setInput("");
      setIsTyping(true);

      // Simulate network latency for realism
      const delay = 800 + Math.random() * 1000;
      await new Promise((r) => setTimeout(r, delay));

      const context = buildContext();
      const aiContent = getMockResponse(content, context);

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: "assistant",
        content: aiContent,
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const updated = [...prev, aiMsg];
        return updated.slice(-50);
      });
      setIsTyping(false);
    },
    [input, isTyping, setMessages, buildContext],
  );

  const handleQuickPrompt = (label: string) => {
    sendMessage(label);
  };

  const handleClear = () => {
    setMessages([]);
    setShowClearConfirm(false);
  };

  const handleFocusComplete = (session: FocusSession) => {
    setFocusSessions((prev) => [...prev, session]);
    // Update daily stats
    setProfile({
      stats: {
        ...profile.stats,
        focusMinutesToday: profile.stats.focusMinutesToday + session.duration,
      },
    });
    setShowFocus(false);
    // Send completion message to chat
    const completionMsg: ChatMessage = {
      id: `msg-${Date.now()}-focus`,
      role: "assistant",
      content: `✦ **Focus Session Complete!**\n\nYou just completed a ${session.duration}-minute ${session.type === "deep-work" ? "Deep Work" : session.type === "break" ? "Break" : "Pomodoro"} session. That's elite-level discipline.\n\nTotal focus time today: **${profile.stats.focusMinutesToday + session.duration} minutes**. Keep compounding. ✦`,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, completionMsg].slice(-50));
  };

  // Voice input (Web Speech API)
  const handleVoice = () => {
    type SpeechRecognitionCtor = new () => {
      lang: string;
      interimResults: boolean;
      onstart: (() => void) | null;
      onend: (() => void) | null;
      onresult:
        | ((e: {
            results: { [k: number]: { [k: number]: { transcript: string } } };
          }) => void)
        | null;
      start: () => void;
    };
    const win = window as unknown as Record<string, unknown>;
    const Ctor = (win.SpeechRecognition ?? win.webkitSpeechRecognition) as
      | SpeechRecognitionCtor
      | undefined;
    if (!Ctor) return;
    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setVoiceActive(true);
    recognition.onend = () => setVoiceActive(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      inputRef.current?.focus();
    };
    recognition.start();
  };

  return (
    <>
      {/* Focus mode overlay */}
      <AnimatePresence>
        {showFocus && (
          <FocusOverlay
            onClose={() => setShowFocus(false)}
            onComplete={handleFocusComplete}
          />
        )}
      </AnimatePresence>

      {/* Clear confirm */}
      <AnimatePresence>
        {showClearConfirm && (
          <ClearConfirmDialog
            onConfirm={handleClear}
            onCancel={() => setShowClearConfirm(false)}
          />
        )}
      </AnimatePresence>

      <div
        className="flex flex-col h-[calc(100vh-10rem)]"
        data-ocid="chat.page"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pt-1 shrink-0">
          <div className="min-w-0">
            <h1 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
              <Sparkles size={18} className="text-primary shrink-0" />
              <span>AURA AI Chat</span>
            </h1>
            <p className="text-xs text-muted-foreground font-body">
              Your personal AI · {messages.length} message
              {messages.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {/* Focus Mode button */}
            <button
              type="button"
              onClick={() => setShowFocus(true)}
              className="p-2 glassmorphism rounded-xl text-primary hover:gold-glow transition-smooth"
              aria-label="Start focus mode"
              data-ocid="chat.focus_button"
            >
              <Timer size={16} />
            </button>
            {/* Clear button */}
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="p-2 text-muted-foreground hover:text-foreground transition-smooth rounded-xl glassmorphism"
                aria-label="Clear chat history"
                data-ocid="chat.clear_button"
              >
                <RotateCcw size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Quick prompts */}
        <div
          className="flex gap-2 mb-3 shrink-0 overflow-x-auto scrollbar-none pb-1"
          data-ocid="chat.quick_prompts"
        >
          {QUICK_PROMPTS.map(({ label, icon: Icon, ocid }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleQuickPrompt(label)}
              disabled={isTyping}
              data-ocid={ocid}
              className="flex items-center gap-1.5 px-3 py-1.5 glassmorphism rounded-full text-xs font-display text-foreground whitespace-nowrap hover:gold-glow hover:text-primary transition-smooth shrink-0 disabled:opacity-50"
            >
              <Icon size={11} className="text-primary shrink-0" />
              {label}
            </button>
          ))}
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto space-y-3 pb-3 scrollbar-none"
          data-ocid="chat.messages"
        >
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center py-6 gap-4"
              data-ocid="chat.empty_state"
            >
              <div className="w-16 h-16 rounded-full glassmorphism gold-glow flex items-center justify-center">
                <Sparkles size={28} className="text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground mb-1">
                  Hello, {profile.name}. I'm AURA AI.
                </p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  Your personal assistant for productivity, wellness,
                  <br />
                  and daily excellence. Ask me anything.
                </p>
              </div>
              <GoldBadge variant="gold">
                Tap a prompt above to start ✦
              </GoldBadge>
              <div className="grid grid-cols-2 gap-2 w-full">
                {[
                  { icon: ListTodo, text: "Daily task planning" },
                  { icon: Dumbbell, text: "Fitness & workouts" },
                  { icon: Target, text: "Goal strategy" },
                  { icon: Focus, text: "Deep focus & flow" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 p-3 glassmorphism rounded-xl text-xs text-muted-foreground font-body"
                  >
                    <Icon size={14} className="text-primary shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
                data-ocid={`chat.message.${i + 1}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full glassmorphism gold-glow flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Sparkles size={12} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "glassmorphism text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.role === "assistant"
                    ? formatContent(msg.content)
                    : msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
              data-ocid="chat.loading_state"
            >
              <div className="w-7 h-7 rounded-full glassmorphism gold-glow flex items-center justify-center shrink-0">
                <Sparkles size={12} className="text-primary" />
              </div>
              <div className="glassmorphism px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      style={{
                        animation: `bounce 1.2s ease-in-out ${dot * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="shrink-0" data-ocid="chat.input_area">
          <GlassCard padding="sm" className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleVoice}
              className={`p-2 transition-smooth shrink-0 rounded-lg ${
                voiceActive
                  ? "text-primary gold-glow animate-pulse"
                  : "text-muted-foreground hover:text-primary"
              }`}
              aria-label="Voice input"
              data-ocid="chat.voice_button"
            >
              <Mic size={18} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
              placeholder="Ask AURA AI anything..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-body min-w-0"
              data-ocid="chat.input"
            />
            <GoldButton
              size="sm"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="shrink-0 !px-3 !py-2"
              data-ocid="chat.send_button"
            >
              <Send size={16} />
            </GoldButton>
          </GlassCard>
          <p className="text-center text-[10px] text-muted-foreground font-body mt-1.5 opacity-60">
            AURA AI · Powered by personalized context
          </p>
        </div>
      </div>
    </>
  );
}
