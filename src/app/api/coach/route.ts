import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { prompt, answer } = body;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an English coach.

Student level: B1.

Question:
${prompt}

Student answer:
${answer}

Your task:

1. Correct the answer.
2. Explain briefly.
3. Ask a follow-up question.

Keep everything under 120 words.
`,
  });

  return NextResponse.json({
    text: response.text,
  });
}