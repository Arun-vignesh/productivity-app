'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { TodoList } from '@/components/todo/TodoList';
import theme from '@/theme/colors';

export default function TodosPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-8" style={{ color: theme.light.textPrimary }}>
            Your Todos
          </h1>
          <TodoList />
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
} 