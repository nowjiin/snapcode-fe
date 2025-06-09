interface AdminSubTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminSubTitle({
  children,
  className = '',
}: AdminSubTitleProps) {
  return (
    <h2
      className={`${className}`}
      style={{
        color: '#121',
        fontFamily: 'Pretendard',
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: '300',
        lineHeight: 'normal',
      }}
    >
      {children}
    </h2>
  );
}
