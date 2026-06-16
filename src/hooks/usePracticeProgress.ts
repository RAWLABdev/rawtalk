"use client";

import { useState } from "react";

const STORAGE_KEY = "daily-english-talk-progress";

type Progress = {
  sessionIndex: number;
  conversationIndex: number;
};

const initialProgress: Progress = {
  sessionIndex: 0,
  conversationIndex: 0,
};

function getInitialProgress(): Progress {
  if (typeof window === "undefined") {
    return initialProgress;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return initialProgress;
  }

  try {
    return JSON.parse(saved) as Progress;
  } catch {
    return initialProgress;
  }
}

export function usePracticeProgress() {
  const [progress, setProgress] = useState<Progress>(() => getInitialProgress());

  const saveProgress = (nextProgress: Progress) => {
    setProgress(nextProgress);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
  };

  return {
    progress,
    saveProgress,
    resetProgress,
  };
}