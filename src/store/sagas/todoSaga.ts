import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { todoService } from '@/services/todoService';
import {
  TODO_ACTIONS,
  setLoading,
  setError,
  setTodos,
  addTodo,
  updateTodoInList,
  removeTodo,
  setIsFormOpen,
  setEditingTodo,
  setDeletingTodoId,
} from '../features/todoSlice';
import { Todo, Priority } from '@/types/todo';

interface CreateTodoPayload {
  userId: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

interface UpdateTodoPayload {
  todoId: string;
  updates: Partial<Todo>;
}

// Worker Sagas
function* fetchTodosSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    const todos: Todo[] = yield call(todoService.getUserTodos, action.payload);
    yield put(setTodos(todos));
    yield put(setError(null));
  } catch (error) {
    yield put(setError('Failed to fetch todos'));
    console.error('Error fetching todos:', error);
  } finally {
    yield put(setLoading(false));
  }
}

function* createTodoSaga(action: PayloadAction<CreateTodoPayload>) {
  try {
    yield put(setLoading(true));
    const { userId, title, description, priority, dueDate } = action.payload;
    const newTodo: Todo = yield call(
      todoService.createTodo,
      userId,
      title,
      description,
      priority,
      dueDate
    );
    yield put(addTodo(newTodo));
    yield put(setIsFormOpen(false));
    yield put(setError(null));
  } catch (error) {
    yield put(setError('Failed to create todo'));
    console.error('Error creating todo:', error);
  } finally {
    yield put(setLoading(false));
  }
}

function* updateTodoSaga(action: PayloadAction<UpdateTodoPayload>) {
  try {
    yield put(setLoading(true));
    const { todoId, updates } = action.payload;
    yield call(todoService.updateTodo, todoId, updates);
    yield put(updateTodoInList({ id: todoId, ...updates } as Todo));
    yield put(setEditingTodo(null));
    yield put(setError(null));
  } catch (error) {
    yield put(setError('Failed to update todo'));
    console.error('Error updating todo:', error);
  } finally {
    yield put(setLoading(false));
  }
}

function* deleteTodoSaga(action: PayloadAction<string>) {
  try {
    yield put(setLoading(true));
    yield call(todoService.deleteTodo, action.payload);
    yield put(removeTodo(action.payload));
    yield put(setDeletingTodoId(null));
    yield put(setError(null));
  } catch (error) {
    yield put(setError('Failed to delete todo'));
    console.error('Error deleting todo:', error);
  } finally {
    yield put(setLoading(false));
  }
}

function* toggleTodoSaga(action: PayloadAction<{ todoId: string; completed: boolean }>) {
  try {
    yield put(setLoading(true));
    const { todoId, completed } = action.payload;
    yield call(todoService.toggleTodoComplete, todoId, completed);
    yield put(updateTodoInList({ id: todoId, completed } as Todo));
    yield put(setError(null));
  } catch (error) {
    yield put(setError('Failed to toggle todo status'));
    console.error('Error toggling todo:', error);
  } finally {
    yield put(setLoading(false));
  }
}

// Watcher Saga
export function* todoSaga() {
  yield takeLatest(TODO_ACTIONS.FETCH_TODOS, fetchTodosSaga);
  yield takeLatest(TODO_ACTIONS.CREATE_TODO, createTodoSaga);
  yield takeLatest(TODO_ACTIONS.UPDATE_TODO, updateTodoSaga);
  yield takeLatest(TODO_ACTIONS.DELETE_TODO, deleteTodoSaga);
  yield takeLatest(TODO_ACTIONS.TOGGLE_TODO, toggleTodoSaga);
} 