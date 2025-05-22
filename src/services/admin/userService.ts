import { axiosInstance } from '../../lib/axios';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  AssignRoleRequest,
} from '../../types/admin';

export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>('/api/v1/admin/users');
    return response.data || [];
  },

  // Get single user
  getUser: async (userId: number): Promise<User> => {
    const response = await axiosInstance.get<User>(
      `/api/v1/admin/users/${userId}`
    );
    return response.data;
  },

  // Create user
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await axiosInstance.post<User>(
      '/api/v1/admin/users',
      userData
    );
    return response.data;
  },

  // Update user
  updateUser: async (
    userId: number,
    userData: UpdateUserRequest
  ): Promise<User> => {
    const response = await axiosInstance.put<User>(
      `/api/v1/admin/users/${userId}`,
      userData
    );
    return response.data;
  },

  // Delete user
  deleteUser: async (userId: number): Promise<void> => {
    await axiosInstance.delete(`/api/v1/admin/users/${userId}`);
  },

  // Assign role
  assignRole: async (roleData: AssignRoleRequest): Promise<User> => {
    const response = await axiosInstance.post<User>(
      '/api/v1/admin/assign-role',
      roleData
    );
    return response.data;
  },
};
