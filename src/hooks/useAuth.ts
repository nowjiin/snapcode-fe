import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth/auth';
import type { LoginResponse } from '../types/auth';

export function useAuth() {
  const queryClient = useQueryClient();
  const isAuthenticated = authService.isAuthenticated();

  const { data: user, isLoading } = useQuery({
    queryKey: ['userRole'],
    queryFn: authService.getRole,
    enabled: isAuthenticated,
  });

  const login = (data: LoginResponse) => {
    authService.setAuthData(data);
    // Invalidate and refetch user role
    queryClient.invalidateQueries({ queryKey: ['userRole'] });
  };

  const logout = () => {
    authService.logout();
    // Invalidate queries to force refetch
    queryClient.invalidateQueries({ queryKey: ['userRole'] });
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    user,
    role: user?.role,
    isLoading,
    login,
    logout,
  };
}
