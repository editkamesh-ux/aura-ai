import type { Theme, UserProfile } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
}

const defaultProfile: UserProfile = {
  name: "Champion",
  joinedAt: Date.now(),
  stats: {
    tasksCompletedToday: 3,
    tasksCompletedTotal: 47,
    streakDays: 12,
    focusMinutesToday: 90,
    goalsActive: 4,
    goalsCompleted: 8,
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "darkGold",
      setTheme: (theme) => set({ theme }),
      profile: defaultProfile,
      setProfile: (profile) =>
        set((state) => ({ profile: { ...state.profile, ...profile } })),
      notificationsEnabled: true,
      setNotificationsEnabled: (notificationsEnabled) =>
        set({ notificationsEnabled }),
      onboardingCompleted: false,
      setOnboardingCompleted: (onboardingCompleted) =>
        set({ onboardingCompleted }),
    }),
    { name: "aura-app-store" },
  ),
);
