import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/auth';
import { useAuth } from '../../hooks/useAuth';
import type { LoginRequest } from '../../types/auth';
import { AuthTitle } from '../../components/auth/AuthTitle';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthFooter } from '../../components/auth/AuthFooter';
import { AuthButton } from '../../components/auth/AuthButton';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: LoginRequest = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await authService.login(data);
      login(response);

      // Get user role after successful login
      const userRole = await authService.getRole();

      // Redirect based on role
      if (userRole.role === 'admin') {
        navigate('/custom');
      } else {
        navigate('/');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message: string } } };
      setError(
        error.response?.data?.message || 'An error occurred during login'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center py-12 px-6'>
      <div className='w-full max-w-[400px] mx-auto'>
        <AuthTitle subtitle='로그인' />
      </div>

      <div className='mt-8 w-full max-w-[400px] mx-auto'>
        <div>
          {error && (
            <div className='mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative'>
              {error}
            </div>
          )}

          <form className='space-y-6' onSubmit={handleSubmit}>
            <AuthInput
              label='Email'
              type='email'
              name='email'
              placeholder='Enter your email'
              required
              autoComplete='email'
            />

            <AuthInput
              label='Password'
              type='password'
              name='password'
              placeholder='Enter your password'
              required
              autoComplete='current-password'
            />

            <div>
              <AuthButton type='submit' isLoading={isLoading}>
                로그인
              </AuthButton>
            </div>
          </form>

          <AuthFooter
            question='아직 계정이 없으신가요?'
            linkText='회원가입하기'
            linkHref='/signup'
          />
        </div>
      </div>
    </div>
  );
}
