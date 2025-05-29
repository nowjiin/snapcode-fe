interface EvaluateButtonProps {
  onClick?: () => void;
  text?: string;
  isActive?: boolean;
}

export function EvaluateButton({
  onClick,
  text = 'Code Quality',
  isActive = false,
}: EvaluateButtonProps) {
  // & 기준으로 텍스트를 두 줄로 나누고 & 제거
  const textParts = text.split(' & ');
  const hasMultipleParts = textParts.length > 1;

  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-3 rounded-lg border-2 
        transition-all duration-200 w-full
        font-pretendard text-sm font-medium
        hover:scale-105 active:scale-95
        ${hasMultipleParts ? 'min-h-[80px]' : 'min-h-[60px]'}
        ${
          isActive
            ? 'bg-[#6473A0] border-[#6473A0] text-white shadow-lg'
            : 'bg-white border-gray-200 text-gray-700 hover:border-[#6473A0] hover:text-[#6473A0] shadow-sm'
        }
      `}
    >
      {/* 선택된 상태 체크 아이콘 */}
      {isActive && (
        <div className='absolute top-2 right-2'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9 12l2 2 4-4'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      )}

      <div className='text-center flex flex-col justify-center h-full'>
        {hasMultipleParts ? (
          <>
            <span className='block leading-tight'>{textParts[0]}</span>
            <span className='block text-xs opacity-80 mt-1'>
              {textParts[1]}
            </span>
          </>
        ) : (
          <span className='block leading-tight'>{text}</span>
        )}
      </div>
    </button>
  );
}
