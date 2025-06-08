import { useQuery } from '@tanstack/react-query';
import { authService, type UserRole } from '../services/auth/auth';

export function useRole() {
  const {
    data: role,
    isLoading,
    error,
  } = useQuery<UserRole>({
    queryKey: ['userRole'],
    queryFn: authService.getRole,
    enabled: authService.isAuthenticated(),
  });

  const hasRole = (requiredRole: UserRole) => {
    return role === requiredRole;
  };

  const hasAnyRole = (roles: UserRole[]) => {
    return roles.includes(role as UserRole);
  };

  return {
    role,
    isLoading,
    error,
    hasRole,
    hasAnyRole,
  };
}
