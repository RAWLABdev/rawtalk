// src/app/page.tsx
"use client";

import { useState } from "react";

const conversations = [
  {
    title: "Daily check-in",
    prompt: "Hi Raul, how was your day today?",
    suggestion: "My day was good. I worked on my projects and practiced English.",
  },
  {
    title: "Talking about work",
    prompt: "Can you tell me what you do for work?",
    suggestion:
      "I am a frontend developer. I work with React, React Native, TypeScript and Next.js.",
  },
  {
    title: "Talking about hobbies",
    prompt: "What do you usually do in your free time?",
    suggestion:
      "In my free time, I like climbing, walking with my dog Nuria, and building digital projects.",
  },
  {
    title: "Job interview",
    prompt: "Tell me about your experience with React.",
    suggestion:
      "I have over four years of experience working with React and React Native. I have worked on banking applications, design systems, and mobile features.",
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  const current = conversations[index];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const nextConversation = () => {
    setTranscript("");
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
          <p className="text-sm text-neutral-400">{current.title}</p>

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