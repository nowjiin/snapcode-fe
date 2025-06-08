import React from 'react';

interface BorderCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BorderCard({ children, className = '' }: BorderCardProps) {
  return (
    <div
      className={`p-4 flex flex-col h-full ${className}`}
      style={{
        borderRadius: '15px',
        border: '1px solid #D2D2D2',
      }}
    >
      {children}
    </div>
  );
}
