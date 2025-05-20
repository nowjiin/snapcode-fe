import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/auth';

export function useAuth() {
  const isAuthenticated = authService.isAuthenticated();

  const { data: role, isLoading } = useQuery({
    queryKey: ['userRole'],
    queryFn: authService.getRole,
    enabled: isAuthenticated,
  });

  const logout = () => {
    authService.logout();
    // Invalidate queries to force refetch
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    role,
    isLoading,
    logout,
  };
}
