import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Todo } from '@/types/todo';
import { TodoCard } from '../todo/TodoCard';
import theme from '@/theme/colors';
import { TODO_ACTIONS, setEditingTodo, setDeletingTodoId } from '@/store/features/todoSlice';

const MatrixQuadrant: React.FC<{
  title: string;
  description: string;
  todos: Todo[];
  borderColor: string;
}> = ({ title, description, todos, borderColor }) => {
  const dispatch = useAppDispatch();

  const handleEdit = (todo: Todo) => {
    dispatch(setEditingTodo(todo));
  };

  const handleDelete = (todoId: string) => {
    dispatch(setDeletingTodoId(todoId));
  };

  const handleToggleComplete = (todoId: string, completed: boolean) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO,
        payload: {
          ...todo,
          completed,
        },
      });
    }
  };

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        backgroundColor: theme.light.surface,
        border: `2px solid ${borderColor}`,
        minHeight: '300px',
      }}
    >
      <h3 className="text-lg font-semibold mb-2" style={{ color: theme.light.textPrimary }}>
        {title}
      </h3>
      <p className="text-sm mb-4" style={{ color: theme.light.textSecondary }}>
        {description}
      </p>
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
        {todos.length === 0 && (
          <p className="text-center py-8" style={{ color: theme.light.textSecondary }}>
            No tasks in this quadrant
          </p>
        )}
      </div>
    </div>
  );
};

export const EisenhowerMatrix: React.FC = () => {
  const { todos } = useAppSelector((state) => state.todos);

  const categorizedTodos = {
    urgentImportant: todos.filter((todo) => todo.priority === 'high'),
    notUrgentImportant: todos.filter(
      (todo) => todo.priority === 'medium' && !todo.completed
    ),
    urgentNotImportant: todos.filter(
      (todo) => todo.priority === 'low' && !todo.completed
    ),
    notUrgentNotImportant: todos.filter((todo) => todo.completed),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MatrixQuadrant
        title="Do First"
        description="Urgent and Important Tasks"
        todos={categorizedTodos.urgentImportant}
        borderColor={theme.status.deleted}
      />
      <MatrixQuadrant
        title="Schedule"
        description="Important but Not Urgent Tasks"
        todos={categorizedTodos.notUrgentImportant}
        borderColor={theme.brand.accent}
      />
      <MatrixQuadrant
        title="Delegate"
        description="Urgent but Not Important Tasks"
        todos={categorizedTodos.urgentNotImportant}
        borderColor={theme.brand.primary}
      />
      <MatrixQuadrant
        title="Don't Do"
        description="Neither Urgent nor Important Tasks"
        todos={categorizedTodos.notUrgentNotImportant}
        borderColor={theme.light.textSecondary}
      />
    </div>
  );
}; 