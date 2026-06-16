"use client";

import { useState } from "react";
import { sessions } from "@/data/sessions";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { evaluateAnswer } from "@/lib/evaluateAnswer";

export default function Home() {
  const [sessionIndex, setSessionIndex] = useState(0);
  const [conversationIndex, setConversationIndex] = useState(0);

  const { speak } = useTextToSpeech();
  const { transcript, isListening, startListening, resetTranscript } =
    useSpeechRecognition();

  const session = sessions[sessionIndex];
  const current = session.conversations[conversationIndex];

  const result = evaluateAnswer(transcript, current.suggestion);

  const nextConversation = () => {
    resetTranscript();

    if (conversationIndex < session.conversations.length - 1) {
      setConversationIndex((prev) => prev + 1);
      return;
    }

    alert("Session completed 🎉");
  };

  const nextSession = () => {
    resetTranscript();

    if (sessionIndex < sessions.length - 1) {
      setSessionIndex((prev) => prev + 1);
      setConversationIndex(0);
    }
  };

  const previousSession = () => {
    resetTranscript();

    if (sessionIndex > 0) {
      setSessionIndex((prev) => prev - 1);
      setConversationIndex(0);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Daily English Talk
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={previousSession}
              className="rounded-lg border border-neutral-700 px-3 py-1"
            >
              ←
            </button>

            <div className="text-sm text-neutral-400">
              Day {session.day} · {session.title}
            </div>

            <button
              onClick={nextSession}
              className="rounded-lg border border-neutral-700 px-3 py-1"
            >
              →
            </button>
          </div>

          <h1 className="mt-3 text-3xl font-bold">
            Practice speaking English every day
          </h1>

          <div className="mt-2 text-sm text-neutral-500">
            Question {conversationIndex + 1} of {session.conversations.length}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-2xl font-semibold leading-relaxed">
            {current.prompt}
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => speak(current.prompt)}
              className="rounded-xl bg-white px-4 py-2 font-medium text-black"
            >
              Listen
            </button>

            <button
              onClick={startListening}
              className="rounded-xl border border-neutral-700 px-4 py-2 font-medium"
            >
              {isListening ? "Listening..." : "Speak"}
            </button>

            <button
              onClick={nextConversation}
              className="rounded-xl border border-neutral-700 px-4 py-2 font-medium text-neutral-300"
            >
              Next
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="font-semibold">You said:</h3>
          <p className="mt-3 min-h-12 text-neutral-300">
            {transcript || "Your spoken answer will appear here."}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="font-semibold">Score</h3>
          <p className="mt-3 text-3xl font-bold">{result.score}%</p>
          <p className="mt-2 text-neutral-400">{result.feedback}</p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="font-semibold">Suggested answer:</h3>
          <p className="mt-3 text-neutral-300">{current.suggestion}</p>

          <button
            onClick={() => speak(current.suggestion)}
            className="mt-5 rounded-xl bg-green-400 px-4 py-2 font-medium text-black"
          >
            Listen to suggested answer
          </button>
        </div>
      </section>
    </main>
  );
}