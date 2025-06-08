import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/auth';
import { useAuth } from '../../hooks/useAuth';
import type { RegisterRequest } from '../../types/auth';
import { AuthTitle } from '../../components/auth/AuthTitle';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthFooter } from '../../components/auth/AuthFooter';
import { AuthButton } from '../../components/auth/AuthButton';

export function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    const data: RegisterRequest = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: password,
    };

    try {
      const response = await authService.register(data);
      login(response);
      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message: string } } };
      setError(
        error.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center py-12 px-6'>
      <div className='w-full max-w-[400px] mx-auto'>
        <AuthTitle subtitle='회원가입' />
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
              label='Username'
              type='text'
              name='username'
              placeholder='Enter your username'
              required
            />

            <AuthInput
              label='Password'
              type='password'
              name='password'
              placeholder='Enter your password'
              required
              autoComplete='new-password'
            />

            <AuthInput
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password'
              required
              autoComplete='new-password'
            />

            <div>
              <AuthButton type='submit' isLoading={isLoading}>
                가입하기
              </AuthButton>
            </div>
          </form>

          <AuthFooter
            question='이미 계정이 있으신가요?'
            linkText='로그인하기'
            linkHref='/login'
          />
        </div>
      </div>
    </div>
  );
}
