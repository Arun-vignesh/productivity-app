import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import theme from '@/theme/colors';
import Link from 'next/link';

export const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setSuccess(true);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: theme.light.background }}>
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg" style={{ backgroundColor: theme.light.surface }}>
        <div>
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: theme.light.textPrimary }}>
            Reset Password
          </h2>
        </div>
        {success ? (
          <div className="text-center space-y-4">
            <p className="text-sm" style={{ color: theme.status.completed }}>
              Password reset email sent! Please check your inbox.
            </p>
            <Link
              href="/auth/signin"
              className="block font-medium hover:underline"
              style={{ color: theme.brand.primary }}
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && (
              <p className="text-sm text-center" style={{ color: theme.status.deleted }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.brand.primary }}
            >
              Send Reset Link
            </button>
            <div className="text-center">
              <Link
                href="/auth/signin"
                className="text-sm font-medium hover:underline"
                style={{ color: theme.brand.primary }}
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}; 