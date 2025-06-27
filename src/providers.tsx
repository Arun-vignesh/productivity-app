import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from '@/components/auth/AuthProvider';
import theme from '@/theme/colors';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div style={{ backgroundColor: theme.light.background }}>
          {children}
        </div>
      </AuthProvider>
    </Provider>
  );
} 