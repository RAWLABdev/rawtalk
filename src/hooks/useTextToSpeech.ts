"use client";

function getPreferredVoice() {
  const voices = window.speechSynthesis.getVoices();

  return (
    voices.find((voice) => voice.name.includes("Samantha")) ||
    voices.find((voice) => voice.name.includes("Alex")) ||
    voices.find((voice) => voice.name.includes("Google US English")) ||
    voices.find((voice) => voice.lang === "en-US") ||
    null
  );
}

export function useTextToSpeech() {
  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const preferredVoice = getPreferredVoice();

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  return { speak };
}