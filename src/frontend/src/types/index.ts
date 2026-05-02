export interface Routine {
  id: string;
  title: string;
  description: string;
  icon: string;
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  duration: number; // minutes
  steps: RoutineStep[];
  isActive: boolean;
  createdAt: number;
}

export interface RoutineStep {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: number;
  category: string;
  createdAt: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: number;
  progress: number; // 0-100
  milestones: Milestone[];
  category: string;
  createdAt: number;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  targetDate?: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface FocusSession {
  id: string;
  duration: number; // minutes
  type: "pomodoro" | "deep-work" | "break";
  startedAt: number;
  completedAt?: number;
  isActive: boolean;
}

export interface UserStats {
  tasksCompletedToday: number;
  tasksCompletedTotal: number;
  streakDays: number;
  focusMinutesToday: number;
  goalsActive: number;
  goalsCompleted: number;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  joinedAt: number;
  stats: UserStats;
}

export type Theme = "darkGold" | "darkCopper" | "light";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "reminder" | "motivation" | "habit";
  timestamp: number;
  read: boolean;
}
