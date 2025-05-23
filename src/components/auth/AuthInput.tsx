import React, { useState } from 'react';

interface AuthInputProps {
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}

export function AuthInput({
  label,
  type,
  name,
  placeholder,
  required = false,
  autoComplete,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='mb-4'>
      <label
        htmlFor={name}
        className='block font-poppins text-base font-normal text-black mb-1'
      >
        {label}
      </label>
      <div className='relative'>
        <input
          id={name}
          name={name}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className='w-full px-5 py-4 border-[0.6px] border-[#282828] rounded-[6px] font-poppins text-sm font-light placeholder-[#ABABAB] focus:outline-none h-[56px] [&::placeholder]:font-poppins [&::placeholder]:font-light'
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-5 top-1/2 transform -translate-y-1/2'
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
    </div>
  );
}
