import React from 'react';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import theme from '@/theme/colors';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.light.background }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: theme.brand.primary }}></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}; 