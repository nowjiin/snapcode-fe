interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export function Button({
  onClick,
  children,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex justify-center items-center gap-[10px]
        min-w-[180px] min-h-[60px] px-6 py-3
        rounded-[14px] font-pretendard text-[20px] font-semibold leading-[22.452px]
        tracking-[-0.6px] transition-all duration-200
        ${
          disabled
            ? 'border-[0.5px] border-white bg-[rgba(116,185,255,0.24)] text-[rgba(154,154,154,0.45)] font-bold'
            : 'bg-[#6473A0] text-white hover:bg-[#55628A] active:bg-[#4A5678]'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}
