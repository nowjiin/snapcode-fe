interface PieChartProps {
  tokenCount: number;
  usedTokens: number;
  totalTokens: number;
  className?: string;
}

export function PieChart({
  tokenCount,
  usedTokens,
  totalTokens,
  className = '',
}: PieChartProps) {
  const percentage = (usedTokens / totalTokens) * 100;
  const circumference = 2 * Math.PI * 55; // radius = 55
  const strokeDasharray = `${
    (percentage / 100) * circumference
  } ${circumference}`;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className='relative'>
        <svg width='160' height='160' className='transform -rotate-90'>
          {/* Background circle */}
          <circle
            cx='80'
            cy='80'
            r='55'
            stroke='#f3f4f6'
            strokeWidth='10'
            fill='transparent'
          />
          {/* Progress circle */}
          <circle
            cx='80'
            cy='80'
            r='55'
            stroke='#FF7710'
            strokeWidth='10'
            fill='transparent'
            strokeDasharray={strokeDasharray}
            strokeLinecap='round'
            className='transition-all duration-300'
          />
        </svg>

        {/* Center content */}
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span
            className='text-2xl font-semibold'
            style={{
              color: '#1A1A1A',
              fontFamily: 'Pretendard',
            }}
          >
            {tokenCount.toLocaleString()}
          </span>
          <span
            className='text-sm mt-1'
            style={{
              color: '#767676',
              fontFamily: 'Pretendard',
            }}
          >
            token
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className='flex items-center justify-center gap-4 mt-4 text-xs'>
        <div className='flex items-center justify-center gap-1'>
          <div className='w-3 h-3 rounded-full bg-[#FF7710]'></div>
          <span style={{ color: '#767676', fontFamily: 'Pretendard' }}>
            Used ({usedTokens.toLocaleString()})
          </span>
        </div>
      </div>
    </div>
  );
}
