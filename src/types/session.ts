export type Session = {
  day: number;
  title: string;
  conversations: {
    prompt: string;
    suggestion: string;
  }[];
};