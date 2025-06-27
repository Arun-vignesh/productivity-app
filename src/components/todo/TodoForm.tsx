import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import theme from '@/theme/colors';
import { Todo } from '@/types/todo';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (data: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
  }) => void;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      priority: todo?.priority || 'medium',
      dueDate: todo?.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
    },
  });

  const dueDate = watch('dueDate');

  const handleDateClick = () => {
    dateInputRef.current?.showPicker();
  };

  const onFormSubmit = (data: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
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
        <input
          {...register('title')}
          placeholder="Task name"
          className="w-full text-xl font-medium mb-4 bg-transparent border-none outline-none"
          style={{ color: theme.light.textPrimary }}
          autoFocus
        />
        <textarea
          {...register('description')}
          placeholder="Description"
          className="w-full min-h-[100px] bg-transparent border-none outline-none resize-none"
          style={{ color: theme.light.textSecondary }}
        />
      </div>
      
      <div className="flex items-center gap-2 p-4 border-t" style={{ borderColor: theme.light.border }}>
        <div className="flex-1 flex items-center gap-2">
          <button
            type="button"
            onClick={handleDateClick}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: dueDate ? theme.brand.primary : theme.light.textSecondary }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </button>
          <input
            type="date"
            {...register('dueDate')}
            className="hidden"
            ref={dateInputRef}
          />
          
          <button
            type="button"
            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: theme.light.textSecondary }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
            </svg>
          </button>
          
          <button
            type="button"
            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: theme.light.textSecondary }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
          </button>

          <select
            {...register('priority')}
            className="p-2 rounded-lg bg-transparent border-none outline-none transition-colors hover:bg-gray-100"
            style={{ color: theme.light.textSecondary }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
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