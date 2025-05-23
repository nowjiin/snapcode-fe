import React from 'react';

interface AuthButtonProps {
  type: 'submit' | 'button';
  isLoading: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export function AuthButton({
  type,
  isLoading,
  children,
  disabled,
}: AuthButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className='w-full h-[56px] flex justify-center items-center rounded-[6px] bg-black text-white font-pretendard text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {isLoading ? '처리중...' : children}
    </button>
  );
}
