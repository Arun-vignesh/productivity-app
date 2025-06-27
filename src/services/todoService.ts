import { Todo, Priority } from '@/types/todo';
import { auth } from '@/lib/firebase';

async function getAuthToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  return user.getIdToken();
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'An error occurred');
  }

  return response.json();
}

export const todoService = {
  async createTodo(
    userId: string,
    title: string,
    description: string,
    priority: Priority,
    dueDate: string
  ): Promise<Todo> {
    return fetchWithAuth('/api/todos', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate,
      }),
    });
  },

  async updateTodo(todoId: string, updates: Partial<Todo>): Promise<void> {
    await fetchWithAuth(`/api/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteTodo(todoId: string): Promise<void> {
    await fetchWithAuth(`/api/todos/${todoId}`, {
      method: 'DELETE',
    });
  },

  async getUserTodos(userId: string): Promise<Todo[]> {
    return fetchWithAuth('/api/todos');
  },

  async toggleTodoComplete(todoId: string, completed: boolean): Promise<void> {
    await fetchWithAuth(`/api/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
    });
  },
}; 