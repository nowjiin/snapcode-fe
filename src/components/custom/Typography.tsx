import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className = '' }: TypographyProps) {
  return (
    <h1
      className={`text-4xl md:text-5xl font-bold text-[#FF7710] mb-6 ${className}`}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className = '' }: TypographyProps) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold text-[#FF7710] mb-4 ${className}`}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className = '' }: TypographyProps) {
  return (
    <h3
      className={`text-2xl md:text-3xl font-semibold text-[#FF7710] mb-3 ${className}`}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className = '' }: TypographyProps) {
  return (
    <h4
      className={`text-xl md:text-2xl font-semibold text-[#FF7710] mb-2 ${className}`}
    >
      {children}
    </h4>
  );
}

export function Paragraph({ children, className = '' }: TypographyProps) {
  return (
    <p className={`text-base text-gray-600 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

export function Small({ children, className = '' }: TypographyProps) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}
