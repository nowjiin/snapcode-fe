import React from 'react';

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h1
      className={`text-base md:text-lg lg:text-xl mb-3 ${className}`}
      style={{
        color: '#1A1A1A',
        fontFeatureSettings: "'liga' off, 'clig' off",
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: '1.556',
        letterSpacing: 'clamp(-0.25px, -0.018em, -0.325px)',
      }}
    >
      {children}
    </h1>
  );
}
