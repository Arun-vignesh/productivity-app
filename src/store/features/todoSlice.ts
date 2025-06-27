import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, Priority } from '@/types/todo';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  isFormOpen: boolean;
  editingTodo: Todo | null;
  deletingTodoId: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  isFormOpen: false,
  editingTodo: null,
  deletingTodoId: null,
};

// Action Types
export const TODO_ACTIONS = {
  FETCH_TODOS: 'todos/fetchTodos',
  CREATE_TODO: 'todos/createTodo',
  UPDATE_TODO: 'todos/updateTodo',
  DELETE_TODO: 'todos/deleteTodo',
  TOGGLE_TODO: 'todos/toggleTodo',
} as const;

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
    },
    updateTodoInList: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setIsFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
    },
    setEditingTodo: (state, action: PayloadAction<Todo | null>) => {
      state.editingTodo = action.payload;
    },
    setDeletingTodoId: (state, action: PayloadAction<string | null>) => {
      state.deletingTodoId = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setTodos,
  addTodo,
  updateTodoInList,
  removeTodo,
  setIsFormOpen,
  setEditingTodo,
  setDeletingTodoId,
} = todoSlice.actions;

export default todoSlice.reducer; 