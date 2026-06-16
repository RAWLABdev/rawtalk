"use client";

import { sessions } from "@/data/sessions";
import { coachReplies } from "@/data/coachReplies";
import { StatsBar } from "@/components/StatsBar";
import { usePracticeProgress } from "@/hooks/usePracticeProgress";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useCoach } from "@/hooks/useCoach";
import { evaluateAnswer } from "@/lib/evaluateAnswer";

export default function Home() {
  const { progress, saveProgress, resetProgress, isReady } =
    usePracticeProgress();

  const { speak } = useTextToSpeech();

  const { transcript, isListening, startListening, resetTranscript } =
    useSpeechRecognition();

  const { feedback, loading, askCoach } = useCoach();

  if (!isReady) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
        Loading RAWTALK...
      </main>
    );
  }

  const sessionIndex = progress.sessionIndex;
  const conversationIndex = progress.conversationIndex;

  const session = sessions[sessionIndex];
  const current = session.conversations[conversationIndex];

  const result = evaluateAnswer(transcript, current.suggestion);

  const coachMessage =
    coachReplies[conversationIndex % coachReplies.length];

  const nextConversation = () => {
    resetTranscript();

    if (conversationIndex < session.conversations.length - 1) {
      saveProgress({
        sessionIndex,
        conversationIndex: conversationIndex + 1,
      });

      return;
    }

    if (sessionIndex < sessions.length - 1) {
      saveProgress({
        sessionIndex: sessionIndex + 1,
        conversationIndex: 0,
      });

      return;
    }

    alert("🎉 Congratulations! You completed the challenge.");
  };

  const nextSession = () => {
    resetTranscript();

    if (sessionIndex < sessions.length - 1) {
      saveProgress({
        sessionIndex: sessionIndex + 1,
        conversationIndex: 0,
      });
    }
  };

  const previousSession = () => {
    resetTranscript();

    if (sessionIndex > 0) {
      saveProgress({
        sessionIndex: sessionIndex - 1,
        conversationIndex: 0,
      });
    }
  };

  const handleReset = () => {
    resetTranscript();
    resetProgress();
  };

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Daily English Talk
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={previousSession}
              disabled={sessionIndex === 0}
              className="rounded-lg border border-neutral-700 px-3 py-1 disabled:opacity-40"
            >
              ←
            </button>

            <div className="text-sm text-neutral-400">
              Day {session.day} · {session.title}
            </div>

            <button
              onClick={nextSession}
              disabled={sessionIndex === sessions.length - 1}
              className="rounded-lg border border-neutral-700 px-3 py-1 disabled:opacity-40"
            >
              →
            </button>
          </div>

          <h1 className="mt-3 text-3xl font-bold">
            Practice speaking English every day
          </h1>

          <div className="mt-2 text-sm text-neutral-500">
            Question {conversationIndex + 1} of{" "}
            {session.conversations.length}
          </div>

          <button
            onClick={handleReset}
            className="mt-4 rounded-lg border border-neutral-800 px-3 py-1 text-sm text-neutral-400"
          >
            Reset Progress
          </button>
        </div>

        <StatsBar day={session.day} totalDays={sessions.length} />

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
              onClick={() => askCoach(current.prompt, transcript)}
              disabled={!transcript || loading}
              className="rounded-xl bg-blue-500 px-4 py-2 font-medium text-white disabled:opacity-40"
            >
              {loading ? "Analyzing..." : "Analyze with Coach"}
            </button>

            <button
              onClick={nextConversation}
              className="rounded-xl border border-neutral-700 px-4 py-2 font-medium text-neutral-300"
            >
              Next
            </button>

            <button
              onClick={() => {
                console.log(window.speechSynthesis.getVoices());
              }}
              className="rounded-xl border border-yellow-500 px-4 py-2 font-medium text-yellow-300"
            >
              Test Voices
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="font-semibold">You said</h3>

          <p className="mt-3 min-h-12 text-neutral-300">
            {transcript || "Your spoken answer will appear here."}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="font-semibold">Score</h3>

          <p className="mt-3 text-3xl font-bold">{result.score}%</p>

          <p className="mt-2 text-neutral-400">{result.feedback}</p>
        </div>

        {feedback && (
          <div className="rounded-2xl border border-blue-900 bg-blue-950/30 p-6">
            <h3 className="font-semibold">Gemini Coach</h3>

            <div className="mt-3 whitespace-pre-wrap text-neutral-300">
              {feedback}
            </div>

            <button
              onClick={() => speak(feedback)}
              className="mt-5 rounded-xl bg-blue-500 px-4 py-2 font-medium text-white"
            >
              Listen to Gemini Coach
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-blue-900 bg-blue-950/30 p-6">
          <h3 className="font-semibold">English Coach</h3>

          <p className="mt-3 text-neutral-300">{coachMessage}</p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h3 className="font-semibold">Suggested answer</h3>

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