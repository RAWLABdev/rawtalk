"use client";

import { useState } from "react";

export function useCoach() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const askCoach = async (
    prompt: string,
    answer: string
  ) => {
    setLoading(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          answer,
        }),
      });

      const data = await response.json();

      setFeedback(data.text);
    } finally {
      setLoading(false);
    }
  };

  return {
    feedback,
    loading,
    askCoach,
  };
}