export type Conversation = {
  id: string;
  title: string;
  category: "daily" | "work" | "interview" | "climbing";
  prompt: string;
  suggestion: string;
};