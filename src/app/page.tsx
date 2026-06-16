"use client";

import { useState } from "react";
import { conversations } from "@/data/conversations";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export default function Home() {
  const [index, setIndex] = useState(0);

  const { speak } = useTextToSpeech();

  const { transcript, isListening, startListening, resetTranscript } =
    useSpeechRecognition();

  const current = conversations[index];

  const nextConversation = () => {
    resetTranscript();
    setIndex((prev) => (prev + 1) % conversations.length);
  };

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Daily English Talk
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            Practice speaking English every day
          </h1>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <p className="text-sm capitalize text-neutral-400">
            {current.category} · {current.title}
          </p>

          <h2 className="mt-4 text-2xl font-semibold leading-relaxed">
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