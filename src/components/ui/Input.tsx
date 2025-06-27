import React from 'react';
import theme from '@/theme/colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" style={{ color: theme.light.textPrimary }}>
        {label}
      </label>
      <input
        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${
          error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
        style={{
          backgroundColor: theme.light.surface,
          borderColor: error ? theme.status.deleted : theme.light.border,
          color: theme.light.textPrimary,
        }}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm" style={{ color: theme.status.deleted }}>
          {error}
        </p>
      )}
    </div>
  );
}; 