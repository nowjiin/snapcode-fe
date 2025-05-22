import { axiosInstance } from '../../lib/axios';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AssignRoleRequest {
  user_id: number;
  role: string;
}

export const adminUserService = {
  async getUsers(): Promise<AdminUser[]> {
    const response = await axiosInstance.get<AdminUser[]>(
      '/api/v1/admin/users'
    );
    return response.data;
  },

  async createUser(data: Omit<AdminUser, 'id'>): Promise<AdminUser> {
    const response = await axiosInstance.post<AdminUser>(
      '/api/v1/admin/users',
      data
    );
    return response.data;
  },

  async getUser(userId: number): Promise<AdminUser> {
    const response = await axiosInstance.get<AdminUser>(
      `/api/v1/admin/users/${userId}`
    );
    return response.data;
  },

  async updateUser(
    userId: number,
    data: Partial<AdminUser>
  ): Promise<AdminUser> {
    const response = await axiosInstance.put<AdminUser>(
      `/api/v1/admin/users/${userId}`,
      data
    );
    return response.data;
  },

  async deleteUser(userId: number): Promise<void> {
    await axiosInstance.delete(`/api/v1/admin/users/${userId}`);
  },

  async assignRole(data: AssignRoleRequest): Promise<void> {
    await axiosInstance.post('/api/v1/admin/assign-role', data);
  },
};
