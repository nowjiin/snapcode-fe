import React from 'react';

interface CardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function CardButton({
  children,
  className = '',
  variant = 'primary',
  ...props
}: CardButtonProps) {
  const variants = {
    primary: '#FF8F3A',
    secondary: '#f3f4f6',
  };

  return (
    <button
      className={`inline-flex items-center flex-shrink-0 transition-all duration-200 hover:opacity-90 active:scale-95 ${className}`}
      style={{
        height: 'clamp(1.5rem, 2.5vw, 1.72rem)',
        padding: '0 clamp(0.7rem, 1.2vw, 0.86rem)',
        gap: 'clamp(0.2rem, 0.3vw, 0.25rem)',
        borderRadius: 'clamp(0.15rem, 0.25vw, 0.21rem)',
        background: variants[variant],
        boxShadow: '0px 1px 2px 0px rgba(27, 40, 54, 0.08)',
        color: '#FFF',
        textAlign: 'center',
        fontVariantNumeric: 'lining-nums tabular-nums',
        fontFamily: 'Pretendard',
        fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '1.286',
      }}
      {...props}
    >
      {children}
    </button>
  );
}
