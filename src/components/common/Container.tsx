import { Icon } from '../custom/Icon';
import { H3, Paragraph } from '../custom/Typography';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
}

export function Container({
  children,
  className = '',
  size = 'lg',
  centered = true,
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const centerClass = centered ? 'mx-auto' : '';

  return (
    <div className={`${sizes[size]} ${centerClass} ${className}`}>
      {children}
    </div>
  );
}

interface SubContainerProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  iconColor?: string;
}

export function SubContainer({
  icon,
  title,
  description,
  className = '',
  iconSize = 'lg',
  iconColor = '#FF7710',
}: SubContainerProps) {
  return (
    <div
      className={`flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${className}`}
    >
      <div className='mb-4'>
        <Icon name={icon} size={iconSize} className={`text-[${iconColor}]`} />
      </div>
      <div>
        <H3 className='mb-2'>{title}</H3>
        <Paragraph>{description}</Paragraph>
      </div>
    </div>
  );
}

interface ContainerGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function ContainerGrid({
  children,
  className = '',
  columns = 3,
}: ContainerGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  // For 3 columns, use minimal gap and let cards stretch to full width
  const gapClass = columns === 3 ? 'gap-2' : 'gap-6';

  return (
    <div
      className={`grid ${gapClass} ${gridCols[columns]} w-full ${className}`}
    >
      {children}
    </div>
  );
}
