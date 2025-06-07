import { Icon } from './Icon';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={`flex flex-col items-center text-center p-6 ${className}`}>
      <div className='mb-6'>
        <Icon name={icon} size='lg' className='text-[#FF7710]' />
      </div>
      <h3
        className='text-white text-center mb-4'
        style={{
          fontFamily: 'Pretendard',
          fontSize: '24px',
          fontWeight: '700',
          lineHeight: '150%',
        }}
      >
        {title}
      </h3>
      <p
        className='text-center'
        style={{
          color: '#B3B3B3',
          fontFamily: 'Pretendard',
          fontSize: '18px',
          fontWeight: '300',
          lineHeight: '150%',
        }}
      >
        {description}
      </p>
    </div>
  );
}
