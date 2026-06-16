"use client";

import { useState } from "react";

export function useConversationCoach() {
  const [question, setQuestion] = useState("Tell me about yourself.");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const askConversationCoach = async (answer: string) => {
    if (!answer.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: question,
          answer,
        }),
      });

      const data = await response.json();

      setFeedback(data.text);

      const followUpMatch = data.text.match(/Follow[- ]?up.*?:([\s\S]*)/i);

      if (followUpMatch?.[1]) {
        setQuestion(followUpMatch[1].trim());
      }
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setQuestion("Tell me about yourself.");
    setFeedback("");
  };

  return {
    question,
    feedback,
    loading,
    askConversationCoach,
    resetConversation,
  };
}