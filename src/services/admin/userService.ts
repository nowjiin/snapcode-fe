import { axiosInstance } from '../../lib/axios';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  AssignRoleRequest,
} from '../../types/admin';

const baseUrl = '/api/v1/admin';

export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>(`${baseUrl}/users`);
    return response.data || [];
  },

  // Get single user
  getUser: async (userId: number): Promise<User> => {
    const response = await axiosInstance.get<User>(
      `${baseUrl}/users/${userId}`
    );
    return response.data;
  },

  // Create user
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await axiosInstance.post<User>(
      `${baseUrl}/users`,
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
      `${baseUrl}/users/${userId}`,
      userData
    );
    return response.data;
  },

  // Delete user
  deleteUser: async (userId: number): Promise<void> => {
    await axiosInstance.delete(`${baseUrl}/users/${userId}`);
  },

  // Assign role
  assignRole: async (roleData: AssignRoleRequest): Promise<User> => {
    const response = await axiosInstance.post<User>(
      `${baseUrl}/assign-role`,
      roleData
    );
    return response.data;
  },
};
