import type { backendInterface, ChatMessagePublic, ChatRole, DayOfWeek, FocusSessionPublic, GoalCategory, GoalPublic, Preferences, RoutineCategory, RoutineItemPublic, SessionType, Stats, TaskCategory, TaskPriority, TaskPublic, UserProfilePublic } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const mockTasks: TaskPublic[] = [
  { id: BigInt(1), title: "Morning Workout", isCompleted: true, createdAt: now, category: "fitness" as TaskCategory, priority: "high" as TaskPriority },
  { id: BigInt(2), title: "Review project goals", isCompleted: false, createdAt: now, category: "work" as TaskCategory, priority: "high" as TaskPriority },
  { id: BigInt(3), title: "Read 30 minutes", isCompleted: false, createdAt: now, category: "learning" as TaskCategory, priority: "medium" as TaskPriority },
  { id: BigInt(4), title: "Meditate", isCompleted: true, createdAt: now, category: "health" as TaskCategory, priority: "medium" as TaskPriority },
];

const mockRoutines: RoutineItemPublic[] = [
  { id: BigInt(1), name: "Morning Momentum", startTime: "06:00", endTime: "07:30", daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"] as DayOfWeek[], isEnabled: true, category: "morning" as RoutineCategory },
  { id: BigInt(2), name: "Deep Work Flow", startTime: "09:00", endTime: "12:00", daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"] as DayOfWeek[], isEnabled: true, category: "work" as RoutineCategory },
  { id: BigInt(3), name: "Evening Reflection", startTime: "20:00", endTime: "21:00", daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as DayOfWeek[], isEnabled: true, category: "evening" as RoutineCategory },
];

const mockGoals: GoalPublic[] = [
  { id: BigInt(1), title: "Complete Fitness Challenge", progressPercent: BigInt(65), linkedTaskIds: [BigInt(1)], category: "fitness" as GoalCategory },
  { id: BigInt(2), title: "Learn New Skills", progressPercent: BigInt(40), linkedTaskIds: [BigInt(3)], category: "learning" as GoalCategory },
  { id: BigInt(3), title: "Career Advancement", progressPercent: BigInt(30), linkedTaskIds: [BigInt(2)], category: "career" as GoalCategory },
];

const mockChatHistory: ChatMessagePublic[] = [
  { id: BigInt(1), content: "Hello, AURA AI! How can you help me today?", role: "user" as unknown as ChatRole, timestamp: now - BigInt(60_000_000_000) },
  { id: BigInt(2), content: "Hello! I'm AURA AI, your premium personal assistant. I can help you with productivity, fitness, mindset, and daily planning. What would you like to focus on today?", role: "assistant" as unknown as ChatRole, timestamp: now - BigInt(30_000_000_000) },
  { id: BigInt(3), content: "Can you help me plan my morning routine?", role: "user" as unknown as ChatRole, timestamp: now - BigInt(15_000_000_000) },
  { id: BigInt(4), content: "Absolutely! A great morning routine sets the tone for the entire day. Based on your habits, I recommend starting with 5 minutes of mindful breathing, followed by a 20-minute workout, then a nutritious breakfast. Want me to add this to your routine?", role: "assistant" as unknown as ChatRole, timestamp: now },
];

const mockStats: Stats = {
  tasksCompletedToday: BigInt(2),
  currentStreak: BigInt(7),
  totalFocusTime: BigInt(180),
  goalProgressSummary: [
    { goalId: BigInt(1), title: "Complete Fitness Challenge", progressPercent: BigInt(65) },
    { goalId: BigInt(2), title: "Learn New Skills", progressPercent: BigInt(40) },
    { goalId: BigInt(3), title: "Career Advancement", progressPercent: BigInt(30) },
  ],
};

const mockProfile: UserProfilePublic = {
  userId: { toText: () => "user-1" } as any,
  displayName: "Alex",
  createdAt: now,
  preferences: {
    theme: "dark-gold",
    notificationSettings: {
      motivationalAlerts: true,
      routineReminders: true,
      habitNudges: true,
    },
  },
};

const mockFocusSessions: FocusSessionPublic[] = [
  { id: BigInt(1), startTime: now - BigInt(7_200_000_000_000), duration: BigInt(1500), sessionType: "pomodoro" as SessionType },
  { id: BigInt(2), startTime: now - BigInt(3_600_000_000_000), duration: BigInt(2700), sessionType: "deepWork" as SessionType },
];

export const mockBackend: backendInterface = {
  askAI: async (prompt: string) => `Based on your question "${prompt}", here's my insight: Focus on consistency over intensity. Small daily actions compound into extraordinary results over time. You're doing great — keep building those habits!`,

  clearChatHistory: async () => BigInt(0),

  createGoal: async (input) => ({
    id: BigInt(Date.now()),
    title: input.title,
    progressPercent: BigInt(0),
    targetDate: input.targetDate,
    linkedTaskIds: [],
    category: input.category,
  }),

  createRoutine: async (input) => ({
    id: BigInt(Date.now()),
    name: input.name,
    startTime: input.startTime,
    endTime: input.endTime,
    daysOfWeek: input.daysOfWeek,
    isEnabled: input.isEnabled,
    category: input.category,
  }),

  createTask: async (input) => ({
    id: BigInt(Date.now()),
    title: input.title,
    isCompleted: false,
    createdAt: now,
    dueDate: input.dueDate,
    category: input.category,
    priority: input.priority,
  }),

  deleteGoal: async () => true,
  deleteRoutine: async () => true,
  deleteTask: async () => true,

  getChatHistory: async () => mockChatHistory,

  getMyProfile: async () => mockProfile,

  getMyStats: async () => mockStats,

  listMyFocusSessions: async () => mockFocusSessions,

  listMyGoals: async () => mockGoals,

  listMyRoutines: async () => mockRoutines,

  listMyTasks: async () => mockTasks,

  logFocusSession: async (input) => ({
    id: BigInt(Date.now()),
    startTime: input.startTime,
    duration: input.duration,
    sessionType: input.sessionType,
  }),

  sendChatMessage: async (input) => ({
    id: BigInt(Date.now()),
    content: input.content,
    role: "user" as unknown as ChatRole,
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
  }),

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),

  updateGoal: async (input) => ({
    id: input.id,
    title: input.title,
    progressPercent: input.progressPercent,
    targetDate: input.targetDate,
    linkedTaskIds: input.linkedTaskIds,
    category: input.category,
  }),

  updateRoutine: async (input) => ({
    id: input.id,
    name: input.name,
    startTime: input.startTime,
    endTime: input.endTime,
    daysOfWeek: input.daysOfWeek,
    isEnabled: input.isEnabled,
    category: input.category,
  }),

  updateTask: async (input) => ({
    id: input.id,
    title: input.title,
    isCompleted: input.isCompleted,
    createdAt: now,
    dueDate: input.dueDate,
    category: input.category,
    priority: input.priority,
  }),

  upsertMyProfile: async (displayName, preferences) => ({
    ...mockProfile,
    displayName,
    preferences,
  }),
};
