import type { Conversation } from "@/types/conversation";

export const conversations: Conversation[] = [
  {
    id: "daily-1",
    title: "Daily check-in",
    category: "daily",
    prompt: "Hi Raul, how was your day today?",
    suggestion: "My day was good. I worked on my projects and practiced English.",
  },
  {
    id: "work-1",
    title: "Talking about work",
    category: "work",
    prompt: "Can you tell me what you do for work?",
    suggestion:
      "I am a frontend developer. I work with React, React Native, TypeScript and Next.js.",
  },
  {
    id: "climbing-1",
    title: "Talking about hobbies",
    category: "climbing",
    prompt: "What do you usually do in your free time?",
    suggestion:
      "In my free time, I like climbing, walking with my dog Nuria, and building digital projects.",
  },
  {
    id: "interview-1",
    title: "Job interview",
    category: "interview",
    prompt: "Tell me about your experience with React.",
    suggestion:
      "I have over four years of experience working with React and React Native. I have worked on banking applications, design systems, and mobile features.",
  },
];