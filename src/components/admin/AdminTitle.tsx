interface AdminTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminTitle({ children, className = '' }: AdminTitleProps) {
  return (
    <h1
      className={`${className}`}
      style={{
        color: '#121',
        fontFamily: 'Pretendard',
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
      }}
    >
      {children}
    </h1>
  );
}
