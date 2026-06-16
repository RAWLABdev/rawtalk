"use client";

import { useState } from "react";

type Progress = {
  sessionIndex: number;
  conversationIndex: number;
};

const initialProgress: Progress = {
  sessionIndex: 0,
  conversationIndex: 0,
};

export function usePracticeProgress() {
  const [progress, setProgress] = useState<Progress>(initialProgress);

  const saveProgress = (nextProgress: Progress) => {
    setProgress(nextProgress);
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  return {
    progress,
    saveProgress,
    resetProgress,
    isReady: true,
  };
}