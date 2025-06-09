import { useQuery } from '@tanstack/react-query';
import { authService, type UserRole } from '../services/auth/auth';
import type { User } from '../types/auth';

export function useRole() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ['userRole'],
    queryFn: authService.getRole,
    enabled: authService.isAuthenticated(),
  });

  const hasRole = (requiredRole: UserRole) => {
    return user?.role === requiredRole;
  };

  const hasAnyRole = (roles: UserRole[]) => {
    return roles.includes(user?.role as UserRole);
  };

  return {
    user,
    role: user?.role,
    isLoading,
    error,
    hasRole,
    hasAnyRole,
  };
}
