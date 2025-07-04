import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

export function useSyncLearnedTopics() {
  const quizHistory = useUserStore((state) => state.quizHistory);
  const progress = useUserStore((state) => state.progress);
  const addLearnedTopic = useUserStore((state) => state.addLearnedTopic);

  useEffect(() => {
    if (!quizHistory) return;

    quizHistory.forEach((entry: any) => {
      if (
        entry.topic &&
        typeof entry.mastery === "number" &&
        entry.mastery >= 0.7 &&
        !progress.includes(entry.topic)
      ) {
        addLearnedTopic(entry.topic);
      }
    });
  }, [quizHistory, progress, addLearnedTopic]);
}
