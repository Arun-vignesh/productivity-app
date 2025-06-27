'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AuthLayout } from '@/components/layout/AuthLayout';
import theme from '@/theme/colors';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-8" style={{ color: theme.light.textPrimary }}>
            Welcome to Your Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: theme.light.surface }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ color: theme.light.textPrimary }}>
                  Task Overview
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ color: theme.brand.primary }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <p style={{ color: theme.light.textSecondary }}>
                Track your task progress and manage priorities efficiently.
              </p>
            </div>

            <div
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: theme.light.surface }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ color: theme.light.textPrimary }}>
                  Quick Actions
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ color: theme.brand.primary }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <p style={{ color: theme.light.textSecondary }}>
                Access frequently used features and shortcuts.
              </p>
            </div>

            <div
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: theme.light.surface }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ color: theme.light.textPrimary }}>
                  Recent Activity
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ color: theme.brand.primary }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p style={{ color: theme.light.textSecondary }}>
                View your latest updates and activities.
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
} 