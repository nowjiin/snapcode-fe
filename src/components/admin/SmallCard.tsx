interface SmallCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SmallCard({ children, className = '' }: SmallCardProps) {
  return (
    <div
      className={`p-3 flex flex-col ${className}`}
      style={{
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
        height: '151px',
        backgroundColor: '#FAFAFA',
      }}
    >
      {children}
    </div>
  );
}
