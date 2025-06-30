import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  username: string;
  email?: string;
  mastery: Record<string, number>;
  progress: string[];
  recommendations: string[];
  quizHistory: any[];
  setQuizHistory: (history: any[]) => void;
  setProfile: (profile: Partial<UserProfile>) => void;
  clearProfile: () => void;
  addLearnedTopic: (topic: string) => void;
  removeLearnedTopic: (topic: string) => void;
}

export const useUserStore = create<UserProfile>()(
  persist(
    (set) => ({
      username: "",
      email: "",
      mastery: {},
      progress: [],
      recommendations: [],
      quizHistory: [],
      setQuizHistory: (history) => set({ quizHistory: history }),
      setProfile: (profile) =>
        set((state) => ({
          ...state,
          mastery: {
            ...state.mastery,
            ...profile.mastery, // ✅ merge mastery
          },
          ...profile,
        })),
      clearProfile: () =>
        set({
          username: "",
          email: "",
          mastery: {},
          progress: [],
          recommendations: [],
          quizHistory: [],
        }),
      addLearnedTopic: (topic) =>
        set((state) =>
          state.progress.includes(topic)
            ? state
            : { progress: [...state.progress, topic] }
        ),
      removeLearnedTopic: (topic: string) =>
        set((state) => ({
          progress: state.progress.filter((t) => t !== topic),
    }))

    }),
    {
      name: "user-profile",
    }
  )
);
