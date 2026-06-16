"use client";

import { useState } from "react";

export function useCoach() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const askCoach = async (
    prompt: string,
    answer: string
  ) => {
    if (!answer.trim()) return;

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

      if ("speechSynthesis" in window) {
        const utterance =
          new SpeechSynthesisUtterance(
            data.text
          );

        utterance.lang = "en-US";
        utterance.rate = 0.9;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(
          utterance
        );
      }
    } catch (error) {
      console.error(error);
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