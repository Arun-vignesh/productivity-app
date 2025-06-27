import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import theme from '@/theme/colors';
import { Todo, Priority } from '@/types/todo';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (data: {
    title: string;
    description: string;
    priority: Priority;
    dueDate: string;
  }) => void;
  onCancel: () => void;
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

export const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      priority: todo?.priority || 'medium',
      dueDate: todo?.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
    },
  });

  const dueDate = watch('dueDate');
  const priority = watch('priority') as Priority;

  const handleDateClick = () => {
    dateInputRef.current?.showPicker();
  };

  const onFormSubmit = (data: {
    title: string;
    description: string;
    priority: Priority;
    dueDate: string;
  }) => {
    // If no date is selected, use the current date
    let date: Date;
    
    if (!data.dueDate) {
      date = new Date();
    } else {
      try {
        date = new Date(data.dueDate);
        if (isNaN(date.getTime())) {
          // If date is invalid, use current date
          date = new Date();
        }
      } catch {
        // If date parsing fails, use current date
        date = new Date();
      }
    }

    // Set time to end of day for new todos
    if (!todo) {
      date.setHours(23, 59, 59, 999);
    }

    onSubmit({
      ...data,
      dueDate: date.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-1">
            <label className="text-sm font-medium" style={{ color: theme.light.textPrimary }}>
              Title
            </label>
            <span style={{ color: theme.status.deleted }}>*</span>
          </div>
          <input
            {...register('title', { 
              required: 'Title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' }
            })}
            placeholder="What needs to be done?"
            className={`w-full text-lg px-3 py-2 rounded-lg bg-transparent border transition-colors ${
              errors.title ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
            }`}
            style={{ color: theme.light.textPrimary }}
            autoFocus
          />
          {errors.title && (
            <p className="mt-1 text-sm" style={{ color: theme.status.deleted }}>
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" style={{ color: theme.light.textPrimary }}>
            Description
          </label>
          <textarea
            {...register('description')}
            placeholder="Add more details..."
            className="w-full min-h-[100px] px-3 py-2 rounded-lg bg-transparent border border-gray-200 focus:border-blue-500 transition-colors"
            style={{ color: theme.light.textSecondary }}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-4 border-t" style={{ borderColor: theme.light.border }}>
        <div className="flex-1 flex items-center gap-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <label className="text-sm font-medium" style={{ color: theme.light.textPrimary }}>
                Due Date
              </label>
              <span style={{ color: theme.status.deleted }}>*</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDateClick}
                className={`px-3 py-2 rounded-lg border transition-colors hover:bg-gray-50 ${
                  !dueDate ? 'border-red-500' : 'border-gray-200'
                }`}
                style={{ color: dueDate ? theme.brand.primary : theme.status.deleted }}
              >
                <div className="flex items-center gap-2">
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" 
                    />
                  </svg>
                  <span className="text-sm">
                    {dueDate || 'Select date'}
                  </span>
                </div>
              </button>
              <input
                type="date"
                {...register('dueDate', { required: 'Due date is required' })}
                className="hidden"
                ref={dateInputRef}
              />
            </div>
            {errors.dueDate && (
              <p className="mt-1 text-sm" style={{ color: theme.status.deleted }}>
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.light.textPrimary }}>
              Priority
            </label>
            <div className="relative">
              <select
                {...register('priority')}
                className="appearance-none pl-8 pr-4 py-2 rounded-lg bg-transparent border border-gray-200 transition-colors hover:border-blue-500"
                style={{ color: theme.light.textSecondary }}
              >
                <option value="high">Priority 1</option>
                <option value="medium">Priority 2</option>
                <option value="low">Priority 3</option>
              </select>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <PriorityFlag priority={priority} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100"
            style={{ color: theme.light.textSecondary }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: theme.brand.primary }}
          >
            {todo ? 'Update' : 'Add task'}
          </button>
        </div>
      </div>
    </form>
  );
}; 