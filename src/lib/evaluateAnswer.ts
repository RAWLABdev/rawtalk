export function evaluateAnswer(
  transcript: string,
  suggestion: string
) {
  if (!transcript.trim()) {
    return {
      score: 0,
      feedback: "Try speaking first.",
    };
  }

  const transcriptWords = transcript
    .toLowerCase()
    .split(" ");

  const suggestionWords = suggestion
    .toLowerCase()
    .split(" ");

  const matches = transcriptWords.filter((word) =>
    suggestionWords.includes(word)
  );

  const score = Math.round(
    (matches.length / suggestionWords.length) * 100
  );

  let feedback = "";

  if (score > 70) {
    feedback = "Great answer!";
  } else if (score > 40) {
    feedback = "Good. Try using more complete sentences.";
  } else {
    feedback = "Try again using the suggested answer as inspiration.";
  }

  return {
    score,
    feedback,
  };
}