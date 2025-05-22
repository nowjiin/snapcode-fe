import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../services/admin/userService';
import { UserForm } from '../../components/admin/UserForm';
import { UserList } from '../../components/admin/UserList';
import { SearchBox } from '../../components/common/SearchBox';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../../types/admin';

export function UserManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userService.getUsers();
      return response || [];
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserRequest) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsModalOpen(false);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: UpdateUserRequest;
    }) => userService.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsModalOpen(false);
      setSelectedUser(null);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => userService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleFormSubmit = async (
    data: CreateUserRequest | UpdateUserRequest
  ) => {
    if (selectedUser) {
      await updateUserMutation.mutateAsync({
        userId: selectedUser.id,
        data: data as UpdateUserRequest,
      });
    } else {
      await createUserMutation.mutateAsync(data as CreateUserRequest);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      await deleteUserMutation.mutateAsync(userId);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const searchUpper = searchQuery.toUpperCase();

    // Check if any field contains the search query (case-insensitive)
    return (
      user.username.toLowerCase().includes(searchLower) ||
      user.username.toUpperCase().includes(searchUpper) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.email.toUpperCase().includes(searchUpper) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.role.toUpperCase().includes(searchUpper)
    );
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600'>사용자 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-lg font-medium text-red-600 mb-2'>
          사용자 목록을 불러오는데 실패했습니다
        </h3>
        <p className='text-gray-500'>
          {error instanceof Error ? error.message : '오류가 발생했습니다'}
        </p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>사용자 관리</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          사용자 추가
        </button>
      </div>

      <div className='mb-6'>
        <SearchBox
          onSearch={setSearchQuery}
          placeholder='이름, 이메일, 또는 역할로 검색...'
          className='max-w-md'
        />
      </div>

      <UserList
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>
              {selectedUser ? '사용자 수정' : '사용자 추가'}
            </h2>
            <UserForm
              initialData={selectedUser || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedUser(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
