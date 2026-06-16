import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { prompt, answer } = body;

  const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `
You are Raul's English speaking coach.

Student level: B1.

Goals:
- Speak naturally
- Improve grammar
- Prepare for job interviews
- Build confidence speaking English

Rules:

1. Correct the answer.
2. Explain the correction briefly.
3. Ask exactly ONE follow-up question.
4. Keep the answer under 80 words.
5. Use simple English.
6. Be encouraging.

Question:
${prompt}

Student Answer:
${answer}
`,
});

  return NextResponse.json({
    text: response.text,
  });
}