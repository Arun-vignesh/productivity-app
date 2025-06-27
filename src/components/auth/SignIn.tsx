import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import theme from '@/theme/colors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push('/dashboard'); // Redirect to dashboard after successful sign in
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard'); // Redirect to dashboard after successful sign in
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: theme.light.background }}>
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg" style={{ backgroundColor: theme.light.surface }}>
        <div>
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: theme.light.textPrimary }}>
            Sign In
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right">
              <Link
                href="/auth/reset-password"
                className="text-sm font-medium hover:underline"
                style={{ color: theme.brand.primary }}
              >
                Forgot password?
              </Link>
            </div>
          </div>
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
            Sign In
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: theme.light.border }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2" style={{ backgroundColor: theme.light.surface, color: theme.light.textSecondary }}>
                Or continue with
              </span>
            </div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="mt-6 w-full py-2 px-4 rounded-lg font-medium border transition-colors hover:bg-gray-50 flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.light.surface,
              borderColor: theme.light.border,
              color: theme.light.textPrimary,
            }}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Google
          </button>
        </div>
        <p className="mt-8 text-center text-sm" style={{ color: theme.light.textSecondary }}>
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            className="font-medium hover:underline"
            style={{ color: theme.brand.primary }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}; 