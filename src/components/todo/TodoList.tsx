import React, { useEffect } from 'react';
import { TodoCard } from './TodoCard';
import { TodoForm } from './TodoForm';
import { useAuth } from '@/hooks/useAuth';
import { Todo } from '@/types/todo';
import theme from '@/theme/colors';
import { Modal } from '@/components/common/Modal';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TODO_ACTIONS } from '@/store/features/todoSlice';
import {
  setIsFormOpen,
  setEditingTodo,
  setDeletingTodoId,
  setError,
} from '@/store/features/todoSlice';

export const TodoList: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const {
    todos,
    loading,
    error,
    isFormOpen,
    editingTodo,
    deletingTodoId,
  } = useAppSelector((state) => state.todos);

  useEffect(() => {
    if (user) {
      dispatch({ type: TODO_ACTIONS.FETCH_TODOS, payload: user.uid });
    }
  }, [user, dispatch]);

  const handleCreateTodo = async (data: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
  }) => {
    if (!user) return;
    try {
      dispatch({
        type: TODO_ACTIONS.CREATE_TODO,
        payload: {
          userId: user.uid,
          ...data,
        },
      });
      dispatch(setIsFormOpen(false));
      router.push('/todos');
    } catch (error) {
      dispatch(setError('Failed to create todo. Please try again.'));
    }
  };

  const handleUpdateTodo = async (data: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
  }) => {
    if (!editingTodo) return;
    try {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO,
        payload: {
          todoId: editingTodo.id,
          updates: {
            ...data,
            updatedAt: new Date().toISOString(),
          },
        },
      });
      dispatch(setEditingTodo(null));
    } catch (error) {
      dispatch(setError('Failed to update todo. Please try again.'));
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    dispatch(setDeletingTodoId(todoId));
  };

  const confirmDelete = async () => {
    if (!deletingTodoId) return;
    try {
      dispatch({
        type: TODO_ACTIONS.DELETE_TODO,
        payload: deletingTodoId,
      });
      dispatch(setDeletingTodoId(null));
    } catch (error) {
      dispatch(setError('Failed to delete todo. Please try again.'));
    }
  };

  const handleToggleComplete = async (todoId: string, completed: boolean) => {
    try {
      dispatch({
        type: TODO_ACTIONS.TOGGLE_TODO,
        payload: { todoId, completed },
      });
    } catch (error) {
      dispatch(setError('Failed to update todo status. Please try again.'));
    }
  };

  const handleRetry = () => {
    if (user) {
      dispatch({ type: TODO_ACTIONS.FETCH_TODOS, payload: user.uid });
    }
  };

  return (
    <div>
      {todos.length > 0 && (
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => dispatch(setIsFormOpen(true))}
            className="px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: theme.brand.primary }}
          >
            Add Todo
          </button>
        </div>
      )}

      <Modal isOpen={isFormOpen} onClose={() => dispatch(setIsFormOpen(false))}>
        <TodoForm
          onSubmit={handleCreateTodo}
          onCancel={() => dispatch(setIsFormOpen(false))}
        />
      </Modal>

      <Modal isOpen={!!editingTodo} onClose={() => dispatch(setEditingTodo(null))}>
        <TodoForm
          todo={editingTodo || undefined}
          onSubmit={handleUpdateTodo}
          onCancel={() => dispatch(setEditingTodo(null))}
        />
      </Modal>

      <Modal isOpen={!!deletingTodoId} onClose={() => dispatch(setDeletingTodoId(null))}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: theme.light.textPrimary }}>
            Delete Todo
          </h3>
          <p className="mb-6" style={{ color: theme.light.textSecondary }}>
            Are you sure you want to delete this todo? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => dispatch(setDeletingTodoId(null))}
              className="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100"
              style={{ color: theme.light.textSecondary }}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.status.deleted }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4" style={{ borderColor: theme.brand.primary }} />
            <p style={{ color: theme.light.textSecondary }}>Loading your todos...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div
              className="w-16 h-16 mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${theme.status.deleted}20` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" style={{ color: theme.status.deleted }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: theme.light.textPrimary }}>
              {error}
            </h3>
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.brand.primary }}
            >
              Try Again
            </button>
          </div>
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div
              className="w-16 h-16 mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${theme.brand.primary}20` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
                style={{ color: theme.brand.primary }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: theme.light.textPrimary }}
            >
              No todos yet
            </h3>
            <p
              className="text-center mb-8"
              style={{ color: theme.light.textSecondary }}
            >
              Get started by creating your first todo
            </p>
            <button
              onClick={() => dispatch(setIsFormOpen(true))}
              className="px-6 py-3 rounded-lg font-medium text-white transition-colors hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: theme.brand.primary }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create Todo
            </button>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onEdit={(todo) => dispatch(setEditingTodo(todo))}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
}; 