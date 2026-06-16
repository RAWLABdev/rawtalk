export function useTextToSpeech() {
  const speak = (text: string) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

const voices = window.speechSynthesis.getVoices();

const preferredVoice =
  voices.find(
    (voice) =>
      voice.name.includes("Samantha")
  ) ||
  voices.find(
    (voice) =>
      voice.name.includes("Alex")
  ) ||
  voices.find(
    (voice) =>
      voice.lang === "en-US"
  );

if (preferredVoice) {
  utterance.voice = preferredVoice;
}

utterance.lang = "en-US";
utterance.rate = 0.95;
utterance.pitch = 1;
    utterance.lang = "en-US";
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
  };

  return { speak };
}