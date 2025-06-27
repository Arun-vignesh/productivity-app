import React from 'react';
import { Todo, Priority } from '@/types/todo';
import theme from '@/theme/colors';
import { format, isValid } from 'date-fns';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todoId: string) => void;
  onToggleComplete: (todoId: string, completed: boolean) => void;
}

const priorityColors: Record<Priority, string> = {
  high: theme.status.deleted,     // Red for Priority 1
  medium: theme.brand.accent,     // Orange for Priority 2
  low: theme.brand.primary,       // Blue for Priority 3
};

const PriorityFlag: React.FC<{ priority: Priority }> = ({ priority }) => {
  const priorityNumber = priority === 'high' ? 1 : priority === 'medium' ? 2 : 3;
  
  return (
    <div className="relative inline-flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        style={{ color: priorityColors[priority] }}
      >
        <path
          fillRule="evenodd"
          d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054A8.25 8.25 0 0016.5 4.5a7.5 7.5 0 01-2.064 5.19l-4.84 4.84a7.5 7.5 0 01-5.19 2.064 8.25 8.25 0 00-.054-4.079l-.054-.108a9.75 9.75 0 01-.738-6.725l.46-1.838h-.54a.75.75 0 01-.75-.75zm12.75 0a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054A8.25 8.25 0 0016.5 4.5a7.5 7.5 0 01-2.064 5.19l-4.84 4.84a7.5 7.5 0 01-5.19 2.064 8.25 8.25 0 00-.054-4.079l-.054-.108a9.75 9.75 0 01-.738-6.725l.46-1.838h-.54a.75.75 0 01-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
      <span 
        className="absolute right-0 -top-1 text-[10px] font-medium"
        style={{ color: priorityColors[priority] }}
      >
        {priorityNumber}
      </span>
    </div>
  );
};

export const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const dueDate = new Date(todo.dueDate);
  const formattedDueDate = isValid(dueDate) ? format(dueDate, 'MMM dd, yyyy') : 'No due date';
  const isOverdue = isValid(dueDate) && dueDate < new Date() && !todo.completed;

  return (
    <div
      className="p-4 rounded-lg shadow-sm transition-all hover:shadow-md backdrop-blur-sm"
      style={{
        backgroundColor: `${theme.light.surface}80`,
        borderLeft: `4px solid ${priorityColors[todo.priority]}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <PriorityFlag priority={todo.priority} />
            <h3
              className={`font-semibold ${todo.completed ? 'line-through' : ''}`}
              style={{ color: theme.light.textPrimary }}
            >
              {todo.title || 'Untitled Task'}
            </h3>
          </div>
          {todo.description && (
            <p
              className="mt-2 text-sm"
              style={{ color: theme.light.textSecondary }}
            >
              {todo.description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-4">
            <span
              className={`text-xs flex items-center gap-1 ${
                isOverdue ? 'text-red-500' : ''
              }`}
              style={{ color: isOverdue ? theme.status.deleted : theme.light.textSecondary }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" 
                />
              </svg>
              {formattedDueDate}
              {isOverdue && (
                <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-red-100">
                  Overdue
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: theme.brand.primary }}
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: theme.status.deleted }}
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}; 