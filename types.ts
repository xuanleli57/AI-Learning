export enum ModuleType {
  HOME = 'HOME',
  PYTHON = 'PYTHON',
  MATH = 'MATH',
  ML = 'ML',
  DL = 'DL',
  RL = 'RL',
  PRACTICE = 'PRACTICE', // The code analyzer/playground
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  promptContext: string; // Used to guide the AI
}

export interface GeneratedContent {
  markdown: string;
  isLoading: boolean;
  error: string | null;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
