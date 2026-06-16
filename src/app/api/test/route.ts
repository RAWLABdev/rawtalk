import { NextResponse } from "next/server";

export async function GET() {
  console.log(
    "Gemini Key:",
    process.env.GEMINI_API_KEY?.slice(0, 10)
  );

  return NextResponse.json({
    success: true,
  });
}