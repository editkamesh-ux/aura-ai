import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Stats {
    tasksCompletedToday: bigint;
    goalProgressSummary: Array<GoalProgressSummary>;
    currentStreak: bigint;
    totalFocusTime: bigint;
}
export interface CreateGoalInput {
    title: string;
    targetDate?: Timestamp;
    category: GoalCategory;
}
export interface LogFocusSessionInput {
    startTime: Timestamp;
    duration: bigint;
    sessionType: SessionType;
}
export interface CreateRoutineInput {
    startTime: string;
    endTime: string;
    name: string;
    daysOfWeek: Array<DayOfWeek>;
    isEnabled: boolean;
    category: RoutineCategory;
}
export interface TaskPublic {
    id: ItemId;
    title: string;
    isCompleted: boolean;
    createdAt: Timestamp;
    dueDate?: Timestamp;
    category: TaskCategory;
    priority: TaskPriority;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type ItemId = bigint;
export interface FocusSessionPublic {
    id: ItemId;
    startTime: Timestamp;
    duration: bigint;
    sessionType: SessionType;
}
export interface ChatMessagePublic {
    id: ItemId;
    content: string;
    role: ChatRole;
    timestamp: Timestamp;
}
export interface SendMessageInput {
    content: string;
}
export interface UpdateTaskInput {
    id: ItemId;
    title: string;
    isCompleted: boolean;
    dueDate?: Timestamp;
    category: TaskCategory;
    priority: TaskPriority;
}
export interface UpdateRoutineInput {
    id: ItemId;
    startTime: string;
    endTime: string;
    name: string;
    daysOfWeek: Array<DayOfWeek>;
    isEnabled: boolean;
    category: RoutineCategory;
}
export interface Preferences {
    theme: string;
    notificationSettings: NotificationSettings;
}
export interface NotificationSettings {
    habitNudges: boolean;
    motivationalAlerts: boolean;
    routineReminders: boolean;
}
export interface GoalPublic {
    id: ItemId;
    title: string;
    progressPercent: bigint;
    targetDate?: Timestamp;
    linkedTaskIds: Array<ItemId>;
    category: GoalCategory;
}
export interface CreateTaskInput {
    title: string;
    dueDate?: Timestamp;
    category: TaskCategory;
    priority: TaskPriority;
}
export interface http_header {
    value: string;
    name: string;
}
export interface UserProfilePublic {
    displayName: string;
    userId: UserId;
    createdAt: Timestamp;
    preferences: Preferences;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface RoutineItemPublic {
    id: ItemId;
    startTime: string;
    endTime: string;
    name: string;
    daysOfWeek: Array<DayOfWeek>;
    isEnabled: boolean;
    category: RoutineCategory;
}
export interface UpdateGoalInput {
    id: ItemId;
    title: string;
    progressPercent: bigint;
    targetDate?: Timestamp;
    linkedTaskIds: Array<ItemId>;
    category: GoalCategory;
}
export interface GoalProgressSummary {
    title: string;
    goalId: bigint;
    progressPercent: bigint;
}
export enum ChatRole {
    user = "user",
    assistant = "assistant",
    systemRole = "systemRole"
}
export enum DayOfWeek {
    tuesday = "tuesday",
    wednesday = "wednesday",
    saturday = "saturday",
    thursday = "thursday",
    sunday = "sunday",
    friday = "friday",
    monday = "monday"
}
export enum GoalCategory {
    finance = "finance",
    other = "other",
    learning = "learning",
    personal = "personal",
    fitness = "fitness",
    career = "career",
    health = "health"
}
export enum RoutineCategory {
    morning = "morning",
    evening = "evening",
    custom = "custom",
    work = "work",
    sleep = "sleep",
    workout = "workout"
}
export enum SessionType {
    shortBreak = "shortBreak",
    longBreak = "longBreak",
    custom = "custom",
    pomodoro = "pomodoro",
    deepWork = "deepWork"
}
export enum TaskCategory {
    other = "other",
    learning = "learning",
    work = "work",
    personal = "personal",
    fitness = "fitness",
    health = "health"
}
export enum TaskPriority {
    low = "low",
    high = "high",
    medium = "medium"
}
export interface backendInterface {
    askAI(prompt: string): Promise<string>;
    clearChatHistory(): Promise<bigint>;
    createGoal(input: CreateGoalInput): Promise<GoalPublic>;
    createRoutine(input: CreateRoutineInput): Promise<RoutineItemPublic>;
    createTask(input: CreateTaskInput): Promise<TaskPublic>;
    deleteGoal(id: bigint): Promise<boolean>;
    deleteRoutine(id: bigint): Promise<boolean>;
    deleteTask(id: bigint): Promise<boolean>;
    getChatHistory(limit: bigint): Promise<Array<ChatMessagePublic>>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    getMyStats(): Promise<Stats>;
    listMyFocusSessions(): Promise<Array<FocusSessionPublic>>;
    listMyGoals(): Promise<Array<GoalPublic>>;
    listMyRoutines(): Promise<Array<RoutineItemPublic>>;
    listMyTasks(): Promise<Array<TaskPublic>>;
    logFocusSession(input: LogFocusSessionInput): Promise<FocusSessionPublic>;
    sendChatMessage(input: SendMessageInput): Promise<ChatMessagePublic>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateGoal(input: UpdateGoalInput): Promise<GoalPublic | null>;
    updateRoutine(input: UpdateRoutineInput): Promise<RoutineItemPublic | null>;
    updateTask(input: UpdateTaskInput): Promise<TaskPublic | null>;
    upsertMyProfile(displayName: string, preferences: Preferences): Promise<UserProfilePublic>;
}
