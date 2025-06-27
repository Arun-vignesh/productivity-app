'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { EisenhowerMatrix } from '@/components/matrix/EisenhowerMatrix';
import theme from '@/theme/colors';

export default function MatrixPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4" style={{ color: theme.light.textPrimary }}>
            Eisenhower Matrix
          </h1>
          <p className="mb-8" style={{ color: theme.light.textSecondary }}>
            Organize your tasks based on urgency and importance
          </p>
          <EisenhowerMatrix />
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
} 