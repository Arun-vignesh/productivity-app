export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string; // ISO string
  completed: boolean;
  userId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
} 