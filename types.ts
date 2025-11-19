
export enum TaskState {
  FREE = 'livre',
  BUILDING = 'em progresso',
  COMPLETED = 'concluída',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string; // Using string for simplicity in mock data
  tags: string[];
  requiredScore: number;
  difficulty: 1 | 2 | 3 | 4;
  state: TaskState;
  assignedTo?: string; // userId
  assignedToName?: string; // user display name
  points: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  score: number;
}
