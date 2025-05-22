import { useState } from 'react';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../../types/admin';

type FormData = {
  username: string;
  email: string;
  role: User['role'];
  password?: string;
};

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function UserForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = initialData ? '수정하기' : '추가하기',
}: UserFormProps) {
  const [formData, setFormData] = useState<FormData>({
    username: initialData?.username || '',
    email: initialData?.email || '',
    role: initialData?.role || 'user',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (!initialData && !submitData.password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (!submitData.password) {
      delete submitData.password;
    }
    await onSubmit(submitData as CreateUserRequest | UpdateUserRequest);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='username'
          className='block text-sm font-medium text-gray-700'
        >
          사용자 이름
        </label>
        <input
          type='text'
          id='username'
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          required
        />
      </div>

      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          이메일
        </label>
        <input
          type='email'
          id='email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          required
        />
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          비밀번호 {initialData && '(변경하지 않으려면 비워두세요)'}
        </label>
        <input
          type='password'
          id='password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          required={!initialData}
        />
      </div>

      <div>
        <label
          htmlFor='role'
          className='block text-sm font-medium text-gray-700'
        >
          역할
        </label>
        <select
          id='role'
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value as User['role'] })
          }
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
        >
          <option value='user'>일반 사용자</option>
          <option value='judge'>심사위원</option>
          <option value='admin'>관리자</option>
        </select>
      </div>

      <div className='flex justify-end space-x-3'>
        <button
          type='button'
          onClick={onCancel}
          className='inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          취소
        </button>
        <button
          type='submit'
          className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
