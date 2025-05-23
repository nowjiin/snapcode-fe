import React from 'react';

interface AuthFooterProps {
  question: string;
  linkText: string;
  linkHref: string;
}

export function AuthFooter({ question, linkText, linkHref }: AuthFooterProps) {
  return (
    <div className='mt-6'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-white text-gray-500'>Or</span>
        </div>
      </div>

      <div className='mt-6 text-center'>
        <p className='font-pretendard text-base font-light text-[#7D7D7D]'>
          {question}{' '}
          <a
            href={linkHref}
            className='font-pretendard text-base font-semibold text-black'
          >
            {linkText}
          </a>
        </p>
      </div>
    </div>
  );
}
