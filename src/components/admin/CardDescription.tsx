import React from 'react';

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({
  children,
  className = '',
}: CardDescriptionProps) {
  return (
    <p
      className={`text-sm md:text-base lg:text-lg ${className}`}
      style={{
        color: '#767676',
        fontFeatureSettings: "'liga' off, 'clig' off",
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '1.625',
        letterSpacing: 'clamp(-0.2px, -0.02em, -0.289px)',
      }}
    >
      {children}
    </p>
  );
}
