import { Session } from "@/types/session";

export const sessions: Session[] = [
  {
    day: 1,
    title: "Introduce Yourself",
    conversations: [
      {
        prompt: "Hi, can you introduce yourself?",
        suggestion:
          "My name is Raul. I am a frontend developer from Chile.",
      },
      {
        prompt: "What do you do for work?",
        suggestion:
          "I specialize in React, React Native and TypeScript development.",
      },
      {
        prompt: "What are your goals this year?",
        suggestion:
          "My goal is to improve my English and find a remote job.",
      },
    ],
  },

  {
    day: 2,
    title: "Family",
    conversations: [
      {
        prompt: "Tell me about your family.",
        suggestion:
          "I have a daughter named Emma and a dog named Nuria.",
      },
      {
        prompt: "What do you enjoy doing together?",
        suggestion:
          "I enjoy spending time outdoors and going for walks.",
      },
      {
        prompt: "What is important to you?",
        suggestion:
          "Family, health and personal growth are important to me.",
      },
    ],
  },

  {
    day: 3,
    title: "Climbing",
    conversations: [
      {
        prompt: "How did you start climbing?",
        suggestion:
          "I started climbing because I wanted a new physical challenge.",
      },
      {
        prompt: "What do you enjoy about climbing?",
        suggestion:
          "I enjoy solving problems and improving my technique.",
      },
      {
        prompt: "What are your climbing goals?",
        suggestion:
          "I want to become stronger and climb more difficult routes.",
      },
    ],
  },
];